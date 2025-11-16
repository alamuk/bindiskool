import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { blogPosts, insertBlogPostSchema } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "@/app/api/admin/auth";
import { revalidatePath } from "next/cache";

// GET /api/blog - List all blog posts (optionally filter by status)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // 'draft', 'published', or null for all

    let posts;

    if (status === "published") { 
      posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.status, "published"))
        .orderBy(desc(blogPosts.publishedAt));
    } else if (status === "draft") {
      posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.status, "draft"))
        .orderBy(desc(blogPosts.createdAt));
    } else {
      posts = await db
        .select()
        .from(blogPosts)
        .orderBy(desc(blogPosts.createdAt));
    }

    return NextResponse.json({ posts }, { status: 200 });
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
    const body = await request.json();

    // Validate input
    const validatedData = insertBlogPostSchema.parse(body);

    // Create slug from title if not provided
    if (!validatedData.slug) {
      validatedData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // If publishing, set publishedAt
    if (validatedData.status === "published" && !validatedData.publishedAt) {
      validatedData.publishedAt = new Date();
    }

    const [newPost] = await db
      .insert(blogPosts)
      .values(validatedData)
      .returning();

    // 🔁 Revalidate blog list + the new post page
    revalidatePath("/blog");
    if (newPost.slug) {
      revalidatePath(`/blog/${newPost.slug}`);
    }

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



