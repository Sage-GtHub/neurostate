-- Enable realtime for autonomous_nudges so clients get instant push when nudges are created
ALTER PUBLICATION supabase_realtime ADD TABLE public.autonomous_nudges;