import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { LiveChat } from "@/components/LiveChat";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";
import { SEO } from "@/components/SEO";

const Shop = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(50),
  });

  // Filter products by category
  const filteredProducts = products?.filter(product => {
    if (filterCategory === "all") return true;
    
    const productTags = product.node.tags || [];
    const productType = product.node.productType?.toLowerCase() || '';
    
    if (filterCategory === "supplements") {
      return productTags.some(tag => 
        tag.toLowerCase().includes("supplement") || 
        tag.toLowerCase().includes("adaptogen") ||
        tag.toLowerCase().includes("complex")
      ) || productType.includes("supplement");
    }
    
    if (filterCategory === "devices") {
      return productTags.some(tag => 
        tag.toLowerCase().includes("red-light") ||
        tag.toLowerCase().includes("red light") ||
        tag.toLowerCase().includes("device") ||
        tag.toLowerCase().includes("therapy")
      ) || productType.includes("device");
    }
    
    if (filterCategory === "recovery") {
      return productTags.some(tag => 
        tag.toLowerCase().includes("recovery") ||
        tag.toLowerCase().includes("restore")
      );
    }
    
    if (filterCategory === "sleep") {
      return productTags.some(tag => 
        tag.toLowerCase().includes("sleep") ||
        tag.toLowerCase().includes("night") ||
        tag.toLowerCase().includes("melatonin")
      );
    }
    
    if (filterCategory === "cognitive") {
      return productTags.some(tag => 
        tag.toLowerCase().includes("cognitive") ||
        tag.toLowerCase().includes("neuro") ||
        tag.toLowerCase().includes("focus")
      );
    }
    
    if (filterCategory === "performance") {
      return productTags.some(tag => 
        tag.toLowerCase().includes("performance") ||
        tag.toLowerCase().includes("energy") ||
        tag.toLowerCase().includes("creatine")
      );
    }
    
    return true;
  }) || [];

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") {
      return parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount);
    }
    if (sortBy === "price-desc") {
      return parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount);
    }
    if (sortBy === "name") {
      return a.node.title.localeCompare(b.node.title);
    }
    return 0; // featured - keep original order
  });

  return (
    <>
      <SEO 
        title="Shop Performance Supplements and Recovery Devices | NeuroState"
        description="Browse our complete range of adaptogen supplements for focus, red light therapy devices, and cognitive performance products. Evidence-based formulas for mental performance."
      />
      <div className="min-h-screen bg-background mobile-nav-padding">
        <Header />
      <main>
        <section className="pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
          <div className="w-full max-w-7xl mx-auto">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-6 sm:mb-8 -ml-3 min-h-[44px] touch-manipulation">
                <ArrowLeft className="mr-2 h-3 w-3" /> Back
              </Button>
            </Link>
            <p className="ghost-number mb-3 sm:mb-4 md:mb-6">SHOP</p>
            <h1 className="mb-4 sm:mb-6">All Products</h1>
            <p className="text-body-large text-ash max-w-2xl">
              Discover our complete range of science-backed <Link to="/category/supplements" className="text-signal-green hover:underline">supplements</Link> and clinical-grade <Link to="/category/devices" className="text-signal-green hover:underline">recovery devices</Link>.
            </p>
          </div>
        </section>

        {/* Filters and Sort */}
        <section className="pb-8 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
          <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <label className="text-caption text-stone mb-2 block">Filter by Category</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full min-h-[44px]">
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="supplements">Supplements</SelectItem>
                  <SelectItem value="devices">Recovery Devices</SelectItem>
                  <SelectItem value="recovery">Recovery</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="cognitive">Cognitive</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-caption text-stone mb-2 block">Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full min-h-[44px]">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
          <div className="w-full max-w-7xl mx-auto">
            {isLoading ? (
              <ProductGridSkeleton />
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">Failed to load products. Please try again later.</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-ash text-base sm:text-lg">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 border-t border-mist">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="text-caption">© 2025 NeuroState®. All rights reserved.</p>
        </div>
      </footer>
        <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      </div>
    </>
  );
};

export default Shop;
