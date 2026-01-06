import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Activity, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const features = [
    { icon: Brain, label: "Predictive Intelligence", desc: "72-hour cognitive forecasting" },
    { icon: Activity, label: "Adaptive Protocols", desc: "Real-time biometric adjustments" },
    { icon: Shield, label: "Privacy First", desc: "Your data stays yours" },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      {/* Animated orb */}
      <motion.div 
        className="relative w-24 h-24 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-accent/30" />
        <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-light text-foreground mb-3">
          Welcome to Nova
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mb-8">
          Your AI performance copilot. Let's personalise your experience 
          in just a few steps.
        </p>
      </motion.div>

      {/* Feature cards */}
      <motion.div 
        className="grid grid-cols-3 gap-4 w-full max-w-lg mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="p-4 rounded-2xl bg-muted/30 border border-border/30 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <feature.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs font-medium text-foreground mb-1">{feature.label}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          onClick={onNext} 
          className="gap-2 rounded-full px-8 h-11 bg-foreground text-background hover:bg-foreground/90"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}
