import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, X, BookOpen, Zap, Brain, Activity, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import NovaInterfaceDemo from "./NovaInterfaceDemo";
import GuidedTour from "./GuidedTour";
import { cn } from "@/lib/utils";


// Animated typing phrases with benefit focus
const typingPhrases = [
  "Predicting your peak performance window...",
  "Optimising recovery for tomorrow's session...",
  "Analysing 847 biometric data points...",
  "Generating your personalised protocol...",
  "Forecasting energy levels for the week...",
  "Adapting recommendations in real-time...",
];


// Animated metrics component with enhanced glassmorphism
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
    { value: `${counts.users}K+`, label: "Active Users", icon: Activity },
    { value: `${(counts.rating / 10).toFixed(1)}★`, label: "App Rating", icon: Sparkles },
    { value: `${counts.success}%`, label: "See Results", icon: Zap },
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative group"
    >
      {/* Glassmorphism glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-signal-green/15 via-emerald-500/10 to-cyan-500/15 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-center justify-center lg:justify-start gap-2 sm:gap-4 py-2 sm:py-3 px-3 sm:px-4 bg-white/[0.04] backdrop-blur-2xl rounded-xl border border-white/[0.08] shadow-xl shadow-black/20">
        {metrics.map((metric, i) => (
          <div key={metric.label} className="flex items-center gap-2 sm:gap-4">
            <div className="text-center group/metric cursor-default">
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-0.5">
                <metric.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-signal-green opacity-80 group-hover/metric:opacity-100 group-hover/metric:scale-110 transition-all duration-300" />
                <div className="text-xs sm:text-base font-bold bg-gradient-to-r from-signal-green via-emerald-400 to-signal-green bg-clip-text text-transparent group-hover/metric:scale-105 transition-transform">
                  {metric.value}
                </div>
              </div>
              <div className="text-[7px] sm:text-[9px] text-stone/70 uppercase tracking-wider font-medium">{metric.label}</div>
            </div>
            {i < metrics.length - 1 && (
              <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            )}
          </div>
        ))}
      </div>
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
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Typing animation
  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    
    if (isTyping) {
      if (typingText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setTypingText(currentPhrase.slice(0, typingText.length + 1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (typingText.length > 0) {
        const timeout = setTimeout(() => {
          setTypingText(typingText.slice(0, -1));
        }, 20);
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

  // Track scroll for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate stable particle positions
  const particles = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      left: `${5 + (i * 3.2) % 90}%`,
      top: `${3 + (i * 3.3) % 94}%`,
      delay: i * 0.2,
      duration: 6 + (i % 4),
      size: 1 + (i % 3) * 0.5,
    }));
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-carbon"
    >
      {/* Video Background - hidden on mobile for performance */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-30"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
        >
          <source 
            src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Simplified overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-carbon via-carbon/90 to-carbon" />
      </div>

      {/* Gradient Mesh - simplified on mobile */}
      <div className="absolute inset-0 z-[1]">
        {/* Primary glow - always visible */}
        <div 
          className="absolute w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] lg:w-[1000px] lg:h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 60%)',
            left: '50%',
            top: '30%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Secondary glow - hidden on mobile */}
        <div 
          className="hidden sm:block absolute w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 60%)',
            left: '20%',
            top: '70%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.9s ease-out',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Grid Pattern - hidden on mobile */}
      <div className="hidden lg:block absolute inset-0 z-[2] opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(34,197,94)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(34,197,94)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[...Array(20)].map((_, i) => {
            const x = 100 + (i % 5) * 200;
            const y = 100 + Math.floor(i / 5) * 200;
            return (
              <circle 
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="url(#nodeGlow)"
                opacity="0.5"
              />
            );
          })}
        </svg>
      </div>

      {/* Particles - reduced on mobile */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none hidden sm:block">
        {particles.slice(0, 15).map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: i % 2 === 0 ? 'rgba(34,197,94,0.4)' : 'rgba(139,92,246,0.3)',
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-5 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-signal-green/10 border border-signal-green/30 rounded-full">
              <Brain className="w-4 h-4 text-signal-green" />
              <span className="text-signal-green text-xs tracking-widest uppercase font-semibold">
                AI Health Intelligence
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-ivory leading-tight tracking-tight">
                Meet{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-signal-green via-emerald-300 to-signal-green bg-clip-text text-transparent">
                    Nova
                  </span>
                  <div className="absolute -inset-2 bg-signal-green/30 blur-2xl rounded-full opacity-60" />
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl lg:text-2xl text-stone/80 font-light max-w-lg mx-auto lg:mx-0">
                Unlock <span className="text-ivory font-medium">peak performance</span> with AI that{" "}
                <span className="text-signal-green">predicts</span> and{" "}
                <span className="text-signal-green">adapts</span> to your body.
              </p>
            </div>

            {/* AI Typing Animation - hidden on mobile */}
            <div className="hidden sm:block relative max-w-xl mx-auto lg:mx-0">
              <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-signal-green to-emerald-500 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 bg-carbon rounded-full animate-pulse" />
                  </div>
                  <span className="text-ivory/80 font-mono text-sm">
                    {typingText}
                    <span className="inline-block w-0.5 h-4 bg-signal-green ml-1 animate-pulse" />
                  </span>
                </div>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {[
                { label: "Wearable Sync", icon: Activity },
                { label: "Smart Protocols", icon: Brain },
                { label: "Predictive AI", icon: Sparkles },
                { label: "24/7 Coaching", icon: Zap },
              ].map((pill) => (
                <span 
                  key={pill.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-ivory/70 rounded-full"
                >
                  <pill.icon className="w-3 h-3" />
                  {pill.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/nova" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-signal-green text-carbon hover:bg-signal-green/90 font-semibold h-12 px-8 text-sm shadow-lg shadow-signal-green/25">
                  Start Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/shop" className="w-full sm:w-auto">
                <Button 
                  variant="outline"
                  className="w-full sm:w-auto border-ivory/30 text-ivory hover:bg-ivory hover:text-carbon h-12 px-8 text-sm"
                >
                  Products
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-signal-green/40 to-emerald-600/40 border-2 border-carbon flex items-center justify-center"
                  >
                    <span className="text-[8px] text-ivory font-bold">
                      {['JD', 'MK', 'AS', 'TR'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-ivory font-semibold">2,847</span>
                <span className="text-stone/60 ml-1">active now</span>
              </div>
              <div className="w-2 h-2 bg-signal-green rounded-full animate-pulse" />
            </div>

            {/* Metrics - hidden on small mobile */}
            <div className="hidden sm:block">
              <AnimatedMetrics />
            </div>
          </div>

          {/* Right: Nova Interface Demo */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center mb-4 lg:mb-0">
            <div 
              className="relative w-full max-w-[300px] sm:max-w-md lg:max-w-lg aspect-[4/3] cursor-pointer group"
              onClick={() => setShowDemo(true)}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-signal-green/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
              
              {/* Frame */}
              <div className="absolute inset-0 rounded-xl bg-white/[0.03] border border-white/10" />
              
              {/* Demo interface */}
              <div className="relative z-10">
                <NovaInterfaceDemo />
              </div>
              
              {/* Play overlay */}
              <div className="absolute inset-0 bg-carbon/50 backdrop-blur-sm rounded-xl flex items-center justify-center z-20 group-hover:bg-carbon/60 transition-colors">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-signal-green to-emerald-500 flex items-center justify-center shadow-xl shadow-signal-green/40 group-active:scale-95 transition-transform">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-carbon ml-1" />
                </div>
              </div>
              
              {/* Live badge */}
              <div className="absolute -top-2 -right-2 px-3 py-1 bg-signal-green text-carbon text-xs font-bold rounded-full z-30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-carbon rounded-full animate-pulse" />
                Live Demo
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDemo(false)}
        >
          <div className="absolute inset-0 bg-carbon/95 backdrop-blur-xl" />
          
          <div 
            className="relative w-full max-w-4xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowDemo(false)}
              className="absolute -top-12 right-0 text-ivory/60 hover:text-ivory flex items-center gap-2 text-sm z-[60]"
            >
              Close <X className="w-4 h-4" />
            </button>
            
            <NovaInterfaceDemo />
            
            {showTour && (
              <GuidedTour 
                onComplete={() => setShowTour(false)}
                onSkip={() => setShowTour(false)}
              />
            )}
            
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-3 w-full px-4 sm:w-auto">
              {!showTour && (
                <Button 
                  variant="outline"
                  onClick={() => setShowTour(true)}
                  className="bg-ivory text-carbon hover:bg-ivory/90 w-full sm:w-auto"
                >
                  <BookOpen className="mr-2 w-4 h-4" />
                  Take a Tour
                </Button>
              )}
              <Link to="/nova" className="w-full sm:w-auto">
                <Button className="bg-signal-green text-carbon hover:bg-signal-green/90 font-bold w-full sm:w-auto">
                  Try Nova Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-carbon to-transparent pointer-events-none z-[5]" />
      
      {/* Scroll Indicator - desktop only */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10">
        <span className="text-stone/50 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center">
          <div className="w-1 h-2 bg-signal-green rounded-full mt-1.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
