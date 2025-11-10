import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import heroImage1 from "@/assets/redlight.webp";
import heroImage2 from "@/assets/hero-redlight-panel.jpg";
import heroImage3 from "@/assets/hero-pemf-recovery.jpg";
import heroImage4 from "@/assets/hero-sleep-wellness.jpg";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroSlides = [
    {
      image: heroImage1,
      alt: "Red Light Therapy Experience - Recovery, Sleep & Performance"
    },
    {
      image: heroImage2,
      alt: "Red Light Therapy Panel in Wellness Room"
    },
    {
      image: heroImage3,
      alt: "PEMF Therapy Recovery Session"
    },
    {
      image: heroImage4,
      alt: "Sleep Wellness and Recovery"
    }
  ];

  return (
    <section 
      className="relative min-h-[500px] md:min-h-[600px] flex items-center px-4 py-12 md:py-16 lg:py-24 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, hsl(var(--hero-bg)) 0%, hsl(var(--accent) / 0.15) 50%, hsl(var(--hero-bg)) 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 15s ease infinite'
      }}
    >
      {/* Dot pattern overlay */}
      {/* Dot pattern overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--background) / 0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      {/* Subtle gradient overlay for text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-transparent"
      />
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
        <div className="hidden md:flex justify-center items-center">
          <HeroCarousel slides={heroSlides} />
        </div>
      </div>
    </section>
  );
};
