import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useOnboardingWizard() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        // Delay check slightly to ensure profile is created
        setTimeout(checkOnboardingStatus, 500);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsChecking(false);
        return;
      }

      // Check user preferences first for explicit onboarding completion
      const { data: preferences } = await supabase
        .from('user_preferences')
        .select('onboarding_completed')
        .eq('user_id', user.id)
        .single();

      if (preferences?.onboarding_completed) {
        setShowOnboarding(false);
        setIsChecking(false);
        return;
      }

      // Fallback: check if user has assessment or connected devices
      const [assessmentResult, devicesResult] = await Promise.all([
        supabase
          .from('protocol_assessments')
          .select('id')
          .eq('user_id', user.id)
          .limit(1),
        supabase
          .from('connected_devices')
          .select('id')
          .eq('user_id', user.id)
          .eq('connection_status', 'connected')
          .limit(1)
      ]);

      const hasAssessment = assessmentResult.data && assessmentResult.data.length > 0;
      const hasDevices = devicesResult.data && devicesResult.data.length > 0;

      // Show onboarding if user has neither assessment nor devices
      setShowOnboarding(!hasAssessment && !hasDevices);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // On error, don't show onboarding (fail silently)
      setShowOnboarding(false);
    } finally {
      setIsChecking(false);
    }
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
  };

  const skipOnboarding = () => {
    setShowOnboarding(false);
  };

  return {
    showOnboarding,
    isChecking,
    completeOnboarding,
    skipOnboarding,
  };
}
