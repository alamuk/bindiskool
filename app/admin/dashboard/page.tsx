// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import type { BlogPost } from "@shared/schema";
import { BlogAdminList } from "@/components/admin/BlogAdminList";

import {
  FileText,
  Plus,
  Trash2,
  PenSquare,
  LogOut,
  Eye,
  Loader2,
  Search,
  Filter,
  Copy,
} from "lucide-react";

type StatusFilter = "all" | "published" | "draft";

type BlogListResponse = {
  posts: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    hasMore: boolean;
  };
  stats: {
    total: number;
    published: number;
    draft: number;
  };
  categories: string[];
};

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // --- AUTH CHECK ---
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/check");
        const data = await response.json();

        if (!data.authenticated) {
          router.push("/admin/login");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  // --- FETCH PAGE OF POSTS ---
  const fetchPage = useCallback(
    async (pageToLoad: number, replace = false) => {
      try {
        if (pageToLoad === 1) {
          setIsInitialLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        const params = new URLSearchParams();
        params.set("page", String(pageToLoad));
        params.set("limit", "9");

        if (statusFilter !== "all") {
          params.set("status", statusFilter);
        }
        if (categoryFilter !== "all") {
          params.set("category", categoryFilter);
        }
        if (search.trim()) {
          params.set("q", search.trim());
        }

        const res = await fetch(`/api/blog?${params.toString()}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const data: BlogListResponse = await res.json();

        setStats(data.stats);
        setCategories(data.categories || []);
        setHasMore(data.pagination.hasMore);

        if (replace) {
          setPosts(data.posts);
        } else {
          setPosts((prev) => [...prev, ...data.posts]);
        }

        setPage(data.pagination.page);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to load blog posts",
          variant: "destructive",
        });
      } finally {
        setIsInitialLoading(false);
        setIsLoadingMore(false);
      }
    },
    [statusFilter, categoryFilter, search, toast]
  );

  // Initial load & whenever filters/search change
  useEffect(() => {
    if (!isAuthenticated) return;

    setPosts([]);
    setPage(1);
    setHasMore(true);
    fetchPage(1, true);
  }, [isAuthenticated, statusFilter, categoryFilter, search, fetchPage]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || !isAuthenticated) return;

    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore && !isInitialLoading) {
          fetchPage(page + 1);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [
    page,
    hasMore,
    isLoadingMore,
    isInitialLoading,
    fetchPage,
    isAuthenticated,
  ]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this post? This cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      toast({
        title: "Success",
        description: "Post deleted successfully",
      });

      // Re-fetch first page & stats
      fetchPage(1, true);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  // Inline status toggle
  const handleToggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === "published" ? "draft" : "published";

    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Failed to update post status");
      }

      toast({
        title: "Status updated",
        description: `Post is now ${newStatus}`,
      });

      // re-fetch first page so stats + list are synced
      fetchPage(1, true);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to toggle status",
        variant: "destructive",
      });
    }
  };

  // Duplicate post as draft
  const handleDuplicate = async (post: BlogPost) => {
    if (
      !window.confirm(
        "Duplicate this post as a new draft? You can edit it afterwards."
      )
    ) {
      return;
    }

    try {
      const body = {
        title: `${post.title} (Copy)`,
        slug: "", // let backend generate from title
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags || [],
        featuredImage: post.featuredImage,
        metaTitle: post.metaTitle || null,
        metaDescription: post.metaDescription || null,
        status: "draft" as const,
        publishedAt: null,
      };

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Failed to duplicate post");
      }

      toast({
        title: "Post duplicated",
        description: "New draft created from this post.",
      });

      fetchPage(1, true);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to duplicate post",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const formatDate = (value: Date | string | null) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header & top actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-brand-indigo flex items-center gap-2">
              <FileText className="w-7 h-7 text-brand-blue" />
              Blog Management
            </h1>
            <p className="text-sm text-brand-slate mt-1">
              Manage your BirdiSkool articles, update content, and publish new
              insights.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:items-center">
            <Button
              onClick={() => router.push("/admin/dashboard/new")}
              className="bg-brand-blue hover:bg-blue-800 text-white"
              data-testid="button-new-post"
            >
              <Plus className="w-4 h-4 mr-2 " />
              New Post
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="py-4">
              <p className="text-xs uppercase tracking-wide text-brand-slate">
                Total Posts
              </p>
              <p className="mt-1 text-2xl font-bold text-brand-indigo">
                {stats.total}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="text-xs uppercase tracking-wide text-brand-slate">
                Published
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {stats.published}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="text-xs uppercase tracking-wide text-brand-slate">
                Drafts
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-600">
                {stats.draft}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="flex items-center gap-2 md:w-72">
            <Search className="w-4 h-4 text-brand-slate" />
            <Input
              placeholder="Search posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-slate" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm text-brand-indigo focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="all">All categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={statusFilter === "published" ? "default" : "outline"}
                onClick={() => setStatusFilter("published")}
              >
                Published
              </Button>
              <Button
                size="sm"
                variant={statusFilter === "draft" ? "default" : "outline"}
                onClick={() => setStatusFilter("draft")}
              >
                Drafts
              </Button>
            </div>
          </div>
        </div>

        {/* POSTS GRID / STATES */}
        {isInitialLoading && posts.length === 0 ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
          </div>
        ) : posts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              No blog posts found. Adjust your filters or create a new post.
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="flex flex-col overflow-hidden hover-lift"
                >
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
                    <div className="flex items-center justify-between mb-2 text-xs text-brand-slate">
                      <span>
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                      <Badge
                        onClick={() => handleToggleStatus(post)}
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

                    <div className="mt-auto flex flex-wrap gap-2 justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(`/blog/${post.slug}`, "_blank")
                        }
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/admin/dashboard/${post.id}`)
                        }
                      >
                        <PenSquare className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDuplicate(post)}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Duplicate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete(post.id)}
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
        )}
      </div>
    </div>
  );
}
