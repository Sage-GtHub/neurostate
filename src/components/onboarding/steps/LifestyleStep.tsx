import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Loader2, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { OnboardingData } from "../OnboardingWizard";

interface LifestyleStepProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const QUESTIONS = [
  {
    id: "sleepQuality",
    question: "How would you rate your current sleep?",
    options: [
      { value: "poor", label: "Poor", icon: "😴", desc: "< 5 hours or restless" },
      { value: "fair", label: "Fair", icon: "😐", desc: "5-6 hours, some issues" },
      { value: "good", label: "Good", icon: "😊", desc: "6-8 hours, mostly rested" },
      { value: "excellent", label: "Excellent", icon: "🌟", desc: "8+ hours, fully restored" },
    ]
  },
  {
    id: "stressLevel",
    question: "What's your typical stress level?",
    options: [
      { value: "low", label: "Low", icon: "😌", desc: "Rarely stressed" },
      { value: "moderate", label: "Moderate", icon: "😐", desc: "Manageable stress" },
      { value: "high", label: "High", icon: "😰", desc: "Often overwhelmed" },
      { value: "very_high", label: "Very High", icon: "🔥", desc: "Constant pressure" },
    ]
  },
  {
    id: "activityLevel",
    question: "How active are you?",
    options: [
      { value: "sedentary", label: "Sedentary", icon: "🪑", desc: "Desk-based, minimal movement" },
      { value: "light", label: "Light", icon: "🚶", desc: "Some walking, light activity" },
      { value: "moderate", label: "Moderate", icon: "🏃", desc: "Regular exercise 3-4x/week" },
      { value: "very_active", label: "Very Active", icon: "🏋️", desc: "Daily intense training" },
    ]
  },
  {
    id: "workStyle",
    question: "What describes your work best?",
    options: [
      { value: "creative", label: "Creative", icon: "🎨", desc: "Design, writing, ideation" },
      { value: "analytical", label: "Analytical", icon: "📊", desc: "Data, research, problem-solving" },
      { value: "management", label: "Management", icon: "👥", desc: "Leading teams, meetings" },
      { value: "mixed", label: "Mixed", icon: "🔄", desc: "Varies day to day" },
    ]
  },
];

export function LifestyleStep({ data, onUpdate, onSubmit, onBack, isSubmitting }: LifestyleStepProps) {
  const allAnswered = QUESTIONS.every(q => data[q.id as keyof OnboardingData]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-3xl mb-3">🧠</div>
        <h2 className="text-xl font-light text-foreground mb-2">
          Quick lifestyle check
        </h2>
        <p className="text-sm text-muted-foreground">
          Help Nova understand your baseline for better recommendations.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6 flex-1 overflow-y-auto pr-1 max-h-[340px]">
        {QUESTIONS.map((question, qi) => {
          const currentValue = data[question.id as keyof OnboardingData] as string;
          
          return (
            <motion.div
              key={question.id}
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qi * 0.1 }}
            >
              <p className="text-sm font-medium text-foreground">{question.question}</p>
              <div className="grid grid-cols-2 gap-2">
                {question.options.map((option) => {
                  const isSelected = currentValue === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => onUpdate({ [question.id]: option.value })}
                      className={cn(
                        "relative p-3 rounded-xl border text-left transition-all",
                        isSelected 
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                          : "border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/30"
                      )}
                    >
                      {isSelected && (
                        <motion.div
                          className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check className="w-2.5 h-2.5 text-primary-foreground" />
                        </motion.div>
                      )}
                      
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{option.icon}</span>
                        <span className="text-xs font-medium text-foreground">{option.label}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-tight">{option.desc}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-1.5 my-4">
        {QUESTIONS.map((q) => {
          const isAnswered = !!data[q.id as keyof OnboardingData];
          return (
            <div 
              key={q.id}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                isAnswered ? "bg-primary" : "bg-muted"
              )}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-border/30">
        <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button 
          onClick={onSubmit}
          disabled={!allAnswered || isSubmitting}
          className="gap-2 rounded-full px-6 bg-foreground text-background hover:bg-foreground/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating Profile...
            </>
          ) : (
            <>
              Complete Setup
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
