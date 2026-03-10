import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section className="relative flex flex-col bg-background overflow-hidden">
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left — Copy */}
            <motion.div 
              className="space-y-6 lg:pr-4"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {/* Pill announcement */}
              <motion.div variants={itemVariants}>
                <Link 
                  to="/nova/overview"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-background hover:border-primary/40 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[12px] text-muted-foreground font-medium">
                    Introducing Nova 2.0 — Workforce intelligence, reimagined
                  </span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              </motion.div>

              {/* Headline — large, clean, like ListenLabs */}
              <motion.h1 
                className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-medium text-foreground tracking-[-0.02em] leading-[1.1]"
                variants={itemVariants}
              >
                Turn your team's health data into better performance.
              </motion.h1>
              
              {/* Subheadline */}
              <motion.p 
                className="text-base md:text-[17px] text-muted-foreground max-w-md leading-relaxed"
                variants={itemVariants}
              >
                NeuroState connects to wearables your team already uses, spots early signs of burnout, and delivers clear actions to keep people at their best.
              </motion.p>

              {/* CTAs — ListenLabs style: filled primary + outlined */}
              <motion.div 
                className="flex flex-wrap items-center gap-3 pt-1"
                variants={itemVariants}
              >
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="h-11 px-7 text-[13px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                  >
                    Book a Demo
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="h-11 px-7 text-[13px] font-medium rounded-full border-border hover:border-foreground/30"
                  >
                    Try for Free
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — Product Preview (clean UI card like ListenLabs) */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative rounded-xl border border-border bg-background shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
                {/* App header bar */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-3 py-1 rounded-md bg-muted text-[11px] text-muted-foreground font-mono">neurostate.ai/dashboard</div>
                  </div>
                </div>

                {/* Dashboard content preview */}
                <div className="p-5 md:p-6 space-y-5">
                  {/* Greeting */}
                  <div>
                    <p className="text-sm text-muted-foreground">Good morning, Alex</p>
                    <p className="text-lg font-medium text-foreground mt-0.5">Your team is performing well today</p>
                  </div>

                  {/* Metric cards row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Team Readiness", value: "87%", trend: "+5%", color: "text-primary" },
                      { label: "Burnout Risk", value: "Low", trend: "↓12%", color: "text-primary" },
                      { label: "Recovery Score", value: "92", trend: "+3", color: "text-foreground" },
                    ].map((m, i) => (
                      <motion.div 
                        key={i} 
                        className="p-3 rounded-lg border border-border"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</p>
                        <p className={`text-xl font-medium mt-1 ${m.color}`}>{m.value}</p>
                        <p className="text-[11px] text-primary mt-0.5">{m.trend}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Nova AI suggestion */}
                  <motion.div 
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/60 border border-border"
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">N</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-foreground">Nova AI</p>
                      <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">3 team members showing early fatigue signals. Consider scheduling lighter workloads for Thursday.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
