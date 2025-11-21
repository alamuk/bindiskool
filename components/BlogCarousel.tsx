"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Link from "next/link";
import type { BlogPost } from "@shared/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BlogCarouselProps = {
  title?: string;
  posts: BlogPost[];
  options?: EmblaOptionsType;
};

export function BlogCarousel({
  title = "Recent Posts",
  posts,
  options,
}: BlogCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center", // center like the BOSS slider
    skipSnaps: false,
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-brand-indigo">
          {title}
        </h2>
      </div>

      <div className="relative">
        {/* Prev / Next buttons – visible on mobile + desktop */}
        <button
          type="button"
          aria-label="Previous posts"
          onClick={scrollPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md hover:bg-gray-50 active:scale-95 transition sm:h-10 sm:w-10"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          type="button"
          aria-label="Next posts"
          onClick={scrollNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md hover:bg-gray-50 active:scale-95 transition sm:h-10 sm:w-10"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Embla viewport */}
        <div className="overflow-hidden -mx-3 sm:-mx-4" ref={emblaRef}>
          <div className="flex">
            {posts.map((post) => {
              const formattedDate = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "";

              return (
                <article
                  key={post.id}
                  // mobile: ~85% width with peek
                  // md: 50% (2 columns)
                  // lg+: 33.333% (3 columns)
                  className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] px-3 sm:px-4"
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg hover-lift overflow-hidden h-full flex flex-col">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        // Taller image ratio for more “fashiony” look
                        className="w-full object-cover object-center aspect-4/3"
                      />
                    ) : (
                      <div className="w-full aspect-4/3 bg-gradient-brand" />
                    )}

                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <div className="text-[11px] sm:text-xs text-brand-slate mb-1">
                        {formattedDate}
                        {post.category && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{post.category}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-playfair text-base sm:text-lg font-semibold text-brand-indigo mb-2 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-brand-slate mb-3 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-brand-blue font-montserrat font-semibold text-xs sm:text-sm hover:underline"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Dots like the reference */}
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === selectedIndex ? "bg-brand-indigo w-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
