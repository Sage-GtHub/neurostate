-- Add tracking fields to orders table
ALTER TABLE public.orders 
ADD COLUMN tracking_number TEXT,
ADD COLUMN carrier TEXT,
ADD COLUMN shipped_at TIMESTAMP WITH TIME ZONE;

-- Create index for tracking number lookups
CREATE INDEX idx_orders_tracking_number ON public.orders(tracking_number) WHERE tracking_number IS NOT NULL;