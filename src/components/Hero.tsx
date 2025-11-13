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
      className="relative min-h-[60vh] md:min-h-[75vh] lg:min-h-[85vh] flex items-center px-6 sm:px-8 lg:px-20 xl:px-32 overflow-hidden bg-[hsl(var(--hero-bg))]"
      aria-label="Hero section"
    >
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Content - centered and minimal */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 py-12 md:py-16 lg:py-20">
            <p className="text-sm font-medium text-muted-foreground mb-6 tracking-[0.2em] uppercase">
              Science-Backed Wellness
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 md:mb-6 text-foreground leading-[1.1] tracking-tight">
              Peak Performance,
              <br />
              <span className="font-semibold">Naturally</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-10 font-light leading-relaxed">
              Premium tools and supplements for recovery, sleep, and cognitive performance.
            </p>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] w-full sm:w-auto"
              onClick={scrollToProducts}
              aria-label="Scroll to products section"
            >
              Explore Products <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
          </div>

          {/* Hero Image - full-bleed, subtle */}
          <div className="flex justify-center lg:justify-end items-center relative mt-8 lg:mt-0">
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
              <img 
                src={heroImage} 
                alt="Lion's Mane Mushroom supplement bottle - Premium cognitive enhancement supplement from NeuroState"
                className="w-full h-auto object-contain"
                loading="eager"
                width="600"
                height="800"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
