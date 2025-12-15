import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/server/db";
import { blogPosts, insertBlogPostSchema } from "@shared/schema";
import { eq, desc, sql, ilike, or, and } from "drizzle-orm";
import { requireAdmin } from "@/app/api/admin/auth";

// GET /api/blog - list posts with pagination, filters, search, stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // filters
    const status = searchParams.get("status"); // "draft" | "published" | null
    const category = searchParams.get("category"); // category name | "all" | null
    const q = (searchParams.get("q") || "").trim(); // search query

    // pagination
    const pageParam = Number(searchParams.get("page") ?? "1");
    const limitParam = Number(searchParams.get("limit") ?? "9");
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const limit = Number.isNaN(limitParam) || limitParam < 1 ? 9 : limitParam;
    const offset = (page - 1) * limit;

    // ----- STATS (global, not filtered) -----
    const [{ totalCount }] = await db
      .select({
        totalCount: sql<string>`count(*)`,
      })
      .from(blogPosts);

    const [{ publishedCount }] = await db
      .select({
        publishedCount: sql<string>`count(*)`,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"));

    const [{ draftCount }] = await db
      .select({
        draftCount: sql<string>`count(*)`,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, "draft"));

    const stats = {
      total: Number(totalCount || "0"),
      published: Number(publishedCount || "0"),
      draft: Number(draftCount || "0"),
    };

    // ----- CATEGORIES (for dropdown) -----
    const categoryRows = await db
      .select({ category: blogPosts.category })
      .from(blogPosts)
      .groupBy(blogPosts.category);

    const categories = categoryRows
      .map((row) => row.category)
      .filter((c): c is string => Boolean(c));

    // ----- FILTERS + SEARCH -----
    const conditions = [];

    if (status === "published" || status === "draft") {
      conditions.push(eq(blogPosts.status, status));
    }

    if (category && category !== "all") {
      conditions.push(eq(blogPosts.category, category));
    }

    if (q) {
      conditions.push(
        or(
          ilike(blogPosts.title, `%${q}%`),
          ilike(blogPosts.excerpt, `%${q}%`),
          ilike(blogPosts.category, `%${q}%`)
        )
      );
    }

    // Build base query with filters
    let query = db.select().from(blogPosts);

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as typeof query;
    }

    const posts = await query
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset);

    const hasMore = posts.length === limit;

    return NextResponse.json(
      {
        posts,
        pagination: {
          page,
          limit,
          hasMore,
        },
        stats,
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create new blog post (Admin only)
export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    // 1️⃣ Read raw body
    const body = await request.json();

    // 2️⃣ Normalise publishedAt: string -> Date (or null)
    const normalisedBody = {
      ...body,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
    };

    // 3️⃣ Validate with Zod
    const validatedData = insertBlogPostSchema.parse(normalisedBody);

    // 4️⃣ Create slug from title if not provided
    if (!validatedData.slug) {
      validatedData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // 5️⃣ If publishing and no publishedAt, set it now
    if (
      validatedData.status === "published" &&
      !validatedData.publishedAt
    ) {
      validatedData.publishedAt = new Date();
    }

    const [newPost] = await db
      .insert(blogPosts)
      .values(validatedData)
      .returning();

    // Revalidate pages so the new post shows up immediately
   revalidatePath("/", "layout");
   revalidatePath("/blog", "layout");
   revalidatePath(`/blog/${newPost.slug}`, "page");
   revalidateTag("blog", "layout");

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create blog post",
      },
      { status: 400 }
    );
  }
}

``