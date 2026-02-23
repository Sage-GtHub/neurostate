import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings,
  Database,
  Shield,
  Bell,
  Users,
  Zap,
  Link,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Check,
  X,
  RefreshCw,
  AlertTriangle,
  Smartphone,
  Watch,
  Activity,
  Heart,
  Brain,
  Moon,
  Loader2,
  Save,
  ArrowLeft,
  Building2,
  Mail,
  Sliders,
  ToggleLeft,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Data source connections
const dataSources = [
  { id: 'oura', name: 'Oura Ring', icon: '💍', status: 'connected', lastSync: '2 min ago', dataTypes: ['Sleep', 'HRV', 'Activity'] },
  { id: 'whoop', name: 'WHOOP', icon: '⌚', status: 'connected', lastSync: '5 min ago', dataTypes: ['Recovery', 'Strain', 'Sleep'] },
  { id: 'apple-health', name: 'Apple Health', icon: '❤️', status: 'available', lastSync: null, dataTypes: ['Activity', 'Heart Rate', 'Sleep'] },
  { id: 'garmin', name: 'Garmin', icon: '🏃', status: 'available', lastSync: null, dataTypes: ['Activity', 'Heart Rate', 'Stress'] },
  { id: 'fitbit', name: 'Fitbit', icon: '📱', status: 'available', lastSync: null, dataTypes: ['Activity', 'Sleep', 'Stress'] },
  { id: 'google-calendar', name: 'Google Calendar', icon: '📅', status: 'connected', lastSync: '1 hour ago', dataTypes: ['Meetings', 'Workload'] },
  { id: 'slack', name: 'Slack', icon: '💬', status: 'available', lastSync: null, dataTypes: ['Activity', 'Response Time'] },
  { id: 'jira', name: 'Jira', icon: '📋', status: 'available', lastSync: null, dataTypes: ['Tasks', 'Workload'] },
];

// Alert thresholds
const defaultThresholds = {
  burnoutRisk: 70,
  revenueExposure: 50000,
  cognitiveDecline: 15,
  recoveryDebt: 3,
  stressVolatility: 80,
};

// Role permissions
const roles = [
  { id: 'ceo', name: 'CEO / Founder', permissions: ['view_all', 'export', 'interventions', 'settings'], description: 'Full access to all data and controls' },
  { id: 'head_people', name: 'Head of People', permissions: ['view_team', 'interventions', 'export'], description: 'Team-wide view with intervention capabilities' },
  { id: 'manager', name: 'Manager', permissions: ['view_team', 'basic_interventions'], description: 'Direct reports view with limited interventions' },
  { id: 'individual', name: 'Individual', permissions: ['view_self'], description: 'Personal data only' },
];

