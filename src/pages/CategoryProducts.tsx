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
    tags: ["recovery", "red light therapy", "ice bath", "cold plunge"]
  },
  sleep: {
    title: "Sleep",
    description: "Sleep aid technologies and products designed to enhance sleep quality and restoration.",
    tags: ["sleep", "rest", "reishi", "magnesium"]
  },
  cognitive: {
    title: "Cognitive Performance",
    description: "Science-backed supplements and nootropics for enhanced focus, memory, and mental clarity.",
    tags: ["nootropic", "cognitive", "focus", "brain health"]
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
        <Header onAskAIClick={() => setChatOpen(true)} />
        <div className="container mx-auto px-4 py-12">
          <p className="text-destructive">Category not found</p>
        </div>
        <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAskAIClick={() => setChatOpen(true)} />
      <main>
        <section className="py-16 px-4 bg-secondary">
          <div className="container mx-auto">
            <Link to="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{config.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {config.description}
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">Failed to load products. Please try again later.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 NeuroState®. All rights reserved.</p>
        </div>
      </footer>
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default CategoryProducts;
