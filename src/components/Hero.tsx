import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

  // Subtle parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Client logos - grayscale for that Invisible Tech look
  const clientLogos = [
    { name: "Microsoft", width: "w-24" },
    { name: "Nasdaq", width: "w-20" },
    { name: "Cohere", width: "w-16" },
    { name: "Headway", width: "w-20" },
    { name: "Swiss Gear", width: "w-20" },
    { name: "AI21 Labs", width: "w-18" }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col bg-background overflow-hidden grain-texture"
    >
      {/* Subtle dot grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      
      {/* Floating accent orb with parallax */}
      <div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            {/* Left Column - Text (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              {/* Eyebrow */}
              <div 
                className={cn(
                  "inline-flex items-center gap-3",
                  "transition-all duration-1000",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-subtle" />
                <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
                  Cognitive Infrastructure
                </span>
              </div>

              {/* Main Headline */}
              <h1 
                className={cn(
                  "text-[2.75rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]",
                  "font-medium text-foreground leading-[1.05] tracking-[-0.03em]",
                  "transition-all duration-1000 delay-100",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                Advancing cognitive performance from{" "}
                <span className="text-primary">prediction</span>{" "}
                to execution
              </h1>
              
              {/* Subheadline */}
              <p 
                className={cn(
                  "text-lg lg:text-xl text-muted-foreground max-w-xl leading-[1.7]",
                  "transition-all duration-1000 delay-200",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                We've built the AI infrastructure for cognitive performance forecasting and deploy it at enterprise scale from startups to the Fortune 500.
              </p>

              {/* CTAs */}
              <div 
                className={cn(
                  "flex flex-wrap items-center gap-4 pt-2",
                  "transition-all duration-1000 delay-300",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="h-14 px-8 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-none group btn-premium"
                  >
                    Book a demo
                    <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/nova/overview">
                  <Button 
                    size="lg"
                    variant="ghost"
                    className="h-14 px-8 text-base font-medium text-foreground hover:bg-transparent hover:text-primary rounded-none link-invisible"
                  >
                    Explore Nova AI
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Abstract Visual (5 cols) */}
            <div 
              className={cn(
                "lg:col-span-5 relative",
                "transition-all duration-1000 delay-400",
                isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              )}
            >
              <div 
                className="relative aspect-square max-w-md mx-auto"
                style={{
                  transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
                }}
              >
                {/* Abstract geometric composition */}
                <svg 
                  viewBox="0 0 400 400" 
                  className="w-full h-full"
                  fill="none"
                >
                  {/* Outer ring */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="160" 
                    stroke="currentColor" 
                    strokeWidth="0.5"
                    className="text-foreground/10"
                  />
                  
                  {/* Middle ring */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="120" 
                    stroke="currentColor" 
                    strokeWidth="0.5"
                    className="text-foreground/10"
                  />
                  
                  {/* Inner ring */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="80" 
                    stroke="currentColor" 
                    strokeWidth="0.5"
                    className="text-foreground/10"
                  />
                  
                  {/* Orbital path */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="100" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    className="text-primary/40"
                  />
                  
                  {/* Data points on orbit */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = 200 + Math.cos(rad) * 100;
                    const y = 200 + Math.sin(rad) * 100;
                    return (
                      <circle 
                        key={i}
                        cx={x} 
                        cy={y} 
                        r={i === 0 ? 6 : 3}
                        className={i === 0 ? "fill-primary" : "fill-foreground/30"}
                      />
                    );
                  })}
                  
                  {/* Central core */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="40" 
                    className="fill-primary/5 stroke-primary/30"
                    strokeWidth="1"
                  />
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="16" 
                    className="fill-primary"
                  />
                  
                  {/* Connection lines */}
                  <line x1="200" y1="200" x2="200" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
                  <line x1="200" y1="200" x2="340" y2="280" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
                  <line x1="200" y1="200" x2="60" y2="280" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
                  
                  {/* Corner accent dots */}
                  <circle cx="60" cy="60" r="2" className="fill-foreground/20" />
                  <circle cx="340" cy="60" r="2" className="fill-foreground/20" />
                  <circle cx="60" cy="340" r="2" className="fill-foreground/20" />
                  <circle cx="340" cy="340" r="2" className="fill-foreground/20" />
                </svg>
                
                {/* Floating label */}
                <div className="absolute top-8 right-8 bg-background/90 backdrop-blur-sm border border-border px-4 py-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Live</p>
                  <p className="text-sm font-medium text-foreground">Neural Engine v3.2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos Strip - Marquee Style */}
      <div 
        className={cn(
          "border-t border-border py-12 relative overflow-hidden",
          "transition-all duration-1000 delay-600",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex items-center gap-20 whitespace-nowrap marquee-track">
          {[...clientLogos, ...clientLogos].map((logo, i) => (
            <span 
              key={i}
              className="text-sm font-medium text-muted-foreground/40 tracking-wide uppercase hover:text-muted-foreground transition-colors duration-300"
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;