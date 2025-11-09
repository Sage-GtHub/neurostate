import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Benefits } from "@/components/Benefits";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilters, FilterState } from "@/components/ProductFilters";
import { SocialProof } from "@/components/SocialProof";
import { ProductComparison } from "@/components/ProductComparison";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    features: [],
  });

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      features: [],
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <section id="products" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Best Sellers
              </h2>
              {isMobile && (
                <ProductFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                  isMobile={true}
                />
              )}
            </div>
            <div className="flex gap-8">
              {!isMobile && (
                <ProductFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                  isMobile={false}
                />
              )}
              <div className="flex-1">
                <ProductGrid filters={filters} />
              </div>
            </div>
          </div>
        </section>
        <SocialProof />
        <ProductComparison />
        <RecentlyViewed />
        <Benefits />
      </main>
      <Footer />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