export default function NovaSettingsAdvanced() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('data-sources');
  
  // Settings state
  const [thresholds, setThresholds] = useState(defaultThresholds);
  const [privacySettings, setPrivacySettings] = useState({
    teamVisibility: true,
    individualDetails: false,
    anonymiseData: false,
    dataRetention: '12',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    inApp: true,
    managerAlerts: true,
    weeklyDigest: true,
    criticalOnly: false,
  });
  const [interventionSettings, setInterventionSettings] = useState({
    autoRecommend: true,
    autoTrigger: false,
    requireApproval: true,
    aiConfidenceThreshold: 75,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Settings saved successfully');
    setSaving(false);
  };

  const handleConnectSource = (sourceId: string) => {
    toast.info(`Connecting to ${sourceId}...`, { description: 'This would open OAuth flow' });
  };

  const handleDisconnectSource = (sourceId: string) => {
    toast.success(`Disconnected from ${sourceId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <SEO title="Advanced Settings | System Configuration | NeuroState" description="Configure advanced NeuroState system settings including AI model preferences, data retention, API access, and enterprise integrations." noindex={true} />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="px-6 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/team')} className="rounded-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-medium text-foreground">System Settings</h1>
                  <p className="text-sm text-muted-foreground">Configure data sources, privacy, alerts, and permissions</p>
                </div>
              </div>
              <Button onClick={handleSave} disabled={saving} className="rounded-full">
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </div>

            {/* Settings Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-muted/30 p-1 rounded-xl">
                <TabsTrigger value="data-sources" className="rounded-lg text-xs gap-2">
                  <Database className="h-3.5 w-3.5" />
                  Data Sources
                </TabsTrigger>
                <TabsTrigger value="privacy" className="rounded-lg text-xs gap-2">
                  <Shield className="h-3.5 w-3.5" />
                  Privacy & Consent
                </TabsTrigger>
                <TabsTrigger value="alerts" className="rounded-lg text-xs gap-2">
                  <Bell className="h-3.5 w-3.5" />
                  Alert Thresholds
                </TabsTrigger>
                <TabsTrigger value="roles" className="rounded-lg text-xs gap-2">
                  <Users className="h-3.5 w-3.5" />
                  Role Access
                </TabsTrigger>
                <TabsTrigger value="interventions" className="rounded-lg text-xs gap-2">
                  <Zap className="h-3.5 w-3.5" />
                  Interventions
                </TabsTrigger>
                <TabsTrigger value="notifications" className="rounded-lg text-xs gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  Notifications
                </TabsTrigger>
              </TabsList>

              {/* Data Sources Tab */}
              <TabsContent value="data-sources" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-foreground">Connected Data Sources</h3>
                      <p className="text-xs text-muted-foreground mt-1">Connect wearables, work tools, and internal systems</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {dataSources.filter(s => s.status === 'connected').length} connected
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {dataSources.map((source) => (
                      <div
                        key={source.id}
                        className={`p-4 rounded-xl border transition-all ${
                          source.status === 'connected' 
                            ? 'bg-primary/5 border-primary/20' 
                            : 'bg-background border-border/50 hover:border-border'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{source.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-foreground">{source.name}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {source.dataTypes.map((type) => (
                                  <span key={type} className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          {source.status === 'connected' ? (
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <Badge variant="outline" className="text-[9px] bg-green-500/10 text-green-600 border-green-500/30">
                                  <Check className="h-2.5 w-2.5 mr-1" />
                                  Connected
                                </Badge>
                                <p className="text-[9px] text-muted-foreground mt-1">Synced {source.lastSync}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDisconnectSource(source.id)}
                                className="h-7 w-7 p-0 rounded-full text-muted-foreground hover:text-destructive"
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleConnectSource(source.id)}
                              className="text-[10px] h-7 rounded-full"
                            >
                              <Link className="h-3 w-3 mr-1" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-medium text-foreground">Privacy & Consent Controls</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Team Visibility</p>
                          <p className="text-xs text-muted-foreground">Allow managers to view aggregated team metrics</p>
                        </div>
                      </div>
                      <Switch
                        checked={privacySettings.teamVisibility}
                        onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, teamVisibility: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Individual Details</p>
                          <p className="text-xs text-muted-foreground">Show individual-level data to managers (requires consent)</p>
                        </div>
                      </div>
                      <Switch
                        checked={privacySettings.individualDetails}
                        onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, individualDetails: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Anonymise Data</p>
                          <p className="text-xs text-muted-foreground">Remove identifying information from analytics</p>
                        </div>
                      </div>
                      <Switch
                        checked={privacySettings.anonymiseData}
                        onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, anonymiseData: checked }))}
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3 mb-3">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Data Retention</p>
                          <p className="text-xs text-muted-foreground">How long to keep historical data</p>
                        </div>
                      </div>
                      <Select
                        value={privacySettings.dataRetention}
                        onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, dataRetention: value }))}
                      >
                        <SelectTrigger className="h-9 text-xs rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 months</SelectItem>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                          <SelectItem value="24">24 months</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Alerts Tab */}
              <TabsContent value="alerts" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <h3 className="text-sm font-medium text-foreground">Alert Thresholds</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">Burnout Risk Alert</p>
                          <p className="text-xs text-muted-foreground">Trigger alert when risk exceeds threshold</p>
                        </div>
                        <span className="text-sm font-medium text-primary">{thresholds.burnoutRisk}%</span>
                      </div>
                      <Slider
                        value={[thresholds.burnoutRisk]}
                        onValueChange={([value]) => setThresholds(prev => ({ ...prev, burnoutRisk: value }))}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">Revenue Exposure Alert</p>
                          <p className="text-xs text-muted-foreground">Alert when weekly exposure exceeds</p>
                        </div>
                        <span className="text-sm font-medium text-amber-500">£{thresholds.revenueExposure.toLocaleString()}</span>
                      </div>
                      <Slider
                        value={[thresholds.revenueExposure]}
                        onValueChange={([value]) => setThresholds(prev => ({ ...prev, revenueExposure: value }))}
                        max={200000}
                        step={5000}
                        className="w-full"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">Cognitive Decline Alert</p>
                          <p className="text-xs text-muted-foreground">Alert on week-over-week decline</p>
                        </div>
                        <span className="text-sm font-medium text-red-500">{thresholds.cognitiveDecline}%</span>
                      </div>
                      <Slider
                        value={[thresholds.cognitiveDecline]}
                        onValueChange={([value]) => setThresholds(prev => ({ ...prev, cognitiveDecline: value }))}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">Stress Volatility Alert</p>
                          <p className="text-xs text-muted-foreground">Alert when volatility score exceeds</p>
                        </div>
                        <span className="text-sm font-medium text-orange-500">{thresholds.stressVolatility}%</span>
                      </div>
                      <Slider
                        value={[thresholds.stressVolatility]}
                        onValueChange={([value]) => setThresholds(prev => ({ ...prev, stressVolatility: value }))}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Roles Tab */}
              <TabsContent value="roles" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-medium text-foreground">Role-Based Access Control</h3>
                  </div>

                  <div className="space-y-4">
                    {roles.map((role) => (
                      <div key={role.id} className="p-4 rounded-xl bg-background border border-border/30">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">{role.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {role.permissions.map((perm) => (
                                <Badge key={perm} variant="outline" className="text-[9px]">
                                  {perm.replace('_', ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-[10px] h-7 rounded-full">
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Interventions Tab */}
              <TabsContent value="interventions" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="h-5 w-5 text-accent" />
                    <h3 className="text-sm font-medium text-foreground">Intervention Permissions</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <Brain className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Auto-Recommend</p>
                          <p className="text-xs text-muted-foreground">Allow Nova to automatically suggest interventions</p>
                        </div>
                      </div>
                      <Switch
                        checked={interventionSettings.autoRecommend}
                        onCheckedChange={(checked) => setInterventionSettings(prev => ({ ...prev, autoRecommend: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Auto-Trigger</p>
                          <p className="text-xs text-muted-foreground">Allow Nova to automatically execute low-risk interventions</p>
                        </div>
                      </div>
                      <Switch
                        checked={interventionSettings.autoTrigger}
                        onCheckedChange={(checked) => setInterventionSettings(prev => ({ ...prev, autoTrigger: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Require Approval</p>
                          <p className="text-xs text-muted-foreground">Require manager approval for high-impact interventions</p>
                        </div>
                      </div>
                      <Switch
                        checked={interventionSettings.requireApproval}
                        onCheckedChange={(checked) => setInterventionSettings(prev => ({ ...prev, requireApproval: checked }))}
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">AI Confidence Threshold</p>
                          <p className="text-xs text-muted-foreground">Minimum confidence for auto-triggered interventions</p>
                        </div>
                        <span className="text-sm font-medium text-primary">{interventionSettings.aiConfidenceThreshold}%</span>
                      </div>
                      <Slider
                        value={[interventionSettings.aiConfidenceThreshold]}
                        onValueChange={([value]) => setInterventionSettings(prev => ({ ...prev, aiConfidenceThreshold: value }))}
                        max={100}
                        min={50}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Bell className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-medium text-foreground">Notification Preferences</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.email}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, email: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">In-App Notifications</p>
                          <p className="text-xs text-muted-foreground">Show notifications within the dashboard</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.inApp}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, inApp: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Manager Alerts</p>
                          <p className="text-xs text-muted-foreground">Send alerts to team managers</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.managerAlerts}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, managerAlerts: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Weekly Digest</p>
                          <p className="text-xs text-muted-foreground">Receive weekly performance summary</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.weeklyDigest}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, weeklyDigest: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Critical Alerts Only</p>
                          <p className="text-xs text-muted-foreground">Only receive high-priority notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.criticalOnly}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, criticalOnly: checked }))}
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
