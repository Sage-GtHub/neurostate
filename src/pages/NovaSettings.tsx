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
import { motion } from "framer-motion";

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

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/auth'); return; }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile(data);
        setFullName(data.full_name || "");
        setPhone(data.phone || "");
      } else {
        setProfile({ id: user.id, email: user.email || null, full_name: null, phone: null });
      }
    } catch (error) { console.error("Error loading profile:", error); }
    finally { setIsLoading(false); }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: profile.id, full_name: fullName || null, phone: phone || null, updated_at: new Date().toISOString()
      });
      if (error) throw error;
      toast({ title: "Profile updated", description: "Your changes have been saved." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save profile", variant: "destructive" });
    } finally { setIsSaving(false); }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast({ title: "Signed out", description: "You have been signed out successfully." });
  };

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } } };

  if (isLoading) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="relative border-b border-border">
            <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-12">
              <div className="w-20 h-3 rounded-full bg-muted skeleton-shimmer mb-3" />
              <div className="w-32 h-6 rounded-lg bg-muted skeleton-shimmer mb-2" />
              <div className="w-48 h-4 rounded-lg bg-muted skeleton-shimmer" />
            </div>
          </div>
          <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-muted skeleton-shimmer" />
                  <div className="space-y-2">
                    <div className="w-16 h-4 rounded-lg bg-muted skeleton-shimmer" />
                    <div className="w-32 h-3 rounded-full bg-muted skeleton-shimmer" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="space-y-2">
                      <div className="w-16 h-3 rounded-full bg-muted skeleton-shimmer" />
                      <div className="w-full h-11 rounded-xl bg-muted skeleton-shimmer" />
                    </div>
                  ))}
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
        
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
        </div>
        
        {/* Header */}
        <div className="relative border-b border-border">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-mono">Configuration</p>
            <h1 className="text-2xl font-medium text-foreground mb-2 tracking-tight">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <motion.div 
          className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Profile */}
            <motion.div variants={fadeUp} className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Profile</h3>
                  <p className="text-[11px] text-muted-foreground">Your personal information</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[11px] text-muted-foreground">Email</Label>
                  <Input value={profile?.email || ""} disabled className="bg-muted/40 border-border text-sm h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] text-muted-foreground">Full Name</Label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className="border-border text-sm h-11 rounded-xl focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] text-muted-foreground">Phone (optional)</Label>
                  <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7XXX XXXXXX" className="border-border text-sm h-11 rounded-xl focus:border-accent" />
                </div>
                <Button onClick={handleSaveProfile} disabled={isSaving} className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs">
                  {isSaving ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Save className="w-3 h-3 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </motion.div>

            {/* Push Notifications */}
            <motion.div variants={fadeUp}>
              <NotificationSettings />
            </motion.div>

            {/* Preferences */}
            <motion.div variants={fadeUp} className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Bell className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Preferences</h3>
                  <p className="text-[11px] text-muted-foreground">Customise your Nova experience</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="w-3.5 h-3.5 text-muted-foreground" /> : <Sun className="w-3.5 h-3.5 text-muted-foreground" />}
                    <div>
                      <p className="text-sm font-medium text-foreground">Dark Mode</p>
                      <p className="text-[11px] text-muted-foreground">Use dark theme</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Notifications</p>
                    <p className="text-[11px] text-muted-foreground">Receive protocol reminders via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
              </div>
            </motion.div>

            {/* Data & Privacy */}
            <motion.div variants={fadeUp} className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Shield className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Data & Privacy</h3>
                  <p className="text-[11px] text-muted-foreground">Manage your data</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Export Your Data</p>
                    <p className="text-[11px] text-muted-foreground">Download all your Nova data as JSON</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] border border-border text-muted-foreground hover:bg-muted/60 transition-all">
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Privacy Policy</p>
                    <p className="text-[11px] text-muted-foreground">View how we handle your data</p>
                  </div>
                  <button onClick={() => navigate('/privacy')} className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                    View <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Sign Out */}
            <motion.div variants={fadeUp} className="p-6 bg-card rounded-xl border border-border">
              <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </motion.div>

          </div>
        </motion.div>
        
        <FloatingNovaChat />
      </div>
    </NovaSwipeWrapper>
  );
}