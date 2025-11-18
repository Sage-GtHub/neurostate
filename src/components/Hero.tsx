import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/lions-mane-mushroom.png";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center px-6 sm:px-8 lg:px-20 xl:px-32 overflow-hidden bg-background"
      aria-label="Hero section"
    >
      <div className="w-full py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-left max-w-3xl">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light mb-8 text-foreground leading-[0.9] tracking-tighter uppercase">
              NEUROSTATE<sup className="text-2xl">®</sup>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-foreground mb-4 font-light leading-tight">
              Redefining Recovery
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-foreground mb-12 font-light leading-tight">
              And Performance
            </p>
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 font-normal uppercase tracking-wider px-12 py-6 text-sm transition-all duration-300"
              onClick={scrollToProducts}
              aria-label="Scroll to products section"
            >
              Explore Products
            </Button>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end items-center relative">
            <div className="relative w-full max-w-md lg:max-w-lg opacity-70">
              <img 
                src={heroImage} 
                alt="Premium cognitive enhancement supplement from NeuroState"
                className="w-full h-auto object-contain"
                loading="eager"
                width="600"
                height="800"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
