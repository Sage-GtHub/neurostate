-- Protocol daily check-ins table
CREATE TABLE public.protocol_check_ins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  protocol_id UUID REFERENCES public.user_protocols(id) ON DELETE CASCADE,
  check_in_date DATE NOT NULL DEFAULT CURRENT_DATE,
  products_completed JSONB NOT NULL DEFAULT '[]',
  notes TEXT,
  mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 5),
  energy_score INTEGER CHECK (energy_score >= 1 AND energy_score <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.protocol_check_ins ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own check-ins"
ON public.protocol_check_ins FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own check-ins"
ON public.protocol_check_ins FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own check-ins"
ON public.protocol_check_ins FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own check-ins"
ON public.protocol_check_ins FOR DELETE
USING (auth.uid() = user_id);

-- Push notification subscriptions table
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  endpoint TEXT NOT NULL,
  p256dh_key TEXT NOT NULL,
  auth_key TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, endpoint)
);

-- Enable RLS
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can manage their own push subscriptions"
ON public.push_subscriptions FOR ALL
USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_protocol_check_ins_user_protocol ON public.protocol_check_ins(user_id, protocol_id);
CREATE INDEX idx_protocol_check_ins_date ON public.protocol_check_ins(check_in_date);
CREATE INDEX idx_push_subscriptions_user ON public.push_subscriptions(user_id);