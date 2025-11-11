import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-mask-transparent.png";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-[500px] md:min-h-[600px] flex items-center px-4 py-12 md:py-16 lg:py-24 overflow-hidden bg-[hsl(var(--hero-bg))]"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        <div className="max-w-xl">
          <p className="text-xs md:text-sm font-medium text-foreground/70 mb-3 md:mb-4 tracking-wide">
            Redefining Human Performance
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-background leading-[1.1]">
            Recovery, Sleep & Performance
          </h1>
          <p className="text-base md:text-lg text-background/80 mb-6 md:mb-8">
            Science backed tools for total recovery, peak sleep, and human performance.
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground border-2 border-accent hover:bg-accent/90 hover:shadow-[0_0_25px_rgba(255,138,0,0.7)] font-medium rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,138,0,0.4)] w-full sm:w-auto min-h-[44px] cursor-pointer active:scale-95"
            onClick={scrollToProducts}
          >
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="hidden md:flex justify-center items-center relative">
          <div className="relative w-full max-w-md">
            <img 
              src={heroImage} 
              alt="Red Light Face Mask - Recovery, Sleep & Performance"
              className="w-full"
              style={{
                mixBlendMode: 'normal',
                filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.1))'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
