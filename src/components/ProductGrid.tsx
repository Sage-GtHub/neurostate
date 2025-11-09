import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductSkeleton";
import { useState, useMemo } from "react";
import { QuickViewModal } from "./QuickViewModal";
import { ShopifyProduct } from "@/lib/shopify";
import { FilterState } from "./ProductFilters";

interface ProductGridProps {
  filters?: FilterState;
}

export const ProductGrid = ({ filters }: ProductGridProps) => {
  const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(50),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  });

  const handleQuickView = (product: ShopifyProduct) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  // Filter products based on filters
  const filteredProducts = useMemo(() => {
    if (!products || !filters) return products;

    return products.filter(product => {
      const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
      
      // Price filter
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
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
  }, [products, filters]);

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
          {filters && (filters.categories.length > 0 || filters.features.length > 0) 
            ? "Try adjusting your filters to see more products."
            : "Create your first product by telling me what you'd like to add!"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.node.id} 
            product={product}
            onQuickView={() => handleQuickView(product)}
          />
        ))}
      </div>
      <QuickViewModal 
        product={quickViewProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
};
