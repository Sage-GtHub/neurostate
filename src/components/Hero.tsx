import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/marine-collagen.jpg";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-[600px] flex items-center px-4 py-16 md:py-24"
      style={{ backgroundColor: 'hsl(var(--hero-bg))' }}
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-foreground/70 mb-4 tracking-wide">
            Marine Collagen Premium
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-background leading-[1.1]">
            Cellular Health & Vitality
          </h1>
          <p className="text-lg text-background/80 mb-8">
            Pure marine collagen peptides for enhanced skin health, joint support, and optimal cellular function.
          </p>
          <Button 
            size="lg" 
            className="bg-background text-foreground hover:bg-background/90 font-medium"
            onClick={scrollToProducts}
          >
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <img 
            src={heroImage} 
            alt="Marine Collagen Premium - Pure Marine Collagen Peptides"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};
