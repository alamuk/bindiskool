import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { blogPosts, updateBlogPostSchema } from "@shared/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/app/api/admin/auth";
import { del } from "@vercel/blob";

/* -------------------------------------------------------------------------- */
/* Helpers: detect & extract Vercel Blob image URLs                           */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* GET /api/blog/[id] – Get single blog post                                  */
/* -------------------------------------------------------------------------- */

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // 👈 params is a Promise
) {
  try {
    const { id } = await params; // ✅ await before using

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

/* -------------------------------------------------------------------------- */
/* PUT /api/blog/[id] – Update blog post (Admin only)                         */
/* Also deletes old featured image blob if a new one was set.                 */
/* -------------------------------------------------------------------------- */

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // 👈 Promise here too
) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params; // ✅ await

    const body = await request.json();

    // previousFeaturedImage comes from the client just for cleanup
    const { previousFeaturedImage, ...rawData } = body as {
      previousFeaturedImage?: string | null;
      [key: string]: unknown;
    };

    // validate actual blog fields
    const validatedData = updateBlogPostSchema.parse(rawData);

    // If publishing now and no publishedAt, set it
    if (validatedData.status === "published" && !validatedData.publishedAt) {
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

    // 🧹 Remove old featured image from Blob storage if it changed
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

/* -------------------------------------------------------------------------- */
/* DELETE /api/blog/[id] – Delete post + all associated Blob images           */
/* -------------------------------------------------------------------------- */

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // 👈 Promise here too
) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params; // ✅ await

    // delete post from DB, but keep the record in memory
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

    // delete blobs (best-effort – don't fail the request if this breaks)
    for (const url of urlsToDelete) {
      try {
        await del(url);
      } catch (err) {
        console.error("Failed to delete blob", url, err);
      }
    }

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
