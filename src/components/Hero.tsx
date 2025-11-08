import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-[700px] flex items-center px-4 py-20"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div className="container mx-auto max-w-4xl text-center">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-[1.1] tracking-tight">
            Engineering Human Performance.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            At NeuroState®, we build systems for recovery, sleep, and peak performance — designed for those who refuse mediocrity.
          </p>
          <Button 
            size="lg" 
            className="px-8 py-6 bg-primary hover:bg-primary/90"
            onClick={scrollToProducts}
          >
            Join the Movement <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
