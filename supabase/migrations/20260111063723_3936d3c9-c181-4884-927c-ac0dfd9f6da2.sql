-- Enable realtime for activity_feed table
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_feed;

-- Enable realtime for chat_threads table
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_threads;

-- Enable realtime for nova_chat_messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.nova_chat_messages;

-- Set replica identity to full for better realtime updates
ALTER TABLE public.activity_feed REPLICA IDENTITY FULL;
ALTER TABLE public.chat_threads REPLICA IDENTITY FULL;
ALTER TABLE public.nova_chat_messages REPLICA IDENTITY FULL;