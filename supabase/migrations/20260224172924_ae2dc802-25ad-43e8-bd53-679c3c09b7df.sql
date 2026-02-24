
-- Add priority_weight column to performance_goals for multi-goal balancing
ALTER TABLE public.performance_goals 
ADD COLUMN IF NOT EXISTS priority_weight integer NOT NULL DEFAULT 50;

-- Add a comment for clarity
COMMENT ON COLUMN public.performance_goals.priority_weight IS 'User-assigned priority weight (0-100) for multi-goal balancing';
