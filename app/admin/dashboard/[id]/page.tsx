'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@shared/schema';

export default function EditBlogPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${params.id}`);
      const data = await response.json();
      
      if (data.post) {
        const p = data.post;
        setPost(p);
        setTitle(p.title);
        setSlug(p.slug);
        setExcerpt(p.excerpt);
        setContent(p.content);
        setCategory(p.category);
        setTags(p.tags?.join(', ') || '');
        setFeaturedImage(p.featuredImage || '');
        setMetaTitle(p.metaTitle || '');
        setMetaDescription(p.metaDescription || '');
        setStatus(p.status as 'draft' | 'published');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch post',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent, newStatus?: 'draft' | 'published') => {
    e.preventDefault();
    setIsLoading(true);

    const finalStatus = newStatus || status;

    try {
      const response = await fetch(`/api/blog/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          featuredImage: featuredImage || null,
          metaTitle: metaTitle || null,
          metaDescription: metaDescription || null,
          status: finalStatus,
          publishedAt: finalStatus === 'published' && post?.status === 'draft' ? new Date() : post?.publishedAt,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Blog post updated successfully',
        });
        router.push('/admin/dashboard');
      } else {
        const error = await response.json();
        toast({
          title: 'Error',
          description: error.error || 'Failed to update post',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update post',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!post) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/dashboard')}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="font-playfair text-2xl">Edit Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  data-testid="input-title"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  data-testid="input-slug"
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
                  data-testid="textarea-excerpt"
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  data-testid="input-category"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  data-testid="input-tags"
                />
              </div>

              <div>
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  data-testid="input-featured-image"
                />
              </div>

              <div>
                <Label>Content *</Label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">SEO Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      data-testid="input-meta-title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      rows={2}
                      data-testid="textarea-meta-description"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {status === 'published' ? (
                  <Button
                    type="submit"
                    onClick={(e) => handleSubmit(e, 'draft')}
                    variant="outline"
                    disabled={isLoading}
                    data-testid="button-unpublish"
                  >
                    Unpublish
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={(e) => handleSubmit(e, 'draft')}
                    variant="outline"
                    disabled={isLoading}
                    data-testid="button-save-draft"
                  >
                    Save as Draft
                  </Button>
                )}
                <Button
                  type="submit"
                  onClick={(e) => handleSubmit(e, 'published')}
                  className="bg-brand-blue hover:bg-blue-700"
                  disabled={isLoading}
                  data-testid="button-publish"
                >
                  {isLoading ? 'Saving...' : status === 'published' ? 'Update' : 'Publish Now'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
