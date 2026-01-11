import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  theme: string;
  email_notifications: boolean;
  push_notifications: boolean;
  weekly_summary_emails: boolean;
  insight_alerts: boolean;
  protocol_reminders: boolean;
  default_dashboard: string;
  timezone: string;
  language: string;
  onboarding_completed: boolean;
  onboarding_step: number;
  sidebar_collapsed: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (data) {
      setProfile(data as Profile);
    }
  }, []);

  const fetchPreferences = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (data) {
      setPreferences(data as UserPreferences);
    } else {
      // Create default preferences
      const { data: newPrefs } = await supabase
        .from('user_preferences')
        .insert({ user_id: userId })
        .select()
        .single();
      
      if (newPrefs) {
        setPreferences(newPrefs as UserPreferences);
      }
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        
        if (session?.user) {
          // Defer Supabase calls with setTimeout
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchPreferences(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setPreferences(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchPreferences(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, fetchPreferences]);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...updates, updated_at: new Date().toISOString() });
    
    if (!error) {
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    }
    
    return { error };
  }, [user]);

  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('user_preferences')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', user.id);
    
    if (!error) {
      setPreferences(prev => prev ? { ...prev, ...updates } : null);
    }
    
    return { error };
  }, [user]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setPreferences(null);
    setIsAuthenticated(false);
  }, []);

  return {
    user,
    session,
    profile,
    preferences,
    loading,
    isAuthenticated,
    updateProfile,
    updatePreferences,
    signOut,
    refetchProfile: () => user && fetchProfile(user.id),
    refetchPreferences: () => user && fetchPreferences(user.id),
  };
}
