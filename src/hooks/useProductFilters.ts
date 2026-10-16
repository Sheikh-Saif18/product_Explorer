import { useState, useMemo, useCallback } from 'react';
import type { Product, SortOrder } from '../types/product';
import { useDebounce } from './useDebounce';

interface UseProductFiltersReturn {
  filtered: Product[];
  categories: string[];
  search: string;
  setSearch: (search: string) => void;
  debouncedSearch: string;
  category: string;
  setCategory: (category: string) => void;
  sort: SortOrder;
  setSort: (sort: SortOrder) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

/**
 * Filter and sort pipeline hook for products.
 * Handles debounced name search, category filter, and price sorting.
 */
export function useProductFilters(products: Product[]): UseProductFiltersReturn {
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<SortOrder>('none');

  // Debounce search input by 300ms to avoid unnecessary recalculations while typing
  const debouncedSearch = useDebounce(search, 300);

  // Derive dynamic list of categories with 'all' as first element
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ['all', ...unique];
  }, [products]);

  // Combined pipeline: Search -> Category -> Sort
  const filtered = useMemo(() => {
    const normalizedQuery = debouncedSearch.trim().toLowerCase();

    let result = products.filter((p) =>
      p.name.toLowerCase().includes(normalizedQuery)
    );

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price || a.id - b.id);
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price || a.id - b.id);
    }

    return result;
  }, [products, debouncedSearch, category, sort]);

  const resetFilters = useCallback(() => {
    setSearch('');
    setCategory('all');
    setSort('none');
  }, []);

  const hasActiveFilters = search.trim() !== '' || category !== 'all' || sort !== 'none';

  return {
    filtered,
    categories,
    search,
    setSearch,
    debouncedSearch,
    category,
    setCategory,
    sort,
    setSort,
    resetFilters,
    hasActiveFilters,
  };
}
