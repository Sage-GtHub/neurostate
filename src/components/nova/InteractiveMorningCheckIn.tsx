import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Sun, Battery, Brain, Moon, Loader2, Check } from "lucide-react";

interface InteractiveMorningCheckInProps {
  onComplete?: () => void;
}

export function InteractiveMorningCheckIn({ onComplete }: InteractiveMorningCheckInProps) {
  const [sleepQuality, setSleepQuality] = useState<number | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number | null>(null);
  const [moodScore, setMoodScore] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkTodayStatus();
  }, []);

  const checkTodayStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];
      
      const { data } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .eq('metric_type', 'morning_checkin')
        .gte('recorded_at', today)
        .limit(1);

      if (data && data.length > 0) {
        setHasCheckedIn(true);
        const metadata = data[0].metadata as any;
        if (metadata) {
          setSleepQuality(metadata.sleep_quality || null);
          setEnergyLevel(metadata.energy_level || null);
          setMoodScore(metadata.mood_score || null);
          setNotes(metadata.notes || "");
        }
      }
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  const handleSubmit = async () => {
    if (sleepQuality === null || energyLevel === null || moodScore === null) {
      toast({
        title: "Complete all fields",
        description: "Please rate your sleep, energy, and mood.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Calculate readiness score (weighted average)
      const readinessScore = Math.round(
        (sleepQuality * 0.4 + energyLevel * 0.35 + moodScore * 0.25) * 10
      );

      // Save the check-in as a metric
      const { error } = await supabase.from('user_metrics').insert({
        user_id: user.id,
        metric_type: 'morning_checkin',
        value: readinessScore,
        device_source: 'manual',
        metadata: {
          sleep_quality: sleepQuality,
          energy_level: energyLevel,
          mood_score: moodScore,
          notes: notes,
        }
      });

      if (error) throw error;

      // Also save individual metrics for tracking
      await Promise.all([
        supabase.from('user_metrics').insert({
          user_id: user.id,
          metric_type: 'sleep_quality',
          value: sleepQuality,
          device_source: 'manual',
        }),
        supabase.from('user_metrics').insert({
          user_id: user.id,
          metric_type: 'readiness',
          value: readinessScore,
          device_source: 'manual',
        }),
      ]);

      setHasCheckedIn(true);
      toast({
        title: "Check-in complete",
        description: `Your readiness score is ${readinessScore}%. Nova will optimise your day accordingly.`,
      });
      
      onComplete?.();
    } catch (error) {
      console.error("Error saving check-in:", error);
      toast({
        title: "Error",
        description: "Failed to save check-in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const getRatingLabel = (value: number) => {
    if (value <= 3) return "Low";
    if (value <= 6) return "Moderate";
    if (value <= 8) return "Good";
    return "Excellent";
  };

  const getRatingColor = (value: number | null, selected: number) => {
    if (value === null || value !== selected) return "bg-muted hover:bg-muted/80";
    if (selected <= 3) return "bg-red-500 text-white";
    if (selected <= 6) return "bg-orange-500 text-white";
    if (selected <= 8) return "bg-accent text-white";
    return "bg-green-500 text-white";
  };

  if (hasCheckedIn) {
    const readinessScore = sleepQuality && energyLevel && moodScore 
      ? Math.round((sleepQuality * 0.4 + energyLevel * 0.35 + moodScore * 0.25) * 10)
      : 0;

    return (
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Check className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Morning check-in complete</h3>
              <p className="text-sm text-muted-foreground">
                Your readiness score is <span className="font-semibold text-accent">{readinessScore}%</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">Morning Check-In</CardTitle>
            <p className="text-sm text-muted-foreground">How are you feeling today?</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sleep Quality */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Sleep Quality</span>
            {sleepQuality && (
              <span className="text-xs text-muted-foreground ml-auto">
                {getRatingLabel(sleepQuality)}
              </span>
            )}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {ratingOptions.map((value) => (
              <button
                key={`sleep-${value}`}
                onClick={() => setSleepQuality(value)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${getRatingColor(sleepQuality, value)}`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Energy Level */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Energy Level</span>
            {energyLevel && (
              <span className="text-xs text-muted-foreground ml-auto">
                {getRatingLabel(energyLevel)}
              </span>
            )}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {ratingOptions.map((value) => (
              <button
                key={`energy-${value}`}
                onClick={() => setEnergyLevel(value)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${getRatingColor(energyLevel, value)}`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Mood Score */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Mental Clarity</span>
            {moodScore && (
              <span className="text-xs text-muted-foreground ml-auto">
                {getRatingLabel(moodScore)}
              </span>
            )}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {ratingOptions.map((value) => (
              <button
                key={`mood-${value}`}
                onClick={() => setMoodScore(value)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${getRatingColor(moodScore, value)}`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes (optional)</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything affecting your day? (stress, travel, caffeine, etc.)"
            rows={2}
            className="resize-none"
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || sleepQuality === null || energyLevel === null || moodScore === null}
          className="w-full gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Complete Check-In
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
