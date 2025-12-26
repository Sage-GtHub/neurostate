import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import NovaInterfaceDemo from "./NovaInterfaceDemo";
import DataVisualization from "./hero/DataVisualization";
import VideoBackground from "./hero/VideoBackground";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { smoothedPosition, getParallaxStyle, getRotateStyle } = useMouseParallax(heroRef);

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Video Background */}
      <VideoBackground />

      {/* Data Visualization Overlay */}
      <DataVisualization />

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.08),transparent)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Device Mockup with Interface - with micro-interaction */}
        <div 
          className={cn(
            "relative mx-auto w-full max-w-5xl transition-all duration-1000 ease-out",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ 
            transform: `translateY(${scrollY * 0.05}px)`,
            ...getRotateStyle(0.3),
          }}
        >
          {/* Hover glow effect */}
          <div 
            className="absolute -inset-8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${smoothedPosition.x}px ${smoothedPosition.y}px, rgba(16, 185, 129, 0.1), transparent 40%)`,
            }}
          />

          {/* Device Frame - Laptop Style */}
          <div className="relative group">
            {/* Screen bezel */}
            <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-t-xl pt-2 pb-0 px-2 sm:pt-3 sm:px-3 shadow-2xl shadow-emerald-500/5">
              {/* Camera dot */}
              <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2a2a2a]">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse" />
              </div>
              
              {/* Screen */}
              <div className="relative bg-[#0a0a0a] rounded-t-lg overflow-hidden aspect-[16/10] border border-white/5">
                {/* Interface Demo */}
                <div className="absolute inset-0">
                  <NovaInterfaceDemo />
                </div>
                
                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                
                {/* Typography Overlay - Palantir Style */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8"
                  style={getParallaxStyle(0.5)}
                >
                  <h1 
                    className={cn(
                      "text-center font-bold tracking-[-0.02em] leading-[1.05] text-white",
                      "text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                      "transition-all duration-1000 delay-300",
                      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                  >
                    <span className="block">AI-Powered</span>
                    <span className="block mt-1 sm:mt-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">
                        Cognitive
                      </span>
                    </span>
                    <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400">
                      Operating System
                    </span>
                  </h1>
                </div>

                {/* Floating UI elements that respond to mouse */}
                <div 
                  className="absolute top-4 left-4 hidden md:block"
                  style={getParallaxStyle(-0.3)}
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-white/50 font-mono">NEURAL_SYNC</span>
                  </div>
                </div>

                <div 
                  className="absolute bottom-4 right-4 hidden md:block"
                  style={getParallaxStyle(-0.4)}
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded backdrop-blur-sm">
                    <span className="text-[10px] text-emerald-400 font-mono">98.7%</span>
                    <span className="text-[10px] text-white/50 font-mono">ACCURACY</span>
                  </div>
                </div>
              </div>

              {/* Screen reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-t-lg pointer-events-none" />
            </div>
            
            {/* Laptop base */}
            <div className="relative h-3 sm:h-4 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-b-lg shadow-lg">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-1 bg-[#2a2a2a] rounded-b-md" />
            </div>
            
            {/* Base shadow/stand */}
            <div className="relative h-1 mx-4 sm:mx-8 bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent rounded-full" />

            {/* Hover border glow */}
            <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
          
          {/* Subtle glow under device */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-gradient-to-t from-transparent via-emerald-500/10 to-transparent blur-3xl pointer-events-none" />
        </div>

        {/* Bottom Content */}
        <div 
          className={cn(
            "relative mt-8 sm:mt-12 lg:mt-16 flex flex-col items-center gap-6 sm:gap-8",
            "transition-all duration-1000 delay-500",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={getParallaxStyle(0.2)}
        >
          {/* Tagline */}
          <p className="text-center text-sm sm:text-base lg:text-lg text-white/50 max-w-2xl font-light tracking-wide">
            Real-time biometric analysis. Predictive health forecasting. 
            <span className="block sm:inline"> Personalised protocols that adapt to you.</span>
          </p>

          {/* CTA */}
          <Link to="/nova">
            <Button 
              className={cn(
                "relative bg-white text-black hover:bg-white/90 font-medium",
                "h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base tracking-wide",
                "transition-all duration-300 group overflow-hidden",
                "hover:shadow-lg hover:shadow-emerald-500/20"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              {/* Hover shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Button>
          </Link>

          {/* Trust indicators */}
          <div className="flex items-center gap-4 sm:gap-8 text-[10px] sm:text-xs text-white/30 uppercase tracking-widest">
            <span className="hover:text-emerald-400/50 transition-colors cursor-default">Enterprise Ready</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="hover:text-emerald-400/50 transition-colors cursor-default">SOC 2 Compliant</span>
            <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
            <span className="hidden sm:inline hover:text-emerald-400/50 transition-colors cursor-default">Real-time Analytics</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - with hover effect */}
      <div 
        className={cn(
          "absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
          "transition-all duration-700 delay-1000 cursor-pointer group",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] text-white/20 uppercase tracking-widest group-hover:text-white/40 transition-colors">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-white/20 group-hover:text-white/40 animate-bounce transition-colors" />
      </div>

      {/* Corner accent lines with hover glow */}
      <div className="absolute top-20 left-8 w-px h-20 bg-gradient-to-b from-white/10 to-transparent hidden lg:block hover:from-emerald-500/30 transition-colors duration-500" />
      <div className="absolute top-20 left-8 w-20 h-px bg-gradient-to-r from-white/10 to-transparent hidden lg:block hover:from-emerald-500/30 transition-colors duration-500" />
      <div className="absolute top-20 right-8 w-px h-20 bg-gradient-to-b from-white/10 to-transparent hidden lg:block hover:from-emerald-500/30 transition-colors duration-500" />
      <div className="absolute top-20 right-8 w-20 h-px bg-gradient-to-l from-white/10 to-transparent hidden lg:block hover:from-emerald-500/30 transition-colors duration-500" />
    </section>
  );
};

export default Hero;
