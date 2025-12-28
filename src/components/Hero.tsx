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
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[85vh] flex flex-col bg-background overflow-hidden"
    >
      {/* Subtle floating gradient orb */}
      <div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                  Human Performance Platform
                </span>
              </div>

              {/* Headline - Human, not jargon */}
              <h1 
                className={cn(
                  "text-hero-display text-foreground",
                  "transition-all duration-700 delay-100",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                Know when you'll be at your{" "}
                <span className="text-primary">best</span>
                {" "}— before it happens
              </h1>
              
              {/* Subheadline - Clear, benefit-focused */}
              <p 
                className={cn(
                  "text-sm text-muted-foreground max-w-md leading-relaxed",
                  "transition-all duration-700 delay-200",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                Neurostate combines AI, supplements, and light therapy to predict and optimise your mental performance. Used by elite athletes, executives, and high-performers worldwide.
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
                    className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group"
                  >
                    Book a demo
                    <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
                <Link to="/nova/overview">
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="h-11 px-6 text-xs font-medium text-foreground hover:bg-muted rounded-full group"
                  >
                    Meet Nova AI
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Isometric 3D Visual */}
            <div 
              className={cn(
                "relative",
                "transition-all duration-700 delay-400",
                isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
              )}
            >
              <div 
                className="relative aspect-square max-w-md mx-auto"
                style={{
                  transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`
                }}
              >
                {/* Isometric grid base */}
                <svg 
                  viewBox="0 0 400 400" 
                  className="w-full h-full"
                  fill="none"
                >
                  {/* Background glow */}
                  <defs>
                    <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  
                  <circle cx="200" cy="200" r="180" fill="url(#heroGlow)" />
                  
                  {/* Isometric cubes - stacked formation */}
                  <g transform="translate(200, 200)">
                    {/* Bottom layer */}
                    <g 
                      className="animate-float-slow"
                      style={{ animationDelay: '0s' }}
                    >
                      <path 
                        d="M-60,30 L0,0 L60,30 L60,80 L0,110 L-60,80 Z" 
                        fill="url(#cubeGrad)"
                        stroke="hsl(var(--foreground))"
                        strokeOpacity="0.1"
                        strokeWidth="0.5"
                      />
                      <path d="M0,0 L0,50 L60,80 L60,30 Z" fill="hsl(var(--foreground))" fillOpacity="0.04" />
                      <path d="M0,0 L0,50 L-60,80 L-60,30 Z" fill="hsl(var(--foreground))" fillOpacity="0.06" />
                    </g>
                    
                    {/* Middle layer */}
                    <g 
                      transform="translate(0, -50)"
                      className="animate-float"
                      style={{ animationDelay: '0.5s' }}
                    >
                      <path 
                        d="M-60,30 L0,0 L60,30 L60,80 L0,110 L-60,80 Z" 
                        fill="hsl(var(--primary))"
                        fillOpacity="0.08"
                        stroke="hsl(var(--primary))"
                        strokeOpacity="0.2"
                        strokeWidth="0.5"
                      />
                      <path d="M0,0 L0,50 L60,80 L60,30 Z" fill="hsl(var(--primary))" fillOpacity="0.06" />
                      <path d="M0,0 L0,50 L-60,80 L-60,30 Z" fill="hsl(var(--primary))" fillOpacity="0.1" />
                    </g>
                    
                    {/* Top layer - highlighted */}
                    <g 
                      transform="translate(0, -100)"
                      className="animate-float-slow"
                      style={{ animationDelay: '1s' }}
                    >
                      <path 
                        d="M-60,30 L0,0 L60,30 L60,80 L0,110 L-60,80 Z" 
                        fill="hsl(var(--primary))"
                        fillOpacity="0.15"
                        stroke="hsl(var(--primary))"
                        strokeOpacity="0.4"
                        strokeWidth="1"
                      />
                      <path d="M0,0 L0,50 L60,80 L60,30 Z" fill="hsl(var(--primary))" fillOpacity="0.1" />
                      <path d="M0,0 L0,50 L-60,80 L-60,30 Z" fill="hsl(var(--primary))" fillOpacity="0.2" />
                    </g>
                    
                    {/* Floating data points */}
                    {[
                      { x: -100, y: -20, delay: 0 },
                      { x: 100, y: -40, delay: 0.3 },
                      { x: -80, y: -120, delay: 0.6 },
                      { x: 90, y: -100, delay: 0.9 },
                      { x: 0, y: -160, delay: 1.2 },
                    ].map((point, i) => (
                      <circle
                        key={i}
                        cx={point.x + mousePosition.x * 0.3}
                        cy={point.y + mousePosition.y * 0.3}
                        r={i === 4 ? 6 : 3}
                        fill={i === 4 ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
                        fillOpacity={i === 4 ? 1 : 0.15}
                        className="transition-all duration-500"
                        style={{ animationDelay: `${point.delay}s` }}
                      />
                    ))}
                    
                    {/* Connection lines */}
                    <line x1="-100" y1="-20" x2="-80" y2="-120" stroke="hsl(var(--foreground))" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 4" />
                    <line x1="100" y1="-40" x2="90" y2="-100" stroke="hsl(var(--foreground))" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 4" />
                    <line x1="0" y1="-100" x2="0" y2="-160" stroke="hsl(var(--primary))" strokeOpacity="0.2" strokeWidth="1" />
                  </g>
                </svg>
                
                {/* Floating metric cards */}
                <div 
                  className="absolute top-8 right-4 bg-background border border-border/50 px-4 py-3 rounded-2xl shadow-sm"
                  style={{
                    transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)`
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] text-muted-foreground">Live</span>
                  </div>
                  <p className="text-lg font-light text-foreground mt-1">92%</p>
                  <p className="text-[9px] text-muted-foreground">Readiness</p>
                </div>
                
                <div 
                  className="absolute bottom-12 left-4 bg-background border border-border/50 px-4 py-3 rounded-2xl shadow-sm"
                  style={{
                    transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
                  }}
                >
                  <p className="text-lg font-light text-foreground">7.8h</p>
                  <p className="text-[9px] text-muted-foreground">Sleep Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
