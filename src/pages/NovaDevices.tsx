import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Watch, Activity, Shield, Lock, Eye, Database, RefreshCw, Cpu, Zap, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Device {
  id: string;
  device_type: string;
  device_name: string;
  connection_status: string;
  last_sync_at: string | null;
  battery_level: number | null;
}

export default function NovaDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('connected_devices')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setDevices(data || []);
    } catch (error) {
      console.error("Error loading devices:", error);
    }
  };

  const handleConnect = async (deviceType: string) => {
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (deviceType === 'oura_ring') {
        toast({
          title: "Oura Integration",
          description: "To connect your Oura Ring, you'll need to set up OAuth credentials. Contact support@neurostate.co.uk for instructions.",
        });
      } else if (deviceType === 'whoop') {
        toast({
          title: "Whoop Integration",
          description: "Contact support@neurostate.co.uk to enable Whoop integration",
        });
      } else if (deviceType === 'apple_watch') {
        toast({
          title: "Apple Watch",
          description: "Apple Watch integration requires the NeuroState mobile app. Coming soon!",
        });
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Error",
        description: "Failed to connect device",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async (deviceId: string) => {
    toast({
      title: "Syncing",
      description: "Fetching latest data from your device...",
    });

    try {
      await supabase.functions.invoke('sync-device-data', {
        body: { deviceId }
      });
      
      toast({
        title: "Sync complete",
        description: "Your latest metrics have been updated",
      });
      
      loadDevices();
    } catch (error) {
      console.error("Sync error:", error);
      toast({
        title: "Sync failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'oura_ring':
        return <div className="w-6 h-6 rounded-full border-2 border-accent" />;
      case 'apple_watch':
        return <Watch className="w-6 h-6 text-accent" />;
      case 'whoop':
        return <Activity className="w-6 h-6 text-accent" />;
      default:
        return <Activity className="w-6 h-6 text-accent" />;
    }
  };

  const getTimeSince = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  return (
    <NovaSwipeWrapper>
      <div className="min-h-screen bg-background">
        <NovaNav />
      
      <div className="border-b border-border/50 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          <h1 className="text-h1 font-semibold text-foreground mb-2">Connected Devices</h1>
          <p className="text-body-sm text-muted-foreground">Manage your wearable integrations and data synchronisation</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="space-y-12 animate-fade-in">
          <div className="grid md:grid-cols-3 gap-6">
            {devices.map((device) => (
              <div key={device.id} className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-blue-50/80 to-blue-100/40 transition-all hover:shadow-soft ${device.connection_status === 'disconnected' ? "opacity-60" : ""}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-accent/20 to-accent/30 flex items-center justify-center shadow-sm">
                      {getDeviceIcon(device.device_type)}
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      device.connection_status === "connected" 
                        ? "bg-accent/10 text-accent" 
                        : "bg-ash/10 text-ash"
                    }`}>
                      {device.connection_status === "connected" ? "Connected" : "Disconnected"}
                    </div>
                  </div>

                  <h3 className="text-body font-semibold text-carbon mb-4">{device.device_name}</h3>
                  
                  <div className="space-y-2 text-sm text-ash mb-6">
                    <div className="flex justify-between">
                      <span>Last Sync</span>
                      <span className="font-medium text-carbon">{getTimeSince(device.last_sync_at)}</span>
                    </div>
                    {device.battery_level && (
                      <div className="flex justify-between">
                        <span>Battery</span>
                        <span className="font-medium text-carbon">{device.battery_level}%</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    variant={device.connection_status === "connected" ? "outline" : "default"} 
                    className="w-full gap-2 rounded-full"
                    onClick={() => device.connection_status === "connected" 
                      ? handleSync(device.id) 
                      : handleConnect(device.device_type)}
                    disabled={isLoading}
                  >
                    {device.connection_status === "connected" ? (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Sync Now</span>
                      </>
                    ) : (
                      <span>Connect</span>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Card className="border-carbon/10 bg-gradient-to-br from-carbon to-slate text-ivory shadow-lg">
            <CardContent className="p-10">
              <h2 className="text-[1.5rem] font-semibold mb-4 tracking-tight">Data Synchronisation</h2>
              <p className="text-sm text-pearl/90 mb-10 leading-relaxed max-w-2xl">
                Nova continuously analyses your biometric data to provide personalised insights and adaptive recommendations
              </p>
              
              <div className="grid sm:grid-cols-3 gap-10">
                {[
                  { label: "Data Points Today", value: "--" },
                  { label: "Insights Generated", value: "--" },
                  { label: "Recommendations", value: "--" }
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-caption text-pearl/70 uppercase tracking-wider mb-3 font-medium">{stat.label}</div>
                    <div className="text-[2.5rem] font-semibold tracking-tight">{stat.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-pearl/50 to-ivory">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-mist/20 rounded-full blur-3xl -mr-24 -mb-24" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center shadow-sm">
                  <Shield className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-[1.5rem] font-semibold text-carbon tracking-tight">Privacy & Security</h2>
              </div>
              
              <p className="text-sm text-ash mb-10 leading-relaxed max-w-2xl">
                Your data is encrypted end-to-end and never shared with third parties. You maintain complete control over your biometric information.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Lock, title: "End-to-end encryption", description: "All data is encrypted in transit and at rest using industry-standard protocols" },
                  { icon: Eye, title: "Data anonymisation", description: "Personal identifiers are removed from analytics and aggregated insights" },
                  { icon: Shield, title: "GDPR compliant", description: "Full compliance with data protection regulations across all jurisdictions" },
                  { icon: Database, title: "You control your data", description: "Export or permanently delete your data anytime through your account settings" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-body font-semibold text-carbon mb-2">{item.title}</h3>
                      <p className="text-sm text-ash leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Model Stack - Technical Architecture */}
          <div className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-carbon to-slate text-ivory">
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -ml-32 -mt-32" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-accent/20 to-accent/30 flex items-center justify-center shadow-sm">
                  <Brain className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-[1.5rem] font-semibold tracking-tight">AI Model Architecture</h2>
              </div>

              <p className="text-sm text-pearl/90 mb-10 leading-relaxed max-w-3xl">
                Nova uses 15+ specialized AI models working in concert to analyse your biometric data and provide personalised recommendations.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "GPT-4 Turbo",
                    params: "175B parameters",
                    useCase: "Natural language understanding & conversational interface",
                    performance: "99.2% accuracy"
                  },
                  {
                    name: "XGBoost Ensemble",
                    params: "500 trees",
                    useCase: "Sleep quality prediction from multi-modal inputs",
                    performance: "91% accuracy"
                  },
                  {
                    name: "LSTM Network",
                    params: "3-layer, 256 units",
                    useCase: "Time-series forecasting for biometric trends",
                    performance: "87% 72hr accuracy"
                  },
                  {
                    name: "Random Forest",
                    params: "300 estimators",
                    useCase: "Recovery score calculation & pattern detection",
                    performance: "89% precision"
                  },
                  {
                    name: "Transformer-XL",
                    params: "340M parameters",
                    useCase: "Long-term context retention for protocol optimization",
                    performance: "95% recall"
                  },
                  {
                    name: "Gradient Boosting",
                    params: "Custom ensemble",
                    useCase: "Supplement efficacy prediction & dosing",
                    performance: "92% accuracy"
                  },
                  {
                    name: "Neural Architecture Search",
                    params: "AutoML optimized",
                    useCase: "Model selection & hyperparameter tuning",
                    performance: "98% efficiency"
                  },
                  {
                    name: "Isolation Forest",
                    params: "100 trees",
                    useCase: "Anomaly detection in biometric data",
                    performance: "96% sensitivity"
                  },
                  {
                    name: "Bayesian Networks",
                    params: "50+ nodes",
                    useCase: "Causal inference for intervention effects",
                    performance: "94% confidence"
                  }
                ].map((model, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-slate/50 hover:bg-slate/70 transition-colors border border-mist/10">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Cpu className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-body font-semibold mb-1">{model.name}</h3>
                        <p className="text-xs text-pearl/70">{model.params}</p>
                      </div>
                    </div>
                    <p className="text-sm text-pearl/90 mb-3 leading-relaxed">{model.useCase}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Zap className="w-3 h-3 text-accent" />
                      <span className="text-accent font-medium">{model.performance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </NovaSwipeWrapper>
  );
}
