import { NextRequest, NextResponse } from "next/server";
import { blogPosts, updateBlogPostSchema } from "@shared/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/app/api/admin/auth";

// types for params
type RouteParams = {
  params: Promise<{ id: string }>;
};

// GET /api/blog/[id] - Get single blog post
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

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

// PUT /api/blog/[id] - Update blog post (Admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json();

    // if publishedAt came as string, convert to Date
    if (body.publishedAt) {
      body.publishedAt = new Date(body.publishedAt);
    }

    const validatedData = updateBlogPostSchema.parse(body);

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

    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update blog post",
      },
      { status: 400 }
    );
  }
}

// DELETE /api/blog/[id] - Delete blog post (Admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;

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
