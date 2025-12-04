import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useNovaOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsChecking(false);
        return;
      }

      // Check if user has completed onboarding (has assessment or connected devices)
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
          .limit(1)
      ]);

      const hasAssessment = assessmentResult.data && assessmentResult.data.length > 0;
      const hasDevices = devicesResult.data && devicesResult.data.length > 0;

      // Show onboarding if user has neither assessment nor devices
      setShowOnboarding(!hasAssessment && !hasDevices);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
  };

  return {
    showOnboarding,
    isChecking,
    completeOnboarding
  };
}