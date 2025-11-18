import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCarousel } from "@/components/BlogCarousel";
import { BackToTopButton } from "@/components/BackToTopButton"; // 👈 NEW

import { db } from "@/server/db";
import { blogPosts } from "@shared/schema";
import type { BlogPost } from "@shared/schema";
import { eq, and, ne, desc } from "drizzle-orm";

// ---------- DATA HELPERS ----------

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  return post || null;
}

async function getRecentPosts(currentPostId: string): Promise<BlogPost[]> {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(
      and(eq(blogPosts.status, "published"), ne(blogPosts.id, currentPostId))
    )
    .orderBy(desc(blogPosts.publishedAt))
    .limit(10);

  return posts;
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// ---------- METADATA ----------

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found - BirdiSkool Blog",
    };
  }

  const ogImage = post.featuredImage || "/og-image.png";

  return {
    title: post.metaTitle || `${post.title} - BirdiSkool Blog`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

// ---------- PAGE ----------

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const recentPosts = await getRecentPosts(post.id);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* MAIN ARTICLE */}
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-4 sm:mb-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-sm font-medium text-brand-blue hover:underline"
                >
                  ← Back to Blog
                </Link>
              </div>

              {post.featuredImage && (
                <div className="mb-6 sm:mb-8 rounded-2xl overflow-hidden shadow-md bg-gray-100">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <header className="mb-6 sm:mb-8">
                <h1 className="font-playfair text-3xl leading-tight md:text-4xl lg:text-5xl font-bold text-brand-indigo mb-3 sm:mb-4">
                  {post.title}
                </h1>

                <div className="text-xs sm:text-sm text-brand-slate flex flex-wrap items-center gap-2">
                  {formattedDate && (
                    <time className="tracking-wide uppercase">
                      {formattedDate}
                    </time>
                  )}
                  {post.category && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="px-2 py-1 rounded-full bg-gray-100 text-[11px] sm:text-xs">
                        {post.category}
                      </span>
                    </>
                  )}
                </div>
              </header>

              <article
                className="
                  prose prose-base md:prose-lg
                  max-w-none
                  prose-headings:font-playfair
                  prose-headings:text-brand-indigo
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
                  prose-p:text-brand-slate
                  prose-p:leading-relaxed
                  prose-li:leading-relaxed
                  prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-xl prose-img:shadow-md
                  prose-blockquote:border-l-4 prose-blockquote:border-brand-blue/40
                  prose-blockquote:text-brand-slate
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </section>

        {/* RELATED / RECENT POSTS CAROUSEL */}
        {recentPosts.length > 0 && (
          <section className="py-10 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <BlogCarousel
                title="Recent posts you may like"
                posts={recentPosts}
              />
            </div>
          </section>
        )}

        {/* floating back-to-top button */}
        <BackToTopButton />
      </main>

      <Footer />
    </div>
  );
}


