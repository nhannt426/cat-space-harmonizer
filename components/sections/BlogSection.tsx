// @components/BlogSection.tsx
'use client'; // <<< MUST BE A CLIENT COMPONENT

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
// Import Embla
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
// Import Nav Icons
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data (Unchanged)
const blogPosts = [
  {
    slug: "history-of-this-is-fine-dog",
    imageUrl: "https://placehold.co/1600x900/f0f0f0/333?text=This+is+Fine",
    title: "A Brief History of the \"This is Fine\" Dog",
    description: "From a 2013 webcomic to the official mascot of... well, everything. We dive into the lore of an icon."
  },
  {
    slug: "top-5-memes-this-month",
    imageUrl: "https://placehold.co/1600x900/f0f0f0/333?text=Top+Memes",
    title: "The Top 5 Memes That Broke The Internet This Month",
    description: "Our official, highly-debatable ranking of what's currently living rent-free in our heads (and on our tees)."
  },
  {
    slug: "why-we-quote-the-office",
    imageUrl: "https://placehold.co/1600x900/f0f0f0/333?text=TV+Memes",
    title: "Why We Can't Stop Quoting 'The Office'",
    description: "Exploring how a 20-year-old sitcom became the blueprint for sarcasm & text-based apparel."
  },
  {
    slug: "art-of-gifting-a-meme",
    imageUrl: "https://placehold.co/1600x900/f0f0f0/333?text=Gifting+Memes",
    title: "The Art of Gifting a Meme: A How-To Guide",
    description: "How to pick the perfect meme tee that says \"I get you\" without being totally cringe. A guide for your normie friends."
  }
];

export default function BlogSection() {
  // Embla setup (copied from ReviewCarousel)
  const options: EmblaOptionsType = { 
    loop: true, 
    align: 'start', 
    containScroll: 'trimSnaps' 
  };
  
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect) };
  }, [emblaApi]);

  return (
    <section className="bg-white py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-2xl font-thin text-center uppercase tracking-widest text-gray-900 mb-12">
          INSIDE JOKES
        </h2>

        {/* === Embla Carousel Wrapper === */}
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex-nowrap">

              {blogPosts.map((post) => (
                // Slide settings (100% mobile, 50% tablet, 33.33% desktop)
                <div 
                  className="flex-shrink-0 embla__slide relative flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%]" 
                  key={post.slug}
                >
                  {/* Spacing wrapper */}
                  <div className="pl-4 h-full">
                    {/* The original Blog Card (with h-full) */}
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-auto object-cover aspect-[16/9] subtle-lift" 
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:underline">{post.title}</h3>
                        <p className="mt-2 text-sm font-light text-gray-600 line-clamp-2">{post.description}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation (copied from ReviewCarousel) */}
          <div className="flex justify-center items-center gap-4 mt-8 lg:hidden">
            <button 
              onClick={scrollPrev} 
              className="p-2 rounded-full text-gray-500 hover:text-gray-900 subtle-lift"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            
            <span className="text-sm font-light text-gray-700 w-12 text-center">
              {currentSlide + 1} / {blogPosts.length}
            </span>

            <button 
              onClick={scrollNext} 
              className="p-2 rounded-full text-gray-500 hover:text-gray-900 subtle-lift"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* "View All" Button (Unchanged, remains outside carousel) */}
        <div className="mt-16 text-center">
          <Link href="/blog" className="btn-secondary">
            View All Posts
          </Link>
        </div>

      </div>
    </section>
  );
}