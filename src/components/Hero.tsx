import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Client logos - minimal monochrome style
  const clientLogos = [
    "Cohere",
    "Headway", 
    "Microsoft",
    "Nasdaq",
    "Swiss Gear",
    "AI21 Labs"
  ];

  return (
    <section className="relative min-h-[85vh] flex flex-col bg-background overflow-hidden">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center">
        <div className="container mx-auto py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              <h1 
                className={cn(
                  "text-hero-display text-foreground",
                  "transition-all duration-1000",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                Advancing cognitive performance from prediction to execution
              </h1>
              
              <p 
                className={cn(
                  "text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed",
                  "transition-all duration-1000 delay-200",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                We've built the AI infrastructure for cognitive performance forecasting and deploy it at enterprise scale from startups to the Fortune 500.
              </p>

              <div 
                className={cn(
                  "flex flex-wrap gap-4",
                  "transition-all duration-1000 delay-300",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="h-12 px-6 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-md group"
                  >
                    Book a demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/nova/overview">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="h-12 px-6 text-base font-medium border-border text-foreground hover:bg-muted rounded-md"
                  >
                    Explore Nova AI
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Isometric Illustration Placeholder */}
            <div 
              className={cn(
                "relative aspect-square max-w-lg mx-auto lg:mx-0",
                "transition-all duration-1000 delay-400",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {/* Abstract isometric shape */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  viewBox="0 0 400 400" 
                  className="w-full h-full"
                  fill="none"
                >
                  {/* Base cube outline */}
                  <path 
                    d="M200 80 L340 160 L340 280 L200 360 L60 280 L60 160 Z" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    className="text-foreground/20"
                  />
                  <path 
                    d="M200 80 L200 200 M200 200 L340 280 M200 200 L60 280" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    className="text-foreground/10"
                  />
                  
                  {/* Floating sphere with dots */}
                  <circle 
                    cx="200" 
                    cy="180" 
                    r="60" 
                    className="fill-primary/10 stroke-primary/30"
                    strokeWidth="1"
                  />
                  
                  {/* Data points */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const x = 200 + Math.cos(angle) * 45;
                    const y = 180 + Math.sin(angle) * 45;
                    return (
                      <circle 
                        key={i}
                        cx={x} 
                        cy={y} 
                        r="3"
                        className="fill-primary/60"
                      />
                    );
                  })}
                  
                  {/* Central core */}
                  <circle 
                    cx="200" 
                    cy="180" 
                    r="12" 
                    className="fill-primary"
                  />
                  
                  {/* Data flow lines */}
                  <path 
                    d="M200 240 L200 320" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="text-primary/40"
                  />
                  <path 
                    d="M145 210 L80 260" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="text-primary/30"
                  />
                  <path 
                    d="M255 210 L320 260" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="text-primary/30"
                  />
                  
                  {/* Grid base */}
                  <g className="text-foreground/5">
                    {[0, 1, 2, 3].map((row) => (
                      <path 
                        key={`h-${row}`}
                        d={`M100 ${280 + row * 15} L300 ${280 + row * 15}`}
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    ))}
                    {[0, 1, 2, 3, 4, 5].map((col) => (
                      <path 
                        key={`v-${col}`}
                        d={`M${100 + col * 40} 280 L${100 + col * 40} 325`}
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    ))}
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos Strip */}
      <div 
        className={cn(
          "border-t border-border py-8 lg:py-10",
          "transition-all duration-1000 delay-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-8 lg:gap-12">
            {clientLogos.map((logo) => (
              <span 
                key={logo}
                className="text-sm font-medium text-muted-foreground/60 tracking-wide"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;