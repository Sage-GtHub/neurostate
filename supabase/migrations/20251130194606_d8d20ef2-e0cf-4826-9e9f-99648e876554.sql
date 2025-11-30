-- Nova Advanced Features Database Schema

-- Protocol assessments and generation
CREATE TABLE IF NOT EXISTS public.protocol_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  assessment_data JSONB NOT NULL,
  goals TEXT[] NOT NULL,
  lifestyle_factors JSONB,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- AI-generated insights and predictions
CREATE TABLE IF NOT EXISTS public.ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  insight_type TEXT NOT NULL, -- 'prediction', 'pattern', 'warning', 'optimization'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  confidence_score INTEGER,
  timeframe TEXT,
  recommendations JSONB,
  data_sources JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ
);

-- Health forecasts
CREATE TABLE IF NOT EXISTS public.health_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  forecast_date DATE NOT NULL,
  optimal_training_window TEXT,
  energy_prediction JSONB,
  recovery_prediction INTEGER,
  intervention_timing JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, forecast_date)
);

-- Biometric data streams
CREATE TABLE IF NOT EXISTS public.biometric_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  device_id UUID REFERENCES public.connected_devices(id),
  stream_type TEXT NOT NULL, -- 'heart_rate', 'hrv', 'sleep_stages', 'activity', 'stress'
  value JSONB NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_biometric_streams_user_type ON public.biometric_streams(user_id, stream_type, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_biometric_streams_device ON public.biometric_streams(device_id, recorded_at DESC);

-- Protocol customization history
CREATE TABLE IF NOT EXISTS public.protocol_adjustments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_id UUID REFERENCES public.user_protocols(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  adjustment_type TEXT NOT NULL, -- 'ai_auto', 'user_manual', 'morning_checkin'
  previous_state JSONB,
  new_state JSONB,
  reason TEXT,
  biometric_trigger JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Performance goals tracking
CREATE TABLE IF NOT EXISTS public.performance_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  goal_type TEXT NOT NULL, -- 'sleep', 'focus', 'recovery', 'energy'
  target_value NUMERIC NOT NULL,
  current_value NUMERIC,
  progress_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  target_date DATE,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'paused'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.protocol_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biometric_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocol_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_goals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own assessments" ON public.protocol_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own assessments" ON public.protocol_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own insights" ON public.ai_insights FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own insights" ON public.ai_insights FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own forecasts" ON public.health_forecasts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own forecasts" ON public.health_forecasts FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own biometric streams" ON public.biometric_streams FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own biometric streams" ON public.biometric_streams FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own protocol adjustments" ON public.protocol_adjustments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own protocol adjustments" ON public.protocol_adjustments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own goals" ON public.performance_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own goals" ON public.performance_goals FOR ALL USING (auth.uid() = user_id);