-- Enable REPLICA IDENTITY FULL for user_metrics to capture complete row data
ALTER TABLE public.user_metrics REPLICA IDENTITY FULL;

-- Add user_metrics to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_metrics;