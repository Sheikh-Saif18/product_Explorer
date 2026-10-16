export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  rating?: number;
  reviewsCount?: number;
  isPopular?: boolean;
}

export type SortOrder = "none" | "price-asc" | "price-desc";

export interface FilterState {
  search: string;
  category: string; // "all" or category name
  sort: SortOrder;
}
