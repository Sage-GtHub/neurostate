import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-20 xl:px-32 overflow-hidden bg-ivory"
      aria-label="Hero section"
    >
      <div className="w-full py-20 md:py-32">
        <div className="flex items-center justify-center">
          {/* Content */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 text-carbon leading-[0.9] uppercase">
              NEUROSTATE<sup className="text-2xl">®</sup>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-carbon mb-4 font-normal leading-tight">
              Precision tools for your
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-carbon mb-12 font-normal leading-tight">
              optimal state
            </p>
            <Button 
              size="lg" 
              className="bg-carbon text-ivory hover:bg-slate font-medium uppercase tracking-wider px-12 py-6 text-sm transition-all duration-300"
              onClick={scrollToProducts}
              aria-label="Scroll to products section"
            >
              Explore Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
