import { Button } from "@/components/ui/button";
import { ArrowRight, Play, X, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import NovaInterfaceDemo from "./NovaInterfaceDemo";
import GuidedTour from "./GuidedTour";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [showTour, setShowTour] = useState(false);

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Subtle gradient background - minimal, refined */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-pearl/30" />
      
      {/* Subtle grid pattern - very low opacity as per brand guidelines */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--carbon)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--carbon)) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left: Text Content - Clean, minimal, direct */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Ghost section number */}
            <span className="ghost-number">01 — PERFORMANCE</span>

            {/* Main Headline - Direct, confident */}
            <div className="space-y-4">
              <h1 className="text-hero-display text-carbon">
                Your optimal state.
                <br />
                <span className="text-ash">On demand.</span>
              </h1>
              
              {/* Value proposition - Clear, no fluff */}
              <p className="text-body-large text-ash max-w-lg mx-auto lg:mx-0">
                Precision supplements and AI-powered protocols engineered for peak mental and physical performance.
              </p>
            </div>

            {/* CTAs - Clean, minimal buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
              <Link to="/shop">
                <Button 
                  size="lg"
                  className={cn(
                    "bg-carbon text-ivory hover:bg-slate",
                    "h-12 px-8 text-sm font-medium tracking-wide",
                    "rounded-lg transition-all duration-300"
                  )}
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/nova">
                <Button 
                  variant="outline"
                  size="lg"
                  className={cn(
                    "border-carbon text-carbon hover:bg-carbon hover:text-ivory",
                    "h-12 px-8 text-sm font-medium tracking-wide",
                    "rounded-lg transition-all duration-300"
                  )}
                >
                  Meet Nova AI
                </Button>
              </Link>
            </div>

            {/* Social proof - Minimal, factual */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-caption text-ash">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-carbon">50K+</span>
                <span>Active users</span>
              </div>
              <div className="w-px h-4 bg-mist" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-carbon">4.9★</span>
                <span>App rating</span>
              </div>
              <div className="w-px h-4 bg-mist hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <span className="font-semibold text-carbon">98%</span>
                <span>See results</span>
              </div>
            </div>
          </div>

          {/* Right: Nova Interface Demo - Clean presentation */}
          <div className="relative order-1 lg:order-2 flex flex-col items-center justify-center">
            <div 
              className="relative w-full max-w-sm lg:max-w-md aspect-[4/3] cursor-pointer group"
              onClick={() => setShowDemo(true)}
            >
              {/* Subtle shadow - premium, not flashy */}
              <div className="absolute -inset-4 bg-carbon/5 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card frame - 12px radius as per brand guidelines */}
              <div className="absolute inset-0 rounded-xl bg-card border border-mist shadow-lg" />
              
              {/* The demo interface */}
              <div className="relative z-10 rounded-xl overflow-hidden">
                <NovaInterfaceDemo />
              </div>
              
              {/* Play overlay */}
              <div className="absolute inset-0 bg-carbon/60 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-carbon ml-1" />
                </div>
              </div>
              
              {/* Badge - minimal */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-carbon text-ivory text-xs font-medium rounded-full shadow-md z-30">
                Live Demo
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Demo Modal */}
      {showDemo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
          onClick={() => setShowDemo(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-carbon/90 backdrop-blur-sm animate-fade-in" />
          
          {/* Modal content */}
          <div 
            className="relative w-full max-w-4xl aspect-[4/3] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setShowDemo(false)}
              className="absolute -top-12 right-0 text-ivory/60 hover:text-ivory transition-colors flex items-center gap-2 text-sm"
            >
              Close <X className="w-4 h-4" />
            </button>
            
            {/* Demo interface full size */}
            <div className="rounded-xl overflow-hidden border border-mist shadow-2xl">
              <NovaInterfaceDemo />
            </div>
            
            {/* Guided Tour Overlay */}
            {showTour && (
              <GuidedTour 
                onComplete={() => setShowTour(false)}
                onSkip={() => setShowTour(false)}
              />
            )}
            
            {/* CTA below modal */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
              {!showTour && (
                <Button 
                  variant="outline"
                  onClick={() => setShowTour(true)}
                  className="bg-ivory border-ivory text-carbon hover:bg-pearl"
                >
                  <BookOpen className="mr-2 w-4 h-4" />
                  Take a Tour
                </Button>
              )}
              <Link to="/nova">
                <Button className="bg-carbon text-ivory hover:bg-slate font-medium shadow-lg">
                  Try Nova Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Indicator - minimal */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
        <span className="text-ash text-xs uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-ash to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
