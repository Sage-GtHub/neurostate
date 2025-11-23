import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface AssessmentData {
  goal: string;
  currentIssues: string[];
  sleepQuality: string;
  stressLevel: string;
  activityLevel: string;
  dietaryRestrictions: string[];
}

interface ProtocolAssessmentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export function ProtocolAssessment({ open, onOpenChange, onComplete }: ProtocolAssessmentProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [assessment, setAssessment] = useState<AssessmentData>({
    goal: "",
    currentIssues: [],
    sleepQuality: "",
    stressLevel: "",
    activityLevel: "",
    dietaryRestrictions: [],
  });

  const goals = [
    { value: "performance", label: "Peak Performance", description: "Optimize energy and focus" },
    { value: "recovery", label: "Athletic Recovery", description: "Accelerate muscle repair" },
    { value: "sleep", label: "Better Sleep", description: "Improve sleep quality and duration" },
    { value: "focus", label: "Enhanced Focus", description: "Boost cognitive performance" },
    { value: "stress", label: "Stress Management", description: "Reduce stress and anxiety" },
  ];

  const issues = [
    "Poor sleep quality",
    "Low energy levels",
    "High stress",
    "Difficulty focusing",
    "Slow recovery",
    "Brain fog",
  ];

  const generateProtocol = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a protocol",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Generate protocol based on assessment
    const products: any[] = [];
    
    if (assessment.goal === "performance") {
      products.push(
        { product_name: "NeuroFocus Cognitive", dose: "2 capsules", time: "7:00 AM" },
        { product_name: "Creatine Monohydrate", dose: "5g", time: "8:00 AM" },
        { product_name: "Omega3 Elite", dose: "2 capsules", time: "8:00 AM" }
      );
    } else if (assessment.goal === "sleep") {
      products.push(
        { product_name: "RestoreSleep Night", dose: "2 capsules", time: "9:00 PM" },
        { product_name: "Magnesium Complex", dose: "400mg", time: "9:00 PM" },
        { product_name: "L-Theanine", dose: "200mg", time: "8:00 PM" }
      );
    } else if (assessment.goal === "stress") {
      products.push(
        { product_name: "AdaptBalance Stress", dose: "2 capsules", time: "8:00 AM" },
        { product_name: "Ashwagandha", dose: "500mg", time: "8:00 AM" },
        { product_name: "Rhodiola Rosea", dose: "300mg", time: "12:00 PM" }
      );
    } else if (assessment.goal === "focus") {
      products.push(
        { product_name: "NeuroFocus Cognitive", dose: "2 capsules", time: "7:00 AM" },
        { product_name: "Lion's Mane Mushroom", dose: "1g", time: "8:00 AM" },
        { product_name: "L-Theanine", dose: "200mg", time: "7:00 AM" }
      );
    } else if (assessment.goal === "recovery") {
      products.push(
        { product_name: "Marine Collagen", dose: "10g", time: "7:00 AM" },
        { product_name: "Omega3 Elite", dose: "2 capsules", time: "8:00 AM" },
        { product_name: "Magnesium Complex", dose: "400mg", time: "9:00 PM" }
      );
    }

    const protocolName = goals.find(g => g.value === assessment.goal)?.label + " Protocol" || "Custom Protocol";

    try {
      const { error } = await supabase
        .from('user_protocols')
        .insert({
          user_id: user.id,
          protocol_name: protocolName,
          goal: assessment.goal,
          status: 'active',
          completion_percentage: 0,
          products: products,
        });

      if (error) throw error;

      toast({
        title: "Protocol created",
        description: "Your personalized protocol is ready",
      });

      onOpenChange(false);
      onComplete?.();
      setStep(1);
      setAssessment({
        goal: "",
        currentIssues: [],
        sleepQuality: "",
        stressLevel: "",
        activityLevel: "",
        dietaryRestrictions: [],
      });
    } catch (error) {
      console.error("Error creating protocol:", error);
      toast({
        title: "Error",
        description: "Failed to create protocol. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && !assessment.goal) {
      toast({ title: "Please select a goal", variant: "destructive" });
      return;
    }
    if (step === 2 && assessment.currentIssues.length === 0) {
      toast({ title: "Please select at least one issue", variant: "destructive" });
      return;
    }
    if (step < 5) {
      setStep(step + 1);
    } else {
      generateProtocol();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-h3 font-semibold text-carbon">
            Performance Assessment
          </DialogTitle>
          <p className="text-body text-ash">Step {step} of 5</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 1 && (
            <div className="space-y-4">
              <Label className="text-body font-medium text-carbon">What's your primary goal?</Label>
              <RadioGroup value={assessment.goal} onValueChange={(value) => setAssessment({ ...assessment, goal: value })}>
                {goals.map((goal) => (
                  <Card key={goal.value} className="cursor-pointer hover:border-carbon transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value={goal.value} id={goal.value} />
                        <div className="flex-1">
                          <Label htmlFor={goal.value} className="cursor-pointer font-medium text-carbon">
                            {goal.label}
                          </Label>
                          <p className="text-sm text-ash mt-1">{goal.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label className="text-body font-medium text-carbon">What challenges are you currently facing?</Label>
              <div className="space-y-3">
                {issues.map((issue) => (
                  <div key={issue} className="flex items-center gap-3">
                    <Checkbox
                      id={issue}
                      checked={assessment.currentIssues.includes(issue)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAssessment({ ...assessment, currentIssues: [...assessment.currentIssues, issue] });
                        } else {
                          setAssessment({ ...assessment, currentIssues: assessment.currentIssues.filter(i => i !== issue) });
                        }
                      }}
                    />
                    <Label htmlFor={issue} className="cursor-pointer text-carbon">{issue}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label className="text-body font-medium text-carbon">How would you rate your sleep quality?</Label>
              <RadioGroup value={assessment.sleepQuality} onValueChange={(value) => setAssessment({ ...assessment, sleepQuality: value })}>
                {["Poor (1-3)", "Fair (4-6)", "Good (7-8)", "Excellent (9-10)"].map((option) => (
                  <div key={option} className="flex items-center gap-3">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer text-carbon">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <Label className="text-body font-medium text-carbon">What's your current stress level?</Label>
              <RadioGroup value={assessment.stressLevel} onValueChange={(value) => setAssessment({ ...assessment, stressLevel: value })}>
                {["Low", "Moderate", "High", "Very High"].map((option) => (
                  <div key={option} className="flex items-center gap-3">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer text-carbon">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <Label className="text-body font-medium text-carbon">How active are you?</Label>
              <RadioGroup value={assessment.activityLevel} onValueChange={(value) => setAssessment({ ...assessment, activityLevel: value })}>
                {["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Athlete"].map((option) => (
                  <div key={option} className="flex items-center gap-3">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer text-carbon">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={isSubmitting}>
              Back
            </Button>
          )}
          <Button onClick={handleNext} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Protocol...
              </>
            ) : step === 5 ? (
              "Create Protocol"
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}