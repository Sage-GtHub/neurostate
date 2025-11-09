-- Create learning paths table
CREATE TABLE public.learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  category TEXT NOT NULL,
  image_url TEXT,
  badge_name TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create learning path lessons table
CREATE TABLE public.learning_path_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id UUID NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 10,
  video_url TEXT,
  resources JSONB,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user progress table
CREATE TABLE public.user_learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  path_id UUID NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.learning_path_lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  UNIQUE(user_id, lesson_id)
);

-- Create user badges table
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  path_id UUID NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, path_id)
);

-- Enable RLS
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_path_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- RLS Policies for learning_paths
CREATE POLICY "Anyone can view active learning paths"
  ON public.learning_paths
  FOR SELECT
  USING (is_active = true);

-- RLS Policies for learning_path_lessons
CREATE POLICY "Anyone can view lessons for active paths"
  ON public.learning_path_lessons
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.learning_paths
      WHERE id = path_id AND is_active = true
    )
  );

-- RLS Policies for user_learning_progress
CREATE POLICY "Users can view their own progress"
  ON public.user_learning_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress"
  ON public.user_learning_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.user_learning_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_badges
CREATE POLICY "Users can view their own badges"
  ON public.user_badges
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can earn badges"
  ON public.user_badges
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_lessons_path_id ON public.learning_path_lessons(path_id);
CREATE INDEX idx_progress_user_id ON public.user_learning_progress(user_id);
CREATE INDEX idx_progress_path_id ON public.user_learning_progress(path_id);
CREATE INDEX idx_badges_user_id ON public.user_badges(user_id);

-- Insert sample learning paths
INSERT INTO public.learning_paths (title, description, duration_days, difficulty, category, badge_name, badge_icon, order_index) VALUES
('30-Day Sleep Optimization', 'Transform your sleep quality with science-backed strategies, supplements, and recovery techniques designed to help you fall asleep faster and wake up refreshed.', 30, 'beginner', 'Sleep', 'Sleep Master', '🌙', 1),
('Complete Recovery Protocol', 'Master advanced recovery techniques including red light therapy, cold exposure, and targeted supplementation to accelerate muscle recovery and reduce inflammation.', 21, 'intermediate', 'Recovery', 'Recovery Pro', '⚡', 2),
('Cognitive Performance Mastery', 'Optimize your mental clarity, focus, and memory through strategic nootropic supplementation, lifestyle optimization, and proven cognitive enhancement techniques.', 14, 'advanced', 'Brain Health', 'Mind Master', '🧠', 3),
('Foundation of Wellness', 'Build a solid foundation for optimal health through proper nutrition, essential supplementation, and sustainable wellness habits that support long-term vitality.', 45, 'beginner', 'Wellness', 'Wellness Warrior', '✨', 4);

-- Get the path IDs for lesson insertion
DO $$
DECLARE
  sleep_path_id UUID;
  recovery_path_id UUID;
  cognitive_path_id UUID;
  wellness_path_id UUID;
