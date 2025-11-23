import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilters, FilterState } from "@/components/ProductFilters";
import { ProductBundles } from "@/components/ProductBundles";
import { ProductQuiz } from "@/components/ProductQuiz";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData } from "@/components/StructuredData";
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
    <>
      <SEO />
      <OrganizationStructuredData />
      <div className="min-h-screen bg-ivory">
        <Header />
        <main>
          <Hero />
          <ShopByGoal />
        <section id="products" className="py-24 md:py-32 px-6 sm:px-8 lg:px-20 xl:px-32">
          <div className="w-full">
            <div className="flex items-center justify-between mb-16 md:mb-20">
              <div>
                <p className="ghost-number mb-4">PRODUCT SYSTEMS</p>
                <h2 className="mb-4">
                  {searchQuery ? 'Search results' : 'Products'}
                </h2>
                {searchQuery && (
                  <p className="text-caption">
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
    </>
  );
};

export default Index;
