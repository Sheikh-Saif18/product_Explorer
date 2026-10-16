import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types/product';
import { mockProducts } from '../data/products';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to load products with loading and error states, simulating an async API call.
 */
export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate realistic API delay so loading skeletons and transitions are appreciated
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Successfully load products
      setProducts(mockProducts);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load products. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
