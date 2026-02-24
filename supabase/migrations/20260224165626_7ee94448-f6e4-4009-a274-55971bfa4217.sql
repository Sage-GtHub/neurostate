-- Create autonomous_nudges table for AI-generated coaching actions
CREATE TABLE public.autonomous_nudges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  nudge_type TEXT NOT NULL DEFAULT 'nudge', -- nudge, risk_alert, pattern, prediction, protocol_adjustment
  category TEXT NOT NULL DEFAULT 'general', -- movement, hydration, focus, rest, nutrition, mindfulness, recovery, training
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT, -- e.g. "+23% productivity"
  confidence INTEGER DEFAULT 75,
  timing TEXT, -- e.g. "9:00 AM - 11:00 AM"
  priority TEXT NOT NULL DEFAULT 'medium', -- low, medium, high, critical
  status TEXT NOT NULL DEFAULT 'active', -- active, completed, dismissed, expired
  action_label TEXT, -- e.g. "Adjust caffeine cutoff"
  metadata JSONB DEFAULT '{}'::jsonb, -- flexible data: biometric_trigger, pattern_data, prediction_data
  expires_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.autonomous_nudges ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own nudges"
  ON public.autonomous_nudges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own nudges"
  ON public.autonomous_nudges FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own nudges"
  ON public.autonomous_nudges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own nudges"
  ON public.autonomous_nudges FOR DELETE
  USING (auth.uid() = user_id);

-- Index for efficient queries
CREATE INDEX idx_autonomous_nudges_user_status ON public.autonomous_nudges (user_id, status);
CREATE INDEX idx_autonomous_nudges_type ON public.autonomous_nudges (user_id, nudge_type);