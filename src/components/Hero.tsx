import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { motion, useInView } from "framer-motion";

const WearableStack = lazy(() => import("./hero/WearableStack"));

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[80vh] flex flex-col bg-background overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left — Copy */}
            <motion.div 
              className="space-y-7 lg:pr-8"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {/* Pill announcement badge — like ListenLabs/PerlonAI */}
              <motion.div variants={itemVariants}>
                <Link 
                  to="/nova/overview"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-background hover:border-primary/40 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[12px] text-muted-foreground font-medium">
                    Introducing Nova 2.0 — Workforce intelligence, reimagined
                  </span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                ref={headlineRef}
                className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-medium text-foreground tracking-tight leading-[1.08]"
                variants={itemVariants}
              >
                We turn your team's{" "}
                <span className="text-primary">health data</span>{" "}
                into better business performance
              </motion.h1>
              
              {/* Subheadline */}
              <motion.p 
                className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed"
                variants={itemVariants}
              >
                NeuroState connects to wearables your team already uses, spots early signs of burnout and fatigue, and gives managers clear actions to keep people performing at their best.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                className="flex flex-wrap items-center gap-3 pt-1"
                variants={itemVariants}
              >
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="h-12 px-8 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group"
                  >
                    Book a Demo
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/nova/overview">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="h-12 px-6 text-sm font-medium rounded-full group border-border/60 hover:border-foreground/30"
                  >
                    Explore Nova AI
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — Product Visual */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative aspect-square max-w-sm md:max-w-lg mx-auto">
                {/* Ambient glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 bg-gradient-to-br from-primary/8 via-emerald-500/4 to-blue-500/6 rounded-full blur-[80px]" />
                </div>
                
                {/* Floating Metric Cards */}
                <motion.div
                  className="absolute top-0 right-0 md:top-4 md:right-0 z-20 scale-75 md:scale-100 origin-top-right"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--border))" strokeWidth="3.5" />
                          <motion.circle
                            cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5" strokeLinecap="round"
                            strokeDasharray={125.6}
                            initial={{ strokeDashoffset: 125.6 }}
                            animate={isLoaded ? { strokeDashoffset: 125.6 * (1 - 0.92) } : {}}
                            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">92</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Recovery</p>
                        <p className="text-sm font-medium text-foreground">Optimal</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Cognitive Load card */}
                <motion.div
                  className="absolute bottom-0 left-0 md:bottom-8 md:left-0 z-20 scale-75 md:scale-100 origin-bottom-left"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.65 }}
                >
                  <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl p-4 shadow-lg">
                    <div className="space-y-2">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Cognitive Load</p>
                      <div className="flex items-end gap-1">
                        {[65, 45, 78, 52, 68].map((height, i) => (
                          <motion.div
                            key={i}
                            className="w-2 bg-primary/70 rounded-full"
                            initial={{ height: 0 }}
                            animate={isLoaded ? { height: height * 0.4 } : {}}
                            transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-foreground">62% <span className="text-emerald-500 text-xs">↓12%</span></p>
                    </div>
                  </div>
                </motion.div>

                {/* Energy card — desktop only */}
                <motion.div
                  className="absolute top-1/4 -left-2 md:left-4 z-20 hidden md:block"
                  initial={{ opacity: 0, x: -12 }}
                  animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl px-4 py-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-muted-foreground">Energy</span>
                      <span className="text-sm font-semibold text-foreground">High</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* 3D Wearable Stack */}
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                  </div>
                }>
                  <WearableStack />
                </Suspense>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
