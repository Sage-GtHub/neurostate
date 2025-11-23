import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { LiveChat } from "@/components/LiveChat";

const categoryConfig = {
  recovery: {
    title: "Recovery",
    description: "Advanced red light therapy and recovery devices for optimal muscle repair and wellness.",
    tags: ["recovery", "red light therapy", "ice bath", "cold plunge", "sauna", "infrared", "PEMF"]
  },
  sleep: {
    title: "Sleep",
    description: "Sleep aid technologies and products designed to enhance sleep quality and restoration.",
    tags: ["sleep", "rest", "reishi", "magnesium", "melatonin"]
  },
  cognitive: {
    title: "Cognitive Performance",
    description: "Science-backed supplements and nootropics for enhanced focus, memory, and mental clarity.",
    tags: ["nootropic", "cognitive", "focus", "brain health", "mental clarity", "memory"]
  },
  performance: {
    title: "Performance",
    description: "Enhance athletic performance and endurance with cutting-edge supplements and recovery tools.",
    tags: ["performance", "athletic", "endurance", "energy", "pre-workout", "recovery"]
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

  // Filter products by category tags
  const filteredProducts = products?.filter(product => {
    const productTags = product.node.tags || [];
    return config?.tags.some(tag => 
      productTags.some(productTag => 
        productTag.toLowerCase().includes(tag.toLowerCase())
      )
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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-20 xl:px-32">
          <div className="w-full max-w-7xl mx-auto">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-8">
                <ArrowLeft className="mr-2 h-3 w-3" /> Back
              </Button>
            </Link>
            <p className="ghost-number mb-6">{category?.toUpperCase()}</p>
            <h1 className="mb-6">{config.title}</h1>
            <p className="text-body-large text-ash max-w-2xl">
              {config.description}
            </p>
          </div>
        </section>

        <section className="py-24 px-6 sm:px-8 lg:px-20 xl:px-32">
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
                <p className="text-ash text-lg">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 NeuroState®. All rights reserved.</p>
        </div>
      </footer>
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default CategoryProducts;
