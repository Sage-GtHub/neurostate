import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { NotificationSettings } from "@/components/nova/NotificationSettings";
import { 
  User, 
  Bell, 
  Shield, 
  Download, 
  Trash2, 
  LogOut, 
  Loader2,
  Save,
  Moon,
  Sun
} from "lucide-react";
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
  
  // Preferences
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [insightAlerts, setInsightAlerts] = useState(true);

  useEffect(() => {
    loadProfile();
    loadPreferences();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfile(data);
        setFullName(data.full_name || "");
        setPhone(data.phone || "");
      } else {
        setProfile({
          id: user.id,
          email: user.email || null,
          full_name: null,
          phone: null
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreferences = () => {
    // Load from localStorage
    const savedDarkMode = localStorage.getItem('nova-dark-mode') === 'true';
    const savedEmailNotifs = localStorage.getItem('nova-email-notifications') !== 'false';
    const savedWeeklyDigest = localStorage.getItem('nova-weekly-digest') !== 'false';
    const savedInsightAlerts = localStorage.getItem('nova-insight-alerts') !== 'false';
    
    setDarkMode(savedDarkMode);
    setEmailNotifications(savedEmailNotifs);
    setWeeklyDigest(savedWeeklyDigest);
    setInsightAlerts(savedInsightAlerts);
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          full_name: fullName || null,
          phone: phone || null,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    localStorage.setItem(`nova-${key}`, value.toString());
    
    switch (key) {
      case 'dark-mode':
        setDarkMode(value);
        document.documentElement.classList.toggle('dark', value);
        break;
      case 'email-notifications':
        setEmailNotifications(value);
        break;
      case 'weekly-digest':
        setWeeklyDigest(value);
        break;
      case 'insight-alerts':
        setInsightAlerts(value);
        break;
    }
  };

  const handleExportData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch all user data
      const [metricsRes, protocolsRes, insightsRes, devicesRes] = await Promise.all([
        supabase.from('user_metrics').select('*').eq('user_id', user.id),
        supabase.from('user_protocols').select('*').eq('user_id', user.id),
        supabase.from('ai_insights').select('*').eq('user_id', user.id),
        supabase.from('connected_devices').select('*').eq('user_id', user.id),
      ]);

      const exportData = {
        exportedAt: new Date().toISOString(),
        profile: profile,
        metrics: metricsRes.data || [],
        protocols: protocolsRes.data || [],
        insights: insightsRes.data || [],
        devices: devicesRes.data || [],
      };

      // Download as JSON
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nova-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export complete",
        description: "Your data has been downloaded.",
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Export failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  if (isLoading) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Settings – Nova | NeuroState"
        description="Manage your Nova account settings, preferences, and data."
      />
      <div className="min-h-screen bg-background">
        <NovaNav />
        
        <div className="border-b border-border/50 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Profile Section */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Profile</CardTitle>
                    <CardDescription>Your personal information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profile?.email || ""} 
                    disabled 
                    className="bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7XXX XXXXXX"
                  />
                </div>
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={isSaving}
                  className="gap-2"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Push Notifications */}
            <NotificationSettings />

            {/* Preferences Section */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Preferences</CardTitle>
                    <CardDescription>Customise your Nova experience</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="w-4 h-4 text-muted-foreground" /> : <Sun className="w-4 h-4 text-muted-foreground" />}
                    <div>
                      <p className="text-sm font-medium">Dark Mode</p>
                      <p className="text-xs text-muted-foreground">Use dark theme</p>
                    </div>
                  </div>
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={(v) => handlePreferenceChange('dark-mode', v)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive protocol reminders via email</p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={(v) => handlePreferenceChange('email-notifications', v)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Weekly Digest</p>
                    <p className="text-xs text-muted-foreground">Receive weekly performance summaries</p>
                  </div>
                  <Switch 
                    checked={weeklyDigest} 
                    onCheckedChange={(v) => handlePreferenceChange('weekly-digest', v)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Insight Alerts</p>
                    <p className="text-xs text-muted-foreground">Get notified when Nova detects patterns</p>
                  </div>
                  <Switch 
                    checked={insightAlerts} 
                    onCheckedChange={(v) => handlePreferenceChange('insight-alerts', v)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data & Privacy Section */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Data & Privacy</CardTitle>
                    <CardDescription>Manage your data</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Export Your Data</p>
                    <p className="text-xs text-muted-foreground">Download all your Nova data as JSON</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleExportData} className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Privacy Policy</p>
                    <p className="text-xs text-muted-foreground">View how we handle your data</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/privacy')}>
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="border-border/50">
              <CardContent className="pt-6 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
