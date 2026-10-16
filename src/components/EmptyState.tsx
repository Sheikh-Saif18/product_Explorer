import React from 'react';

interface EmptyStateProps {
  onReset: () => void;
  searchQuery?: string;
  category?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onReset,
  searchQuery,
  category,
}) => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white/50 p-8 text-center backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
          />
        </svg>
      </div>

      <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-white">
        No products found
      </h3>

      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {searchQuery && category && category !== 'all' ? (
          <>
            No items matching <span className="font-semibold text-zinc-700 dark:text-zinc-200">"{searchQuery}"</span> in the <span className="font-semibold text-zinc-700 dark:text-zinc-200">{category}</span> category.
          </>
        ) : searchQuery ? (
          <>
            No items matching <span className="font-semibold text-zinc-700 dark:text-zinc-200">"{searchQuery}"</span>. Try checking for typos or searching for a broader term.
          </>
        ) : (
          'No products match the selected criteria. Try adjusting your filters.'
        )}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Clear all filters
        </button>
      </div>
    </div>
  );
};
