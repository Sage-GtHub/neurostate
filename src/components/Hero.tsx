import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 grid-background" />
      </div>

      {/* Content */}
      <div className={`relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16 sm:py-24 lg:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-5xl mx-auto text-center space-y-5 sm:space-y-8">
          {/* Category Line */}
          <div className="inline-block">
            <p className="text-accent text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium">
              The Operating System for Human Performance
            </p>
          </div>

          {/* Revolutionary Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-carbon leading-[1.05] sm:leading-[1.02] tracking-tight">
            Upgrade your brain.
            <br />
            <span className="text-accent">Upgrade everything.</span>
          </h1>

          {/* Category Definition */}
          <p className="text-base sm:text-xl md:text-2xl text-ash max-w-2xl mx-auto font-light leading-relaxed px-2">
            The world's first cognitive performance system.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="text-carbon font-normal">AI. Protocols. Hardware. Supplements.</span>
          </p>

          {/* Two Customer Pathways */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-8 px-4 sm:px-0">
            <Link to="/shop" className="w-full sm:w-auto">
              <Button 
                size="sm"
                className="w-full sm:w-auto bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[48px] touch-manipulation px-8"
              >
                Shop Now
                <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/enterprise/overview" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                size="sm"
                className="w-full sm:w-auto border-carbon/20 text-carbon hover:bg-carbon/5 rounded-full transition-all duration-300 min-h-[48px] touch-manipulation px-8"
              >
                For Teams
              </Button>
            </Link>
          </div>

          {/* Trust Signal */}
          <p className="text-stone text-xs sm:text-sm pt-2 sm:pt-4">
            Designed for focus, energy and recovery.
          </p>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-carbon/20 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-carbon/40 rounded-full" />
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
