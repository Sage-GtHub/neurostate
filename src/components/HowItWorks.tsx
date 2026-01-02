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
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-primary font-medium">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-large-display text-foreground leading-tight">
            From data to performance.
            <br />
            <span className="text-muted-foreground">In four steps.</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Our cognitive infrastructure transforms raw biometric data into actionable performance intelligence, automatically and continuously.
          </p>
        </motion.div>

        {/* Desktop Layout - Grid */}
        <div className="hidden md:block relative">
          {/* Connection Lines - Desktop */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0">
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

          {/* Steps Grid - Desktop */}
          <div className="grid grid-cols-4 gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              >
                <motion.div 
                  className="flow-card p-6 h-full relative group"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >

                  {/* Icon */}
                  <motion.div 
                    className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                    animate={isInView ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" }}
                  >
                    <step.icon className="w-5 h-5 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-base font-medium text-foreground">{step.title}</h3>
                    <p className="text-xs text-primary font-medium">{step.subtitle}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
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

                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/20"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - Clean Timeline */}
        <div className="md:hidden relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ originY: 0 }}
          />

          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative flex items-start gap-4 py-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              >
                {/* Timeline node */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div 
                    className="w-12 h-12 bg-background border-2 border-primary rounded-xl flex items-center justify-center shadow-lg"
                    animate={isInView ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <step.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                    <span className="text-[10px] text-primary font-medium">{step.subtitle}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {step.description}
                  </p>
                  
                  {/* Metrics - inline pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {step.metrics.map((metric, i) => (
                      <motion.span
                        key={metric}
                        className="px-2 py-0.5 text-[10px] text-muted-foreground bg-muted/80 rounded-full border border-border/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                      >
                        {metric}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-8 sm:mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            The entire cycle runs autonomously. Your only job is to perform.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
