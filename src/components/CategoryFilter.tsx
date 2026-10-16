import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
  productCounts?: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selected,
  onChange,
  productCounts,
}) => {
  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none sm:pb-0" role="tablist" aria-label="Product categories">
      {categories.map((cat) => {
        const isSelected = selected === cat;
        const count = productCounts ? productCounts[cat] : undefined;
        const displayName = cat === 'all' ? 'All Products' : cat;

        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(cat)}
            className={`group inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
              isSelected
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700/80 dark:hover:text-white'
            }`}
          >
            <span>{displayName}</span>
            {count !== undefined && (
              <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-zinc-200/80 text-zinc-600 group-hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
