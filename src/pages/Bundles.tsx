import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";
import { ProductBundles } from "@/components/ProductBundles";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Bundles = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <>
      <SEO 
        title="Product Bundles | NeuroState"
        description="Curated supplement bundles designed for sleep optimisation, recovery enhancement, and cognitive performance."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-background">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-medium">Curated Stacks</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground leading-[1.02]">
                Performance bundles
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete supplement stacks designed for specific performance goals. 
                Save time, save money, and get exactly what you need.
              </p>
            </div>
          </section>

          {/* Bundles Grid */}
          <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <ProductBundles />
          </div>

          {/* Benefits Section */}
          <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-muted">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-medium">Benefits</p>
                <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
                  Why choose bundles
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
                {[
                  {
                    title: "Save money",
                    description: "Get up to 20% off compared to buying products individually."
                  },
                  {
                    title: "Expert curation",
                    description: "Stacks designed by performance scientists and backed by research."
                  },
                  {
                    title: "Simplified approach",
                    description: "No guesswork—everything you need for your goal in one package."
                  }
                ].map((benefit, i) => (
                  <div 
                    key={i}
                    className="p-10 bg-background hover:bg-muted transition-all duration-300"
                  >
                    <h3 className="text-lg font-medium text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      </div>
    </>
  );
};

export default Bundles;
