-- Create loyalty points transactions table
CREATE TABLE public.loyalty_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  points INTEGER NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earned', 'redeemed', 'expired', 'bonus')),
  description TEXT NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rewards catalog table
CREATE TABLE public.rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points_required INTEGER NOT NULL,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('discount', 'free_product', 'free_shipping', 'exclusive_access')),
  discount_percentage INTEGER,
  discount_amount NUMERIC,
  product_id TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  image_url TEXT,
  terms TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reward redemptions table
CREATE TABLE public.reward_redemptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  reward_id UUID NOT NULL REFERENCES public.rewards(id) ON DELETE CASCADE,
  points_spent INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'used', 'expired')),
  redemption_code TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  redeemed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  used_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_redemptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for loyalty_points
CREATE POLICY "Users can view their own points"
  ON public.loyalty_points
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can create point transactions"
  ON public.loyalty_points
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for rewards (public catalog)
CREATE POLICY "Anyone can view active rewards"
  ON public.rewards
  FOR SELECT
  USING (is_active = true);

-- RLS Policies for reward_redemptions
CREATE POLICY "Users can view their own redemptions"
  ON public.reward_redemptions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create redemptions"
  ON public.reward_redemptions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own redemptions"
  ON public.reward_redemptions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to calculate user's total points
CREATE OR REPLACE FUNCTION public.get_user_points_balance(p_user_id UUID)
RETURNS INTEGER
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(SUM(points), 0)::INTEGER
  FROM public.loyalty_points
  WHERE user_id = p_user_id;
$$;

-- Create function to award points when order is created
CREATE OR REPLACE FUNCTION public.award_loyalty_points_on_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  points_to_award INTEGER;
BEGIN
  -- Award 1 point per £1 spent (adjust as needed)
  points_to_award := FLOOR(NEW.total_amount)::INTEGER;
  
  -- Insert points transaction
  INSERT INTO public.loyalty_points (user_id, points, transaction_type, description, order_id)
  VALUES (NEW.user_id, points_to_award, 'earned', 'Points earned from order #' || NEW.order_number, NEW.id);
  
  RETURN NEW;
END;
$$;

-- Create trigger to award points on order creation
CREATE TRIGGER award_points_on_order_created
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.award_loyalty_points_on_order();

-- Create indexes for performance
CREATE INDEX idx_loyalty_points_user_id ON public.loyalty_points(user_id);
CREATE INDEX idx_loyalty_points_created_at ON public.loyalty_points(created_at DESC);
CREATE INDEX idx_reward_redemptions_user_id ON public.reward_redemptions(user_id);
CREATE INDEX idx_rewards_active ON public.rewards(is_active) WHERE is_active = true;