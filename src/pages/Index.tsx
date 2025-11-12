import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilters, FilterState } from "@/components/ProductFilters";
import { ProductBundles } from "@/components/ProductBundles";
import { ProductQuiz } from "@/components/ProductQuiz";

import { RecentlyViewed } from "@/components/RecentlyViewed";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { LiveChat } from "@/components/LiveChat";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { ShopByGoal } from "@/components/ShopByGoal";
import { QualityStandards } from "@/components/QualityStandards";
import { useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";

const Index = () => {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [chatOpen, setChatOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    sortBy: 'price-low-high',
    features: [],
    tags: [],
    availability: 'all',
  });

  // Fetch products to get available tags
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(50),
  });

  // Extract unique tags from all products
  const availableTags = useMemo(() => {
    if (!products) return [];
    const tags = new Set<string>();
    products.forEach(product => {
      product.node.tags.forEach(tag => {
        if (tag && tag.trim()) {
          tags.add(tag.trim());
        }
      });
    });
    return Array.from(tags).sort();
  }, [products]);

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      sortBy: 'featured',
      features: [],
      tags: [],
      availability: 'all',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ShopByGoal />
        <section id="products" className="py-12 md:py-16 px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {searchQuery ? 'Search Results' : 'Best Sellers'}
                </h2>
                {searchQuery && (
                  <p className="text-muted-foreground mt-1">
                    Showing results for "{searchQuery}"
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <ProductQuiz />
                {isMobile && (
                  <ProductFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClearFilters={handleClearFilters}
                    isMobile={true}
                    availableTags={availableTags}
                  />
                )}
              </div>
            </div>
            <div className="flex gap-8">
              {!isMobile && (
                <ProductFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                  isMobile={false}
                  availableTags={availableTags}
                />
              )}
              <div className="flex-1">
                <ProductGrid filters={filters} searchQuery={searchQuery} />
              </div>
            </div>
          </div>
        </section>
        <ProductBundles />
        <QualityStandards />
        <Testimonials />
        <RecentlyViewed />
      </main>
      <Footer />
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
