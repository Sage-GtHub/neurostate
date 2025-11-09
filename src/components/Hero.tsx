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
      className="relative min-h-[600px] flex items-center px-4 py-16 md:py-24 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, hsl(var(--hero-bg)) 0%, hsl(var(--accent) / 0.15) 50%, hsl(var(--hero-bg)) 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 15s ease infinite'
      }}
    >
      {/* Dot pattern overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--background) / 0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-foreground/70 mb-4 tracking-wide">
            Marine Collagen Premium
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-background leading-[1.1]">
            Recovery, Sleep & Performance
          </h1>
          <p className="text-lg text-background/80 mb-8">
            Pure marine collagen peptides for healthier skin, supported joints, and proper cellular function.
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground border-2 border-accent hover:bg-accent/90 hover:shadow-[0_0_25px_rgba(255,138,0,0.7)] font-medium rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,138,0,0.4)]"
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
