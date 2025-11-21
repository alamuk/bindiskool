"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "@/components/RichTextEditor";
import { useToast } from "@/hooks/use-toast";

import type { BlogPost } from "@shared/schema";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [isSaving, setIsSaving] = useState(false);

  // remember original featured image so API can delete it if replaced
  const [originalFeaturedImage, setOriginalFeaturedImage] = useState<
    string | null
  >(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ---------------------------------------------------------------------------
  // Load post
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        if (!res.ok) {
          throw new Error("Failed to load post");
        }

        const data = await res.json();
        const p: BlogPost = data.post;

        setPost(p);
        setTitle(p.title);
        setSlug(p.slug);
        setExcerpt(p.excerpt);
        setCategory(p.category);
        setTags(p.tags ? p.tags.join(", ") : "");
        setFeaturedImage(p.featuredImage || "");
        setOriginalFeaturedImage(p.featuredImage || null);
        setContent(p.content);
        setMetaTitle(p.metaTitle || "");
        setMetaDescription(p.metaDescription || "");
        setStatus((p.status as "draft" | "published") ?? "draft");
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        });
        router.push("/admin/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // ---------------------------------------------------------------------------
  // Featured image upload
  // ---------------------------------------------------------------------------
  const handleFeaturedImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFeaturedImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Upload failed:", res.status, text);
        throw new Error("Upload failed");
      }

      const data = await res.json();
      const url = data.url as string;

      setFeaturedImage(url);

      toast({
        title: "Image uploaded",
        description: "Your featured image has been uploaded.",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Could not upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Save handler (used by both buttons)
  // ---------------------------------------------------------------------------
  const handleSave = async (
    event: React.SyntheticEvent,
    nextStatus: "draft" | "published"
  ) => {
    event.preventDefault();
    if (!post) return;

    setIsSaving(true);

    try {
      const response = await fetch(`/api/blog/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          featuredImage: featuredImage || null,
          metaTitle: metaTitle || null,
          metaDescription: metaDescription || null,
          status: nextStatus,
          // send previous featured image so API can delete it if changed
          previousFeaturedImage: originalFeaturedImage,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error || "Failed to update post");
      }

      const { post: updated } = await response.json();
      setPost(updated);
      setOriginalFeaturedImage(updated.featuredImage || null);
      setStatus(updated.status as "draft" | "published");

      toast({
        title: "Saved",
        description: "Blog post updated successfully.",
      });

      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update post",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------
  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <p>Loading...</p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="font-playfair text-2xl">
              Edit Blog Post
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={(e) => handleSave(e, status)} className="space-y-6">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              {/* Featured image upload */}
              <div>
                <Label>Featured Image</Label>
                <div className="mt-2 flex items-center gap-4">
                  {featuredImage && (
                    <img
                      src={featuredImage}
                      alt="Featured"
                      className="h-24 w-24 object-cover rounded-md border"
                    />
                  )}

                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleFeaturedImageClick}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload image
                    </Button>
                    <Input
                      type="text"
                      placeholder="Or paste image URL"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                    />
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFeaturedImageChange}
                />
              </div>

              <div>
                <Label>Content *</Label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>

              {/* SEO */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="Leave empty to use post title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      rows={2}
                      placeholder="Leave empty to use excerpt"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSaving}
                  onClick={(e) => handleSave(e, "draft")}
                >
                  Save as Draft
                </Button>
                <Button
                  type="button"
                  className="bg-brand-blue hover:bg-blue-800 text-white"
                  disabled={isSaving}
                  onClick={(e) => handleSave(e, "published")}
                >
                  {isSaving ? "Saving..." : "Save & Publish"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
