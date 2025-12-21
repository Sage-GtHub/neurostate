import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// Product showcase data
const products = [
  { 
    name: "RedRestore Pro", 
    category: "Red Light Therapy",
    image: "/src/assets/redrestore-pro-panel-new.png",
    gradient: "from-red-500/20 to-orange-500/10"
  },
  { 
    name: "NeuroFocus", 
    category: "Cognitive Support",
    image: "/src/assets/neurofocus-cognitive-new.png",
    gradient: "from-blue-500/20 to-cyan-500/10"
  },
  { 
    name: "AdaptBalance", 
    category: "Stress Resilience",
    image: "/src/assets/adaptbalance-stress-new.png",
    gradient: "from-emerald-500/20 to-teal-500/10"
  },
  { 
    name: "Omega-3 Elite", 
    category: "Brain Health",
    image: "/src/assets/omega3-elite-new.png",
    gradient: "from-amber-500/20 to-yellow-500/10"
  },
  { 
    name: "CryoPlunge", 
    category: "Cold Therapy",
    image: "/src/assets/cryoplunge-ice-bath-new.png",
    gradient: "from-cyan-500/20 to-blue-500/10"
  },
  { 
    name: "PEMF Mat", 
    category: "Recovery Tech",
    image: "/src/assets/pemf-therapy-mat-new.png",
    gradient: "from-purple-500/20 to-pink-500/10"
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Auto-rotate products
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % products.length);
        setIsAnimating(false);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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

  const activeProduct = products[activeIndex];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-carbon"
    >
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0 animate-pulse" 
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Dynamic Gradient Orbs */}
      <div 
        className={`absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20 transition-all duration-1000 bg-gradient-to-br ${activeProduct.gradient}`}
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-10 bg-gradient-to-br from-signal-green/30 to-transparent"
        style={{
          right: '-10%',
          top: '20%',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]">
          
          {/* Left: Text Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-ivory/5 border border-ivory/10 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-signal-green" />
              <span className="text-ivory/70 text-xs tracking-[0.3em] uppercase font-medium">
                Cognitive Performance System
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.05] tracking-tight">
              Upgrade Your
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-ivory via-signal-green to-ivory bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  Operating System
                </span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-stone max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              AI-powered protocols. Red light therapy. Precision supplements.
              <span className="text-ivory/90"> Engineered for elite performance.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to="/shop">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-ivory text-carbon hover:bg-signal-green hover:text-carbon font-medium transition-all duration-300 min-h-[56px] px-8 text-sm tracking-wide group"
                >
                  Explore Products
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/nova">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-ivory/20 text-ivory hover:bg-ivory/10 font-medium transition-all duration-300 min-h-[56px] px-8 text-sm tracking-wide"
                >
                  Meet Nova AI
                </Button>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 text-center">
              {[
                { value: "50K+", label: "Active Users" },
                { value: "4.9", label: "App Rating" },
                { value: "127%", label: "Avg. Focus Boost" },
              ].map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-ivory metric-value">
                    {metric.value}
                  </div>
                  <div className="text-xs text-stone/70 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Showcase */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            {/* Rotating Ring */}
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
              <div 
                className="absolute inset-0 rounded-full border border-ivory/5"
                style={{ animation: 'spin 60s linear infinite' }}
              />
              <div 
                className="absolute inset-4 rounded-full border border-ivory/10"
                style={{ animation: 'spin 45s linear infinite reverse' }}
              />
              <div 
                className="absolute inset-8 rounded-full border border-dashed border-signal-green/20"
                style={{ animation: 'spin 30s linear infinite' }}
              />
            </div>

            {/* Product Cards Orbit */}
            <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px]">
              {products.map((product, index) => {
                const angle = (360 / products.length) * index - 90;
                const isActive = index === activeIndex;
                const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 140 : 200;
                
                return (
                  <div
                    key={product.name}
                    className={`absolute w-16 h-16 sm:w-20 sm:h-20 transition-all duration-500 ${
                      isActive ? 'scale-125 z-20' : 'scale-100 z-10 opacity-40'
                    }`}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                    }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className={`w-full h-full rounded-xl bg-gradient-to-br ${product.gradient} backdrop-blur-sm border ${isActive ? 'border-signal-green/50' : 'border-ivory/10'} p-2 cursor-pointer hover:scale-110 transition-transform`}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Active Product */}
            <div className={`relative z-30 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
              <div className={`w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl bg-gradient-to-br ${activeProduct.gradient} backdrop-blur-xl border border-ivory/10 p-6 sm:p-8`}>
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    transition: 'transform 0.2s ease-out'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
              
              {/* Product Info Card */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-carbon/90 backdrop-blur-sm border border-ivory/10 px-6 py-3 min-w-[200px]">
                <div className="text-center">
                  <div className="text-ivory font-semibold text-sm sm:text-base">{activeProduct.name}</div>
                  <div className="text-signal-green text-xs uppercase tracking-wider">{activeProduct.category}</div>
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-signal-green' 
                      : 'bg-ivory/20 hover:bg-ivory/40'
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
        <span className="text-stone/50 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-stone/50 to-transparent relative">
          <div className="absolute w-1 h-3 bg-signal-green -left-[1px] animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;