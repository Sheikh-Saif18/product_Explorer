import React from 'react';

interface LoaderProps {
  count?: number;
}

export const Loader: React.FC<LoaderProps> = ({ count = 8 }) => {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="status"
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white p-0 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
        >
          {/* Skeleton Image */}
          <div className="aspect-4/3 w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />

          {/* Skeleton Body */}
          <div className="flex flex-1 flex-col p-4 sm:p-5">
            {/* Rating Skeleton */}
            <div className="mb-3 h-3 w-20 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />

            {/* Title Skeleton */}
            <div className="h-4 w-4/5 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-2 h-4 w-2/3 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />

            {/* Price & Action Skeleton */}
            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <div className="space-y-1">
                <div className="h-2.5 w-10 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-5 w-16 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <div className="h-9 w-9 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
