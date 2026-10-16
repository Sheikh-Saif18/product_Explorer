import React from 'react';
import type { SortOrder } from '../types/product';

interface SortSelectProps {
  value: SortOrder;
  onChange: (sort: SortOrder) => void;
  id?: string;
}

export const SortSelect: React.FC<SortSelectProps> = ({
  value,
  onChange,
  id = 'product-sort-select',
}) => {
  return (
    <div className="relative inline-flex min-w-[200px] items-center">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      </div>

      <select
        id={id}
        name="sort-order"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOrder)}
        className="w-full appearance-none rounded-xl border border-zinc-200 bg-white/90 py-2.5 pl-9 pr-10 text-sm font-medium text-zinc-800 shadow-xs backdrop-blur-sm transition-all duration-200 hover:border-zinc-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:border-zinc-700 dark:focus:border-indigo-400"
        aria-label="Sort products by price"
      >
        <option value="none">Featured (Default)</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>

      {/* Custom Chevron Indicator */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 dark:text-zinc-500">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
