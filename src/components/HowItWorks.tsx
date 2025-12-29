import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Watch, Brain, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Watch,
    title: "Collect",
    subtitle: "Wearable Data",
    description: "Biometric signals from your devices flow into our cognitive infrastructure in real time.",
    metrics: ["HRV", "Sleep", "Activity", "Stress"],
  },
  {
    icon: Brain,
    title: "Analyse",
    subtitle: "AI Processing",
    description: "Nova AI synthesises patterns across 50+ biomarkers to build your cognitive model.",
    metrics: ["Pattern detection", "Risk scoring", "Trend analysis"],
  },
  {
    icon: Zap,
    title: "Predict",
    subtitle: "Performance Forecast",
    description: "72-hour forecasts predict focus windows, fatigue risk, and optimal intervention timing.",
    metrics: ["Readiness score", "Energy forecast", "Recovery needs"],
  },
  {
    icon: TrendingUp,
    title: "Optimise",
    subtitle: "Adaptive Protocols",
    description: "Personalised recommendations adjust in real time to maximise your cognitive output.",
    metrics: ["Protocol adjustments", "Timing optimisation", "Compound effects"],
  },
];

const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6 md:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div 
          className="text-center mb-16 space-y-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">
            How It Works
          </span>
          <h2 className="text-large-display text-foreground">
            From data to performance.
            <br />
            <span className="text-muted-foreground">In four steps.</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Our cognitive infrastructure transforms raw biometric data into actionable performance intelligence, automatically and continuously.
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="relative">
          {/* Connection Lines - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0">
            <svg className="w-full h-4" viewBox="0 0 1000 16" preserveAspectRatio="none">
              <motion.path
                d="M 60 8 L 940 8"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="8 8"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M 60 8 L 940 8"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              >
                {/* Card */}
                <motion.div 
                  className="flow-card p-6 h-full relative group"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-[10px] font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <motion.div 
                    className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                    animate={isInView ? { 
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <step.icon className="w-5 h-5 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-base font-medium text-foreground">{step.title}</h3>
                    <p className="text-xs text-primary font-medium">{step.subtitle}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-1.5">
                      {step.metrics.map((metric, i) => (
                        <motion.span
                          key={metric}
                          className="px-2 py-1 text-[9px] text-muted-foreground bg-muted/50 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.5 + index * 0.15 + i * 0.05 }}
                        >
                          {metric}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Animated pulse on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/20"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Arrow between cards - Mobile */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="lg:hidden flex justify-center py-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.15 }}
                  >
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                        <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-xs text-muted-foreground">
            The entire cycle runs autonomously. Your only job is to perform.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
