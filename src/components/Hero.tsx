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
      className="relative min-h-[100dvh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-carbon pt-16 sm:pt-20 lg:pt-0"
    >
      {/* Premium AI Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
        >
          <source 
            src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon via-carbon/80 to-carbon/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-carbon/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Multi-layer Animated Gradient Mesh */}
      <div className="absolute inset-0 z-[1]">
        {/* Layer 1 - Slowest, largest */}
        <div 
          className="absolute w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.35) 0%, transparent 60%)',
            left: '60%',
            top: '20%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 80}px, ${mousePosition.y * 80}px) translateY(${scrollY * 0.1}px)`,
            transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: 'blur(100px)',
          }}
        />
        
        {/* Layer 2 - Medium speed */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 60%)',
            left: '15%',
            top: '70%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * -50}px, ${mousePosition.y * -50}px) translateY(${scrollY * 0.15}px)`,
            transition: 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Layer 3 - Faster */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.45) 0%, transparent 60%)',
            left: '85%',
            top: '30%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 40}px, ${mousePosition.y * -40}px) translateY(${scrollY * 0.2}px)`,
            transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: 'blur(70px)',
          }}
        />
        
        {/* Layer 4 - Fastest, smallest */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 60%)',
            left: '40%',
            top: '80%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * -30}px, ${mousePosition.y * 30}px) translateY(${scrollY * 0.25}px)`,
            transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Layer 5 - Accent glow */}
        <div 
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.5) 0%, transparent 50%)',
            left: '50%',
            top: '40%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 100}px, ${mousePosition.y * 100}px)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Animated Grid Pattern - Subtle neural network */}
      <div className="absolute inset-0 z-[2] opacity-[0.04]" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(34,197,94)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(34,197,94)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(34,197,94)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="rgb(255,255,255)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {[...Array(30)].map((_, i) => {
            const x = 50 + (i % 6) * 160 + Math.sin(i * 0.8) * 30;
            const y = 50 + Math.floor(i / 6) * 160 + Math.cos(i * 0.8) * 30;
            return (
              <g key={i}>
                <circle 
                  cx={x}
                  cy={y}
                  r="5"
                  fill="url(#nodeGlow)"
                >
                  <animate
                    attributeName="r"
                    values="3;7;3"
                    dur={`${2 + i * 0.12}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur={`${2 + i * 0.12}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                {i < 24 && i % 3 === 0 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={50 + ((i + 6) % 6) * 160 + Math.sin((i + 6) * 0.8) * 30}
                    y2={50 + Math.floor((i + 6) / 6) * 160 + Math.cos((i + 6) * 0.8) * 30}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    opacity={0.2}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.1;0.3;0.1"
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

      {/* Enhanced Floating Particles with varied sizes */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: i % 3 === 0 ? 'rgba(34,197,94,0.5)' : i % 3 === 1 ? 'rgba(139,92,246,0.4)' : 'rgba(6,182,212,0.4)',
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              boxShadow: `0 0 ${particle.size * 4}px rgba(34,197,94,0.3)`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-20 items-center min-h-[calc(100dvh-8rem)] sm:min-h-[75vh] lg:min-h-[75vh]">
          
          {/* Left: Text Content */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left order-2 lg:order-1">
            {/* Label with enhanced glow and micro-interaction - hidden on mobile for space */}
            <div className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-signal-green/10 border border-signal-green/30 backdrop-blur-xl rounded-full shadow-lg shadow-signal-green/10 hover:shadow-signal-green/30 active:scale-95 sm:hover:scale-105 transition-all duration-500 group cursor-default">
              <div className="relative">
                <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-signal-green group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 animate-ping opacity-40">
                  <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-signal-green" />
                </div>
              </div>
              <span className="text-signal-green text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold">
                AI Health Intelligence
              </span>
            </div>

            {/* Main Headline with clearer value proposition */}
            <div className="space-y-1.5 sm:space-y-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-ivory leading-[1.15] sm:leading-[1.05] tracking-tight">
                Meet
                <span className="relative inline-block ml-1.5 sm:ml-3 lg:ml-4">
                  <span className="relative z-10 bg-gradient-to-r from-signal-green via-emerald-300 to-signal-green bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    Nova
                  </span>
                  <div className="absolute -inset-1 sm:-inset-4 bg-gradient-to-r from-signal-green/40 via-emerald-400/30 to-signal-green/40 blur-xl sm:blur-3xl rounded-full animate-pulse" />
                  <div className="absolute -inset-0.5 sm:-inset-2 bg-signal-green/20 blur-md sm:blur-xl rounded-full" />
                </span>
              </h1>
              
              {/* Clear benefit statement */}
              <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-stone/90 font-light leading-relaxed px-1 sm:px-0">
                Unlock <span className="text-ivory font-medium">peak performance</span> with AI that{" "}
                <span className="text-signal-green font-medium">predicts</span> and{" "}
                <span className="text-signal-green font-medium">adapts</span> to your body.
              </p>
            </div>

            {/* Glassmorphism AI Typing Animation */}
            <div className="relative max-w-xl mx-auto lg:mx-0 group hidden sm:block">
              {/* Multi-layer glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-signal-green/30 via-emerald-500/20 to-cyan-500/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -inset-1 bg-gradient-to-r from-signal-green/20 via-transparent to-violet-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xl shadow-black/30">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-signal-green via-emerald-500 to-teal-500 flex items-center justify-center shrink-0 shadow-lg shadow-signal-green/40 group-hover:shadow-signal-green/60 transition-shadow">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-carbon rounded-full animate-pulse" />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/30 to-transparent" />
                    {/* Rotating ring */}
                    <div className="absolute -inset-1 rounded-lg sm:rounded-xl border border-signal-green/30 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div className="flex-1 min-h-[40px] sm:min-h-[56px] flex items-center">
                    <span className="text-ivory/90 font-mono text-xs sm:text-sm tracking-wide">
                      {typingText}
                      <span className="inline-block w-0.5 h-4 sm:h-5 bg-signal-green ml-1 animate-pulse" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Pills with enhanced micro-interactions */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2.5 justify-center lg:justify-start px-2 sm:px-0">
              {[
                { label: "Wearable Sync", icon: Activity, color: "signal-green" },
                { label: "Smart Protocols", icon: Brain, color: "violet-400" },
                { label: "Predictive AI", icon: Sparkles, color: "cyan-400" },
                { label: "24/7 Coaching", icon: Zap, color: "amber-400" },
              ].map((pill) => (
                <span 
                  key={pill.label}
                  className={cn(
                    "group flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-xs font-medium",
                    "bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]",
                    "text-ivory/80 rounded-full",
                    "hover:border-signal-green/40 hover:bg-signal-green/10 hover:text-signal-green",
                    "active:scale-95 sm:hover:scale-105 hover:shadow-lg hover:shadow-signal-green/20",
                    "transition-all duration-300 cursor-default"
                  )}
                >
                  <pill.icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />
                  {pill.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-row gap-2 sm:gap-3 justify-center lg:justify-start pt-2 px-2 sm:px-0">
              <Link to="/nova" className="flex-1 sm:flex-none">
                <Button 
                  className={cn(
                    "relative bg-signal-green text-carbon hover:bg-signal-green font-semibold w-full sm:w-auto",
                    "h-10 sm:h-11 px-4 sm:px-7 text-xs sm:text-sm tracking-wide",
                    "shadow-lg shadow-signal-green/25 active:shadow-signal-green/40",
                    "transition-all duration-300 group overflow-hidden active:scale-95"
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    Start Free
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </Link>
              <Link to="/shop" className="flex-1 sm:flex-none">
                <Button 
                  variant="outline"
                  className={cn(
                    "relative bg-transparent border border-ivory/40 text-ivory w-full sm:w-auto",
                    "hover:bg-ivory hover:text-carbon hover:border-ivory font-medium",
                    "h-10 sm:h-11 px-4 sm:px-7 text-xs sm:text-sm tracking-wide",
                    "transition-all duration-300 group active:scale-95"
                  )}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    Products
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Social Proof + Metrics */}
            <div className="pt-2 sm:pt-3 max-w-xl mx-auto lg:mx-0 space-y-2 sm:space-y-3">
              {/* Active users indicator */}
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="flex -space-x-1.5 sm:-space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-signal-green/40 to-emerald-600/40 border-[1.5px] sm:border-2 border-carbon flex items-center justify-center shadow-md active:scale-110 sm:hover:scale-110 hover:z-10 transition-all duration-300 cursor-default"
                    >
                      <span className="text-[6px] sm:text-[8px] text-ivory font-bold">
                        {['JD', 'MK', 'AS', 'TR'][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] sm:text-xs">
                  <span className="text-ivory font-semibold">2,847</span>
                  <span className="text-stone/70 ml-1">active now</span>
                </div>
                <div className="relative">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-signal-green rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-signal-green rounded-full animate-ping opacity-50" />
                </div>
              </div>

              {/* Metrics row */}
              <AnimatedMetrics />
            </div>
          </div>

          {/* Right: Nova Interface Demo */}
          <div className="relative order-1 lg:order-2 flex flex-col items-center justify-center">
            {/* Demo Interface */}
            <div 
              className="relative w-full max-w-[240px] sm:max-w-md lg:max-w-lg aspect-[4/3] cursor-pointer group"
              onClick={() => setShowDemo(true)}
              style={{
                transform: `perspective(1200px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * -3}deg) translateY(${scrollY * -0.03}px)`,
                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {/* Multi-layer glow effects */}
              <div className="absolute -inset-4 sm:-inset-10 bg-gradient-to-br from-signal-green/25 via-transparent to-violet-500/25 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
              <div className="absolute -inset-3 sm:-inset-6 bg-gradient-to-tr from-cyan-500/15 via-transparent to-signal-green/15 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Glassmorphism frame */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40" />
              
              {/* The demo interface */}
              <div className="relative z-10">
                <NovaInterfaceDemo />
              </div>
              
              {/* Play overlay - always visible on mobile as tap hint */}
              <div className="absolute inset-0 bg-carbon/40 sm:bg-carbon/60 backdrop-blur-sm sm:backdrop-blur-md rounded-xl sm:rounded-2xl opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center z-20">
                <div className="relative w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-signal-green via-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-signal-green/50 transform group-hover:scale-110 active:scale-95 transition-transform duration-300">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-carbon ml-0.5 sm:ml-1" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                  {/* Pulsing ring */}
                  <div className="absolute -inset-2 sm:-inset-3 rounded-full border-2 border-signal-green/50 animate-ping opacity-30" />
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 px-2.5 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-signal-green to-emerald-500 text-carbon text-[10px] sm:text-xs font-bold rounded-full shadow-xl shadow-signal-green/40 z-30 active:scale-95 sm:hover:scale-110 transition-transform">
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-carbon rounded-full animate-pulse" />
                  Live Demo
                </span>
              </div>
              
              {/* Corner decorations - hidden on mobile */}
              <div className="hidden sm:block absolute -bottom-3 -left-3 w-20 h-20 border-l-2 border-b-2 border-signal-green/40 rounded-bl-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="hidden sm:block absolute -top-3 -right-3 w-20 h-20 border-r-2 border-t-2 border-violet-500/40 rounded-tr-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>

      {/* Full Demo Modal */}
      {showDemo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-8"
          onClick={() => setShowDemo(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-carbon/95 backdrop-blur-2xl animate-fade-in" />
          
          {/* Modal content */}
          <div 
            className="relative w-full max-w-4xl aspect-[4/3] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setShowDemo(false)}
              className="absolute -top-10 sm:-top-12 right-0 text-ivory/60 hover:text-ivory active:text-ivory transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm z-[60] active:scale-95 sm:hover:scale-105"
            >
              Close <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
            <div className="absolute -bottom-14 sm:-bottom-16 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full px-4 sm:w-auto sm:px-0">
              {!showTour && (
                <Button 
                  variant="outline"
                  size="default"
                  onClick={() => setShowTour(true)}
                  className="bg-ivory border-ivory/20 text-carbon hover:bg-ivory/90 w-full sm:w-auto h-9 sm:h-11 text-xs sm:text-sm"
                >
                  <BookOpen className="mr-1.5 sm:mr-2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-carbon" />
                  Take a Tour
                </Button>
              )}
              <Link to="/nova" className="w-full sm:w-auto">
                <Button 
                  size="default"
                  className="bg-signal-green text-carbon hover:bg-signal-green/90 font-bold shadow-lg shadow-signal-green/30 w-full sm:w-auto h-9 sm:h-11 text-xs sm:text-sm"
                >
                  Try Nova Now
                  <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-carbon via-carbon/80 to-transparent pointer-events-none z-[5]" />
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
        <span className="text-stone/60 text-xs uppercase tracking-[0.2em] font-medium">Discover More</span>
        <div className="relative w-6 h-10 rounded-full border border-white/20 flex justify-center">
          <div className="w-1 h-3 bg-signal-green rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
