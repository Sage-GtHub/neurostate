import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Watch, Activity, Shield, Lock, Eye, Database, RefreshCw, Plus, Loader2, ExternalLink, Unplug, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SEO } from "@/components/SEO";

interface Device {
  id: string;
  device_type: string;
  device_name: string;
  connection_status: string;
  last_sync_at: string | null;
  battery_level: number | null;
}

interface VitalProvider {
  name: string;
  slug: string;
  status: string;
  connected_at?: string;
}

const AVAILABLE_DEVICES = [
  { type: 'oura', name: 'Oura Ring', icon: '💍', description: 'Sleep, HRV, activity and recovery tracking' },
  { type: 'whoop', name: 'Whoop', icon: '📿', description: 'Strain, recovery and sleep performance' },
  { type: 'fitbit', name: 'Fitbit', icon: '⌚', description: 'Activity, sleep and heart rate data' },
  { type: 'garmin', name: 'Garmin', icon: '🏃', description: 'Training, sleep and body battery metrics' },
];

export default function NovaDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [vitalProviders, setVitalProviders] = useState<VitalProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [syncingDevice, setSyncingDevice] = useState<string | null>(null);
  const [connectingDevice, setConnectingDevice] = useState<string | null>(null);
  const [disconnectingDevice, setDisconnectingDevice] = useState<string | null>(null);
  const [dataStats, setDataStats] = useState({ dataPoints: 0, insights: 0, recommendations: 0 });
  const { toast } = useToast();

  useEffect(() => {
    loadDevices();
    loadVitalProviders();
    loadDataStats();
  }, []);

  const loadDevices = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('connected_devices')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setDevices(data || []);
      setLoadError(null);
    } catch (error) {
      console.error("Error loading devices:", error);
      setLoadError("Failed to load your devices. Please try again.");
    }
  };

  const loadVitalProviders = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ action: 'get-providers' }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setVitalProviders(data.providers || []);
      }
    } catch (error) {
      console.error("Error loading Vital providers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDataStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [metricsResult, insightsResult] = await Promise.all([
        supabase
          .from('user_metrics')
          .select('id', { count: 'exact' })
          .eq('user_id', user.id)
          .gte('recorded_at', today.toISOString()),
        supabase
          .from('ai_insights')
          .select('id', { count: 'exact' })
          .eq('user_id', user.id)
      ]);

      setDataStats({
        dataPoints: metricsResult.count || 0,
        insights: insightsResult.count || 0,
        recommendations: Math.floor((insightsResult.count || 0) * 1.5)
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleConnect = async (deviceType: string, deviceName: string) => {
    setConnectingDevice(deviceType);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Sign in required",
          description: "Please sign in to connect devices",
          variant: "destructive",
        });
        setConnectingDevice(null);
        return;
      }

      // Call Vital API to get connection link
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ 
            action: 'create-link',
            provider: deviceType 
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create connection');
      }

      const data = await response.json();
      
      if (data.link_url) {
        // Open Vital Link in a new window for OAuth
        window.open(data.link_url, '_blank', 'width=600,height=700');
        
        toast({
          title: "Connection started",
          description: `Complete the ${deviceName} authorisation in the new window. Return here when done.`,
        });
        
        // Poll for connection status
        setTimeout(() => {
          loadVitalProviders();
          loadDevices();
        }, 5000);
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Failed to connect device. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnectingDevice(null);
    }
  };

  const handleSync = async (deviceType: string) => {
    setSyncingDevice(deviceType);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Sign in required",
          description: "Please sign in to sync devices",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ action: 'sync-data' }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to sync data');
      }

      const data = await response.json();
      
      toast({
        title: "Sync complete",
        description: `Synced ${data.synced?.sleep || 0} sleep records and ${data.synced?.activity || 0} activity records`,
      });
      
      await loadDevices();
      await loadDataStats();
    } catch (error) {
      console.error("Sync error:", error);
      toast({
        title: "Sync failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setSyncingDevice(null);
    }
  };

  const handleDisconnect = async (deviceType: string) => {
    setDisconnectingDevice(deviceType);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ 
            action: 'disconnect',
            provider: deviceType 
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to disconnect');
      }

      toast({
        title: "Device disconnected",
        description: "The device has been removed from your account.",
      });

      await loadVitalProviders();
      await loadDevices();
    } catch (error) {
      console.error("Disconnect error:", error);
      toast({
        title: "Error",
        description: "Failed to disconnect device.",
        variant: "destructive",
      });
    } finally {
      setDisconnectingDevice(null);
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'oura':
        return <div className="w-6 h-6 rounded-full border-2 border-accent" />;
      case 'fitbit':
      case 'garmin':
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
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  // Merge Vital providers with local devices
  const connectedProviders = vitalProviders.filter(p => p.status === 'connected').map(p => p.slug);
  const connectedDeviceTypes = [...new Set([...devices.map(d => d.device_type), ...connectedProviders])];
  const availableToConnect = AVAILABLE_DEVICES.filter(d => !connectedDeviceTypes.includes(d.type));

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Connected Devices – Nova | NeuroState"
        description="Manage your wearable integrations and sync biometric data with Nova for personalised insights."
      />
      <div className="min-h-screen bg-background">
        <NovaNav />
      
        <div className="border-b border-border/50 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-2">Integrations</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-carbon mb-2">Connected Devices</h1>
            <p className="text-sm text-ash">Connect your wearables to sync real biometric data with Nova</p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          <div className="space-y-12 animate-fade-in">
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-accent" />
                  <p className="text-sm text-muted-foreground">Loading your devices...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {!isLoading && loadError && (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Unable to load devices</h2>
                  <p className="text-sm text-muted-foreground max-w-md">{loadError}</p>
                  <Button onClick={() => { loadDevices(); loadVitalProviders(); }} variant="outline" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* Connected Devices */}
            {!isLoading && !loadError && connectedDeviceTypes.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-carbon mb-6">Your Devices</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {AVAILABLE_DEVICES.filter(d => connectedDeviceTypes.includes(d.type)).map((device) => {
                    const localDevice = devices.find(d => d.device_type === device.type);
                    const vitalProvider = vitalProviders.find(p => p.slug === device.type);
                    
                    return (
                      <div 
                        key={device.type} 
                        className="relative overflow-hidden rounded-2xl p-6 bg-pearl/50 border border-mist/30 transition-all hover:shadow-md"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl">
                            {device.icon}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <span className="text-xs text-accent font-medium">Connected</span>
                          </div>
                        </div>

                        <h3 className="text-base font-semibold text-carbon mb-1">{device.name}</h3>
                        <p className="text-xs text-ash mb-3">{device.description}</p>
                        
                        <div className="space-y-1 text-sm text-ash mb-4">
                          <div className="flex justify-between">
                            <span>Last sync</span>
                            <span className="font-medium text-carbon">
                              {getTimeSince(localDevice?.last_sync_at || vitalProvider?.connected_at || null)}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => handleSync(device.type)}
                            disabled={syncingDevice === device.type}
                          >
                            {syncingDevice === device.type ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <RefreshCw className="w-4 h-4" />
                            )}
                            Sync
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-1"
                            onClick={() => handleDisconnect(device.type)}
                            disabled={disconnectingDevice === device.type}
                          >
                            {disconnectingDevice === device.type ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Unplug className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Available Devices to Connect */}
            {!isLoading && !loadError && availableToConnect.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-carbon mb-6">
                  {connectedDeviceTypes.length > 0 ? "Add More Devices" : "Connect Your Devices"}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {availableToConnect.map((device) => (
                    <div 
                      key={device.type} 
                      className="relative overflow-hidden rounded-2xl p-6 bg-white border border-mist/50 border-dashed transition-all hover:border-accent/50 hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-mist/30 flex items-center justify-center text-2xl">
                          {device.icon}
                        </div>
                      </div>

                      <h3 className="text-base font-semibold text-carbon mb-1">{device.name}</h3>
                      <p className="text-xs text-ash mb-4">{device.description}</p>

                      <Button 
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => handleConnect(device.type, device.name)}
                        disabled={connectingDevice === device.type}
                      >
                        {connectingDevice === device.type ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4" />
                            Connect
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Data Sync Stats */}
            <Card className="border-carbon/10 bg-gradient-to-br from-carbon to-slate text-ivory shadow-lg">
              <CardContent className="p-8 sm:p-10">
                <h2 className="text-xl font-semibold mb-4 tracking-tight">Data Synchronisation</h2>
                <p className="text-sm text-pearl/90 mb-8 leading-relaxed max-w-2xl">
                  Nova continuously analyses your biometric data to provide personalised insights and adaptive recommendations
                </p>
                
                <div className="grid sm:grid-cols-3 gap-8">
                  {[
                    { label: "Data Points Today", value: dataStats.dataPoints > 0 ? dataStats.dataPoints.toLocaleString() : "—" },
                    { label: "Insights Generated", value: dataStats.insights > 0 ? dataStats.insights.toString() : "—" },
                    { label: "Recommendations", value: dataStats.recommendations > 0 ? dataStats.recommendations.toString() : "—" }
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="text-xs text-pearl/70 uppercase tracking-wider mb-2 font-medium">{stat.label}</div>
                      <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <div className="relative overflow-hidden rounded-2xl p-8 sm:p-10 bg-pearl/30">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold text-carbon">Privacy & Security</h2>
                </div>
                
                <p className="text-sm text-ash mb-8 leading-relaxed max-w-2xl">
                  Your data is encrypted end-to-end and never shared with third parties. You maintain complete control over your biometric information.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: Lock, title: "End-to-end encryption", description: "All data is encrypted in transit and at rest" },
                    { icon: Eye, title: "Data anonymisation", description: "Personal identifiers are removed from analytics" },
                    { icon: Shield, title: "GDPR compliant", description: "Full compliance with data protection regulations" },
                    { icon: Database, title: "You control your data", description: "Export or delete your data anytime" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-carbon mb-1">{item.title}</h3>
                        <p className="text-xs text-ash">{item.description}</p>
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
