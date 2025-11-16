import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { db } from '@/server/db';
import { blogPosts } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

export const metadata: Metadata = {
  title: 'Healthcare Business Insights - BirdiSkool Blog',
  description: 'Practical strategies and insights to help you build a thriving healthcare practice. Expert advice on practice growth, marketing, and business systems.',
};

const categoryGradients: Record<string, string> = {
  'Strategy': 'from-brand-emerald to-green-600',
  'Marketing': 'from-brand-gold to-yellow-600',
  'Business Growth': 'from-brand-blue to-brand-indigo',
};

export default async function BlogPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, 'published'))
    .orderBy(desc(blogPosts.publishedAt));
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-brand">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
                Healthcare Business Insights
              </h1>
              <h2 className="text-xl md:text-2xl mb-8 opacity-90">
                Practical strategies and insights to help you build a thriving healthcare practice
              </h2>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {posts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-brand-slate">No blog posts yet. Check back soon!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => {
                    const gradient = categoryGradients[post.category] || 'from-brand-blue to-brand-indigo';
                    const formattedDate = post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
                      : '';

                    return (
                      <article key={post.slug} className="bg-white rounded-xl shadow-sm hover-lift overflow-hidden" data-testid={`blog-post-${post.slug}`}>
                        {post.featuredImage ? (
                          <img src={post.featuredImage} alt={post.title} className="aspect-video object-cover" />
                        ) : (
                          <div className={`aspect-video bg-linear-to-br ${gradient}`}></div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center text-sm text-brand-slate mb-3">
                            <time>{formattedDate}</time>
                            <span className="mx-2">•</span>
                            <span>{post.category}</span>
                          </div>
                          <h3 className="font-playfair text-xl font-bold text-brand-indigo mb-3">
                            {post.title}
                          </h3>
                          <p className="text-brand-slate mb-4">
                            {post.excerpt}
                          </p>
     ``                     <Link
                            href={`/blog/${post.slug}`}
                            className="text-brand-blue font-montserrat font-semibold hover:underline"
                            data-testid={`link-read-more-${post.slug}`}
                          >
                            Read More →
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-6">
                Stay Updated
              </h2>
              <p className="text-xl text-brand-slate mb-8">
                Get the latest insights on healthcare practice growth delivered to your inbox
              </p>
              <div className="max-w-md mx-auto">
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    data-testid="input-newsletter-email"
                  />
                  <button
                    type="submit"
                    className="bg-brand-blue hover:bg-blue-700 text-white font-montserrat font-semibold px-6 py-3 rounded-lg transition-colors"
                    data-testid="button-newsletter-subscribe"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
