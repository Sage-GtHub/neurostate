import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";
import { SEO } from "@/components/SEO";

const Shop = () => {
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");

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

  return (
    <>
      <SEO 
        title="Shop | Cognitive Performance Products | Neurostate"
        description="Browse the biological optimisation components of the Neurostate cognitive system. Research-backed formulas and neuromodulation devices for peak cognitive performance."
      />
      <div className="min-h-screen bg-background mobile-nav-padding">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 lg:px-20 xl:px-32 border-b border-border">
            <div className="max-w-6xl mx-auto">
              <Link to="/">
                <Button variant="ghost" size="sm" className="mb-8 -ml-3">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </Link>
              <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium mb-4">Shop</p>
              <h1 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight mb-4">
                All Products
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Research-backed supplements and clinical-grade neuromodulation devices.
              </p>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 px-6 md:px-12 lg:px-20 xl:px-32 border-b border-border">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Category</label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Products" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="supplements">Supplements</SelectItem>
                    <SelectItem value="devices">Devices</SelectItem>
                    <SelectItem value="recovery">Recovery</SelectItem>
                    <SelectItem value="sleep">Sleep</SelectItem>
                    <SelectItem value="cognitive">Cognitive</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
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

          {/* Products Grid */}
          <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <ProductGridSkeleton />
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-destructive">Failed to load products. Please try again later.</p>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.node.id} product={product} />
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
