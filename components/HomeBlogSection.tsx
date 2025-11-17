import React from "react";
import Link from "next/link";

import { db } from "@/server/db";
import { blogPosts } from "@shared/schema";
import type { BlogPost } from "@shared/schema";
import { desc, eq } from "drizzle-orm";

// Optional: category → gradient mapping (fallback to blue/indigo)
const categoryGradients: Record<string, string> = {
  "Business Growth": "from-brand-blue to-brand-indigo",
  Strategy: "from-brand-emerald to-green-600",
  Marketing: "from-brand-gold to-yellow-600",
};

export async function HomeBlogSection() {
  // Fetch latest 3 published posts
  const latestPosts: BlogPost[] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(3);

  return (
    <section className="py-20 bg-gray-50" id="blog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-8">
            Healthcare Business Insights
          </h2>
          <p className="text-xl text-brand-slate">
            Practical strategies and insights to help you build a thriving
            healthcare practice
          </p>
        </div>

        {latestPosts.length === 0 ? (
          <div className="text-center text-brand-slate">
            <p>No blog posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => {
              const formattedDate = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "";

              const gradient =
                categoryGradients[post.category] ||
                "from-brand-blue to-brand-indigo";

              return (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl shadow-sm hover-lift overflow-hidden"
                >
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="aspect-video object-cover"
                    />
                  ) : (
                    <div
                      className={`aspect-video bg-linear-to-br ${gradient}`}
                    ></div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center text-sm text-brand-slate mb-3">
                      {formattedDate && <time>{formattedDate}</time>}
                      {post.category && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{post.category}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-playfair text-xl font-bold text-brand-indigo mb-3">
                      {post.title}
                    </h3>

                    <p className="text-brand-slate mb-4">{post.excerpt}</p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-brand-blue font-montserrat font-semibold hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-brand-blue font-montserrat font-semibold hover:underline"
          >
            <span>View All Posts</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
