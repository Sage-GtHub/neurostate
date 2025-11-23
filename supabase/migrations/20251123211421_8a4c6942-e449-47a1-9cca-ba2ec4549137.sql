-- Create table for user biometric metrics
CREATE TABLE public.user_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  metric_type TEXT NOT NULL, -- 'hrv', 'sleep_quality', 'recovery', 'focus_time'
  value NUMERIC NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  device_source TEXT, -- 'oura', 'apple_watch', 'whoop', 'manual'
  metadata JSONB, -- Additional context like sleep stages, energy curve data points
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for connected devices
CREATE TABLE public.connected_devices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  device_type TEXT NOT NULL, -- 'oura_ring', 'apple_watch', 'whoop'
  device_name TEXT NOT NULL,
  connection_status TEXT NOT NULL DEFAULT 'disconnected', -- 'connected', 'disconnected', 'syncing'
  last_sync_at TIMESTAMP WITH TIME ZONE,
  battery_level INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for active protocols
CREATE TABLE public.user_protocols (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  protocol_name TEXT NOT NULL,
  goal TEXT NOT NULL, -- 'performance', 'recovery', 'sleep', 'focus'
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'paused', 'completed'
  completion_percentage INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  products JSONB NOT NULL, -- Array of {product_id, product_name, dose, time}
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for chat messages
CREATE TABLE public.nova_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL, -- 'user', 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connected_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nova_chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for user_metrics
CREATE POLICY "Users can view their own metrics"
ON public.user_metrics FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics"
ON public.user_metrics FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create policies for connected_devices
CREATE POLICY "Users can view their own devices"
ON public.connected_devices FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own devices"
ON public.connected_devices FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own devices"
ON public.connected_devices FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devices"
ON public.connected_devices FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for user_protocols
CREATE POLICY "Users can view their own protocols"
ON public.user_protocols FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own protocols"
ON public.user_protocols FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own protocols"
ON public.user_protocols FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own protocols"
ON public.user_protocols FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for nova_chat_messages
CREATE POLICY "Users can view their own chat messages"
ON public.nova_chat_messages FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat messages"
ON public.nova_chat_messages FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_connected_devices_updated_at
BEFORE UPDATE ON public.connected_devices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_protocols_updated_at
BEFORE UPDATE ON public.user_protocols
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_user_metrics_user_id ON public.user_metrics(user_id);
CREATE INDEX idx_user_metrics_recorded_at ON public.user_metrics(recorded_at DESC);
CREATE INDEX idx_connected_devices_user_id ON public.connected_devices(user_id);
CREATE INDEX idx_user_protocols_user_id ON public.user_protocols(user_id);
CREATE INDEX idx_nova_chat_messages_user_id ON public.nova_chat_messages(user_id);
CREATE INDEX idx_nova_chat_messages_created_at ON public.nova_chat_messages(created_at DESC);