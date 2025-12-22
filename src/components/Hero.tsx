import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, X, BookOpen, Zap, Brain, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import NovaInterfaceDemo from "./NovaInterfaceDemo";
import GuidedTour from "./GuidedTour";
import { cn } from "@/lib/utils";

// Animated typing phrases
const typingPhrases = [
  "Analysing your sleep patterns...",
  "Optimising your morning protocol...",
  "Calculating peak focus windows...",
  "Syncing biometric data...",
  "Generating personalised insights...",
  "Predicting energy levels...",
];

// Animated metrics component with glassmorphism
const AnimatedMetrics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ users: 0, rating: 0, success: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const startTime = Date.now();
    const targets = { users: 50, rating: 49, success: 98 };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);

      setCounts({
        users: Math.floor(easeOut * targets.users),
        rating: Math.floor(easeOut * targets.rating),
        success: Math.floor(easeOut * targets.success),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  const metrics = [
    { value: `${counts.users}K+`, label: "Users", icon: Activity },
    { value: `${(counts.rating / 10).toFixed(1)}★`, label: "Rating", icon: Sparkles },
    { value: `${counts.success}%`, label: "Success", icon: Zap },
  ];

  return (
    <div 
      ref={containerRef} 
      className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 py-4 px-5 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20"
    >
      {metrics.map((metric, i) => (
        <div key={metric.label} className="flex items-center gap-4">
          <div className="text-center group cursor-default">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <metric.icon className="w-3.5 h-3.5 text-signal-green opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-signal-green to-emerald-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {metric.value}
              </div>
            </div>
            <div className="text-[10px] text-stone uppercase tracking-wider font-medium">{metric.label}</div>
          </div>
          {i < metrics.length - 1 && <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />}
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDemo, setShowDemo] = useState(false);
  const [showTour, setShowTour] = useState(false);
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
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon via-carbon to-carbon" />
        
        {/* Animated mesh gradient blobs */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)',
            left: '50%',
            top: '30%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 60}px, ${mousePosition.y * 60}px)`,
            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
            left: '20%',
            top: '60%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
            transition: 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: 'blur(100px)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)',
            left: '80%',
            top: '20%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* Neural Network Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(34,197,94)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(34,197,94)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[...Array(25)].map((_, i) => {
            const x = 80 + (i % 5) * 210 + Math.sin(i * 0.5) * 40;
            const y = 80 + Math.floor(i / 5) * 180 + Math.cos(i * 0.5) * 40;
            return (
              <g key={i}>
                <circle 
                  cx={x}
                  cy={y}
                  r="6"
                  fill="url(#nodeGlow)"
                >
                  <animate
                    attributeName="r"
                    values="4;8;4"
                    dur={`${2 + i * 0.15}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur={`${2 + i * 0.15}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                {i < 20 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={80 + ((i + 5) % 5) * 210 + Math.sin((i + 5) * 0.5) * 40}
                    y2={80 + Math.floor((i + 5) / 5) * 180 + Math.cos((i + 5) * 0.5) * 40}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-ivory"
                    opacity={0.15}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.05;0.25;0.05"
                      dur={`${3 + i * 0.1}s`}
                      repeatCount="indefinite"
                    />
                  </line>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-signal-green/30 rounded-full"
            style={{
              left: `${10 + (i * 4.5)}%`,
              top: `${5 + (i * 4.7)}%`,
              animation: `float ${5 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          
          {/* Left: Text Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Label with enhanced glow */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-signal-green/10 border border-signal-green/30 backdrop-blur-xl rounded-full shadow-lg shadow-signal-green/10 hover:shadow-signal-green/20 transition-shadow duration-500 group cursor-default">
              <div className="relative">
                <Brain className="w-4 h-4 text-signal-green group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 animate-ping opacity-60">
                  <Brain className="w-4 h-4 text-signal-green" />
                </div>
              </div>
              <span className="text-signal-green text-xs tracking-[0.2em] uppercase font-semibold">
                AI-Powered Performance
              </span>
            </div>

            {/* Main Headline with enhanced effects */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.05] tracking-tight">
              Meet
              <span className="relative inline-block ml-4">
                <span className="relative z-10 bg-gradient-to-r from-signal-green via-emerald-300 to-signal-green bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  Nova
                </span>
                <div className="absolute -inset-3 bg-gradient-to-r from-signal-green/30 via-emerald-400/20 to-signal-green/30 blur-2xl rounded-full animate-pulse" />
                <div className="absolute -inset-1 bg-signal-green/10 blur-md rounded-full" />
              </span>
              <br />
              <span className="text-stone/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mt-2 block">
                Your AI Health Coach
              </span>
            </h1>

            {/* Glassmorphism AI Typing Animation */}
            <div className="relative max-w-lg mx-auto lg:mx-0 group">
              {/* Glow behind */}
              <div className="absolute -inset-1 bg-gradient-to-r from-signal-green/20 via-transparent to-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-signal-green via-emerald-500 to-signal-green flex items-center justify-center shrink-0 shadow-lg shadow-signal-green/30">
                    <div className="w-3.5 h-3.5 bg-carbon rounded-full animate-pulse" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                  </div>
                  <div className="flex-1 min-h-[52px] flex items-center">
                    <span className="text-ivory/90 font-mono text-sm tracking-wide">
                      {typingText}
                      <span className="inline-block w-0.5 h-5 bg-signal-green ml-0.5 animate-pulse" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Pills with hover effects */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              {[
                { label: "Wearable Sync", icon: Activity },
                { label: "Smart Protocols", icon: Brain },
                { label: "Predictive AI", icon: Sparkles },
                { label: "24/7 Coaching", icon: Zap },
              ].map((pill) => (
                <span 
                  key={pill.label}
                  className="group flex items-center gap-1.5 px-4 py-2 text-xs bg-white/[0.03] backdrop-blur-sm border border-white/10 text-ivory/80 rounded-full hover:border-signal-green/30 hover:bg-signal-green/5 hover:text-signal-green transition-all duration-300 cursor-default"
                >
                  <pill.icon className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  {pill.label}
                </span>
              ))}
            </div>

            {/* Enhanced CTAs */}
            <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4">
              <Link to="/nova">
                <Button 
                  className={cn(
                    "relative bg-signal-green text-carbon hover:bg-signal-green/90 font-semibold",
                    "h-11 sm:h-12 px-6 sm:px-8 text-sm tracking-wide",
                    "shadow-xl shadow-signal-green/25 hover:shadow-signal-green/40",
                    "transition-all duration-300 group overflow-hidden"
                  )}
                >
                  <span className="relative z-10 flex items-center">
                    Start with Nova
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </Link>
              <Link to="/shop">
                <Button 
                  variant="outline"
                  className={cn(
                    "relative bg-transparent border-2 border-ivory/80 text-ivory",
                    "hover:bg-ivory hover:text-carbon font-medium",
                    "h-11 sm:h-12 px-6 sm:px-8 text-sm tracking-wide",
                    "transition-all duration-300 group"
                  )}
                >
                  Shop Products
                </Button>
              </Link>
            </div>

            {/* Enhanced Social Proof Strip */}
            <div className="pt-8 max-w-lg mx-auto lg:mx-0 space-y-5">
              {/* Active users indicator */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex -space-x-2.5">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-signal-green/30 to-emerald-600/30 border-2 border-carbon flex items-center justify-center shadow-lg hover:scale-110 hover:z-10 transition-transform cursor-default"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <span className="text-[10px] text-ivory font-semibold">
                        {['JD', 'MK', 'AS', 'TR', 'RL'][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="text-ivory font-semibold">2,847 people</span>
                  <span className="text-stone ml-1">started this week</span>
                </div>
                <div className="w-2 h-2 bg-signal-green rounded-full animate-pulse" />
              </div>

              {/* Metrics row */}
              <AnimatedMetrics />
            </div>
          </div>

          {/* Right: Nova Interface Demo */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            <div 
              className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] cursor-pointer group"
              onClick={() => setShowDemo(true)}
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {/* Multi-layer glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-br from-signal-green/30 via-transparent to-violet-500/30 rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-transparent to-signal-green/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              
              {/* Glassmorphism frame */}
              <div className="absolute inset-0 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/30" />
              
              {/* The demo interface */}
              <div className="relative z-10">
                <NovaInterfaceDemo />
              </div>
              
              {/* Play overlay on hover */}
              <div className="absolute inset-0 bg-carbon/50 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-signal-green to-emerald-600 flex items-center justify-center shadow-2xl shadow-signal-green/40 transform group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-carbon ml-1" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-signal-green to-emerald-500 text-carbon text-xs font-bold rounded-full shadow-xl shadow-signal-green/30 animate-bounce z-30" style={{ animationDuration: '2.5s' }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-carbon rounded-full animate-pulse" />
                  Live Demo
                </span>
              </div>
              
              {/* Corner accents */}
              <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-2 border-b-2 border-signal-green/30 rounded-bl-xl opacity-60" />
              <div className="absolute -top-2 -right-2 w-16 h-16 border-r-2 border-t-2 border-violet-500/30 rounded-tr-xl opacity-60" />
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
              className="absolute -top-12 right-0 text-ivory/60 hover:text-ivory transition-colors flex items-center gap-2 text-sm z-[60]"
            >
              Close <X className="w-4 h-4" />
            </button>
            
            {/* Demo interface full size */}
            <NovaInterfaceDemo />
            
            {/* Guided Tour Overlay */}
            {showTour && (
              <GuidedTour 
                onComplete={() => setShowTour(false)}
                onSkip={() => setShowTour(false)}
              />
            )}
            
            {/* Tour toggle and CTA below modal */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
              {!showTour && (
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => setShowTour(true)}
                  className="border-ivory/20 text-ivory hover:bg-ivory/10"
                >
                  <BookOpen className="mr-2 w-4 h-4" />
                  Take a Tour
                </Button>
              )}
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
