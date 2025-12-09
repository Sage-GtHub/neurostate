import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, TrendingUp, Brain, Target, Sparkles, Zap, Shield, Clock, ChevronRight, MessageSquare, Lightbulb, AlertTriangle, RefreshCw, Loader2, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { PhaseIndicator } from "@/components/nova/PhaseIndicator";
import { HealthForecast } from "@/components/nova/HealthForecast";
import { NovaOnboarding } from "@/components/nova/NovaOnboarding";
import { InteractiveMorningCheckIn } from "@/components/nova/InteractiveMorningCheckIn";
import { ReadinessScore } from "@/components/nova/ReadinessScore";
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
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3 | 4>(2);
  const [connectedDevices, setConnectedDevices] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  const { metrics, isLoading: metricsLoading, lastSync, syncDevices, refreshMetrics } = useRealtimeMetrics();
  const { showOnboarding, isChecking, completeOnboarding } = useNovaOnboarding();
  const { insights, isLoading: insightsLoading, generateInsights } = useNovaInsights();

  // Check authentication status
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

  const getSummaryColor = (type: string) => {
    switch (type) {
      case "warning": return "text-orange-500 bg-orange-500/10";
      case "pattern": return "text-blue-500 bg-blue-500/10";
      case "prediction": return "text-purple-500 bg-purple-500/10";
      case "optimisation": return "text-accent bg-accent/10";
      default: return "text-accent bg-accent/10";
    }
  };

  const getMetricIcon = (label: string) => {
    switch (label) {
      case "HRV": return Activity;
      case "Sleep": return Brain;
      case "Focus": return Target;
      case "Recovery": return TrendingUp;
      default: return Activity;
    }
  };

  // Map insights to AI summaries
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

  // Placeholder metrics for when no real data exists
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-sm text-ash">Loading Nova...</p>
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
        <div className="min-h-screen bg-white">
          <NovaNav />
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-24">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-accent" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-carbon mb-4">Welcome to Nova</h1>
              <p className="text-ash mb-8">
                Sign in to access your personalised AI performance dashboard with biometric tracking, predictive insights, and adaptive protocols.
              </p>
              <Button onClick={() => navigate('/auth')} size="lg" className="gap-2">
                <LogIn className="w-5 h-5" />
                Sign In to Continue
              </Button>
              <p className="text-sm text-stone mt-6">
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
        title="Nova Dashboard – AI Cognitive Performance | NeuroState"
        description="Your personalised AI performance dashboard. View metrics, forecasts, and AI-generated insights."
      />
      
      {/* Onboarding Dialog */}
      <NovaOnboarding 
        open={showOnboarding} 
        onComplete={() => {
          completeOnboarding();
          refreshMetrics();
          loadConnectedDevices();
        }} 
      />

      <div className="min-h-screen bg-white">
        <NovaNav />
      
        {/* Header */}
        <div className="border-b border-mist bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 sm:py-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-2">Dashboard</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-carbon">Nova</h1>
                <p className="text-sm text-ash mt-1">Your AI performance copilot</p>
              </div>
              <div className="flex items-center gap-4">
                <PhaseIndicator currentPhase={currentPhase} />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 sm:py-12">
          
          {/* Morning Check-In & Readiness */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-12">
            <InteractiveMorningCheckIn onComplete={refreshMetrics} />
            <ReadinessScore />
          </div>

          {/* AI Summary Section */}
          <div className="mb-6 sm:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-carbon">AI Insights</h2>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-accent min-h-[44px]" 
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
                <Button variant="ghost" size="sm" className="text-accent min-h-[44px]" onClick={() => navigate('/nova/chat')}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Ask Nova</span>
                  <span className="sm:hidden">Ask</span>
                </Button>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
              {aiSummaries.map((summary, index) => {
                const Icon = getSummaryIcon(summary.type);
                const colorClass = getSummaryColor(summary.type);
                return (
                  <Card key={summary.id || index} className="border-mist/50 hover:shadow-md transition-all">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:block">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0 sm:mb-4`}>
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-carbon mb-1 sm:mb-2">{summary.title}</h3>
                          <p className="text-xs text-ash leading-relaxed mb-2 sm:mb-4">{summary.message}</p>
                          {summary.action && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-accent p-0 h-auto min-h-[36px]"
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
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="mb-6 sm:mb-12">
            <HealthForecast />
          </div>

          {/* What Nova Does - Hidden on mobile */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-px bg-mist mb-8 sm:mb-12">
            {[
              { icon: Brain, title: "Predicts", desc: "72-hour forecasting" },
              { icon: Zap, title: "Adapts", desc: "Real-time adjustments" },
              { icon: Shield, title: "Prevents", desc: "Burnout detection" },
              { icon: Clock, title: "Learns", desc: "Your biology over time" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 sm:p-6 text-center">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto mb-2 sm:mb-3" />
                <p className="text-carbon font-semibold text-xs sm:text-sm">{item.title}</p>
                <p className="text-[10px] sm:text-xs text-stone mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Live Metrics */}
          <div className="mb-6 sm:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-carbon">Live Data</h2>
                {lastSync && (
                  <p className="text-[10px] sm:text-xs text-stone">Last synced: {lastSync.toLocaleTimeString()}</p>
                )}
                {!hasRealData && connectedDevices.length === 0 && (
                  <p className="text-[10px] sm:text-xs text-stone">Connect a device to see real data</p>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSync}
                disabled={isSyncing || metricsLoading || connectedDevices.length === 0}
                className="gap-2 min-h-[44px]"
              >
                {isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Sync Now</span>
                <span className="sm:hidden">Sync</span>
              </Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              {displayMetrics.map((metric, index) => {
                const Icon = getMetricIcon(metric.label);
                const hasData = metric.value !== "--";
                return (
                  <div key={index} className={`p-3 sm:p-6 rounded-lg ${hasData ? 'bg-pearl' : 'bg-pearl/50'}`}>
                    <div className="flex items-center gap-2 mb-1 sm:mb-3">
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${hasData ? 'text-accent' : 'text-stone'}`} />
                      <span className="text-[10px] sm:text-xs text-stone uppercase tracking-wider">{metric.label}</span>
                    </div>
                    <p className={`text-lg sm:text-3xl font-bold ${hasData ? 'text-carbon' : 'text-carbon/30'}`}>
                      {metric.value}
                    </p>
                    {metric.trend && (
                      <p className={`text-xs sm:text-sm mt-1 ${metric.trendColor || 'text-stone'}`}>{metric.trend}</p>
                    )}
                    {!hasData && (
                      <p className="text-[10px] sm:text-xs text-stone mt-1">No data yet</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className="lg:hidden mb-6">
            <h3 className="text-sm font-bold text-carbon mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="justify-start text-xs border-mist min-h-[44px]"
                onClick={() => setShowAssessment(true)}
              >
                <Target className="w-4 h-4 mr-2" />
                Assessment
              </Button>
              <Button 
                variant="outline" 
                className="justify-start text-xs border-mist min-h-[44px]"
                onClick={() => navigate('/nova/chat')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button 
                variant="outline" 
                className="justify-start text-xs border-mist min-h-[44px]"
                onClick={() => navigate('/nova/protocols')}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Protocols
              </Button>
              <Button 
                variant="outline" 
                className="justify-start text-xs border-mist min-h-[44px]"
                onClick={() => navigate('/nova/devices')}
              >
                <Activity className="w-4 h-4 mr-2" />
                Devices
              </Button>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 gap-6">
              {/* Quick Actions */}
              <div className="p-6 bg-pearl rounded-lg">
                <h3 className="text-sm font-bold text-carbon mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist min-h-[44px]"
                    onClick={() => setShowAssessment(true)}
                  >
                    <span>Protocol Assessment</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist min-h-[44px]"
                    onClick={() => navigate('/nova/chat')}
                  >
                    <span>Chat with Nova</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist min-h-[44px]"
                    onClick={() => navigate('/nova/protocols')}
                  >
                    <span>View Protocols</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist min-h-[44px]"
                    onClick={() => navigate('/nova/devices')}
                  >
                    <span>Connect Devices</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Connected Devices Summary */}
              <div className="p-6 bg-pearl rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-carbon">Connected Devices</h3>
                  {connectedDevices.length > 0 && (
                    <span className="text-xs text-accent">{connectedDevices.length} active</span>
                  )}
                </div>
                {connectedDevices.length > 0 ? (
                  <div className="space-y-3">
                    {connectedDevices.slice(0, 3).map((device, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-carbon font-medium">{device.device_name}</p>
                          <p className="text-xs text-stone">
                            {device.last_sync_at 
                              ? `Synced ${new Date(device.last_sync_at).toLocaleTimeString()}`
                              : 'Not synced yet'
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span className="text-xs text-accent">Active</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-stone mb-2">No devices connected</p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/nova/devices')}
                      className="min-h-[44px]"
                    >
                      Connect a Device
                    </Button>
                  </div>
                )}
                {connectedDevices.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 text-accent min-h-[44px]"
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
