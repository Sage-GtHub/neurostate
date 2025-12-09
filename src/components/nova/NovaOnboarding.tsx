import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  Watch, 
  Target, 
  ArrowRight, 
  Check, 
  Brain,
  Activity,
  Shield,
  Loader2,
  ExternalLink
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface NovaOnboardingProps {
  open: boolean;
  onComplete: () => void;
}

type OnboardingStep = "welcome" | "devices" | "assessment" | "complete";

interface Device {
  id: string;
  name: string;
  type: string;
  icon: string;
  connected: boolean;
  connecting: boolean;
}

export function NovaOnboarding({ open, onComplete }: NovaOnboardingProps) {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [devices, setDevices] = useState<Device[]>([
    { id: "oura", name: "Oura Ring", type: "oura", icon: "💍", connected: false, connecting: false },
    { id: "whoop", name: "Whoop", type: "whoop", icon: "📿", connected: false, connecting: false },
    { id: "fitbit", name: "Fitbit", type: "fitbit", icon: "⌚", connected: false, connecting: false },
    { id: "garmin", name: "Garmin", type: "garmin", icon: "🏃", connected: false, connecting: false },
  ]);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const steps = ["welcome", "devices", "assessment", "complete"];
  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleConnectDevice = async (deviceId: string) => {
    // Mark device as connecting
    setDevices(prev => prev.map(d => 
      d.id === deviceId ? { ...d, connecting: true } : d
    ));
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Sign in required",
          description: "Please sign in to connect devices",
          variant: "destructive",
        });
        setDevices(prev => prev.map(d => 
          d.id === deviceId ? { ...d, connecting: false } : d
        ));
        return;
      }

      const device = devices.find(d => d.id === deviceId);
      if (!device) return;

      // Call Vital API to get OAuth link
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ 
            action: 'create-link',
            provider: device.type 
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create connection');
      }

      const data = await response.json();
      
      if (data.link_url) {
        // Open Vital Link in a new window for OAuth
        window.open(data.link_url, '_blank', 'width=600,height=700');
        
        toast({
          title: "Connection started",
          description: `Complete the ${device.name} authorisation in the new window. Return here when done.`,
        });
        
        // Poll for connection status
        const pollInterval = setInterval(async () => {
          const providersRes = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({ action: 'get-providers' }),
            }
          );
          
          if (providersRes.ok) {
            const providersData = await providersRes.json();
            const connectedProviders = providersData.providers?.filter((p: any) => p.status === 'connected').map((p: any) => p.slug) || [];
            
            if (connectedProviders.includes(device.type)) {
              clearInterval(pollInterval);
              setDevices(prev => prev.map(d => 
                d.id === deviceId ? { ...d, connected: true, connecting: false } : d
              ));
              
              // Also save to connected_devices table
              await supabase.from('connected_devices').upsert({
                user_id: session.user.id,
                device_type: device.type,
                device_name: device.name,
                connection_status: 'connected',
                last_sync_at: new Date().toISOString(),
              }, { onConflict: 'user_id,device_type' });
              
              toast({
                title: "Device connected",
                description: `${device.name} has been successfully connected.`,
              });
            }
          }
        }, 3000);
        
        // Clear polling after 2 minutes
        setTimeout(() => {
          clearInterval(pollInterval);
          setDevices(prev => prev.map(d => 
            d.id === deviceId && d.connecting ? { ...d, connecting: false } : d
          ));
        }, 120000);
      }
    } catch (error) {
      console.error("Error connecting device:", error);
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
      setDevices(prev => prev.map(d => 
        d.id === deviceId ? { ...d, connecting: false } : d
      ));
    }
  };

  const handleAssessmentSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Save assessment data
      const { error } = await supabase.from('protocol_assessments').insert({
        user_id: user.id,
        goals: Object.values(assessmentAnswers).filter(Boolean),
        assessment_data: assessmentAnswers,
        lifestyle_factors: {
          sleep_priority: assessmentAnswers.sleep || "moderate",
          stress_level: assessmentAnswers.stress || "moderate",
          activity_level: assessmentAnswers.activity || "moderate"
        }
      });

      if (error) throw error;

      // Generate initial metrics based on assessment
      await generateInitialMetrics(user.id);

      setStep("complete");
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast({
        title: "Error",
        description: "Failed to save assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateInitialMetrics = async (userId: string) => {
    // Only generate initial metrics if no devices are connected
    const connectedCount = devices.filter(d => d.connected).length;
    if (connectedCount > 0) return;
    
    const metrics = [
      { metric_type: 'hrv', value: 55 + Math.floor(Math.random() * 25) },
      { metric_type: 'sleep_quality', value: 6 + Math.floor(Math.random() * 3) },
      { metric_type: 'recovery', value: 70 + Math.floor(Math.random() * 20) },
      { metric_type: 'focus_time', value: 4 + Math.floor(Math.random() * 6) },
    ];

    for (const metric of metrics) {
      await supabase.from('user_metrics').insert({
        user_id: userId,
        metric_type: metric.metric_type,
        value: metric.value,
        device_source: 'onboarding_baseline'
      });
    }
  };

  const assessmentQuestions = [
    {
      id: "primary_goal",
      question: "What is your primary performance goal?",
      options: [
        { value: "sleep", label: "Better Sleep", icon: "🌙" },
        { value: "focus", label: "Enhanced Focus", icon: "🎯" },
        { value: "recovery", label: "Faster Recovery", icon: "💪" },
        { value: "energy", label: "More Energy", icon: "⚡" },
      ]
    },
    {
      id: "sleep",
      question: "How would you rate your current sleep quality?",
      options: [
        { value: "poor", label: "Poor", icon: "😴" },
        { value: "moderate", label: "Moderate", icon: "😐" },
        { value: "good", label: "Good", icon: "😊" },
        { value: "excellent", label: "Excellent", icon: "🌟" },
      ]
    },
    {
      id: "stress",
      question: "What is your typical stress level?",
      options: [
        { value: "low", label: "Low", icon: "😌" },
        { value: "moderate", label: "Moderate", icon: "😐" },
        { value: "high", label: "High", icon: "😰" },
        { value: "very_high", label: "Very High", icon: "🔥" },
      ]
    },
    {
      id: "activity",
      question: "How active are you typically?",
      options: [
        { value: "sedentary", label: "Sedentary", icon: "🪑" },
        { value: "light", label: "Lightly Active", icon: "🚶" },
        { value: "moderate", label: "Moderately Active", icon: "🏃" },
        { value: "very_active", label: "Very Active", icon: "🏋️" },
      ]
    },
  ];

  const connectedCount = devices.filter(d => d.connected).length;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <Progress value={progress} className="h-1" />
          <div className="flex justify-between mt-2 text-xs text-ash">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <div className="p-6">
          {/* Welcome Step */}
          {step === "welcome" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-carbon mb-2">Welcome to Nova</h2>
                <p className="text-ash max-w-md mx-auto">
                  Your AI performance copilot. Let us set up your personalised experience in just a few steps.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 py-6">
                {[
                  { icon: Brain, label: "Predicts", desc: "72-hour forecasting" },
                  { icon: Activity, label: "Adapts", desc: "Real-time adjustments" },
                  { icon: Shield, label: "Protects", desc: "Your data is yours" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 bg-pearl/50 rounded-xl">
                    <item.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-sm font-medium text-carbon">{item.label}</p>
                    <p className="text-xs text-ash">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => setStep("devices")} className="gap-2 rounded-full px-8">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Devices Step */}
          {step === "devices" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Watch className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-carbon mb-2">Connect Your Wearables</h2>
                <p className="text-ash">
                  Link your devices for real biometric tracking. You can also skip and connect later.
                </p>
              </div>

              <div className="space-y-3">
                {devices.map((device) => (
                  <Card 
                    key={device.id} 
                    className={`border transition-all ${device.connected ? 'border-accent bg-accent/5' : 'border-mist'}`}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{device.icon}</span>
                        <div>
                          <p className="font-medium text-carbon">{device.name}</p>
                          <p className="text-xs text-ash">
                            {device.connected ? "Connected" : device.connecting ? "Waiting for authorisation..." : "Not connected"}
                          </p>
                        </div>
                      </div>
                      {device.connected ? (
                        <Badge className="bg-accent/10 text-accent border-0">
                          <Check className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleConnectDevice(device.id)}
                          disabled={device.connecting}
                          className="gap-2"
                        >
                          {device.connecting ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-3 h-3" />
                              Connect
                            </>
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setStep("welcome")}>
                  Back
                </Button>
                <Button onClick={() => setStep("assessment")} className="gap-2 rounded-full px-8">
                  {connectedCount > 0 ? "Continue" : "Skip for Now"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Assessment Step */}
          {step === "assessment" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-carbon mb-2">Quick Assessment</h2>
                <p className="text-ash">
                  Help Nova understand your goals for personalised recommendations.
                </p>
              </div>

              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                {assessmentQuestions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <p className="font-medium text-carbon">{q.question}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setAssessmentAnswers(prev => ({ ...prev, [q.id]: option.value }))}
                          className={`p-3 rounded-xl border text-left transition-all min-h-[52px] ${
                            assessmentAnswers[q.id] === option.value
                              ? 'border-accent bg-accent/5'
                              : 'border-mist hover:border-accent/50'
                          }`}
                        >
                          <span className="text-lg mr-2">{option.icon}</span>
                          <span className="text-sm font-medium text-carbon">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setStep("devices")}>
                  Back
                </Button>
                <Button 
                  onClick={handleAssessmentSubmit} 
                  disabled={isSubmitting || Object.keys(assessmentAnswers).length < assessmentQuestions.length}
                  className="gap-2 rounded-full px-8"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
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
          )}

          {/* Complete Step */}
          {step === "complete" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-carbon mb-2">You are All Set</h2>
                <p className="text-ash max-w-md mx-auto">
                  Nova is now configured and ready to help you optimise your performance.
                </p>
              </div>
              <div className="bg-pearl/50 rounded-xl p-6 text-left space-y-3">
                <p className="font-medium text-carbon">What happens next:</p>
                <ul className="space-y-2 text-sm text-ash">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    {connectedCount > 0 
                      ? "Nova will analyse your wearable data in real-time"
                      : "Connect a device to unlock real-time analysis"
                    }
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    Personalised insights will generate as data comes in
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    Your 7-day health forecast will populate automatically
                  </li>
                </ul>
              </div>
              <Button onClick={onComplete} className="gap-2 rounded-full px-8">
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
