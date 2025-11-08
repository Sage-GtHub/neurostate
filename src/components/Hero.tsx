import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/redrestore-pro-panel.jpg";

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
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-muted-foreground mb-3 tracking-wider uppercase">
            RedRestore™ Pro Panel
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-[1.1]">
            Professional Red Light Therapy
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-4">
            Clinical-grade 660nm + 850nm wavelength technology for enhanced recovery, reduced inflammation, and cellular optimization.
          </p>
          <p className="text-3xl font-bold mb-8">£899</p>
          <Button 
            size="lg" 
            className="px-8 py-6 bg-primary hover:bg-primary/90"
            onClick={scrollToProducts}
          >
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <img 
            src={heroImage} 
            alt="RedRestore™ Pro Panel - Professional Red Light Therapy Device"
            className="w-full max-w-md rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};
