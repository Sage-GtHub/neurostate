
-- Personal intervention tracking for ROI analysis
CREATE TABLE public.protocol_interventions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  intervention_type TEXT NOT NULL DEFAULT 'dose_change',
  changes JSONB NOT NULL DEFAULT '{}',
  predicted_outcomes JSONB DEFAULT '{}',
  actual_outcomes JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  review_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  roi_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.protocol_interventions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own interventions"
  ON public.protocol_interventions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interventions"
  ON public.protocol_interventions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interventions"
  ON public.protocol_interventions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interventions"
  ON public.protocol_interventions FOR DELETE
  USING (auth.uid() = user_id);

CREATE TRIGGER update_protocol_interventions_updated_at
  BEFORE UPDATE ON public.protocol_interventions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
