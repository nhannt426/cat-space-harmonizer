// @components/BestSellerCard.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import SaleBadge from './SaleBadge';
import EcoBadge from './EcoBadge'; // Import EcoBadge
import type { Product, Variant } from '@/types/product';



// The component now receives a Product and its default Variant
export default function ProductCard({ 
  product, 
  defaultVariant 
}: { 
  product: Product;
  defaultVariant: Variant; 
}) {
  
  // Logic now reads from the variant
  const isOnSale = defaultVariant.compare_at_price && defaultVariant.compare_at_price > defaultVariant.price;
  const isEco = product.is_eco_friendly;

  return (
    <Link href={`/products/${product.slug}`} className="group block text-center">
      <div className="relative overflow-hidden">
        {isOnSale && (
          <SaleBadge label="SALE" />
        )}
        {isEco && (
          <EcoBadge label="ECO" />
        )}
        
        {/* Images now come from the variant */}
        <img
          src={defaultVariant.image_url}
          alt={product.name}
          className="w-full h-auto object-cover aspect-square transition-all duration-300 ease-in-out group-hover:-translate-y-2"
        />
        {defaultVariant.secondary_image_url && (
          <img
            src={defaultVariant.secondary_image_url}
            alt={`${product.name} (hover)`}
            className="w-full h-auto object-cover aspect-square absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out group-hover:-translate-y-2"
          />
        )}
      </div>
      <div className="mt-4">
        {/* Name comes from the product */}
        <h3 className="text-sm font-light text-gray-900 group-hover:underline uppercase tracking-wider">
          {product.name}
        </h3>
        {/* Price comes from the variant */}
        <div className="mt-2 flex justify-center items-baseline gap-2">
          {isOnSale && (
            <p className="text-sm font-light text-gray-500 line-through">
              ${defaultVariant.compare_at_price?.toFixed(2)}
            </p>
          )}
          <p className="text-lg font-semibold text-gray-900">${defaultVariant.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}