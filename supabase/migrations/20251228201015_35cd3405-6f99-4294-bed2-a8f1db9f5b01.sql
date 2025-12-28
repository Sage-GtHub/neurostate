-- Create Nova AI usage tracking table for per-seat billing
CREATE TABLE public.nova_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organisation_id UUID REFERENCES public.organisations(id) ON DELETE SET NULL,
  session_started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_ended_at TIMESTAMP WITH TIME ZONE,
  tokens_used INTEGER DEFAULT 0,
  messages_count INTEGER DEFAULT 0,
  feature_type TEXT NOT NULL DEFAULT 'chat',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.nova_usage ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage
CREATE POLICY "Users can view their own Nova usage"
ON public.nova_usage
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own usage
CREATE POLICY "Users can insert their own Nova usage"
ON public.nova_usage
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own usage
CREATE POLICY "Users can update their own Nova usage"
ON public.nova_usage
FOR UPDATE
USING (auth.uid() = user_id);

-- Org admins can view all org usage (using security definer function)
CREATE OR REPLACE FUNCTION public.is_org_admin_or_owner(org_id UUID, user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.organisation_members
    WHERE organisation_id = org_id
      AND user_id = user_uuid
      AND role IN ('admin', 'owner')
  )
$$;

-- Policy for org admins to view all org member usage
CREATE POLICY "Org admins can view organisation Nova usage"
ON public.nova_usage
FOR SELECT
USING (
  organisation_id IS NOT NULL 
  AND public.is_org_admin_or_owner(organisation_id, auth.uid())
);

-- Create index for faster queries
CREATE INDEX idx_nova_usage_user_id ON public.nova_usage(user_id);
CREATE INDEX idx_nova_usage_organisation_id ON public.nova_usage(organisation_id);
CREATE INDEX idx_nova_usage_created_at ON public.nova_usage(created_at);

-- Add realtime for nova_usage
ALTER PUBLICATION supabase_realtime ADD TABLE public.nova_usage;