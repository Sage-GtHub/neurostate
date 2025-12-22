import { Button } from "@/components/ui/button";
import { ArrowRight, Play, X, BookOpen, Brain, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import NovaInterfaceDemo from "./NovaInterfaceDemo";
import GuidedTour from "./GuidedTour";
import { cn } from "@/lib/utils";

// Device integration logos
import ouraLogo from "@/assets/wearables/oura-logo.png";
import whoopLogo from "@/assets/wearables/whoop-logo.png";
import garminLogo from "@/assets/wearables/garmin-logo.png";
import appleHealthLogo from "@/assets/wearables/apple-health-logo.png";
import fitbitLogo from "@/assets/wearables/fitbit-logo.png";

// Animated typing phrases with benefit focus
const typingPhrases = [
  "Predicting your peak performance window...",
  "Optimising recovery for tomorrow's session...",
  "Analysing 847 biometric data points...",
  "Generating your personalised protocol...",
  "Forecasting energy levels for the week...",
];

// Minimal Device Logos
const DeviceLogos = () => {
  const devices = [
    { src: ouraLogo, alt: "Oura" },
    { src: whoopLogo, alt: "WHOOP" },
    { src: garminLogo, alt: "Garmin" },
    { src: appleHealthLogo, alt: "Apple Health" },
    { src: fitbitLogo, alt: "Fitbit" },
  ];

  return (
    <div className="flex items-center gap-6">
      <span className="text-stone/60 text-[11px] uppercase tracking-[0.15em] font-medium">Syncs with</span>
      <div className="flex items-center gap-3">
        {devices.map((device) => (
          <div 
            key={device.alt}
            className="w-7 h-7 rounded-md bg-white/[0.03] p-1 opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            <img 
              src={device.src} 
              alt={device.alt} 
              className="w-full h-full object-contain grayscale"
            />
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

  // Generate stable particle positions - reduced count for minimal look
  const particles = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      left: `${5 + (i * 6.5) % 90}%`,
      top: `${3 + (i * 6.6) % 94}%`,
      delay: i * 0.3,
      duration: 8 + (i % 3),
      size: 1 + (i % 2) * 0.5,
    }));
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-carbon"
    >
      {/* Minimal gradient background */}
      <div className="absolute inset-0 z-[1]">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 60%)',
            left: '60%',
            top: '30%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
            transition: 'transform 1s ease-out',
            filter: 'blur(100px)',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%)',
            left: '20%',
            top: '60%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 1.2s ease-out',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'rgba(34,197,94,0.4)',
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[70vh]">
          
          {/* Left: Text Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-signal-green/10 border border-signal-green/20 rounded-full">
              <Brain className="w-3.5 h-3.5 text-signal-green" />
              <span className="text-signal-green text-xs tracking-[0.15em] uppercase font-medium">
                AI Health Intelligence
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-ivory leading-[1.05] tracking-tight">
                Meet
                <span className="relative inline-block ml-3">
                  <span className="bg-gradient-to-r from-signal-green to-emerald-400 bg-clip-text text-transparent">
                    Nova
                  </span>
                  <div className="absolute -inset-4 bg-signal-green/20 blur-3xl rounded-full -z-10" />
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-stone/80 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                Unlock <span className="text-ivory">peak performance</span> with AI that 
                predicts and adapts to your body.
              </p>
            </div>

            {/* AI Typing Animation - Clean */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-signal-green to-emerald-500 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 bg-carbon rounded-full" />
                  </div>
                  <span className="text-ivory/80 font-mono text-sm">
                    {typingText}
                    <span className="inline-block w-0.5 h-4 bg-signal-green ml-1 animate-pulse" />
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/nova">
                <Button 
                  className="bg-signal-green text-carbon hover:bg-signal-green/90 font-semibold h-12 px-8 text-sm tracking-wide shadow-lg shadow-signal-green/20"
                >
                  Start Optimising Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/shop">
                <Button 
                  variant="outline"
                  className="bg-transparent border border-ivory/20 text-ivory hover:bg-ivory/5 hover:border-ivory/40 font-medium h-12 px-8 text-sm"
                >
                  Explore Products
                  <ChevronRight className="w-4 h-4 ml-1 opacity-60" />
                </Button>
              </Link>
            </div>

            {/* Device Integration Logos */}
            <div className="pt-2">
              <DeviceLogos />
            </div>
          </div>

          {/* Right: Nova Interface Demo */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            <div 
              className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] cursor-pointer group"
              onClick={() => setShowDemo(true)}
              style={{
                transform: `perspective(1200px) rotateX(${mousePosition.y * 4}deg) rotateY(${mousePosition.x * -4}deg)`,
                transition: 'transform 0.6s ease-out'
              }}
            >
              {/* Glow */}
              <div className="absolute -inset-8 bg-gradient-to-br from-signal-green/20 via-transparent to-violet-500/15 rounded-3xl blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Frame */}
              <div className="absolute inset-0 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06]" />
              
              {/* Demo interface */}
              <div className="relative z-10">
                <NovaInterfaceDemo />
              </div>
              
              {/* Play overlay */}
              <div className="absolute inset-0 bg-carbon/50 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-signal-green to-emerald-500 flex items-center justify-center shadow-xl shadow-signal-green/30">
                  <Play className="w-6 h-6 text-carbon ml-0.5" />
                </div>
              </div>
              
              {/* Live badge */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-signal-green text-carbon text-xs font-semibold rounded-full shadow-lg z-30">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-carbon rounded-full animate-pulse" />
                  Live Demo
                </span>
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
          <div className="absolute inset-0 bg-carbon/95 backdrop-blur-xl" />
          
          <div 
            className="relative w-full max-w-4xl aspect-[4/3] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowDemo(false)}
              className="absolute -top-12 right-0 text-ivory/60 hover:text-ivory transition-colors flex items-center gap-2 text-sm z-[60]"
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-carbon to-transparent pointer-events-none z-[5]" />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10">
        <span className="text-stone/40 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center">
          <div className="w-0.5 h-2 bg-signal-green/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
