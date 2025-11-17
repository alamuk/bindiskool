'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay';
import type { EmblaOptionsType } from 'embla-carousel'; // 👈 correct import
import Link from 'next/link';
import type { BlogPost } from '@shared/schema';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type BlogCarouselProps = {
  title?: string;
  posts: BlogPost[];
  options?: EmblaOptionsType;
};

export function BlogCarousel({
  title = 'Recent Posts',
  posts,
  options,
}: BlogCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      ...options,
    },
    // [
    //   Autoplay({
    //     delay: 5000,
    //     stopOnInteraction: true,
    //   }),
    // ]
  );

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
    emblaApi.on('select', onSelect);
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-brand-indigo">
          {title}
        </h2>
      </div>

      <div className="relative">
        {/* Prev / Next buttons */}
        <button
          type="button"
          aria-label="Previous posts"
          onClick={scrollPrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Next posts"
          onClick={scrollNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Embla viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {posts.map((post) => {
              const formattedDate = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : '';

              return (
                <article
                  key={post.id}
                  className="min-w-0 flex-[0_0_90%] sm:flex-[0_0_60%] lg:flex-[0_0_33%] pr-4"
                >
                  <div className="bg-white rounded-xl shadow-sm hover-lift overflow-hidden h-full flex flex-col">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="aspect-video w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-video w-full bg-gradient-brand" />
                    )}

                    <div className="p-4 flex flex-col flex-1">
                      <div className="text-xs text-brand-slate mb-1">
                        {formattedDate}
                      </div>

                      <h3 className="font-playfair text-lg font-semibold text-brand-indigo mb-2 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-brand-slate mb-3 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-brand-blue font-montserrat font-semibold text-sm hover:underline"
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

        {/* dots */}
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-brand-indigo w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

