import React, { useState, useEffect, useMemo } from 'react';
import { useProducts } from './hooks/useProducts';
import { useProductFilters } from './hooks/useProductFilters';
import type { Product, SortOrder } from './types/product';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { SortSelect } from './components/SortSelect';
import { ProductGrid } from './components/ProductGrid';
import { EmptyState } from './components/EmptyState';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { ProductModal } from './components/ProductModal';

export const App: React.FC = () => {
  const { products, loading, error, refetch } = useProducts();
  const {
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
  } = useProductFilters(products);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Synchronize Dark Mode with html class and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Read URL query params on initial mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlQuery = params.get('q');
      const urlCategory = params.get('category');
      const urlSort = params.get('sort');

      if (urlQuery) setSearch(urlQuery);
      if (urlCategory) setCategory(urlCategory);
      if (urlSort === 'price-asc' || urlSort === 'price-desc') setSort(urlSort as SortOrder);
    } catch {
      // Ignore if URLSearchParams is not supported or blocked
    }
  }, [setSearch, setCategory, setSort]);

  // Sync state back to URL query parameters
  useEffect(() => {
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('q', search.trim());
      if (category !== 'all') params.set('category', category);
      if (sort !== 'none') params.set('sort', sort);

      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    } catch {
      // Ignore in environments where history API might be restricted
    }
  }, [search, category, sort]);

  // Calculate product counts per category for the category pills
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: products.length,
    };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
                Product Explorer
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
                Curated electronics, audio & everyday gear
              </p>
            </div>
          </div>

          {/* Right Header Controls: Dark Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-xs transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                /* Sun Icon */
                <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                /* Moon Icon */
                <svg className="h-5 w-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent p-6 sm:p-10 border border-indigo-100/60 dark:border-indigo-950/40">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping" />
              Live Catalog
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Discover Quality Gear for Work & Life
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              Search by name, filter by category, and sort prices from low to high. Find exactly what you need with instant, responsive filtering.
            </p>
          </div>
        </div>

        {/* Filter and Search Controls Bar */}
        <section aria-label="Product Search and Filters" className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="w-full md:max-w-md">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search products by name (e.g., Sony, Watch)..."
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                Sort:
              </span>
              <SortSelect value={sort} onChange={setSort} />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <CategoryFilter
              categories={categories}
              selected={category}
              onChange={setCategory}
              productCounts={productCounts}
            />
          </div>

          {/* Active Filter Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200/70 pt-4 dark:border-zinc-800/70">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {loading ? 'Loading...' : `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}`}
              </span>
              {!loading && (
                <span>
                  found {category !== 'all' && `in ${category}`}
                  {debouncedSearch && ` for "${debouncedSearch}"`}
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reset all filters
              </button>
            )}
          </div>
        </section>

        {/* Content Section: Loader, Error, Empty State, or Grid */}
        <section aria-label="Product Results">
          {loading ? (
            <Loader count={8} />
          ) : error ? (
            <ErrorMessage message={error} onRetry={refetch} />
          ) : filtered.length === 0 ? (
            <EmptyState
              searchQuery={debouncedSearch}
              category={category}
              onReset={resetFilters}
            />
          ) : (
            <ProductGrid
              products={filtered}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          )}
        </section>
      </main>

      {/* Product Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-zinc-200/80 bg-white/50 py-8 text-center text-xs text-zinc-500 backdrop-blur-xs dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Product Explorer. Built with React, TypeScript & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              API Status: Ready
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
