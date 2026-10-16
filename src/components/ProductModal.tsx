import React, { useEffect } from 'react';
import type { Product } from '../types/product';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";


export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all dark:bg-zinc-900 dark:border dark:border-zinc-800">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-zinc-500 backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
          aria-label="Close dialog"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto w-full bg-zinc-100 dark:bg-zinc-800">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== FALLBACK_IMAGE) {
                  target.src = FALLBACK_IMAGE;
                }
              }}
              className="h-full w-full object-cover"
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-800 backdrop-blur-md dark:bg-zinc-900/90 dark:text-zinc-200">
              {product.category}
            </span>
          </div>

          {/* Product Info */}
          <div className="flex flex-col p-6 sm:p-8">
            {product.rating && (
              <div className="mb-2 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center text-amber-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{product.rating.toFixed(1)}</span>
                {product.reviewsCount && <span>• {product.reviewsCount} verified reviews</span>}
              </div>
            )}

            <h2 id="modal-product-title" className="text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
              {product.name}
            </h2>

            <div className="mt-3 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {currencyFormatter.format(product.price)}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {product.description || "Designed with premium materials and cutting-edge engineering for reliable, everyday performance."}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  alert(`Added "${product.name}" to bag!`);
                  onClose();
                }}
                className="w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-700 active:scale-98 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl border border-zinc-200 py-2.5 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
