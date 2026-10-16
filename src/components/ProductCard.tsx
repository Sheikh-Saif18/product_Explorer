import React, { useState, useEffect } from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

// Fallback SVG data URL if product image fails to load
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const [imageSrc, setImageSrc] = useState<string>(product.image);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setImageSrc(product.image);
    setHasError(false);
    setImageLoaded(false);
  }, [product.image]);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <article
      onClick={() => onSelect?.(product)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800/60">
        {/* Placeholder skeleton while loading */}
        {!imageLoaded && !hasError && (
          <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
        )}

        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
            imageLoaded || hasError ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Category Badge */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-zinc-800 shadow-xs backdrop-blur-md dark:bg-zinc-900/90 dark:text-zinc-200">
            {product.category}
          </span>
        </div>

        {/* Popular Tag (if applicable) */}
        {product.isPopular && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-xs backdrop-blur-md">
              <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Popular
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Rating and Reviews (if provided) */}
        {product.rating && (
          <div className="mb-2 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center text-amber-500">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">{product.rating.toFixed(1)}</span>
            {product.reviewsCount && (
              <span>({product.reviewsCount.toLocaleString()})</span>
            )}
          </div>
        )}

        {/* Product Name (line clamped for long names) */}
        <h3
          className="line-clamp-2 text-base font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Short Description (if present) */}
        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
            {product.description}
          </p>
        )}

        {/* Footer: Price & Action */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
          <div>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 block">Price</span>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
              {currencyFormatter.format(product.price)}
            </span>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition-colors hover:bg-indigo-600 hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-indigo-600 dark:hover:text-white"
            title="View Details"
            aria-label={`View details for ${product.name}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};
