# 🛍️ Product Explorer

A modern, responsive, and performant product catalog explorer built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## ✨ Features

- **📱 Fully Responsive Grid Layout**:
  - 1 column on mobile (`grid-cols-1`)
  - 2 columns on tablets (`sm:grid-cols-2`)
  - 3 columns on desktops (`lg:grid-cols-3`)
  - 4 columns on large monitors (`xl:grid-cols-4`)
- **🔍 Real-Time Debounced Search**:
  - 300ms debounce prevents unnecessary re-renders while typing.
  - Case-insensitive search with automatic whitespace trimming.
  - One-click clear search button (`X`).
- **🏷️ Dynamic Category Filtering**:
  - Dynamically extracted from catalog data (`All Products`, `Audio`, `Wearables`, `Accessories`, `Electronics`, `Home`).
  - Category tabs with real-time product counts.
- **↕️ Price Sorting**:
  - Low to High (`price-asc`)
  - High to Low (`price-desc`)
  - Featured/Default (`none`) with deterministic tie-breaking.
- **🎨 Visual Excellence & Aesthetics**:
  - Dark mode and light mode with persistent toggle and system preference detection.
  - Lazy image loading (`loading="lazy"`) with fallback placeholder for missing or broken images.
  - Price formatting using standard `Intl.NumberFormat` in USD.
  - Multi-line name clamping (`line-clamp-2`).
  - Interactive product quick-view modal on card click with keyboard Escape support.
- **📭 Empty State & Error Handling**:
  - Context-aware empty state with "Clear all filters" action.
  - Realistic loading state with skeleton cards.
  - Error state with retry action.
- **🔗 URL Parameter Synchronization**:
  - Search query, category, and sort selections sync to URL search params (`?q=...&category=...&sort=...`).

---

## 📂 Project Architecture

```
src/
├── components/
│   ├── ProductCard.tsx       # Product card with image, badges, ratings & formatted price
│   ├── ProductGrid.tsx       # Responsive multi-breakpoint grid
│   ├── SearchBar.tsx         # Accessible search input with debouncing & clear button
│   ├── CategoryFilter.tsx    # Scrollable category pills with count badges
│   ├── SortSelect.tsx        # Price sorting select dropdown
│   ├── EmptyState.tsx        # Empty state display with reset button
│   ├── Loader.tsx            # Skeleton loaders matching grid layout
│   ├── ErrorMessage.tsx      # Friendly error state with retry action
│   └── ProductModal.tsx       # Interactive product quick view modal
├── hooks/
│   ├── useProducts.ts        # Async product fetching with loading and error states
│   ├── useDebounce.ts        # Reusable generic debounce hook
│   └── useProductFilters.ts  # Filtering & sorting pipeline (Search -> Category -> Sort)
├── types/
│   └── product.ts            # TypeScript interfaces (Product, SortOrder, FilterState)
├── data/
│   └── products.ts           # Curated catalog of mock products
├── App.tsx                   # Main layout and state integration
├── index.css                 # Tailwind CSS v4 directives and typography
└── main.tsx                  # React application entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (TypeScript check & Vite bundle)
npm run build
```

Open [http://localhost:5174](http://localhost:5174) in your browser.
