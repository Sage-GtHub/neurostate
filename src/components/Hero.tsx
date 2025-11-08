import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-[600px] flex items-center px-4 py-20"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-muted-foreground mb-3 tracking-wider uppercase">
            Performance For Life™
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-[1.1]">
            Science-Backed Supplements
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8">
            Advanced recovery technology and premium supplements designed to power your goals.
          </p>
          <Button 
            size="lg" 
            className="px-8 py-6 bg-primary hover:bg-primary/90"
            onClick={scrollToProducts}
          >
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <div className="w-full max-w-md aspect-square bg-background/20 rounded-2xl flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Product Image</p>
          </div>
        </div>
      </div>
    </section>
  );
};
