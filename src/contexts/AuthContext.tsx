import { createContext, useContext, ReactNode } from 'react';
import { useAuth, Profile, UserPreferences } from '@/hooks/useAuth';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  preferences: UserPreferences | null;
  loading: boolean;
  isAuthenticated: boolean;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: any } | undefined>;
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<{ error?: any } | undefined>;
  signOut: () => Promise<void>;
  refetchProfile: () => void;
  refetchPreferences: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
