import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 grid-background" />
      </div>

      {/* Content */}
      <div className={`relative z-10 container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Category Line */}
          <div className="inline-block">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">
              The Operating System for Human Performance
            </p>
          </div>

          {/* Revolutionary Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-carbon leading-[1.02] tracking-tight">
            Upgrade your brain.
            <br />
            <span className="text-accent">Upgrade everything.</span>
          </h1>

          {/* Category Definition */}
          <p className="text-xl md:text-2xl text-ash max-w-2xl mx-auto font-light leading-relaxed">
            The world's first cognitive performance system.
            <br />
            <span className="text-carbon font-normal">AI. Protocols. Hardware. Supplements.</span>
          </p>

          {/* Two Customer Pathways */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/nova" target="_blank">
              <Button 
                size="sm"
                className="bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[44px] touch-manipulation px-8"
              >
                <Sparkles className="mr-2 w-3 h-3" />
                Meet Nova AI
              </Button>
            </Link>
            <Link to="/shop">
              <Button 
                variant="outline"
                size="sm"
                className="border-carbon/20 text-carbon hover:bg-carbon/5 rounded-full transition-all duration-300 min-h-[44px] touch-manipulation px-8"
              >
                Explore System
                <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Signal */}
          <p className="text-stone text-sm pt-4">
            Designed for focus, energy and recovery.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-carbon/20 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-carbon/40 rounded-full" />
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
