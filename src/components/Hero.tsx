import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

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
      {/* Floating Gradient Orbs */}
      <div 
        className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px] pointer-events-none animate-float-slow"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
      />
      
      <div 
        className="absolute bottom-40 left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[80px] pointer-events-none animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(280, 70%, 55%) 0%, transparent 70%)',
          transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div className="space-y-8">
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
                We've built the AI infrastructure for cognitive performance and deploy it at enterprise scale—from startups to the Fortune 500.
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
                    className="h-10 px-5 text-xs font-medium bg-gray-800 text-white hover:bg-gray-700 rounded-full group"
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

            {/* Right - Interactive Visual */}
            <div 
              className={cn(
                "relative",
                "transition-all duration-700 delay-400",
                isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
              )}
            >
              <div 
                className="relative aspect-square max-w-sm mx-auto cursor-follow"
                style={{
                  transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
                }}
              >
                {/* Organic blob background */}
                <div className="absolute inset-0 blob-animated bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-60" />
                
                {/* Interactive rings */}
                <svg 
                  viewBox="0 0 400 400" 
                  className="w-full h-full relative z-10"
                  fill="none"
                >
                  {/* Outer organic ring */}
                  <ellipse 
                    cx="200" 
                    cy="200" 
                    rx="150" 
                    ry="140" 
                    stroke="currentColor" 
                    strokeWidth="0.5"
                    className="text-foreground/8"
                    style={{ transform: `rotate(${mousePosition.x * 0.1}deg)`, transformOrigin: 'center' }}
                  />
                  
                  {/* Middle ring */}
                  <ellipse 
                    cx="200" 
                    cy="200" 
                    rx="110" 
                    ry="100" 
                    stroke="currentColor" 
                    strokeWidth="0.5"
                    className="text-foreground/8"
                  />
                  
                  {/* Inner ring */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="60" 
                    stroke="currentColor" 
                    strokeWidth="0.5"
                    className="text-foreground/10"
                  />
                  
                  {/* Dotted orbital path */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="85" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    strokeDasharray="2 6"
                    className="text-primary/30"
                  />
                  
                  {/* Data points - flowing positions */}
                  {[0, 72, 144, 216, 288].map((angle, i) => {
                    const rad = ((angle + mousePosition.x * 0.5) * Math.PI) / 180;
                    const x = 200 + Math.cos(rad) * 85;
                    const y = 200 + Math.sin(rad) * 85;
                    return (
                      <circle 
                        key={i}
                        cx={x} 
                        cy={y} 
                        r={i === 0 ? 5 : 2.5}
                        className={cn(
                          "transition-all duration-300",
                          i === 0 ? "fill-primary" : "fill-foreground/20"
                        )}
                      />
                    );
                  })}
                  
                  {/* Central core - organic shape */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="32" 
                    className="fill-primary/8"
                  />
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="12" 
                    className="fill-primary"
                  />
                </svg>
                
                {/* Floating status pill */}
                <div 
                  className="absolute top-6 right-6 glass-subtle px-3 py-1.5 rounded-full"
                  style={{
                    transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)`
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium text-foreground">Live</span>
                  </div>
                </div>
                
                {/* Bottom metric pill */}
                <div 
                  className="absolute bottom-10 left-10 glass-subtle px-4 py-2 rounded-2xl"
                  style={{
                    transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
                  }}
                >
                  <p className="text-lg font-light text-foreground">98%</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos - Flowing marquee */}
      <div 
        className={cn(
          "py-10 relative overflow-hidden border-t border-border/50",
          "transition-all duration-700 delay-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="marquee-track">
          {[...clientNames, ...clientNames, ...clientNames].map((name, i) => (
            <span 
              key={i}
              className="px-10 text-xs text-muted-foreground/40 font-medium tracking-wider uppercase hover:text-muted-foreground transition-colors duration-300 cursor-default whitespace-nowrap"
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
