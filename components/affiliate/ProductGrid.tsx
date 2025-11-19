// @components/ProductGrid.tsx
'use client';

import React from 'react';
import ProductCard from './ProductCard';
import type { ProductWithDefaultVariant } from '@/types/product';

interface ProductGridProps {
  products: ProductWithDefaultVariant[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function ProductGrid({ 
  products, 
  isLoading, 
  hasMore, 
  onLoadMore 
}: ProductGridProps) {

  // (Toàn bộ logic state [useState] và logic 'handleLoadMore' đã bị xóa)

  return (
    <div>
      {/* Grid layout (Giờ đây lặp qua 'products' prop) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            defaultVariant={product.variants[0]} // Pass the first variant
          />
        ))}
      </div>

      {/* Hiển thị 'Loading...' khi đang fetch */}
      {isLoading && (
        <div className="mt-16 text-center text-gray-500">
          Loading...
        </div>
      )}

      {/* Hiển thị 'No results' nếu fetch xong và không có gì */}
      {!isLoading && products.length === 0 && (
        <div className="mt-16 text-center text-gray-500">
          No products found matching your filter.
        </div>
      )}

      {/* Nút "Load More" (Giờ đây dùng props từ cha) */}
      {hasMore && !isLoading && (
        <div className="mt-16 text-center">
          <button
            onClick={onLoadMore} // <-- Dùng prop
            disabled={isLoading} // <-- Dùng prop
            className="btn-secondary disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}