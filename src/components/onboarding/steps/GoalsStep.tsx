import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GoalsStepProps {
  selectedGoals: string[];
  onUpdate: (goals: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const GOALS = [
  { 
    id: "sleep", 
    label: "Better Sleep", 
    icon: "🌙", 
    description: "Improve sleep quality and wake refreshed",
    color: "from-indigo-500/20 to-purple-500/20"
  },
  { 
    id: "focus", 
    label: "Enhanced Focus", 
    icon: "🎯", 
    description: "Sharpen concentration and deep work capacity",
    color: "from-amber-500/20 to-orange-500/20"
  },
  { 
    id: "recovery", 
    label: "Faster Recovery", 
    icon: "💪", 
    description: "Optimise physical and mental recovery",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  { 
    id: "energy", 
    label: "Sustained Energy", 
    icon: "⚡", 
    description: "Eliminate afternoon slumps and fatigue",
    color: "from-yellow-500/20 to-amber-500/20"
  },
  { 
    id: "stress", 
    label: "Stress Management", 
    icon: "🧘", 
    description: "Build resilience and reduce anxiety",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  { 
    id: "performance", 
    label: "Peak Performance", 
    icon: "🚀", 
    description: "Maximise cognitive output and productivity",
    color: "from-rose-500/20 to-pink-500/20"
  },
];

export function GoalsStep({ selectedGoals, onUpdate, onNext, onBack }: GoalsStepProps) {
  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      onUpdate(selectedGoals.filter(g => g !== goalId));
    } else {
      onUpdate([...selectedGoals, goalId]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-3xl mb-3">🎯</div>
        <h2 className="text-xl font-light text-foreground mb-2">
          What are your goals?
        </h2>
        <p className="text-sm text-muted-foreground">
          Select all that apply. Nova will personalise your experience.
        </p>
      </div>

      {/* Goals grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 mb-6 max-h-[320px] overflow-y-auto pr-1">
        {GOALS.map((goal, i) => {
          const isSelected = selectedGoals.includes(goal.id);
          
          return (
            <motion.button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={cn(
                "relative p-4 rounded-2xl border text-left transition-all",
                isSelected 
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                  : "border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/30"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Check className="w-3 h-3 text-primary-foreground" />
                </motion.div>
              )}

              <div className="flex items-start gap-3">
                <span className="text-2xl">{goal.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground mb-0.5">
                    {goal.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    {goal.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected count */}
      {selectedGoals.length > 0 && (
        <motion.p 
          className="text-center text-xs text-muted-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {selectedGoals.length} goal{selectedGoals.length !== 1 ? 's' : ''} selected
        </motion.p>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-border/30">
        <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={selectedGoals.length === 0}
          className="gap-2 rounded-full px-6 bg-foreground text-background hover:bg-foreground/90"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
