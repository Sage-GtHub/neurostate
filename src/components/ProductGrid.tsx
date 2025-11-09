import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductSkeleton";
import { useMemo } from "react";
import { FilterState } from "./ProductFilters";

interface ProductGridProps {
  filters?: FilterState;
  searchQuery?: string;
}

export const ProductGrid = ({ filters, searchQuery }: ProductGridProps) => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(50),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  });

  // Filter products based on filters and search query
  const filteredProducts = useMemo(() => {
    if (!products) return products;

    return products.filter(product => {
      const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
      const hasInStockVariant = product.node.variants.edges.some(v => v.node.availableForSale);
      
      // Search query filter
      if (searchQuery && searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const searchableText = (
          product.node.title + ' ' + 
          product.node.description + ' ' + 
          product.node.tags.join(' ')
        ).toLowerCase();
        
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Apply other filters only if they exist
      if (!filters) return true;
      
      // Price filter
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const productTags = product.node.tags.map(tag => tag.toLowerCase());
        const matchesTags = filters.tags.some(filterTag => 
          productTags.includes(filterTag.toLowerCase())
        );
        if (!matchesTags) return false;
      }

      // Availability filter
      if (filters.availability === 'in-stock' && !hasInStockVariant) {
        return false;
      }
      if (filters.availability === 'out-of-stock' && hasInStockVariant) {
        return false;
      }

      // Category filter (basic keyword matching in title/description)
      if (filters.categories.length > 0) {
        const productText = (product.node.title + ' ' + product.node.description).toLowerCase();
        const matchesCategory = filters.categories.some(category => {
          const keywords: Record<string, string[]> = {
            'supplements': ['supplement', 'omega', 'collagen', 'mineral', 'vitamin'],
            'recovery': ['recovery', 'red', 'light', 'therapy', 'restore'],
            'sleep': ['sleep', 'rest', 'night'],
            'cognitive': ['cognitive', 'brain', 'focus', 'neuro'],
          };
          return keywords[category]?.some(keyword => productText.includes(keyword));
        });
        if (!matchesCategory) return false;
      }

      return true;
    });
  }, [products, filters, searchQuery]);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found.</p>
        <p className="text-sm text-muted-foreground mt-2">
          {searchQuery 
            ? `No results for "${searchQuery}". Try a different search term.`
            : filters && (filters.categories.length > 0 || filters.features.length > 0 || filters.tags.length > 0 || filters.availability !== 'all')
            ? "Try adjusting your filters to see more products."
            : "Create your first product by telling me what you'd like to add!"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product.node.id} 
          product={product}
        />
      ))}
    </div>
  );
};
