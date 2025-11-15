import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { db } from "@/server/db";
import { blogPosts } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { BlogPost } from "@shared/schema";

// Helper to fetch a single post
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  return post || null;
}

// 👈 params is now a Promise
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// SEO metadata
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  // 👈 await params first
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found - BirdiSkool Blog",
    };
  }

  return {
    title: post.metaTitle || `${post.title} - BirdiSkool Blog`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : ["/og-image.png"],
    },
  };
}

// Page component
export default async function BlogPostPage({ params }: PageProps) {
  // 👈 same here – await params
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-brand-blue hover:underline mb-8"
              >
                ← Back to Blog
              </Link>

              {post.featuredImage && (
                <div className="mb-8">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
              )}

              <h1 className="font-playfair text-3xl md:text-5xl font-bold text-brand-indigo mb-4">
                {post.title}
              </h1>

              <div className="text-brand-slate mb-8 text-sm">
                {formattedDate && <time>{formattedDate}</time>}
                {post.category && <> • {post.category}</>}
              </div>

              <article
                className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-brand-indigo prose-p:text-brand-slate prose-a:text-brand-blue prose-a:hover:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
