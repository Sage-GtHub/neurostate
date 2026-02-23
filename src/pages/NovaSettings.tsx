import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { FloatingNovaChat } from "@/components/nova/FloatingNovaChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { NotificationSettings } from "@/components/nova/NotificationSettings";
import { User, Bell, Shield, Download, LogOut, Loader2, Save, Moon, Sun, ArrowUpRight } from "lucide-react";
import { SEO } from "@/components/SEO";

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
}

export default function NovaSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      
      if (data) {
        setProfile(data);
        setFullName(data.full_name || "");
        setPhone(data.phone || "");
      } else {
        setProfile({ id: user.id, email: user.email || null, full_name: null, phone: null });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: profile.id,
        full_name: fullName || null,
        phone: phone || null,
        updated_at: new Date().toISOString()
      });
      if (error) throw error;
      toast({ title: "Profile updated", description: "Your changes have been saved." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save profile", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast({ title: "Signed out", description: "You have been signed out successfully." });
  };

  if (isLoading) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          
          {/* Header skeleton */}
          <div className="relative border-b border-foreground/5">
            <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-12">
              <div className="w-20 h-3 rounded-full bg-foreground/5 skeleton-shimmer mb-3" />
              <div className="w-32 h-6 rounded-lg bg-foreground/5 skeleton-shimmer mb-2" />
              <div className="w-48 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
            </div>
          </div>

          <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Profile card skeleton */}
              <div className="p-6 bg-card rounded-3xl border border-foreground/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-foreground/5 skeleton-shimmer" />
                  <div className="space-y-2">
                    <div className="w-16 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                    <div className="w-32 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="w-12 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
                    <div className="w-full h-11 rounded-xl bg-foreground/5 skeleton-shimmer" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-16 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
                    <div className="w-full h-11 rounded-xl bg-foreground/5 skeleton-shimmer" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-20 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
                    <div className="w-full h-11 rounded-xl bg-foreground/5 skeleton-shimmer" />
                  </div>
                  <div className="w-28 h-10 rounded-full bg-foreground/5 skeleton-shimmer" />
                </div>
              </div>
              
              {/* Preferences card skeleton */}
              <div className="p-6 bg-card rounded-3xl border border-foreground/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-foreground/5 skeleton-shimmer" />
                  <div className="space-y-2">
                    <div className="w-20 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                    <div className="w-36 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div className="w-24 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                    <div className="w-10 h-6 rounded-full bg-foreground/5 skeleton-shimmer" />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="w-32 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                    <div className="w-10 h-6 rounded-full bg-foreground/5 skeleton-shimmer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO title="Nova AI Settings | Preferences & Notifications | NeuroState" description="Customise your Nova AI experience. Manage notification preferences, appearance settings, data export, and account configuration." noindex={true} />
      <div className="min-h-screen bg-background">
        <NovaNav />
        
        {/* Floating orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
        </div>
        
        {/* Header */}
        <div className="relative border-b border-foreground/5">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Configuration</p>
            <h1 className="text-2xl font-medium text-foreground mb-2">Settings</h1>
            <p className="text-sm text-foreground/50">Manage your account and preferences</p>
          </div>
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Profile */}
            <div className="p-6 bg-card rounded-3xl border border-foreground/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                  <User className="w-4 h-4 text-foreground/60" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Profile</h3>
                  <p className="text-[11px] text-foreground/40">Your personal information</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[11px] text-foreground/50">Email</Label>
                  <Input value={profile?.email || ""} disabled className="bg-foreground/[0.02] border-foreground/5 text-xs h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] text-foreground/50">Full Name</Label>
                  <Input 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    placeholder="Enter your full name" 
                    className="border-foreground/10 text-xs h-11 rounded-xl focus:border-foreground/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] text-foreground/50">Phone (optional)</Label>
                  <Input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+44 7XXX XXXXXX" 
                    className="border-foreground/10 text-xs h-11 rounded-xl focus:border-foreground/20"
                  />
                </div>
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={isSaving}
                  className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs"
                >
                  {isSaving ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Save className="w-3 h-3 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Push Notifications */}
            <NotificationSettings />

            {/* Preferences */}
            <div className="p-6 bg-card rounded-3xl border border-foreground/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-foreground/60" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Preferences</h3>
                  <p className="text-[11px] text-foreground/40">Customise your Nova experience</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-foreground/5">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="w-3.5 h-3.5 text-foreground/40" /> : <Sun className="w-3.5 h-3.5 text-foreground/40" />}
                    <div>
                      <p className="text-xs font-medium text-foreground">Dark Mode</p>
                      <p className="text-[10px] text-foreground/40">Use dark theme</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-xs font-medium text-foreground">Email Notifications</p>
                    <p className="text-[10px] text-foreground/40">Receive protocol reminders via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
              </div>
            </div>

            {/* Data & Privacy */}
            <div className="p-6 bg-card rounded-3xl border border-foreground/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-foreground/60" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Data & Privacy</h3>
                  <p className="text-[11px] text-foreground/40">Manage your data</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-foreground/5">
                  <div>
                    <p className="text-xs font-medium text-foreground">Export Your Data</p>
                    <p className="text-[10px] text-foreground/40">Download all your Nova data as JSON</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] border border-foreground/10 text-foreground/60 hover:bg-foreground/5 transition-all">
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-xs font-medium text-foreground">Privacy Policy</p>
                    <p className="text-[10px] text-foreground/40">View how we handle your data</p>
                  </div>
                  <button 
                    onClick={() => navigate('/privacy')}
                    className="flex items-center gap-1.5 text-[11px] text-foreground/50 hover:text-foreground transition-colors"
                  >
                    View
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sign Out */}
            <div className="p-6 bg-card rounded-3xl border border-foreground/5">
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 text-xs text-foreground/60 hover:text-foreground transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>

          </div>
        </div>
        
        <FloatingNovaChat />
      </div>
    </NovaSwipeWrapper>
  );
}