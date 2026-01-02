import { motion } from "framer-motion";
import { Database, Cpu, TrendingUp, Zap, Calculator, ArrowRight, LucideIcon } from "lucide-react";

interface FlowStep {
  icon: LucideIcon;
  label: string;
  description: string;
  color: string;
}

interface SolutionDataFlowDiagramProps {
  variant?: "data-layer" | "state-engine" | "prediction" | "action" | "roi" | "full";
  className?: string;
}

const allSteps: FlowStep[] = [
  { icon: Database, label: "Signals", description: "Wearables, context, behaviour", color: "hsl(220, 100%, 55%)" },
  { icon: Cpu, label: "States", description: "Readiness, load, stress", color: "hsl(270, 100%, 55%)" },
  { icon: TrendingUp, label: "Predictions", description: "Risk, capacity, trajectory", color: "hsl(156, 65%, 45%)" },
  { icon: Zap, label: "Actions", description: "Interventions, nudges", color: "hsl(35, 95%, 50%)" },
  { icon: Calculator, label: "ROI", description: "Financial attribution", color: "hsl(280, 70%, 55%)" }
];

const getStepsForVariant = (variant: string): FlowStep[] => {
  switch (variant) {
    case "data-layer": return allSteps.slice(0, 2);
    case "state-engine": return allSteps.slice(0, 3);
    case "prediction": return allSteps.slice(1, 4);
    case "action": return allSteps.slice(2, 5);
    case "roi": return allSteps.slice(3, 5);
    default: return allSteps;
  }
};

export function SolutionDataFlowDiagram({ variant = "full", className = "" }: SolutionDataFlowDiagramProps) {
  const steps = getStepsForVariant(variant);

  return (
    <div className={`relative py-8 ${className}`}>
      {/* Animated connection line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2" />
      
      {/* Animated pulse along the line */}
      <motion.div
        className="absolute top-1/2 h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent -translate-y-1/2 rounded-full blur-sm"
        animate={{ left: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative flex items-center justify-between gap-2 md:gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            className="flex flex-col items-center flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            {/* Node */}
            <motion.div
              className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${step.color}15` }}
              whileHover={{ scale: 1.1, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ 
                  boxShadow: [`0 0 0 0 ${step.color}40`, `0 0 0 8px ${step.color}00`]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
              <step.icon className="w-6 h-6 md:w-7 md:h-7" color={step.color} />
            </motion.div>

            {/* Label */}
            <div className="mt-3 text-center">
              <p className="text-xs md:text-sm font-medium text-foreground">{step.label}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 hidden md:block">{step.description}</p>
            </div>

            {/* Arrow connector */}
            {index < steps.length - 1 && (
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 hidden md:block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
              >
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4
          }}
        />
      ))}
    </div>
  );
}
