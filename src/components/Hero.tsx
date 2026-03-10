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
      transition: { staggerChildren: 0.1, delayChildren: 0.15 }
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
    <section className="relative bg-background overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          
          {/* Left — Copy */}
          <motion.div 
            className="space-y-7"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {/* Announcement pill */}
            <motion.div variants={itemVariants}>
              <Link 
                to="/nova/overview"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border hover:border-primary/40 transition-colors group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[12px] text-muted-foreground font-medium">
                  Introducing Nova 2.0 — Workforce intelligence, reimagined
                </span>
                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>

            {/* Headline — large and confident like ListenLabs */}
            <motion.h1 
              className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-medium text-foreground tracking-[-0.03em] leading-[1.05]"
              variants={itemVariants}
            >
              Turn your team's health data into better performance.
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              className="text-base md:text-lg text-muted-foreground max-w-[480px] leading-relaxed"
              variants={itemVariants}
            >
              NeuroState connects to wearables your team already uses, spots early signs of burnout, and delivers clear actions to keep people at their best.
            </motion.p>

            {/* CTAs */}
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

          {/* Right — Product Preview */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative rounded-2xl border border-border/60 bg-background shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-muted/60 text-[11px] text-muted-foreground font-mono">neurostate.ai/dashboard</div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 space-y-5">
                {/* Greeting */}
                <div>
                  <p className="text-sm text-muted-foreground">Good morning, Alex</p>
                  <p className="text-lg font-medium text-foreground mt-0.5">Your team is performing well today</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Team Readiness", value: "87%", trend: "+5%" },
                    { label: "Burnout Risk", value: "Low", trend: "↓12%" },
                    { label: "Recovery Score", value: "92", trend: "+3" },
                  ].map((m, i) => (
                    <motion.div 
                      key={i} 
                      className="p-3.5 rounded-xl border border-border/40 bg-background"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</p>
                      <p className="text-xl font-medium text-foreground mt-1">{m.value}</p>
                      <p className="text-[11px] text-primary mt-0.5">{m.trend}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Nova suggestion */}
                <motion.div 
                  className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border/30"
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 }}
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
    </section>
  );
};

export default Hero;
