import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, Brain, Target, Sparkles, ChevronRight, MessageSquare, Lightbulb, AlertTriangle, RefreshCw, Loader2, LogIn, Zap, Moon, Heart, Battery } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";

import { HealthForecast } from "@/components/nova/HealthForecast";
import { NovaOnboarding } from "@/components/nova/NovaOnboarding";
import { InteractiveMorningCheckIn } from "@/components/nova/InteractiveMorningCheckIn";
import { ReadinessScore } from "@/components/nova/ReadinessScore";
import { WeeklySummary } from "@/components/nova/WeeklySummary";
import { StreaksAchievements } from "@/components/nova/StreaksAchievements";
import { SEO } from "@/components/SEO";
import { useRealtimeMetrics } from "@/hooks/useRealtimeMetrics";
import { useNovaOnboarding } from "@/hooks/useNovaOnboarding";
import { useNovaInsights } from "@/hooks/useNovaInsights";
import { useToast } from "@/components/ui/use-toast";

interface AISummary {
  id: string;
  title: string;
  message: string;
  type: "warning" | "pattern" | "prediction" | "optimisation";
  action?: string;
  recommendations?: string[];
}

export default function Nova() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAssessment, setShowAssessment] = useState(false);
  
  const [connectedDevices, setConnectedDevices] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  const { metrics, isLoading: metricsLoading, lastSync, syncDevices, refreshMetrics } = useRealtimeMetrics();
  const { showOnboarding, isChecking, completeOnboarding } = useNovaOnboarding();
  const { insights, isLoading: insightsLoading, generateInsights } = useNovaInsights();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadConnectedDevices();
    }
  }, [isAuthenticated]);

  const loadConnectedDevices = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('connected_devices')
        .select('*')
        .eq('user_id', user.id)
        .eq('connection_status', 'connected');

      setConnectedDevices(data || []);
    } catch (error) {
      console.error("Error loading devices:", error);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await syncDevices();
      await loadConnectedDevices();
      toast({
        title: "Sync complete",
        description: "Your biometric data has been updated.",
      });
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGenerateInsights = async () => {
    await generateInsights();
  };

  const getSummaryIcon = (type: string) => {
    switch (type) {
      case "warning": return AlertTriangle;
      case "pattern": return Brain;
      case "prediction": return TrendingUp;
      case "optimisation": return Sparkles;
      default: return Lightbulb;
    }
  };

  const getSummaryStyles = (type: string) => {
    switch (type) {
      case "warning": return { 
        bg: "from-orange-500/20 to-orange-500/5",
        border: "border-orange-500/30",
        icon: "text-orange-500",
        glow: "shadow-orange-500/10"
      };
      case "pattern": return { 
        bg: "from-blue-500/20 to-blue-500/5",
        border: "border-blue-500/30",
        icon: "text-blue-500",
        glow: "shadow-blue-500/10"
      };
      case "prediction": return { 
        bg: "from-purple-500/20 to-purple-500/5",
        border: "border-purple-500/30",
        icon: "text-purple-500",
        glow: "shadow-purple-500/10"
      };
      case "optimisation": 
      default: 
        return { 
          bg: "from-primary/20 to-primary/5",
          border: "border-primary/30",
          icon: "text-primary",
          glow: "shadow-primary/10"
        };
    }
  };

  const getMetricConfig = (label: string) => {
    switch (label) {
      case "HRV": return { icon: Heart, color: "from-rose-500 to-pink-500" };
      case "Sleep": return { icon: Moon, color: "from-indigo-500 to-purple-500" };
      case "Focus": return { icon: Brain, color: "from-cyan-500 to-blue-500" };
      case "Recovery": return { icon: Battery, color: "from-emerald-500 to-green-500" };
      default: return { icon: Activity, color: "from-primary to-primary" };
    }
  };

  const aiSummaries: AISummary[] = insights.length > 0 
    ? insights.slice(0, 3).map(insight => ({
        id: insight.id,
        title: insight.title,
        message: insight.description,
        type: insight.type as any,
        action: insight.recommendations?.[0] || "View Details",
        recommendations: insight.recommendations,
      }))
    : [
        {
          id: "placeholder-1",
          title: "Connect a Device",
          message: "Connect a wearable device to start receiving personalised AI insights based on your biometric data.",
          type: "optimisation" as const,
          action: "Connect Device"
        },
        {
          id: "placeholder-2",
          title: "Complete Assessment",
          message: "Take a quick assessment to help Nova understand your goals and create a personalised protocol.",
          type: "pattern" as const,
          action: "Start Assessment"
        }
      ];

  const placeholderMetrics = [
    { label: "HRV", value: "--", trend: undefined, trendColor: undefined },
    { label: "Sleep", value: "--", trend: undefined, trendColor: undefined },
    { label: "Focus", value: "--", trend: undefined, trendColor: undefined },
    { label: "Recovery", value: "--", trend: undefined, trendColor: undefined },
  ];

  const displayMetrics = [
    metrics.hrv || placeholderMetrics[0],
    metrics.sleep || placeholderMetrics[1],
    metrics.focus || placeholderMetrics[2],
    metrics.recovery || placeholderMetrics[3],
  ];

  const hasRealData = metrics.hrv || metrics.sleep || metrics.focus || metrics.recovery;

  // Loading state
  if (isAuthenticated === null || isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent animate-spin" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-1 rounded-full bg-background" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Loading Nova...</p>
        </div>
      </div>
    );
  }

  // Unauthenticated state
  if (!isAuthenticated) {
    return (
      <NovaSwipeWrapper>
        <SEO 
          title="Nova Dashboard – AI Cognitive Performance | NeuroState"
          description="Your personalised AI performance dashboard. Sign in to view metrics, forecasts, and AI-generated insights."
        />
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-24">
            <div className="max-w-md mx-auto text-center">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl opacity-50" />
                <div className="relative w-full h-full rounded-full bg-card border border-border flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Welcome to Nova</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Sign in to access your personalised AI performance dashboard with biometric tracking, predictive insights, and adaptive protocols.
              </p>
              <Button 
                onClick={() => navigate('/auth')} 
                size="lg" 
                className="h-14 px-8 gap-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg transition-all duration-300"
              >
                <LogIn className="w-5 h-5" />
                Sign In to Continue
              </Button>
              <p className="text-sm text-muted-foreground mt-8">
                New to NeuroState?{" "}
                <button 
                  onClick={() => navigate('/auth')} 
                  className="text-primary hover:underline"
                >
                  Create an account
                </button>
              </p>
            </div>
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Nova Dashboard – AI Cognitive Performance | NeuroState"
        description="Your personalised AI performance dashboard. View metrics, forecasts, and AI-generated insights."
      />
      
      <NovaOnboarding 
        open={showOnboarding} 
        onComplete={() => {
          completeOnboarding();
          refreshMetrics();
          loadConnectedDevices();
        }} 
      />

      <div className="min-h-screen bg-background pb-24 md:pb-0">
        <NovaNav />
      
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 sm:py-12">
          
          {/* 7-Day Forecast - Top of Page */}
          <div className="mb-8">
            <HealthForecast />
          </div>

          {/* Morning Check-In & Readiness - Premium Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <InteractiveMorningCheckIn onComplete={refreshMetrics} />
            <ReadinessScore />
          </div>

          {/* AI Insights Section - Premium Cards */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">AI Insights</h2>
                <p className="text-sm text-muted-foreground">Personalised recommendations from Nova</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:bg-muted min-h-[44px] rounded-xl" 
                  onClick={handleGenerateInsights}
                  disabled={insightsLoading}
                >
                  {insightsLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  <span className="hidden sm:inline">Generate</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:bg-muted min-h-[44px] rounded-xl" 
                  onClick={() => navigate('/nova/chat')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Ask Nova</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiSummaries.map((summary, index) => {
                const Icon = getSummaryIcon(summary.type);
                const styles = getSummaryStyles(summary.type);
                return (
                  <div 
                    key={summary.id || index} 
                    className={`group relative bg-card rounded-2xl p-6 border ${styles.border} hover:shadow-xl ${styles.glow} transition-all duration-500`}
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${styles.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${styles.bg} flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 ${styles.icon}`} />
                      </div>
                      
                      <h3 className="text-base font-semibold text-foreground mb-2">{summary.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{summary.message}</p>
                      
                      {summary.action && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary p-0 h-auto hover:bg-transparent group/btn"
                          onClick={() => {
                            if (summary.action === "Connect Device") {
                              navigate('/nova/devices');
                            } else if (summary.action === "Start Assessment") {
                              setShowAssessment(true);
                            } else {
                              navigate('/nova/insights');
                            }
                          }}
                        >
                          {summary.action}
                          <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Summary & Streaks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <WeeklySummary />
            <StreaksAchievements />
          </div>

          {/* Live Metrics - Premium Cards */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Live Data</h2>
                {lastSync ? (
                  <p className="text-xs text-muted-foreground">Last synced: {lastSync.toLocaleTimeString()}</p>
                ) : !hasRealData && connectedDevices.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Connect a device to see real data</p>
                ) : null}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSync}
                disabled={isSyncing || metricsLoading || connectedDevices.length === 0}
                className="gap-2 min-h-[44px] bg-card border-border text-foreground hover:bg-muted rounded-xl"
              >
                {isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Sync Now</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {displayMetrics.map((metric, index) => {
                const config = getMetricConfig(metric.label);
                const Icon = config.icon;
                const hasData = metric.value !== "--";
                
                return (
                  <div 
                    key={index} 
                    className={`group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-500 ${hasData ? '' : 'opacity-60'}`}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} bg-opacity-20 flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</span>
                      </div>
                      
                      <p className={`text-3xl sm:text-4xl font-bold ${hasData ? 'text-foreground' : 'text-foreground/30'}`}>
                        {metric.value}
                      </p>
                      
                      {metric.trend && (
                        <p className={`text-sm mt-2 ${metric.trendColor || 'text-muted-foreground'}`}>{metric.trend}</p>
                      )}
                      {!hasData && (
                        <p className="text-xs text-muted-foreground mt-2">No data yet</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions - Mobile */}
          <div className="lg:hidden mb-8">
            <h3 className="text-base font-bold text-nova-text mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Target, label: "Assessment", onClick: () => setShowAssessment(true) },
                { icon: MessageSquare, label: "Chat", onClick: () => navigate('/nova/chat') },
                { icon: Sparkles, label: "Protocols", onClick: () => navigate('/nova/protocols') },
                { icon: Activity, label: "Devices", onClick: () => navigate('/nova/devices') }
              ].map((action, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="justify-start gap-3 min-h-[52px] bg-nova-surface border-nova-border text-nova-text hover:bg-nova-surface-hover hover:border-nova-accent/30 rounded-xl transition-all duration-300"
                  onClick={action.onClick}
                >
                  <action.icon className="w-4 h-4 text-nova-accent" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              {/* Quick Actions */}
              <div className="bg-nova-surface rounded-2xl p-6 border border-nova-border">
                <h3 className="text-base font-bold text-nova-text mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { icon: Target, label: "Protocol Assessment", onClick: () => setShowAssessment(true) },
                    { icon: MessageSquare, label: "Chat with Nova", onClick: () => navigate('/nova/chat') },
                    { icon: Sparkles, label: "View Protocols", onClick: () => navigate('/nova/protocols') },
                    { icon: Activity, label: "Connect Devices", onClick: () => navigate('/nova/devices') }
                  ].map((action, index) => (
                    <Button 
                      key={index}
                      variant="ghost" 
                      className="w-full justify-between text-sm min-h-[48px] text-nova-text hover:bg-nova-surface-hover rounded-xl group"
                      onClick={action.onClick}
                    >
                      <span className="flex items-center gap-3">
                        <action.icon className="w-4 h-4 text-nova-accent" />
                        {action.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-nova-text-muted group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Connected Devices Summary */}
              <div className="bg-nova-surface rounded-2xl p-6 border border-nova-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-nova-text">Connected Devices</h3>
                  {connectedDevices.length > 0 && (
                    <span className="text-xs text-nova-accent bg-nova-accent/10 px-2 py-1 rounded-full">
                      {connectedDevices.length} active
                    </span>
                  )}
                </div>
                {connectedDevices.length > 0 ? (
                  <div className="space-y-3">
                    {connectedDevices.slice(0, 3).map((device, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-nova-glass rounded-xl">
                        <div>
                          <p className="text-sm text-nova-text font-medium">{device.device_name}</p>
                          <p className="text-xs text-nova-text-muted">
                            {device.last_sync_at 
                              ? `Synced ${new Date(device.last_sync_at).toLocaleTimeString()}`
                              : 'Not synced yet'
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-nova-accent animate-pulse" />
                          <span className="text-xs text-nova-accent">Active</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-nova-text-muted mb-4">No devices connected</p>
                    <Button 
                      size="sm" 
                      onClick={() => navigate('/nova/devices')}
                      className="bg-gradient-to-r from-nova-accent to-nova-accent-secondary text-white rounded-xl"
                    >
                      Connect a Device
                    </Button>
                  </div>
                )}
                {connectedDevices.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 text-nova-accent hover:bg-nova-surface-hover rounded-xl"
                    onClick={() => navigate('/nova/devices')}
                  >
                    Manage Devices
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProtocolAssessment open={showAssessment} onOpenChange={setShowAssessment} />
    </NovaSwipeWrapper>
  );
}
