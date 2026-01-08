import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, lazy, Suspense, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, useSpring, useTransform, useScroll, useInView } from "framer-motion";
import DataFlowDiagram from "./hero/DataFlowDiagram";

// Lazy load the 3D Abstract Wave Mesh for better performance
const AbstractWaveMesh = lazy(() => import("./hero/AbstractWaveMesh"));
// Animated number counter hook
const useCountUp = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!startOnView || !isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView, startOnView]);
  
  return { count, ref };
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isHeadlineInView = useInView(headlineRef, { once: true });

  // Smoother spring physics for parallax
  const springConfig = { damping: 30, stiffness: 100 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  
  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  const orbX = useTransform(mouseX, [-1, 1], [-40, 40]);
  const orbY = useTransform(mouseY, [-1, 1], [-40, 40]);
  const orbX2 = useTransform(mouseX, [-1, 1], [25, -25]);
  const orbY2 = useTransform(mouseY, [-1, 1], [25, -25]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced parallax with spring physics
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const clientNames = ["Microsoft", "Nasdaq", "Cohere", "Headway", "Swiss Gear", "AI21 Labs"];

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[80vh] flex flex-col bg-background overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.02]" />
      
      {/* Enhanced Floating Gradient Orbs with Framer Motion */}
      <motion.div 
        className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          x: orbX,
          y: orbY,
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(280, 70%, 55%) 0%, transparent 70%)',
          x: orbX2,
          y: orbY2,
        }}
      />
      
      {/* Third floating orb for more depth */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full opacity-[0.02] blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 60%)',
        }}
      />

      {/* Main Content */}
      <motion.div 
        className="flex-1 flex items-center relative z-10"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left - Text Content */}
            <motion.div 
              className="space-y-4 lg:pr-6"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {/* Eyebrow with animated dot */}
              <motion.div 
                className="inline-flex items-center gap-2"
                variants={itemVariants}
              >
                <motion.div 
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  Human Performance OS
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                ref={headlineRef}
                className="text-xl md:text-2xl lg:text-3xl font-normal text-foreground tracking-tight"
                variants={itemVariants}
              >
                NeuroState sits between{" "}
                <motion.span 
                  className="text-primary inline"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  raw data
                </motion.span>{" "}
                and human performance
              </motion.h1>
              
              {/* Subheadline */}
              <motion.p 
                className="text-xs md:text-sm text-muted-foreground max-w-md leading-relaxed"
                variants={itemVariants}
              >
                We build cognitive infrastructure that connects wearable data, biometric signals, and behavioural patterns to deliver predictive insights that optimise mental clarity, recovery, and sustained performance across your organisation.
              </motion.p>

              {/* Data Flow Diagram */}
              <motion.div 
                className="py-2"
                variants={itemVariants}
              >
                <DataFlowDiagram />
              </motion.div>

              {/* CTAs with magnetic hover effect */}
              <motion.div 
                className="flex flex-wrap items-center gap-3"
                variants={itemVariants}
              >
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button 
                      size="sm"
                      className="h-10 px-6 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group magnetic-btn relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        Get Started
                        <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/nova/overview">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button 
                      size="sm"
                      variant="ghost"
                      className="h-10 px-5 text-xs font-medium text-foreground hover:bg-muted rounded-full group animated-underline inline-flex flex-row items-center gap-2"
                    >
                      Explore Nova AI
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - 3D Abstract Wave Mesh */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Ambient glow behind wave mesh */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-80 h-80 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-blue-500/8 rounded-full blur-[100px]" />
                </div>
                
                {/* 3D Abstract Wave Mesh Canvas */}
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.div 
                      className="w-20 h-20 border-2 border-primary/20 border-t-primary rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                }>
                  <AbstractWaveMesh />
                </Suspense>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Client Logos - Enhanced marquee with hover pause */}
      <motion.div 
        className="py-8 relative overflow-hidden border-t border-border/30"
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
        
        <div className="marquee-track group">
          {[...clientNames, ...clientNames, ...clientNames].map((name, i) => (
            <motion.span 
              key={i}
              className="px-12 text-xs text-muted-foreground/40 font-medium tracking-wider uppercase whitespace-nowrap cursor-default select-none"
              whileHover={{ 
                color: "hsl(var(--foreground))",
                scale: 1.08,
              }}
              transition={{ duration: 0.2 }}
            >
              {name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;