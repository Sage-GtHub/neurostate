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

  const getMetricConfig = (label: string) => {
    switch (label) {
      case "HRV": return { icon: Heart, color: "text-accent" };
      case "Sleep": return { icon: Moon, color: "text-accent" };
      case "Focus": return { icon: Brain, color: "text-accent" };
      case "Recovery": return { icon: Battery, color: "text-accent" };
      default: return { icon: Activity, color: "text-accent" };
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
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
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
          title="Nova AI | Cognitive Performance Forecasting Engine"
          description="Nova is a multi-model AI engine that forecasts cognitive performance using wearable data, behavioural signals, and predictive analytics."
        />
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-24 sm:py-32">
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">Welcome to Nova</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Sign in to access your personalised AI performance dashboard with biometric tracking, predictive insights, and adaptive protocols.
              </p>
              <Button 
                onClick={() => navigate('/auth')} 
                size="lg" 
                className="h-12 px-8 gap-3"
              >
                <LogIn className="w-4 h-4" />
                Sign In to Continue
              </Button>
              <p className="text-sm text-muted-foreground mt-8">
                New to NeuroState?{" "}
                <button 
                  onClick={() => navigate('/auth')} 
                  className="text-accent hover:underline"
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
        title="Nova AI | Cognitive Performance Forecasting Engine"
        description="Nova is a multi-model AI engine that forecasts cognitive performance using wearable data, behavioural signals, and predictive analytics."
      />
      
      <NovaOnboarding 
        open={showOnboarding} 
        onComplete={() => {
          completeOnboarding();
          refreshMetrics();
          loadConnectedDevices();
        }} 
      />

      <div className="min-h-screen bg-background">
        <NovaNav />
      
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-12">
          
          {/* 7-Day Forecast */}
          <div className="mb-12">
            <HealthForecast />
          </div>

          {/* Morning Check-In & Readiness */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <InteractiveMorningCheckIn onComplete={refreshMetrics} />
            <ReadinessScore />
          </div>

          {/* AI Insights Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground">AI Insights</h2>
                <p className="text-sm text-muted-foreground">Personalised recommendations from Nova</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleGenerateInsights}
                  disabled={insightsLoading}
                >
                  {insightsLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Generate
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/nova/chat')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask Nova
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiSummaries.map((summary, index) => {
                const Icon = getSummaryIcon(summary.type);
                return (
                  <div 
                    key={summary.id || index} 
                    className="group p-6 bg-card border border-border rounded-lg hover:border-accent/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    
                    <h3 className="text-base font-medium text-foreground mb-2">{summary.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{summary.message}</p>
                    
                    {summary.action && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-accent p-0 h-auto hover:bg-transparent group/btn"
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
                );
              })}
            </div>
          </div>

          {/* Weekly Summary & Streaks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <WeeklySummary />
            <StreaksAchievements />
          </div>

          {/* Live Metrics */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Live Data</h2>
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
                className="gap-2"
              >
                {isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Sync Now
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
                    className={`p-6 bg-card border border-border rounded-lg ${hasData ? '' : 'opacity-60'}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</span>
                    </div>
                    
                    <div className="text-3xl font-semibold text-foreground mb-1">
                      {metric.value}
                    </div>
                    
                    {metric.trend && (
                      <div className={`text-sm ${metric.trendColor === 'green' ? 'text-green-500' : metric.trendColor === 'red' ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {metric.trend}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Chat with Nova", icon: MessageSquare, route: "/nova/chat" },
              { label: "View Insights", icon: TrendingUp, route: "/nova/insights" },
              { label: "My Devices", icon: Activity, route: "/nova/devices" },
              { label: "Protocols", icon: Target, route: "/nova/protocols" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.route)}
                  className="p-6 bg-card border border-border rounded-lg text-left hover:border-accent/30 transition-all group"
                >
                  <Icon className="w-5 h-5 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                </button>
              );
            })}
          </div>

        </div>
      </div>
      
      <ProtocolAssessment 
        open={showAssessment} 
        onOpenChange={setShowAssessment}
        onComplete={() => {
          refreshMetrics();
          loadConnectedDevices();
        }}
      />
    </NovaSwipeWrapper>
  );
}
