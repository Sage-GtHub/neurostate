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
import { cn } from "@/lib/utils";

interface AISummary {
  id: string;
  title: string;
  message: string;
  type: "warning" | "pattern" | "prediction" | "optimisation";
  action?: string;
  recommendations?: string[];
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Nova() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAssessment, setShowAssessment] = useState(false);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
  
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
      case "HRV": return { icon: Heart, accent: "text-accent" };
      case "Sleep": return { icon: Moon, accent: "text-plasma-purple" };
      case "Focus": return { icon: Brain, accent: "text-warning-amber" };
      case "Recovery": return { icon: Battery, accent: "text-signal-green" };
      default: return { icon: Activity, accent: "text-accent" };
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
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
          <p className="text-[11px] text-muted-foreground font-mono">Loading Nova...</p>
        </div>
      </div>
    );
  }

  // Unauthenticated state
  if (!isAuthenticated) {
    return (
      <NovaSwipeWrapper>
        <SEO 
          title="Nova AI | Your Personal Health Coach | NeuroState"
          description="Nova is your AI health coach. It reads your wearable data, tracks sleep, recovery, and energy, and gives you clear plans to feel and perform better."
        />
        <div className="min-h-screen bg-background">
          <NovaNav />
          
          <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-24 sm:py-32">
            <div className="max-w-md mx-auto text-center">
              <div className="w-14 h-14 mx-auto mb-8 rounded-xl bg-muted flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-foreground" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-foreground mb-4 tracking-tight">Welcome to Nova</h1>
              <p className="text-muted-foreground text-sm mb-10 leading-relaxed max-w-sm mx-auto">
                Sign in to access your personal health dashboard. Track your sleep, recovery, and energy — all in one place.
              </p>
              <Button 
                onClick={() => navigate('/auth')} 
                className="h-11 px-8 gap-2.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In to Continue
              </Button>
              <p className="text-[11px] text-muted-foreground mt-10">
                New to NeuroState?{" "}
                <button 
                  onClick={() => navigate('/auth')} 
                  className="text-foreground hover:text-accent transition-colors"
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
        title="Nova AI | Your Personal Health Coach | NeuroState"
        description="Nova is your AI health coach. It reads your wearable data, tracks sleep, recovery, and energy, and gives you clear plans to feel and perform better."
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
      
        <motion.div 
          className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-10 sm:py-14"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          
          {/* 7-Day Forecast */}
          <motion.div variants={fadeUp} className="mb-14">
            <HealthForecast />
          </motion.div>

          {/* Morning Check-In & Readiness */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-14">
            <InteractiveMorningCheckIn onComplete={refreshMetrics} />
            <ReadinessScore />
          </motion.div>

          {/* Live Metrics — promoted higher for immediate data access */}
          <motion.div variants={fadeUp} className="mb-14">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono">Live Data</p>
                {lastSync && (
                  <span className="text-[10px] text-muted-foreground/50 font-mono">
                    Synced {lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              <button 
                onClick={handleSync}
                disabled={isSyncing || metricsLoading || connectedDevices.length === 0}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[10px] font-mono border border-border/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all disabled:opacity-30"
              >
                {isSyncing ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <RefreshCw className="w-3 h-3" />
                )}
                Sync
              </button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {displayMetrics.map((metric, index) => {
                const config = getMetricConfig(metric.label);
                const Icon = config.icon;
                const hasData = metric.value !== "--";
                const isHovered = hoveredMetric === index;
                
                return (
                  <motion.div 
                    key={index}
                    onHoverStart={() => setHoveredMetric(index)}
                    onHoverEnd={() => setHoveredMetric(null)}
                    whileHover={{ y: -2 }}
                    className={cn(
                      "relative p-5 rounded-xl border border-border/50 bg-card transition-all duration-300",
                      hasData ? "hover:border-border hover:shadow-md" : "opacity-40",
                    )}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300",
                        isHovered ? "bg-accent/10" : "bg-muted"
                      )}>
                        <Icon className={cn(
                          "w-4 h-4 transition-colors duration-300",
                          isHovered ? config.accent : "text-foreground/60"
                        )} />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-mono">{metric.label}</span>
                    </div>
                    
                    <div className="text-2xl font-semibold text-foreground tracking-tight">
                      {metric.value}
                    </div>
                    
                    {metric.trend && (
                      <div className={cn(
                        "text-[11px] mt-1 font-medium",
                        metric.trendColor === 'green' ? 'text-signal-green' : metric.trendColor === 'red' ? 'text-destructive' : 'text-muted-foreground'
                      )}>
                        {metric.trend}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* AI Insights Section */}
          <motion.div variants={fadeUp} className="mb-14">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono">Intelligence</p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleGenerateInsights}
                  disabled={insightsLoading}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-mono text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all border border-border/50"
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
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-mono bg-foreground text-background hover:bg-foreground/90 transition-all"
                >
                  <MessageSquare className="w-3 h-3" />
                  Ask Nova
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {aiSummaries.map((summary, index) => {
                const Icon = getSummaryIcon(summary.type);
                return (
                  <motion.div 
                    key={summary.id || index}
                    whileHover={{ y: -2 }}
                    className="group p-5 bg-card rounded-xl border border-border/50 hover:border-border hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                      <Icon className="w-4 h-4 text-foreground/60 group-hover:text-accent transition-colors" />
                    </div>
                    
                    <h3 className="text-sm font-medium text-foreground mb-1.5">{summary.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">{summary.message}</p>
                    
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
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:text-foreground transition-colors"
                      >
                        {summary.action}
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Weekly Summary & Streaks */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-14">
            <WeeklySummary />
            <StreaksAchievements />
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeUp}>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4 font-mono">Quick Actions</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Chat with Nova", icon: MessageSquare, route: "/nova/chat" },
                { label: "View Insights", icon: TrendingUp, route: "/nova/insights" },
                { label: "My Devices", icon: Activity, route: "/nova/devices" },
                { label: "Protocols", icon: Target, route: "/nova/protocols" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(action.route)}
                    className="group p-5 bg-card rounded-xl border border-border/50 text-left hover:bg-foreground hover:border-foreground transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground mb-3 group-hover:text-accent transition-colors" />
                    <p className="text-[11px] font-medium text-foreground group-hover:text-background transition-colors">{action.label}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

        </motion.div>
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
