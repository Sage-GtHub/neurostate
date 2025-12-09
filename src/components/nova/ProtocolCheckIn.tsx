import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Check, Loader2, Smile, Meh, Frown, Zap, Battery } from "lucide-react";

interface Product {
  product_name: string;
  dose: string;
  time: string;
}

interface ProtocolCheckInProps {
  protocolId: string;
  products: Product[];
  onComplete?: () => void;
}

export function ProtocolCheckIn({ protocolId, products, onComplete }: ProtocolCheckInProps) {
  const [completedProducts, setCompletedProducts] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [moodScore, setMoodScore] = useState<number | null>(null);
  const [energyScore, setEnergyScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkTodayStatus();
  }, [protocolId]);

  const checkTodayStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('protocol_check_ins')
        .select('*')
        .eq('user_id', user.id)
        .eq('protocol_id', protocolId)
        .eq('check_in_date', today)
        .single();

      if (data) {
        setTodayCheckedIn(true);
        setCompletedProducts((data.products_completed as string[]) || []);
        setNotes(data.notes || "");
        setMoodScore(data.mood_score);
        setEnergyScore(data.energy_score);
      }
    } catch (error) {
      // No check-in for today
    }
  };

  const handleProductToggle = (productName: string) => {
    setCompletedProducts(prev => 
      prev.includes(productName) 
        ? prev.filter(p => p !== productName)
        : [...prev, productName]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const today = new Date().toISOString().split('T')[0];
      
      const checkInData = {
        user_id: user.id,
        protocol_id: protocolId,
        check_in_date: today,
        products_completed: completedProducts,
        notes: notes || null,
        mood_score: moodScore,
        energy_score: energyScore,
      };

      if (todayCheckedIn) {
        await supabase
          .from('protocol_check_ins')
          .update(checkInData)
          .eq('user_id', user.id)
          .eq('protocol_id', protocolId)
          .eq('check_in_date', today);
      } else {
        await supabase
          .from('protocol_check_ins')
          .insert(checkInData);
      }

      // Update protocol completion percentage
      const completionRate = Math.round((completedProducts.length / products.length) * 100);
      await supabase
        .from('user_protocols')
        .update({ completion_percentage: completionRate })
        .eq('id', protocolId);

      setTodayCheckedIn(true);
      toast({
        title: "Check-in saved",
        description: `${completedProducts.length}/${products.length} products completed today.`,
      });
      onComplete?.();
    } catch (error) {
      console.error("Check-in error:", error);
      toast({
        title: "Error",
        description: "Failed to save check-in.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const moodOptions = [
    { score: 1, icon: Frown, label: "Low" },
    { score: 2, icon: Frown, label: "Below Average" },
    { score: 3, icon: Meh, label: "Average" },
    { score: 4, icon: Smile, label: "Good" },
    { score: 5, icon: Smile, label: "Excellent" },
  ];

  const energyOptions = [
    { score: 1, icon: Battery, label: "Exhausted" },
    { score: 2, icon: Battery, label: "Low" },
    { score: 3, icon: Battery, label: "Moderate" },
    { score: 4, icon: Zap, label: "High" },
    { score: 5, icon: Zap, label: "Peak" },
  ];

  return (
    <Card className="border-mist/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-carbon">Daily Check-In</h3>
          {todayCheckedIn && (
            <span className="flex items-center gap-1 text-xs text-accent font-medium">
              <Check className="w-4 h-4" />
              Completed today
            </span>
          )}
        </div>

        {/* Products Checklist */}
        <div className="space-y-3 mb-6">
          <p className="text-sm text-ash font-medium">Today's Stack</p>
          {products.map((product, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-pearl/50 hover:bg-pearl cursor-pointer transition-colors"
            >
              <Checkbox
                checked={completedProducts.includes(product.product_name)}
                onCheckedChange={() => handleProductToggle(product.product_name)}
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-carbon">{product.product_name}</span>
                <span className="text-xs text-ash ml-2">{product.dose} – {product.time}</span>
              </div>
            </label>
          ))}
        </div>

        {/* Mood Score */}
        <div className="mb-6">
          <p className="text-sm text-ash font-medium mb-3">How are you feeling?</p>
          <div className="flex gap-2">
            {moodOptions.map((option) => (
              <button
                key={option.score}
                onClick={() => setMoodScore(option.score)}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  moodScore === option.score
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-mist/50 text-ash hover:border-accent/50'
                }`}
              >
                <option.icon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">{option.score}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Energy Score */}
        <div className="mb-6">
          <p className="text-sm text-ash font-medium mb-3">Energy level?</p>
          <div className="flex gap-2">
            {energyOptions.map((option) => (
              <button
                key={option.score}
                onClick={() => setEnergyScore(option.score)}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  energyScore === option.score
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-mist/50 text-ash hover:border-accent/50'
                }`}
              >
                <option.icon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">{option.score}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <p className="text-sm text-ash font-medium mb-3">Notes (optional)</p>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did you feel today? Any observations?"
            className="resize-none"
            rows={3}
          />
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || completedProducts.length === 0}
          className="w-full gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {todayCheckedIn ? "Update Check-In" : "Complete Check-In"}
        </Button>
      </CardContent>
    </Card>
  );
}
