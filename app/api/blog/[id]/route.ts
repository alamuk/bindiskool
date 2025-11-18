// app/api/blog/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/server/db";
import { blogPosts, updateBlogPostSchema } from "@shared/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/app/api/admin/auth";
import { del } from "@vercel/blob";

// --- helpers to detect Vercel Blob URLs ---

function isVercelBlobUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

function extractBlobImageUrlsFromHtml(html: string | null): string[] {
  if (!html) return [];
  const urls: string[] = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  let match: RegExpExecArray | null;

  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    if (isVercelBlobUrl(src)) {
      urls.push(src);
    }
  }

  return urls;
}

function revalidateForPost(slug: string | null) {
  revalidatePath("/");
  revalidatePath("/blog");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
  revalidateTag("blog");
}

// DELETE /api/blog/[id]  (Admin only)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await context.params;

    const [deletedPost] = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning();

    if (!deletedPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // collect all blob URLs: featured image + images inside content
    const urlsToDelete = new Set<string>();

    if (
      deletedPost.featuredImage &&
      isVercelBlobUrl(deletedPost.featuredImage)
    ) {
      urlsToDelete.add(deletedPost.featuredImage);
    }

    for (const src of extractBlobImageUrlsFromHtml(deletedPost.content)) {
      urlsToDelete.add(src);
    }

    // delete blobs (best-effort)
    for (const url of urlsToDelete) {
      try {
        await del(url);
      } catch (err) {
        console.error("Failed to delete blob", url, err);
      }
    }

    revalidateForPost(deletedPost.slug);

    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}

// GET /api/blog/[id] - fetch one post
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - full update (Admin only)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const body = await request.json();

    // pull out previousFeaturedImage – not part of DB schema
    const { previousFeaturedImage, ...rawData } = body as {
      previousFeaturedImage?: string | null;
      [key: string]: unknown;
    };

    // normalise publishedAt if it's a string
    if (
      typeof rawData.publishedAt === "string" &&
      rawData.publishedAt.length > 0
    ) {
      rawData.publishedAt = new Date(rawData.publishedAt);
    } else if (!rawData.publishedAt) {
      rawData.publishedAt = null;
    }

    const validatedData = updateBlogPostSchema.parse(rawData);

    // If publishing, set publishedAt if missing
    if (
      validatedData.status === "published" &&
      !validatedData.publishedAt
    ) {
      validatedData.publishedAt = new Date();
    }

    const updateData = {
      ...validatedData,
      updatedAt: new Date(),
    };

    const [updatedPost] = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning();

    if (!updatedPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // clean up old featured image if changed
    if (
      previousFeaturedImage &&
      previousFeaturedImage !== updatedPost.featuredImage &&
      isVercelBlobUrl(previousFeaturedImage)
    ) {
      try {
        await del(previousFeaturedImage);
      } catch (err) {
        console.error("Failed to delete old featured image blob:", err);
      }
    }

    revalidateForPost(updatedPost.slug);

    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update blog post",
      },
      { status: 400 }
    );
  }
}

// PATCH /api/blog/[id] - lightweight update (used for status toggle)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const body = (await request.json()) as {
      status?: "draft" | "published";
    };

    if (!body.status || !["draft", "published"].includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid or missing status" },
        { status: 400 }
      );
    }

    const now = new Date();

    const updateData: Partial<
      Pick<typeof blogPosts.$inferSelect, "status" | "publishedAt" | "updatedAt">
    > = {
      status: body.status,
      updatedAt: now,
    };

    if (body.status === "published") {
      updateData.publishedAt = now;
    } else {
      // for drafts you can either keep publishedAt or null it out
      updateData.publishedAt = null;
    }

    const [updatedPost] = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning();

    if (!updatedPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    revalidateForPost(updatedPost.slug);

    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error("Error patching blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}
