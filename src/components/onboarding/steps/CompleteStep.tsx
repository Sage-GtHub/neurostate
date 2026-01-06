import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Check, Brain, Moon, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { OnboardingData } from "../OnboardingWizard";

interface CompleteStepProps {
  data: OnboardingData;
  onComplete: () => void;
}

const GOAL_LABELS: Record<string, { label: string; icon: string }> = {
  sleep: { label: "Better Sleep", icon: "🌙" },
  focus: { label: "Enhanced Focus", icon: "🎯" },
  recovery: { label: "Faster Recovery", icon: "💪" },
  energy: { label: "Sustained Energy", icon: "⚡" },
  stress: { label: "Stress Management", icon: "🧘" },
  performance: { label: "Peak Performance", icon: "🚀" },
};

export function CompleteStep({ data, onComplete }: CompleteStepProps) {
  const protocolName = data.goals.length > 0 
    ? `${GOAL_LABELS[data.goals[0]]?.label || 'Custom'} Protocol`
    : "Baseline Protocol";

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      {/* Success animation */}
      <motion.div 
        className="relative w-24 h-24 mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30" />
        <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-light text-foreground mb-3">
          You're all set!
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mb-8">
          Nova has created your personalised profile. Your first insights 
          will be ready within 24 hours.
        </p>
      </motion.div>

      {/* Profile summary */}
      <motion.div 
        className="w-full max-w-sm p-6 rounded-2xl bg-muted/30 border border-border/30 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/30">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">{protocolName}</p>
            <p className="text-[10px] text-muted-foreground">Personalised for you</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Goals */}
          {data.goals.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.goals.slice(0, 3).map((goalId) => (
                <span 
                  key={goalId}
                  className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {GOAL_LABELS[goalId]?.icon} {GOAL_LABELS[goalId]?.label}
                </span>
              ))}
              {data.goals.length > 3 && (
                <span className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  +{data.goals.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="p-2 rounded-lg bg-background/50 text-center">
              <p className="text-lg font-light text-foreground">
                {data.connectedDevices.length}
              </p>
              <p className="text-[10px] text-muted-foreground">Devices</p>
            </div>
            <div className="p-2 rounded-lg bg-background/50 text-center">
              <p className="text-lg font-light text-foreground">
                {data.goals.length}
              </p>
              <p className="text-[10px] text-muted-foreground">Goals</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* What's next */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">What's Next</p>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-primary" />
            AI Analysis
          </span>
          <span className="flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-primary" />
            Sleep Tracking
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            Daily Insights
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Button 
          onClick={onComplete} 
          className="gap-2 rounded-full px-8 h-11 bg-foreground text-background hover:bg-foreground/90"
        >
          Enter Nova
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}
