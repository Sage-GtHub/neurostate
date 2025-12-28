import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { cn } from "@/lib/utils";

// Lazy load the 3D illustration for better performance
const IsometricIllustration = lazy(() => import("./hero/IsometricIllustration"));

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Smooth parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 30, y: y * 30 });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const clientNames = ["Microsoft", "Nasdaq", "Cohere", "Headway", "Swiss Gear", "AI21 Labs"];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col bg-background overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.02]" />
      
      {/* Floating Gradient Orbs */}
      <div 
        className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
      />
      
      <div 
        className="absolute bottom-40 left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(280, 70%, 55%) 0%, transparent 70%)',
          transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Text Content */}
            <div className="space-y-8 lg:pr-8">
              {/* Eyebrow */}
              <div 
                className={cn(
                  "inline-flex items-center gap-2",
                  "transition-all duration-700",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  Cognitive Infrastructure
                </span>
              </div>

              {/* Headline */}
              <h1 
                className={cn(
                  "text-hero-display text-foreground",
                  "transition-all duration-700 delay-100",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                Advancing AI models from{" "}
                <span className="text-primary">prediction</span>{" "}
                to execution
              </h1>
              
              {/* Subheadline */}
              <p 
                className={cn(
                  "text-sm text-muted-foreground max-w-md leading-relaxed",
                  "transition-all duration-700 delay-200",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                We've built the AI infrastructure for cognitive performance and deploy it at enterprise scale, from startups to the Fortune 500.
              </p>

              {/* CTAs */}
              <div 
                className={cn(
                  "flex flex-wrap items-center gap-3 pt-2",
                  "transition-all duration-700 delay-300",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                <Link to="/contact">
                  <Button 
                    size="sm"
                    className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group"
                  >
                    Book a demo
                    <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
                <Link to="/nova/overview">
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="h-10 px-5 text-xs font-medium text-foreground hover:bg-muted rounded-full group"
                  >
                    Explore Nova AI
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - 3D Isometric Illustration */}
            <div 
              className={cn(
                "relative",
                "transition-all duration-1000 delay-400",
                isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              )}
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* 3D Canvas */}
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                  </div>
                }>
                  <IsometricIllustration />
                </Suspense>
                
                {/* Floating status pill - Clean white */}
                <div 
                  className="absolute top-8 right-8 bg-background border border-border/50 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
                  style={{
                    transform: `translate(${mousePosition.x * -0.15}px, ${mousePosition.y * -0.15}px)`
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[11px] font-medium text-foreground">System Active</span>
                  </div>
                </div>
                
                {/* Bottom metric pill - Clean white */}
                <div 
                  className="absolute bottom-12 left-8 bg-background border border-border/50 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  style={{
                    transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`
                  }}
                >
                  <p className="text-2xl font-light text-foreground">98.7%</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Accuracy Rate</p>
                </div>
                
                {/* Top left metric - Clean white */}
                <div 
                  className="absolute top-16 left-4 bg-background border border-border/50 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  style={{
                    transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
                  }}
                >
                  <p className="text-lg font-light text-foreground">2.4M+</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Predictions/Day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos - Flowing marquee */}
      <div 
        className={cn(
          "py-10 relative overflow-hidden border-t border-border/30",
          "transition-all duration-700 delay-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="marquee-track">
          {[...clientNames, ...clientNames, ...clientNames].map((name, i) => (
            <span 
              key={i}
              className="px-12 text-xs text-muted-foreground/40 font-medium tracking-wider uppercase hover:text-muted-foreground transition-colors duration-300 cursor-default whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
