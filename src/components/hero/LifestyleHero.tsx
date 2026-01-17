import { Button } from "@/components/ui/button";
import { ArrowRight, Battery, Brain, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";

// Animated number counter hook
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
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
  }, [end, duration, isInView]);
  
  return { count, ref };
};

// Floating Metric Card Component
const MetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  unit, 
  trend, 
  delay = 0,
  position 
}: { 
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
  trend?: string;
  delay?: number;
  position: string;
}) => {
  const { count, ref } = useCountUp(value, 2000);
  
  return (
    <motion.div
      className={`absolute ${position} z-20`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      <motion.div
        className="backdrop-blur-xl bg-card/80 border border-border/50 rounded-2xl p-4 shadow-lg min-w-[140px]"
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          duration: 4 + delay, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Icon className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span ref={ref} className="text-2xl font-semibold text-foreground tabular-nums">
            {count}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-1.5">
            <TrendingUp className="w-3 h-3 text-signal-green" />
            <span className="text-[10px] text-signal-green font-medium">{trend}</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Progress Ring Component
const ProgressRing = ({ 
  value, 
  label,
  delay = 0 
}: { 
  value: number;
  label: string;
  delay?: number;
}) => {
  const { count, ref } = useCountUp(value, 2500);
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (count / 100) * circumference;
  
  return (
    <motion.div
      className="absolute top-[15%] right-[8%] z-20 hidden lg:block"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 1, 
        delay: delay,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      <motion.div
        className="backdrop-blur-xl bg-card/80 border border-border/50 rounded-2xl p-5 shadow-lg"
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Battery className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
        </div>
        <div className="relative w-24 h-24 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <motion.circle
              cx="48"
              cy="48"
              r="42"
              stroke="hsl(var(--primary))"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span ref={ref} className="text-3xl font-semibold text-primary tabular-nums">
              {count}
            </span>
            <span className="text-[10px] text-muted-foreground">%</span>
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] text-muted-foreground">SINCE WAKE-UP</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LifestyleHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Smoother spring physics for parallax
  const springConfig = { damping: 30, stiffness: 100 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  
  const bgX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const bgY = useTransform(mouseY, [-1, 1], [-10, 10]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] }
    }
  };

  const clientNames = ["Lattice", "Gong", "Notion", "Rippling", "Ramp", "Deel", "Airtable", "Figma"];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col overflow-hidden"
    >
      {/* Full-screen Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ x: bgX, y: bgY, scale: 1.1 }}
      >
        {/* Placeholder gradient simulating lifestyle photo - replace with actual image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `
              linear-gradient(
                135deg,
                hsl(40 33% 96% / 0.15) 0%,
                hsl(40 33% 96% / 0.3) 50%,
                hsl(40 33% 96% / 0.5) 100%
              ),
              linear-gradient(
                to bottom,
                transparent 0%,
                hsl(var(--background) / 0.6) 60%,
                hsl(var(--background)) 100%
              ),
              url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        
        {/* Warm overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </motion.div>

      {/* Floating Metric Cards */}
      <MetricCard
        icon={Brain}
        label="Cognitive Load"
        value={67}
        unit="%"
        trend="+12% focus"
        delay={0.6}
        position="top-[25%] right-[15%] hidden md:block"
      />
      
      <MetricCard
        icon={Zap}
        label="Energy Level"
        value={82}
        unit="pts"
        trend="Optimal"
        delay={0.8}
        position="bottom-[35%] right-[8%] hidden lg:block"
      />
      
      <ProgressRing
        value={85}
        label="Readiness"
        delay={0.4}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-20 lg:py-24">
          <motion.div 
            className="max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {/* Eyebrow */}
            <motion.div 
              className="inline-flex items-center gap-2 mb-6"
              variants={itemVariants}
            >
              <motion.div 
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">
                Human Performance OS
              </span>
            </motion.div>

            {/* Large Emotional Headline */}
            <motion.h1 
              className="text-hero-display text-foreground mb-6"
              variants={itemVariants}
            >
              Unlock Your{" "}
              <span className="text-primary">Peak</span>{" "}
              Cognitive Potential
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              className="text-body-large text-muted-foreground mb-8 max-w-xl"
              variants={itemVariants}
            >
              NeuroState transforms raw biometric data into actionable intelligence. 
              Understand your cognitive patterns, predict performance dips, and 
              optimise your team's potential before burnout strikes.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap items-center gap-4"
              variants={itemVariants}
            >
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    size="lg"
                    className="h-12 px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
                    size="lg"
                    variant="ghost"
                    className="h-12 px-6 text-sm font-medium text-foreground hover:bg-card/50 rounded-full group backdrop-blur-sm"
                  >
                    Explore Nova AI
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Client Logos Marquee */}
      <motion.div 
        className="py-8 relative overflow-hidden border-t border-border/30 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.8 }}
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

export default LifestyleHero;
