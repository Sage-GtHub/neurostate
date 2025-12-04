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
        description="Curated supplement bundles designed for sleep optimisation, recovery enhancement, and cognitive performance. Save on complete performance stacks."
      />
      <div className="min-h-screen bg-background mobile-nav-padding">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white">
            <div className="max-w-7xl mx-auto text-center">
              <div className="space-y-6 sm:space-y-8">
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Curated Stacks</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-carbon leading-[1.1]">
                  Performance
                  <br />
                  <span className="font-normal">bundles</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-ash leading-relaxed max-w-3xl mx-auto">
                  Complete supplement stacks designed for specific performance goals. 
                  Save time, save money, and get exactly what you need.
                </p>
              </div>
            </div>
          </section>

          {/* Bundles Grid */}
          <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <ProductBundles />
          </div>

          {/* Benefits Section */}
          <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 sm:mb-20 space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-carbon leading-[1.1]">
                  Why choose
                  <br />
                  <span className="font-normal">bundles</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
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
                    className="p-12 hover:bg-white/60 transition-all duration-500"
                  >
                    <h3 className="text-xl font-light text-carbon mb-4">{benefit.title}</h3>
                    <p className="text-ash text-sm leading-relaxed">{benefit.description}</p>
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
