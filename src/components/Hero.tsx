import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Activity, Zap, Target, TrendingUp, Shield, Sparkles, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// Nova AI features to showcase
const novaFeatures = [
  { 
    icon: Brain,
    name: "Cognitive Analysis", 
    description: "Real-time brain state monitoring",
    color: "from-violet-500 to-purple-600"
  },
  { 
    icon: Activity,
    name: "Biometric Sync", 
    description: "Connect 10+ wearable devices",
    color: "from-cyan-500 to-blue-600"
  },
  { 
    icon: Target,
    name: "Goal Tracking", 
    description: "AI-optimised performance goals",
    color: "from-emerald-500 to-teal-600"
  },
  { 
    icon: Zap,
    name: "Smart Protocols", 
    description: "Personalised daily routines",
    color: "from-amber-500 to-orange-600"
  },
  { 
    icon: TrendingUp,
    name: "Predictive Insights", 
    description: "Forecast your readiness",
    color: "from-rose-500 to-pink-600"
  },
  { 
    icon: Shield,
    name: "Recovery Optimisation", 
    description: "Science-backed interventions",
    color: "from-indigo-500 to-blue-600"
  },
];

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
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pulseActive, setPulseActive] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % novaFeatures.length);
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const activeFeature = novaFeatures[activeFeatureIndex];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-carbon"
    >
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          {/* Animated network nodes */}
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
              {/* Connecting lines */}
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
        className={`absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30 transition-all duration-1000 bg-gradient-to-br ${activeFeature.color}`}
        style={{
          left: '60%',
          top: '40%',
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-20 bg-gradient-to-br from-signal-green/40 to-transparent"
        style={{
          left: '20%',
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
                  <MessageCircle className="w-5 h-5 text-carbon" />
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
              <Link to="/shop">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-ivory/20 text-ivory hover:bg-ivory/10 font-medium transition-all duration-300 min-h-[56px] px-8 text-sm tracking-wide"
                >
                  Explore Products
                </Button>
              </Link>
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

          {/* Right: AI Feature Showcase */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center min-h-[500px]">
            {/* Central AI Core */}
            <div className="relative">
              {/* Pulse rings */}
              <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${pulseActive ? 'scale-110' : 'scale-100'}`}>
                <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full border border-signal-green/20 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                <div className="absolute w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] rounded-full border border-signal-green/10 animate-ping opacity-10" style={{ animationDuration: '4s' }} />
              </div>

              {/* Rotating orbit ring */}
              <div 
                className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ animation: 'spin 30s linear infinite' }}
              >
                <div className="absolute inset-0 rounded-full border border-dashed border-ivory/10" />
                {/* Orbit dots */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div
                    key={deg}
                    className="absolute w-2 h-2 rounded-full bg-signal-green/60"
                    style={{
                      left: '50%',
                      top: '0',
                      transform: `translateX(-50%) rotate(${deg}deg) translateY(-50%)`,
                      transformOrigin: '50% 200px',
                    }}
                  />
                ))}
              </div>

              {/* Feature cards orbiting */}
              <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {novaFeatures.map((feature, index) => {
                  const angle = (360 / novaFeatures.length) * index - 90;
                  const isActive = index === activeFeatureIndex;
                  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 130 : 180;
                  const FeatureIcon = feature.icon;
                  
                  return (
                    <div
                      key={feature.name}
                      className={`absolute transition-all duration-500 cursor-pointer ${
                        isActive ? 'scale-110 z-20' : 'scale-100 z-10 opacity-50'
                      }`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                      }}
                      onClick={() => setActiveFeatureIndex(index)}
                    >
                      <div className={`
                        w-14 h-14 sm:w-16 sm:h-16 rounded-xl 
                        bg-gradient-to-br ${feature.color} 
                        flex items-center justify-center
                        shadow-lg transition-all duration-300
                        ${isActive ? 'shadow-2xl ring-2 ring-white/20' : 'hover:scale-110'}
                      `}>
                        <FeatureIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Central Nova AI Brain */}
              <div 
                className="relative w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60"
                style={{
                  transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${activeFeature.color} blur-2xl opacity-40 transition-all duration-500`} />
                
                {/* Main circle */}
                <div className="absolute inset-0 rounded-full bg-carbon border-2 border-ivory/10 flex items-center justify-center overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-carbon via-carbon to-signal-green/10 animate-pulse" />
                  
                  {/* Inner content */}
                  <div className="relative z-10 text-center">
                    <div className="relative">
                      <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-signal-green mx-auto" />
                      <div className="absolute inset-0 animate-pulse">
                        <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-signal-green mx-auto opacity-50 blur-sm" />
                      </div>
                    </div>
                    <div className="mt-2 text-ivory font-bold text-lg sm:text-xl">NOVA</div>
                    <div className="text-signal-green text-[10px] sm:text-xs uppercase tracking-widest">AI Active</div>
                  </div>

                  {/* Scanning line effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-signal-green/10 to-transparent"
                    style={{
                      animation: 'scan 2s linear infinite',
                    }}
                  />
                </div>
              </div>

              {/* Active Feature Info */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 sm:w-80 text-center">
                <div className={`bg-gradient-to-r ${activeFeature.color} bg-clip-text text-transparent font-bold text-lg sm:text-xl mb-1`}>
                  {activeFeature.name}
                </div>
                <div className="text-stone text-sm">
                  {activeFeature.description}
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {novaFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeatureIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeFeatureIndex 
                      ? 'w-8 bg-signal-green' 
                      : 'w-1.5 bg-ivory/20 hover:bg-ivory/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-carbon to-transparent pointer-events-none" />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-stone/50 text-xs uppercase tracking-widest">Discover More</span>
        <div className="w-px h-8 bg-gradient-to-b from-stone/50 to-transparent relative overflow-hidden">
          <div className="absolute w-full h-3 bg-signal-green animate-bounce" />
        </div>
      </div>

      {/* Add scan animation keyframes */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
