import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilters, FilterState } from "@/components/ProductFilters";
import { ProductBundles } from "@/components/ProductBundles";
import { ProductQuiz } from "@/components/ProductQuiz";
import { SocialProof } from "@/components/SocialProof";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { FeaturedIn } from "@/components/FeaturedIn";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { LiveChat } from "@/components/LiveChat";
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
        <FeaturedIn />
        <section id="products" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Best Sellers
              </h2>
              <div className="flex items-center gap-3">
                <ProductQuiz />
                {isMobile && (
                  <ProductFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClearFilters={handleClearFilters}
                    isMobile={true}
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
                />
              )}
              <div className="flex-1">
                <ProductGrid filters={filters} />
              </div>
            </div>
          </div>
        </section>
        <ProductBundles />
        <SocialProof />
        <RecentlyViewed />
        <Benefits />
      </main>
      <Footer />
      <LiveChat />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
