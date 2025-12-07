import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { LiveChat } from "@/components/LiveChat";
import { SEO } from "@/components/SEO";

const categoryConfig: Record<string, {
  title: string;
  description: string;
  tags: string[];
  excludeTypes?: string[];
}> = {
  supplements: {
    title: "Supplements",
    description: "Premium, science-backed supplements for peak performance, recovery, and cognitive enhancement.",
    tags: ["supplement", "supplements", "adaptogen", "stress", "cognitive", "focus", "performance", "protein", "collagen", "mineral", "trace", "electrolyte", "creatine", "magnesium", "omega", "marine", "whey", "ashwagandha", "rhodiola", "lion", "melatonin", "theanine", "valerian", "complex", "formula"],
    excludeTypes: ["device", "technology", "recovery device", "red-light", "therapy device"]
  },
  devices: {
    title: "Recovery Devices",
    description: "Clinical-grade recovery devices engineered for optimal muscle repair, reduced inflammation, and accelerated healing.",
    tags: ["device", "technology", "recovery", "recovery technology", "red-light", "red light", "LED", "therapy", "light therapy", "photobiomodulation", "PBM", "ice bath", "cold", "plunge", "cryotherapy", "sauna", "infrared", "PEMF", "electromagnetic", "blanket", "mask", "panel", "face", "cryo", "mini", "pro", "restore", "redrestore", "cryoplunge"],
    excludeTypes: ["supplement", "supplements", "adaptogen", "protein", "collagen powder", "vitamin", "mineral supplement", "nootropic"]
  },
  recovery: {
    title: "Recovery",
    description: "Advanced red light therapy and recovery devices for optimal muscle repair and wellness.",
    tags: ["recovery", "recovery technology", "red-light", "red light", "LED", "therapy", "light", "light therapy", "ice bath", "cold plunge", "sauna", "infrared", "PEMF", "restore", "cryo"]
  },
  sleep: {
    title: "Sleep",
    description: "Sleep aid technologies and products designed to enhance sleep quality and restoration.",
    tags: ["sleep", "rest", "night", "melatonin", "valerian", "magnesium", "restore", "formula"]
  },
  cognitive: {
    title: "Cognitive Performance",
    description: "Science-backed supplements and nootropics for enhanced focus, memory, and mental clarity.",
    tags: ["cognitive", "focus", "neuro", "brain", "mental", "clarity", "memory", "lion", "theanine", "adaptogen", "complex"]
  },
  performance: {
    title: "Performance",
    description: "Enhance athletic performance and endurance with cutting-edge supplements and recovery tools.",
    tags: ["performance", "athletic", "endurance", "energy", "creatine", "protein", "electrolyte", "recovery", "omega", "complex"]
  },
  redlight: {
    title: "Red Light Therapy",
    description: "Clinical-grade red light therapy devices for enhanced recovery, skin health, and cellular regeneration.",
    tags: ["red-light", "red light", "LED", "therapy", "light therapy", "photobiomodulation", "PBM", "restore", "blanket", "panel", "mask", "face", "mini", "pro", "recovery"]
  }
};

const CategoryProducts = () => {
  const { category } = useParams<{ category: string }>();
  const config = categoryConfig[category as keyof typeof categoryConfig];
  const [chatOpen, setChatOpen] = useState(false);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(50),
  });

  // Filter products by category tags and product type
  const filteredProducts = products?.filter(product => {
    const productTags = product.node.tags || [];
    const productType = product.node.productType?.toLowerCase() || '';
    
    // Check if product type should be excluded (for supplements category)
    if (config?.excludeTypes) {
      const isExcluded = config.excludeTypes.some(excludeType => 
        productType.includes(excludeType.toLowerCase()) ||
        productTags.some(tag => tag.toLowerCase().includes(excludeType.toLowerCase()))
      );
      if (isExcluded) return false;
    }
    
    return config?.tags.some(tag => 
      productTags.some(productTag => 
        productTag.toLowerCase().includes(tag.toLowerCase()) ||
        tag.toLowerCase().includes(productTag.toLowerCase())
      ) ||
      productType.includes(tag.toLowerCase()) ||
      tag.toLowerCase().includes(productType)
    );
  }) || [];

  if (!config) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-12">
          <p className="text-destructive">Category not found</p>
        </div>
        <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${config.title} | NeuroState`}
        description={config.description}
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
            <p className="ghost-number mb-3 sm:mb-4 md:mb-6">{category?.toUpperCase()}</p>
            <h1 className="mb-4 sm:mb-6">{config.title}</h1>
            <p className="text-body-large text-ash max-w-2xl">
              {config.description}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
          <div className="w-full max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-carbon" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">Failed to load products. Please try again later.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-ash text-base sm:text-lg">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
                {filteredProducts.map((product) => (
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

export default CategoryProducts;
