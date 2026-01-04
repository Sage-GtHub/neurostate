import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Shop = () => {
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const hero = useScrollAnimation();
  const grid = useScrollAnimation();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(50),
  });

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
    return 0;
  });

  const categories = [
    { value: "all", label: "All" },
    { value: "supplements", label: "Supplements" },
    { value: "devices", label: "Devices" },
    { value: "cognitive", label: "Cognitive" },
    { value: "sleep", label: "Sleep" },
    { value: "recovery", label: "Recovery" },
  ];

  return (
    <>
      <SEO 
        title="Shop Cognitive Performance Products | Supplements & Devices | NeuroState"
        description="Research-backed cognitive supplements and clinical-grade neuromodulation devices. Browse the biological optimisation components of the NeuroState cognitive system."
        keywords="cognitive supplements, nootropics UK, red light therapy devices, focus supplements, recovery supplements, neuromodulation devices, adaptogens, brain performance products"
      />
      <div className="min-h-screen bg-background mobile-nav-padding relative">
        {/* Organic background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-40 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
          <div className="absolute bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
        
        <Header />
        
        <main className="relative">
          {/* Hero - Minimal and airy */}
          <section 
            ref={hero.ref} 
            className={`pt-28 md:pt-36 pb-16 md:pb-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-6xl mx-auto">
              <Link to="/" className="inline-flex items-center gap-2 text-[11px] text-foreground/40 hover:text-foreground/60 transition-colors mb-10">
                <ArrowLeft className="w-3 h-3" />
                Back
              </Link>
              
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Shop</p>
                <h1 className="text-3xl md:text-4xl font-light text-foreground tracking-tight">
                  All Products
                </h1>
                <p className="text-sm text-foreground/50 max-w-md">
                  Research-backed supplements and clinical-grade neuromodulation devices.
                </p>
              </div>
            </div>
          </section>

          {/* Filters - Pill style */}
          <section className="px-6 md:px-12 lg:px-20 xl:px-32 pb-12">
            <div className="max-w-6xl mx-auto">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setFilterCategory(cat.value)}
                    className={`px-4 py-2 rounded-full text-[11px] transition-all duration-300 ${
                      filterCategory === cat.value
                        ? 'bg-foreground text-background'
                        : 'bg-foreground/[0.03] text-foreground/60 hover:bg-foreground/[0.06] hover:text-foreground'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              
              {/* Sort dropdown */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-[11px] text-foreground/40 hover:text-foreground/60 transition-colors"
                >
                  Sort by: {sortBy === "featured" ? "Featured" : sortBy === "price-asc" ? "Price ↑" : sortBy === "price-desc" ? "Price ↓" : "A-Z"}
                  <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {showFilters && (
                  <div className="flex gap-2">
                    {[
                      { value: "featured", label: "Featured" },
                      { value: "price-asc", label: "Price ↑" },
                      { value: "price-desc", label: "Price ↓" },
                      { value: "name", label: "A-Z" },
                    ].map((sort) => (
                      <button
                        key={sort.value}
                        onClick={() => { setSortBy(sort.value); setShowFilters(false); }}
                        className={`px-3 py-1.5 rounded-full text-[10px] transition-all ${
                          sortBy === sort.value
                            ? 'bg-foreground/10 text-foreground'
                            : 'text-foreground/40 hover:text-foreground/60'
                        }`}
                      >
                        {sort.label}
                      </button>
                    ))}
                  </div>
                )}
                
                <span className="ml-auto text-[10px] text-foreground/30">
                  {sortedProducts.length} products
                </span>
              </div>
            </div>
          </section>

          {/* Products Grid - Organic flow */}
          <section 
            ref={grid.ref}
            className={`pb-24 md:pb-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${grid.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <ProductGridSkeleton />
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-sm text-foreground/40">Failed to load products. Please try again.</p>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-sm text-foreground/40">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {sortedProducts.map((product, i) => (
                    <div 
                      key={product.node.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Shop;
