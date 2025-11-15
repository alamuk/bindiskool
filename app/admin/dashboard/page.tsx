'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, LogOut, Eye } from 'lucide-react';
import type { BlogPost } from '@shared/schema';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check');
      const data = await response.json();
      
      if (!data.authenticated) {
        router.push('/admin/login');
        return;
      }
      
      setIsAuthenticated(true);
      fetchPosts();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch posts',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Post deleted successfully',
        });
        fetchPosts();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-brand-indigo">Blog Management</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => router.push('/admin/dashboard/new')}
              className="bg-brand-blue hover:bg-blue-700"
              data-testid="button-new-post"
            >
              <Plus className="w-4 h-4 mr-2" />
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

        {isLoading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              No blog posts yet. Create your first post!
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                      <p className="text-gray-600 mb-2">{post.excerpt}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          {post.category}
                        </span>
                        <span className={post.status === 'published' ? 'text-green-600' : 'text-yellow-600'}>
                          {post.status === 'published' ? '● Published' : '● Draft'}
                        </span>
                        {post.publishedAt && (
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        data-testid={`button-view-${post.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/dashboard/${post.id}`)}
                        data-testid={`button-edit-${post.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        data-testid={`button-delete-${post.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
