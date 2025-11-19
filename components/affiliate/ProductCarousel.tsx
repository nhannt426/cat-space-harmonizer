// @components/ProductCarousel.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Variant, Product, ProductWithDefaultVariant } from '@/types/product';

// Updated Props interface
interface ProductCarouselProps {
  products: ProductWithDefaultVariant[]; // <<< CHANGED: Expects new shape
  viewAllHref: string;
  slideClassName: string; 
}
// === END NEW TYPES ===

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  products, 
  viewAllHref, 
  slideClassName 
}) => {
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
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex-nowrap">
          {products.map((product) => (
            // Dynamic slide width based on the prop
            <div 
              // <<< CHANGED: Apply the class string directly
              className={`flex-shrink-0 embla__slide relative ${slideClassName}`}
              key={product.id}
            >
              <div className="pl-4">
                {/* === FIX IS HERE: Pass both props === */}
                <ProductCard 
                  product={product} 
                  defaultVariant={product.variants[0]} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation (with View All) - HIDE ON DESKTOP */}
      <div className="flex flex-col items-center gap-4 mt-8 lg:hidden">
        <div className="flex justify-center items-center gap-4">
          <button 
            onClick={scrollPrev} 
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 subtle-lift"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          
          <span className="text-sm font-light text-gray-700 w-12 text-center">
            {currentSlide + 1} / {products.length}
          </span>

          <button 
            onClick={scrollNext} 
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 subtle-lift"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <div>
          <Link 
            href={viewAllHref} 
            className="text-sm font-semibold text-gray-900 hover:underline"
          >
            View All <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;