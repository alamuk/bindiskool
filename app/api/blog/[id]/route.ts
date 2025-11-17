// app/api/blog/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { blogPosts, updateBlogPostSchema } from "@shared/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/app/api/admin/auth";
import { del } from "@vercel/blob";
import { revalidatePath, revalidateTag } from "next/cache";

// --------- Blob helpers ----------

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

// --------- GET /api/blog/[id] ----------

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

// --------- PUT /api/blog/[id] (update) ----------

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const body = await request.json();

    // Normalise publishedAt if it comes as a string
    if (body.publishedAt && typeof body.publishedAt === "string") {
      body.publishedAt = new Date(body.publishedAt);
    }

    // Pull out previousFeaturedImage – not part of DB schema
    const { previousFeaturedImage, ...rawData } = body as {
      previousFeaturedImage?: string | null;
      [key: string]: unknown;
    };

    // Validate only actual blog fields
    const validatedData = updateBlogPostSchema.parse(rawData);

    // If publishing and missing publishedAt, set it now
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

    // 🧹 delete old featured image if it changed and was stored in Blob
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

    // Revalidate pages so changes show on the site
    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedPost.slug}`);
    revalidateTag("blog");

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

// --------- DELETE /api/blog/[id] ----------

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }>  }
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

    // Collect all Blob URLs we want to delete
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

    // Best-effort clean-up: delete blobs, but don't fail the API if one fails
    for (const url of urlsToDelete) {
      try {
        await del(url);
      } catch (err) {
        console.error("Failed to delete blob", url, err);
      }
    }

    // Revalidate blog list; post page will 404 after deletion
    revalidatePath("/blog");
    revalidateTag("blog");

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



