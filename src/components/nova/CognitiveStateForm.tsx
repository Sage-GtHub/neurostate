import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Heart, Battery, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CognitiveStateFormProps {
  onSubmitted?: () => void;
}

const METRICS = [
  { key: 'focus_score', label: 'Focus', icon: Brain, color: 'text-accent' },
  { key: 'energy_level', label: 'Energy', icon: Zap, color: 'text-primary' },
  { key: 'stress_level', label: 'Stress', icon: Heart, color: 'text-destructive' },
  { key: 'recovery_score', label: 'Recovery', icon: Battery, color: 'text-signal-green' },
] as const;

export function CognitiveStateForm({ onSubmitted }: CognitiveStateFormProps) {
  const [scores, setScores] = useState<Record<string, number>>({
    focus_score: 50,
    energy_level: 50,
    stress_level: 30,
    recovery_score: 70,
  });
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const inserts = Object.entries(scores).map(([metric_type, value]) => ({
        user_id: user.id,
        metric_type,
        value,
        device_source: 'manual_entry',
        metadata: notes ? { notes } : null,
      }));

      const { error } = await supabase.from('user_metrics').insert(inserts);
      if (error) throw error;

      toast({ title: 'Logged successfully', description: 'Your cognitive state has been recorded.' });
      setNotes('');
      onSubmitted?.();
    } catch (err) {
      console.error('Error submitting cognitive state:', err);
      toast({ title: 'Error', description: 'Failed to log your state. Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const getScoreLabel = (key: string, value: number) => {
    if (key === 'stress_level') {
      return value <= 25 ? 'Low' : value <= 50 ? 'Moderate' : value <= 75 ? 'High' : 'Very High';
    }
    return value <= 25 ? 'Low' : value <= 50 ? 'Moderate' : value <= 75 ? 'Good' : 'Excellent';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl bg-foreground/[0.02] border border-border/20"
    >
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-4 h-4 text-foreground/40" />
        <p className="text-xs font-medium text-foreground">Log Cognitive State</p>
      </div>

      <div className="space-y-5">
        {METRICS.map(({ key, label, icon: Icon, color }) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon className={cn('w-3.5 h-3.5', color)} />
                <span className="text-xs text-foreground/70">{label}</span>
              </div>
              <span className="text-xs font-medium text-foreground">
                {scores[key]} — <span className="text-foreground/50">{getScoreLabel(key, scores[key])}</span>
              </span>
            </div>
            <Slider
              value={[scores[key]]}
              onValueChange={([v]) => setScores(prev => ({ ...prev, [key]: v }))}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Optional notes — how are you feeling?"
        className="mt-5 bg-background/50 border-border/20 text-xs resize-none h-16"
        maxLength={500}
      />

      <Button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full mt-4 rounded-full h-10 bg-foreground text-background hover:bg-foreground/90 text-xs gap-2"
      >
        {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
        {submitting ? 'Logging...' : 'Log State'}
      </Button>
    </motion.div>
  );
}
