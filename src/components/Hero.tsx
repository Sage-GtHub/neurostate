import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/red-light-face-mask.jpg";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-[85vh] flex items-center px-6 lg:px-12 overflow-hidden bg-[hsl(var(--hero-bg))]"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content - centered and minimal */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 py-20">
            <p className="text-sm font-medium text-muted-foreground mb-6 tracking-[0.2em] uppercase">
              Science-Backed Wellness
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-foreground leading-[1.1] tracking-tight">
              Peak Performance,
              <br />
              <span className="font-semibold">Naturally</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 font-light leading-relaxed">
              Premium tools and supplements for recovery, sleep, and human optimization.
            </p>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full px-10 py-6 text-base transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]"
              onClick={scrollToProducts}
            >
              Explore Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Hero Image - full-bleed, subtle */}
          <div className="hidden lg:flex justify-end items-center relative">
            <div className="relative w-full max-w-lg">
              <img 
                src={heroImage} 
                alt="Premium wellness tools for recovery and performance"
                className="w-full h-auto object-contain"
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
