import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import NovaInterfaceDemo from "./NovaInterfaceDemo";

// Animated typing phrases
const typingPhrases = [
  "Analysing your sleep patterns...",
  "Optimising your morning protocol...",
  "Calculating peak focus windows...",
  "Syncing biometric data...",
  "Generating personalised insights...",
  "Predicting energy levels...",
];

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDemo, setShowDemo] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Typing animation
  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    
    if (isTyping) {
      if (typingText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setTypingText(currentPhrase.slice(0, typingText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (typingText.length > 0) {
        const timeout = setTimeout(() => {
          setTypingText(typingText.slice(0, -1));
        }, 25);
        return () => clearTimeout(timeout);
      } else {
        setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
        setIsTyping(true);
      }
    }
  }, [typingText, isTyping, phraseIndex]);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-carbon"
    >
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          {[...Array(20)].map((_, i) => (
            <g key={i}>
              <circle 
                cx={100 + (i % 5) * 200 + Math.sin(i) * 50}
                cy={100 + Math.floor(i / 5) * 200 + Math.cos(i) * 50}
                r="4"
                fill="currentColor"
                className="text-signal-green"
                opacity={0.5}
              >
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur={`${2 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
              {i < 15 && (
                <line
                  x1={100 + (i % 5) * 200 + Math.sin(i) * 50}
                  y1={100 + Math.floor(i / 5) * 200 + Math.cos(i) * 50}
                  x2={100 + ((i + 5) % 5) * 200 + Math.sin(i + 5) * 50}
                  y2={100 + Math.floor((i + 5) / 5) * 200 + Math.cos(i + 5) * 50}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-ivory"
                  opacity={0.1}
                >
                  <animate
                    attributeName="opacity"
                    values="0.05;0.2;0.05"
                    dur={`${3 + i * 0.1}s`}
                    repeatCount="indefinite"
                  />
                </line>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Dynamic Gradient Orbs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 bg-gradient-to-br from-signal-green/40 to-emerald-600/20"
        style={{
          left: '60%',
          top: '40%',
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15 bg-gradient-to-br from-violet-500/40 to-purple-600/20"
        style={{
          left: '25%',
          top: '60%',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          
          {/* Left: Text Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-signal-green/10 border border-signal-green/20 backdrop-blur-sm rounded-full">
              <div className="relative">
                <Sparkles className="w-4 h-4 text-signal-green" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="w-4 h-4 text-signal-green opacity-50" />
                </div>
              </div>
              <span className="text-signal-green text-xs tracking-[0.2em] uppercase font-semibold">
                AI-Powered Performance
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.05] tracking-tight">
              Meet
              <span className="relative inline-block ml-4">
                <span className="relative z-10 bg-gradient-to-r from-signal-green via-emerald-400 to-signal-green bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  Nova
                </span>
                <div className="absolute -inset-2 bg-signal-green/20 blur-xl rounded-full animate-pulse" />
              </span>
              <br />
              <span className="text-stone/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mt-2 block">
                Your AI Health Coach
              </span>
            </h1>

            {/* AI Typing Animation */}
            <div className="bg-carbon/50 border border-ivory/10 rounded-xl p-4 backdrop-blur-sm max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-signal-green to-emerald-600 flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 bg-carbon rounded-full animate-pulse" />
                </div>
                <div className="flex-1 min-h-[48px] flex items-center">
                  <span className="text-ivory/90 font-mono text-sm">
                    {typingText}
                    <span className="animate-pulse text-signal-green">|</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {["Wearable Sync", "Smart Protocols", "Predictive AI", "24/7 Coaching"].map((pill) => (
                <span 
                  key={pill}
                  className="px-3 py-1.5 text-xs bg-ivory/5 border border-ivory/10 text-ivory/70 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to="/nova">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-signal-green text-carbon hover:bg-signal-green/90 font-semibold transition-all duration-300 min-h-[56px] px-8 text-sm tracking-wide group shadow-lg shadow-signal-green/20"
                >
                  Start with Nova
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => setShowDemo(true)}
                className="w-full sm:w-auto border-ivory/20 text-ivory hover:bg-ivory/10 font-medium transition-all duration-300 min-h-[56px] px-8 text-sm tracking-wide group"
              >
                <Play className="mr-2 w-4 h-4 transition-transform group-hover:scale-110" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Metrics */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6 text-center">
              {[
                { value: "50K+", label: "Users Coached" },
                { value: "2M+", label: "Insights Generated" },
                { value: "98%", label: "Goal Achievement" },
              ].map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-ivory">
                    {metric.value}
                  </div>
                  <div className="text-xs text-stone/70 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Nova Interface Demo */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            <div 
              className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] cursor-pointer group"
              onClick={() => setShowDemo(true)}
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              {/* Glow effect behind */}
              <div className="absolute -inset-4 bg-gradient-to-br from-signal-green/20 via-transparent to-violet-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* The demo interface */}
              <NovaInterfaceDemo />
              
              {/* Play overlay on hover */}
              <div className="absolute inset-0 bg-carbon/40 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-signal-green flex items-center justify-center shadow-lg shadow-signal-green/30 transform group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-carbon ml-1" />
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-signal-green text-carbon text-xs font-semibold rounded-full shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                Live Demo
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Demo Modal */}
      {showDemo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setShowDemo(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-carbon/95 backdrop-blur-xl animate-fade-in" />
          
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
            <NovaInterfaceDemo />
            
            {/* CTA below modal */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <Link to="/nova">
                <Button 
                  size="lg"
                  className="bg-signal-green text-carbon hover:bg-signal-green/90 font-semibold shadow-lg shadow-signal-green/20"
                >
                  Try Nova Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-carbon to-transparent pointer-events-none" />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-stone/50 text-xs uppercase tracking-widest">Discover More</span>
        <div className="w-px h-8 bg-gradient-to-b from-stone/50 to-transparent relative overflow-hidden">
          <div className="absolute w-full h-3 bg-signal-green animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
