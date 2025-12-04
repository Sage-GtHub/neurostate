import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-carbon">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon via-carbon to-slate/50" />

      {/* Content */}
      <div className={`relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16 sm:py-24 lg:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-10">
          {/* Label */}
          <div className="inline-block">
            <span className="text-stone text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">
              Introducing
            </span>
          </div>

          {/* Main Headline - H1 for SEO */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-ivory leading-[1.02] tracking-tight">
            The World's First Cognitive Performance System
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-2xl md:text-3xl text-stone max-w-3xl mx-auto font-light leading-relaxed">
            AI, red light therapy, and precision supplements. Engineered to build elite thinkers.
          </p>

          {/* Value Proposition */}
          <div className="pt-4 sm:pt-6">
            <p className="text-sm sm:text-base text-ash max-w-2xl mx-auto leading-relaxed px-4">
              Not wellness. Not mindfulness.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              AI-driven cognitive performance, redesigned.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 px-4 sm:px-0">
            <Link to="/shop" className="w-full sm:w-auto">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-ivory text-carbon hover:bg-mist font-medium transition-all duration-300 min-h-[52px] touch-manipulation px-10 text-sm tracking-wide"
              >
                Shop now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/enterprise/overview" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-stone/30 text-carbon bg-ivory hover:bg-mist font-medium transition-all duration-300 min-h-[52px] touch-manipulation px-10 text-sm tracking-wide"
              >
                For teams
              </Button>
            </Link>
          </div>

          {/* Trust Signal */}
          <div className="pt-8 sm:pt-12 text-center">
            <p className="text-stone/60 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              Designed for <span className="text-signal-green">focus</span>. <span className="text-signal-green">Energy</span>. <span className="text-signal-green">Resilience</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Desktop only */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="w-5 h-8 border border-stone/30 flex items-start justify-center pt-2">
          <div className="w-0.5 h-2 bg-stone/50 animate-bounce" />
        </div>
      </div>

      {/* Bottom Edge Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone/20 to-transparent" />
    </section>
  );
};

export default Hero;
