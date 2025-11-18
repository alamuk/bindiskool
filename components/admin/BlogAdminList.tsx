// components/admin/BlogAdminList.tsx
"use client";

import React, { RefObject } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, PenSquare, Copy, Trash2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogAdminListProps {
  posts: BlogPost[];
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMoreRef: RefObject<HTMLDivElement>;
  onView: (post: BlogPost) => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
  onToggleStatus: (post: BlogPost) => void;
  onDuplicate: (post: BlogPost) => void;
}

function formatDate(value: Date | string | null) {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogAdminList(props: BlogAdminListProps) {
  const {
    posts,
    isInitialLoading,
    isLoadingMore,
    hasMore,
    loadMoreRef,
    onView,
    onEdit,
    onDelete,
    onToggleStatus,
    onDuplicate,
  } = props;

  // INITIAL LOADING
  if (isInitialLoading && posts.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  // EMPTY STATE
  if (!isInitialLoading && posts.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          No blog posts found. Adjust your filters or create a new post.
        </CardContent>
      </Card>
    );
  }

  // NORMAL LIST
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="flex flex-col overflow-hidden hover-lift"
          >
            {/* Featured image / fallback */}
            {post.featuredImage ? (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-40 bg-linear-to-br from-brand-blue to-brand-indigo" />
            )}

            <CardHeader className="pb-2">
              <CardTitle className="text-base line-clamp-2">
                {post.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col flex-1">
              {/* Meta / status */}
              <div className="flex items-center justify-between mb-2 text-xs text-brand-slate">
                <span>
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
                <Badge
                  onClick={() => onToggleStatus(post)}
                  variant={
                    post.status === "published" ? "default" : "outline"
                  }
                  className={
                    "cursor-pointer transition-colors " +
                    (post.status === "published"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : "border-amber-300 text-amber-700")
                  }
                >
                  {post.status === "published"
                    ? "Published (click to unpublish)"
                    : "Draft (click to publish)"}
                </Badge>
              </div>

              {post.category && (
                <p className="text-xs text-brand-slate mb-1">
                  Category:{" "}
                  <span className="font-medium">{post.category}</span>
                </p>
              )}

              <p className="text-sm text-brand-slate line-clamp-3 mb-4">
                {post.excerpt}
              </p>

              {/* Actions */}
              <div className="mt-auto flex flex-wrap gap-2 justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(post)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(post)}
                >
                  <PenSquare className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDuplicate(post)}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => onDelete(post)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      <div
        ref={loadMoreRef}
        className="h-10 flex items-center justify-center"
      >
        {isLoadingMore && hasMore && (
          <Loader2 className="w-5 h-5 animate-spin text-brand-blue" />
        )}
        {!hasMore && (
          <p className="text-xs text-brand-slate mt-4">
            You’ve reached the end.
          </p>
        )}
      </div>
    </>
  );
}
