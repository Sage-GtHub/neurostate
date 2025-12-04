import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, TrendingUp, Brain, Target, Sparkles, Zap, Shield, Clock, ChevronRight, MessageSquare, Lightbulb, AlertTriangle, RefreshCw, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { PhaseIndicator } from "@/components/nova/PhaseIndicator";
import { HealthForecast } from "@/components/nova/HealthForecast";
import { NovaOnboarding } from "@/components/nova/NovaOnboarding";
import { SEO } from "@/components/SEO";
import { useRealtimeMetrics } from "@/hooks/useRealtimeMetrics";
import { useNovaOnboarding } from "@/hooks/useNovaOnboarding";

interface AISummary {
  title: string;
  message: string;
  type: "insight" | "warning" | "tip";
  action?: string;
}

export default function Nova() {
  const navigate = useNavigate();
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3 | 4>(2);
  const [connectedDevices, setConnectedDevices] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const { metrics, isLoading: metricsLoading, lastSync, syncDevices, refreshMetrics } = useRealtimeMetrics();
  const { showOnboarding, isChecking, completeOnboarding } = useNovaOnboarding();

  const [aiSummaries] = useState<AISummary[]>([
    {
      title: "Recovery Alert",
      message: "Your HRV has dropped 12% over the past 3 days. Consider reducing training intensity and prioritising sleep tonight.",
      type: "warning",
      action: "View Recovery Protocol"
    },
    {
      title: "Peak Performance Window",
      message: "Based on your patterns, tomorrow between 9am and 11am is your optimal focus window. Schedule your most demanding work then.",
      type: "insight",
      action: "Set Reminder"
    },
    {
      title: "Protocol Adjustment",
      message: "Your magnesium levels suggest increasing evening dose from 400mg to 600mg for better sleep quality.",
      type: "tip",
      action: "Update Protocol"
    }
  ]);

  useEffect(() => {
    loadConnectedDevices();
  }, []);

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
    await syncDevices();
    await loadConnectedDevices();
    setIsSyncing(false);
  };

  const getSummaryIcon = (type: string) => {
    switch (type) {
      case "warning": return AlertTriangle;
      case "insight": return Lightbulb;
      case "tip": return Sparkles;
      default: return Lightbulb;
    }
  };

  const getSummaryColor = (type: string) => {
    switch (type) {
      case "warning": return "text-orange-500 bg-orange-500/10";
      case "insight": return "text-accent bg-accent/10";
      case "tip": return "text-blue-500 bg-blue-500/10";
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

  // Placeholder metrics for when no real data exists
  const placeholderMetrics = [
    { label: "HRV", value: "68", trend: "+5%", trendColor: "text-accent" },
    { label: "Sleep", value: "7.8/10", trend: undefined, trendColor: undefined },
    { label: "Focus", value: "12h", trend: undefined, trendColor: undefined },
    { label: "Recovery", value: "85%", trend: "+8%", trendColor: "text-accent" },
  ];

  const displayMetrics = [
    metrics.hrv || placeholderMetrics[0],
    metrics.sleep || placeholderMetrics[1],
    metrics.focus || placeholderMetrics[2],
    metrics.recovery || placeholderMetrics[3],
  ];

  if (isChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
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

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-12">
          {/* What Nova Does */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-mist mb-12">
            {[
              { icon: Brain, title: "Predicts", desc: "72 hour forecasting" },
              { icon: Zap, title: "Adapts", desc: "Real time adjustments" },
              { icon: Shield, title: "Prevents", desc: "Burnout detection" },
              { icon: Clock, title: "Learns", desc: "Your biology over time" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 text-center">
                <item.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <p className="text-carbon font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-stone mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* AI Summary Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-carbon">AI Summary</h2>
              <Button variant="ghost" size="sm" className="text-accent" onClick={() => navigate('/nova/chat')}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask Nova
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {aiSummaries.map((summary, index) => {
                const Icon = getSummaryIcon(summary.type);
                const colorClass = getSummaryColor(summary.type);
                return (
                  <Card key={index} className="border-mist/50 hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center mb-4`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-semibold text-carbon mb-2">{summary.title}</h3>
                      <p className="text-xs text-ash leading-relaxed mb-4">{summary.message}</p>
                      {summary.action && (
                        <Button variant="ghost" size="sm" className="text-xs text-accent p-0 h-auto">
                          {summary.action}
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Live Metrics */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-carbon">Live Data</h2>
                {lastSync && (
                  <p className="text-xs text-stone">Last synced: {lastSync.toLocaleTimeString()}</p>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSync}
                disabled={isSyncing || metricsLoading}
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
                const Icon = getMetricIcon(metric.label);
                const hasRealData = metrics[metric.label.toLowerCase() as keyof typeof metrics];
                return (
                  <div key={index} className={`p-6 ${hasRealData ? 'bg-pearl' : 'bg-pearl/50'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={`w-5 h-5 ${hasRealData ? 'text-accent' : 'text-stone'}`} />
                      <span className="text-xs text-stone uppercase tracking-wider">{metric.label}</span>
                    </div>
                    <p className={`text-3xl font-bold ${hasRealData ? 'text-carbon' : 'text-carbon/50'}`}>
                      {metric.value}
                    </p>
                    {metric.trend && (
                      <p className={`text-sm mt-1 ${metric.trendColor || 'text-stone'}`}>{metric.trend}</p>
                    )}
                    {!hasRealData && (
                      <p className="text-xs text-stone mt-1">Demo data</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 7-Day Forecast */}
            <div className="lg:col-span-2">
              <HealthForecast />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="p-6 bg-pearl rounded-lg">
                <h3 className="text-sm font-bold text-carbon mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist"
                    onClick={() => setShowAssessment(true)}
                  >
                    Start Protocol Assessment
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist"
                    onClick={() => navigate('/nova/chat')}
                  >
                    Chat with Nova
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist"
                    onClick={() => navigate('/nova/protocols')}
                  >
                    View Protocols
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist"
                    onClick={() => navigate('/nova/devices')}
                  >
                    Connect Devices
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
                    >
                      Connect a Device
                    </Button>
                  </div>
                )}
                {connectedDevices.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 text-accent"
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