import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Check,
  Loader2,
  Brain,
  Moon,
  Zap,
  Activity,
  Shield,
  Target
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { WelcomeStep } from "./steps/WelcomeStep";
import { GoalsStep } from "./steps/GoalsStep";
import { DevicesStep } from "./steps/DevicesStep";
import { LifestyleStep } from "./steps/LifestyleStep";
import { CompleteStep } from "./steps/CompleteStep";

interface OnboardingWizardProps {
  open: boolean;
  onComplete: () => void;
}

export type OnboardingStep = "welcome" | "goals" | "devices" | "lifestyle" | "complete";

export interface OnboardingData {
  goals: string[];
  sleepQuality: string;
  stressLevel: string;
  activityLevel: string;
  workStyle: string;
  connectedDevices: string[];
}

const STEPS: OnboardingStep[] = ["welcome", "goals", "devices", "lifestyle", "complete"];

export function OnboardingWizard({ open, onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    goals: [],
    sleepQuality: "",
    stressLevel: "",
    activityLevel: "",
    workStyle: "",
    connectedDevices: [],
  });
  const { toast } = useToast();

  const currentIndex = STEPS.indexOf(currentStep);
  const progress = ((currentIndex + 1) / STEPS.length) * 100;

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const goNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    }
  };

  const goBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Save assessment data
      const { error: assessmentError } = await supabase.from('protocol_assessments').insert({
        user_id: user.id,
        goals: data.goals,
        assessment_data: {
          sleepQuality: data.sleepQuality,
          stressLevel: data.stressLevel,
          activityLevel: data.activityLevel,
          workStyle: data.workStyle,
        },
        lifestyle_factors: {
          sleep_priority: data.sleepQuality,
          stress_level: data.stressLevel,
          activity_level: data.activityLevel,
          work_style: data.workStyle,
        }
      });

      if (assessmentError) throw assessmentError;

      // Update user preferences to mark onboarding as completed
      await supabase.from('user_preferences').upsert({
        user_id: user.id,
        onboarding_completed: true,
        onboarding_step: 5,
      }, { onConflict: 'user_id' });

      // Generate initial baseline metrics if no devices connected
      if (data.connectedDevices.length === 0) {
        await generateBaselineMetrics(user.id);
      }

      // Try to generate initial protocol via AI (non-blocking)
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.access_token) {
          await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-protocol`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.session.access_token}`,
            },
            body: JSON.stringify({
              assessmentData: {
                sleepQuality: data.sleepQuality,
                stressLevel: data.stressLevel,
                activityLevel: data.activityLevel,
                workStyle: data.workStyle,
              },
              goals: data.goals,
            }),
          });
        }
      } catch (protocolError) {
        console.error("Protocol generation failed (non-blocking):", protocolError);
        // Don't throw - protocol generation failure shouldn't block onboarding
      }

      setCurrentStep("complete");
    } catch (error) {
      console.error("Error saving onboarding:", error);
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateBaselineMetrics = async (userId: string) => {
    const baseMetrics = [
      { metric_type: 'hrv', value: 50 + Math.floor(Math.random() * 30) },
      { metric_type: 'sleep_quality', value: 6 + Math.floor(Math.random() * 3) },
      { metric_type: 'recovery', value: 65 + Math.floor(Math.random() * 25) },
      { metric_type: 'focus_time', value: 4 + Math.floor(Math.random() * 5) },
    ];

    for (const metric of baseMetrics) {
      await supabase.from('user_metrics').insert({
        user_id: userId,
        metric_type: metric.metric_type,
        value: metric.value,
        device_source: 'onboarding_baseline'
      });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case "welcome":
        return true;
      case "goals":
        return data.goals.length > 0;
      case "devices":
        return true; // Can skip
      case "lifestyle":
        return data.sleepQuality && data.stressLevel && data.activityLevel;
      default:
        return true;
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden bg-background border-border/50">
        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <Progress value={progress} className="h-1 bg-muted" />
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
            <span>Step {currentIndex + 1} of {STEPS.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <div className="p-6 min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              {currentStep === "welcome" && (
                <WelcomeStep onNext={goNext} />
              )}
              
              {currentStep === "goals" && (
                <GoalsStep 
                  selectedGoals={data.goals} 
                  onUpdate={(goals) => updateData({ goals })}
                  onNext={goNext}
                  onBack={goBack}
                />
              )}
              
              {currentStep === "devices" && (
                <DevicesStep 
                  connectedDevices={data.connectedDevices}
                  onDeviceConnected={(device) => updateData({ 
                    connectedDevices: [...data.connectedDevices, device] 
                  })}
                  onNext={goNext}
                  onBack={goBack}
                />
              )}
              
              {currentStep === "lifestyle" && (
                <LifestyleStep 
                  data={data}
                  onUpdate={updateData}
                  onSubmit={handleComplete}
                  onBack={goBack}
                  isSubmitting={isSubmitting}
                />
              )}
              
              {currentStep === "complete" && (
                <CompleteStep 
                  data={data}
                  onComplete={onComplete}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