BEGIN
  SELECT id INTO sleep_path_id FROM public.learning_paths WHERE title = '30-Day Sleep Optimization';
  SELECT id INTO recovery_path_id FROM public.learning_paths WHERE title = 'Complete Recovery Protocol';
  SELECT id INTO cognitive_path_id FROM public.learning_paths WHERE title = 'Cognitive Performance Mastery';
  SELECT id INTO wellness_path_id FROM public.learning_paths WHERE title = 'Foundation of Wellness';

  -- Sleep Optimization lessons (sample of 5 days)
  INSERT INTO public.learning_path_lessons (path_id, title, description, content, day_number, duration_minutes, order_index) VALUES
  (sleep_path_id, 'Understanding Your Sleep Cycle', 'Learn the science behind sleep stages and why quality matters more than quantity.', 'Your sleep cycle consists of multiple stages including light sleep, deep sleep, and REM sleep. Understanding these stages helps you optimize your sleep schedule. Deep sleep is crucial for physical recovery, while REM sleep supports cognitive function and memory consolidation.', 1, 15, 1),
  (sleep_path_id, 'Creating Your Sleep Environment', 'Optimize your bedroom for maximum sleep quality with temperature, light, and sound control.', 'The ideal sleep environment is cool (65-68°F), completely dark, and quiet. Consider blackout curtains, a quality mattress, and removing electronic devices. Temperature regulation is crucial—your body naturally cools down for sleep, so a cooler room facilitates this process.', 2, 12, 2),
  (sleep_path_id, 'Evening Routine Essentials', 'Build a consistent wind-down routine that signals your body it is time to sleep.', 'Start your wind-down routine 60-90 minutes before bed. This includes dimming lights, avoiding screens, and engaging in relaxing activities like reading or gentle stretching. Consistency is key—your body thrives on routine and will begin preparing for sleep automatically.', 3, 10, 3),
  (sleep_path_id, 'Supplement Strategy for Sleep', 'Discover evidence-based supplements that support natural sleep cycles without dependency.', 'Key sleep-supporting supplements include magnesium glycinate (400mg), L-theanine (200mg), and glycine (3g). These work synergistically to promote relaxation and support natural melatonin production. Take 30-60 minutes before bed for optimal results.', 4, 15, 4),
  (sleep_path_id, 'Managing Sleep Disruptors', 'Identify and eliminate common factors that interfere with quality sleep.', 'Common sleep disruptors include caffeine after 2pm, alcohol within 3 hours of bedtime, late evening meals, and stress. Learn to recognize your personal triggers and implement strategies to minimize their impact on your sleep quality.', 5, 12, 5);

  -- Recovery Protocol lessons (sample of 3 days)
  INSERT INTO public.learning_path_lessons (path_id, title, description, content, day_number, duration_minutes, order_index) VALUES
  (recovery_path_id, 'Recovery Science Fundamentals', 'Understanding inflammation, muscle repair, and the recovery timeline.', 'Muscle recovery involves inflammation, repair, and adaptation phases. Proper recovery is when your body gets stronger—not during training. Inflammation is natural but chronic inflammation impairs recovery. Learn to support each phase with targeted interventions.', 1, 20, 1),
  (recovery_path_id, 'Red Light Therapy Protocol', 'How to use red light therapy to accelerate tissue repair and reduce inflammation.', 'Red light (660nm) and near-infrared (850nm) wavelengths penetrate deep into tissues, stimulating mitochondrial function and ATP production. Use 10-20 minutes daily, 6-12 inches from the body. Best timing is morning for energy or post-workout for recovery.', 2, 18, 2),
  (recovery_path_id, 'Cold Exposure Mastery', 'Implementing ice baths and cold showers for optimal recovery benefits.', 'Cold exposure (50-59°F) for 2-3 minutes triggers vasoconstriction, reducing inflammation and metabolic waste. Wait 4+ hours post-strength training to avoid blunting adaptation. Morning cold exposure boosts alertness and metabolism through norepinephrine release.', 3, 15, 3);

  -- Cognitive Performance lessons (sample of 2 days)
  INSERT INTO public.learning_path_lessons (path_id, title, description, content, day_number, duration_minutes, order_index) VALUES
  (cognitive_path_id, 'Brain Health Basics', 'Understanding neuroplasticity, neurotransmitters, and cognitive enhancement.', 'Your brain is highly adaptable through neuroplasticity. Key neurotransmitters include dopamine (motivation), acetylcholine (learning), serotonin (mood), and norepinephrine (focus). Optimizing these through lifestyle and supplementation enhances cognitive performance across all domains.', 1, 18, 1),
  (cognitive_path_id, 'Nootropic Stack Design', 'Building an effective nootropic protocol for focus, memory, and clarity.', 'An effective stack includes: L-theanine + caffeine for focused energy, Alpha-GPC for acetylcholine support, Rhodiola for stress resilience, and Lion''s Mane for neurogenesis. Start with lower doses and adjust based on response. Timing matters—stimulating nootropics in the morning, calming ones in the evening.', 2, 22, 2);
END $$;