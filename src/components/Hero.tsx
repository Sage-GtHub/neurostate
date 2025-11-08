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
      className="relative min-h-[600px] flex items-center px-4 py-16 md:py-24"
      style={{ backgroundColor: 'hsl(var(--hero-bg))' }}
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-foreground/70 mb-4 tracking-wide">
            RedRestore™ Pro Panel
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-background leading-[1.1]">
            Professional Red Light Therapy
          </h1>
          <p className="text-lg text-background/80 mb-8">
            Clinical-grade 660nm + 850nm wavelength technology for enhanced recovery, reduced inflammation, and cellular optimization.
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
            alt="RedRestore™ Pro Panel - Professional Red Light Therapy Device"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};
