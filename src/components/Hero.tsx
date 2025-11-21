import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-supplement.png";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center px-6 sm:px-8 lg:px-20 xl:px-32 overflow-hidden bg-ivory"
      aria-label="Hero section"
    >
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-carbon/5 pointer-events-none" />
      <div className="w-full py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-left max-w-3xl space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-carbon leading-none" style={{ letterSpacing: '-0.02em' }}>
                Your optimal state.
              </h1>
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-carbon leading-none" style={{ letterSpacing: '-0.02em' }}>
                On demand.
              </p>
            </div>
            <p className="text-lg text-ash max-w-2xl leading-relaxed">
              Scientifically-backed supplements engineered for peak mental and physical performance.
            </p>
            <Button 
              size="lg" 
              className="bg-carbon text-ivory hover:bg-slate"
              onClick={scrollToProducts}
              aria-label="Shop now"
            >
              Shop Now
            </Button>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end items-center relative">
            <div className="relative w-full max-w-md lg:max-w-lg opacity-90">
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
