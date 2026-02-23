import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Brain, Target, Sparkles, ChevronRight, MessageSquare, Lightbulb, AlertTriangle, RefreshCw, Loader2, LogIn, Zap, Moon, Heart, Battery, ArrowUpRight } from "lucide-react";
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
          <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />
          </div>
          <p className="text-[11px] text-foreground/40">Loading Nova...</p>
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
          
          {/* Floating orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
            <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          </div>
          
          <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-24 sm:py-32">
            <div className="max-w-md mx-auto text-center">
              <div className="w-14 h-14 mx-auto mb-8 rounded-full bg-foreground/5 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-foreground/60" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-foreground mb-4 tracking-tight">Welcome to Nova</h1>
              <p className="text-foreground/50 text-sm mb-10 leading-relaxed max-w-sm mx-auto">
                Sign in to access your personalised AI performance dashboard with biometric tracking and adaptive protocols.
              </p>
              <Button 
                onClick={() => navigate('/auth')} 
                className="h-11 px-8 gap-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In to Continue
              </Button>
              <p className="text-[11px] text-foreground/30 mt-10">
                New to NeuroState?{" "}
                <button 
                  onClick={() => navigate('/auth')} 
                  className="text-foreground/50 hover:text-foreground transition-colors"
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
        
        {/* Floating orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
      
        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16">
          
          {/* 7-Day Forecast */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <HealthForecast />
          </motion.div>

          {/* Morning Check-In & Readiness */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            <InteractiveMorningCheckIn onComplete={refreshMetrics} />
            <ReadinessScore />
          </motion.div>

          {/* AI Insights Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Intelligence</p>
                <h2 className="text-lg font-medium text-foreground">AI Insights</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleGenerateInsights}
                  disabled={insightsLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all"
                >
                  {insightsLoading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3" />
                  )}
                  Generate
                </button>
                <button 
                  onClick={() => navigate('/nova/chat')}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] bg-foreground text-background hover:bg-foreground/90 transition-all"
                >
                  <MessageSquare className="w-3 h-3" />
                  Ask Nova
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiSummaries.map((summary, index) => {
                const Icon = getSummaryIcon(summary.type);
                return (
                  <div 
                    key={summary.id || index} 
                    className="group p-6 bg-card rounded-3xl border border-foreground/5 hover:border-foreground/10 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center mb-5">
                      <Icon className="w-4 h-4 text-foreground/60" />
                    </div>
                    
                    <h3 className="text-sm font-medium text-foreground mb-2">{summary.title}</h3>
                    <p className="text-[11px] text-foreground/50 leading-relaxed mb-5">{summary.message}</p>
                    
                    {summary.action && (
                      <button 
                        onClick={() => {
                          if (summary.action === "Connect Device") {
                            navigate('/nova/devices');
                          } else if (summary.action === "Start Assessment") {
                            setShowAssessment(true);
                          } else {
                            navigate('/nova/insights');
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-[11px] text-foreground/60 hover:text-foreground transition-colors group/btn"
                      >
                        {summary.action}
                        <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Weekly Summary & Streaks */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            <WeeklySummary />
            <StreaksAchievements />
          </motion.div>

          {/* Live Metrics */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Real-time</p>
                <h2 className="text-lg font-medium text-foreground">Live Data</h2>
                {lastSync ? (
                  <p className="text-[10px] text-foreground/30 mt-1">Last synced: {lastSync.toLocaleTimeString()}</p>
                ) : !hasRealData && connectedDevices.length === 0 ? (
                  <p className="text-[10px] text-foreground/30 mt-1">Connect a device to see real data</p>
                ) : null}
              </div>
              <button 
                onClick={handleSync}
                disabled={isSyncing || metricsLoading || connectedDevices.length === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] border border-foreground/10 text-foreground/60 hover:bg-foreground/5 hover:text-foreground transition-all disabled:opacity-40"
              >
                {isSyncing ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <RefreshCw className="w-3 h-3" />
                )}
                Sync Now
              </button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {displayMetrics.map((metric, index) => {
                const config = getMetricConfig(metric.label);
                const Icon = config.icon;
                const hasData = metric.value !== "--";
                
                return (
                  <div 
                    key={index} 
                    className={`p-6 bg-card rounded-3xl border border-foreground/5 hover:border-foreground/10 transition-all ${hasData ? '' : 'opacity-50'}`}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-foreground/60" />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.15em] text-foreground/30">{metric.label}</span>
                    </div>
                    
                    <div className="text-2xl font-medium text-foreground mb-1">
                      {metric.value}
                    </div>
                    
                    {metric.trend && (
                      <div className={`text-[10px] ${metric.trendColor === 'green' ? 'text-green-500' : metric.trendColor === 'red' ? 'text-red-500' : 'text-foreground/40'}`}>
                        {metric.trend}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-6">Quick Actions</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                    className="group p-5 bg-card rounded-2xl border border-foreground/5 text-left hover:border-foreground/10 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 text-foreground/40 mb-3 group-hover:text-foreground/60 group-hover:scale-110 transition-all" />
                    <p className="text-[11px] font-medium text-foreground/70 group-hover:text-foreground transition-colors">{action.label}</p>
                  </button>
                );
              })}
            </div>
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