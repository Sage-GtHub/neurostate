import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Watch, Activity, Shield, Lock, Eye, Database, RefreshCw, Plus, Loader2, ExternalLink, Unplug, AlertCircle, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SEO } from "@/components/SEO";
import { NotificationSettings } from "@/components/nova/NotificationSettings";

// Import wearable logos
import ouraLogo from "@/assets/wearables/oura-logo.png";
import whoopLogo from "@/assets/wearables/whoop-logo.png";
import fitbitLogo from "@/assets/wearables/fitbit-logo.png";
import garminLogo from "@/assets/wearables/garmin-logo.png";
import appleHealthLogo from "@/assets/wearables/apple-health-logo.png";
import withingsLogo from "@/assets/wearables/withings-logo.png";
import polarLogo from "@/assets/wearables/polar-logo.png";
import samsungLogo from "@/assets/wearables/samsung-logo.png";
import corosLogo from "@/assets/wearables/coros-logo.png";
import amazfitLogo from "@/assets/wearables/amazfit-logo.png";

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

// Device catalog with official logos and info
const DEVICE_CATALOG = [
  { 
    type: 'oura', 
    name: 'Oura Ring', 
    logo: ouraLogo,
    description: 'Sleep, HRV, activity and recovery tracking',
    website: 'https://ouraring.com',
    metrics: ['Sleep Score', 'HRV', 'Recovery', 'Activity'],
  },
  { 
    type: 'whoop', 
    name: 'WHOOP', 
    logo: whoopLogo,
    description: 'Strain, recovery and sleep performance',
    website: 'https://whoop.com',
    metrics: ['Strain', 'Recovery', 'Sleep', 'HRV'],
  },
  { 
    type: 'fitbit', 
    name: 'Fitbit', 
    logo: fitbitLogo,
    description: 'Activity, sleep and heart rate data',
    website: 'https://fitbit.com',
    metrics: ['Steps', 'Sleep', 'Heart Rate', 'SpO2'],
  },
  { 
    type: 'garmin', 
    name: 'Garmin', 
    logo: garminLogo,
    description: 'Training, sleep and body battery metrics',
    website: 'https://garmin.com',
    metrics: ['Body Battery', 'Training Load', 'Sleep', 'Stress'],
  },
  { 
    type: 'apple_health', 
    name: 'Apple Health', 
    logo: appleHealthLogo,
    description: 'iOS health and activity data',
    website: 'https://apple.com/health',
    metrics: ['Steps', 'Heart Rate', 'Sleep', 'Workouts'],
  },
  { 
    type: 'withings', 
    name: 'Withings', 
    logo: withingsLogo,
    description: 'Smart scales, watches and health monitors',
    website: 'https://withings.com',
    metrics: ['Weight', 'Body Composition', 'Sleep', 'ECG'],
  },
  { 
    type: 'polar', 
    name: 'Polar', 
    logo: polarLogo,
    description: 'Heart rate and training analytics',
    website: 'https://polar.com',
    metrics: ['Heart Rate', 'Training Load', 'Sleep', 'Recovery'],
  },
  { 
    type: 'samsung', 
    name: 'Samsung Health', 
    logo: samsungLogo,
    description: 'Galaxy Watch and Samsung Health data',
    website: 'https://samsung.com/health',
    metrics: ['Steps', 'Sleep', 'Heart Rate', 'Stress'],
  },
  { 
    type: 'coros', 
    name: 'COROS', 
    logo: corosLogo,
    description: 'GPS sport watches for athletes',
    website: 'https://coros.com',
    metrics: ['Training Load', 'Recovery', 'Sleep', 'HRV'],
  },
  { 
    type: 'amazfit', 
    name: 'Amazfit', 
    logo: amazfitLogo,
    description: 'Smart fitness wearables',
    website: 'https://amazfit.com',
    metrics: ['Steps', 'Sleep', 'Heart Rate', 'SpO2'],
  },
];

// Main connected via Vital API
const VITAL_SUPPORTED = ['oura', 'whoop', 'fitbit', 'garmin'];

export default function NovaDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [vitalProviders, setVitalProviders] = useState<VitalProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [syncingDevice, setSyncingDevice] = useState<string | null>(null);
  const [connectingDevice, setConnectingDevice] = useState<string | null>(null);
  const [disconnectingDevice, setDisconnectingDevice] = useState<string | null>(null);
  const [dataStats, setDataStats] = useState({ dataPoints: 0, insights: 0, recommendations: 0 });
  const [searchQuery, setSearchQuery] = useState("");
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
    if (!VITAL_SUPPORTED.includes(deviceType)) {
      toast({
        title: "Coming Soon",
        description: `${deviceName} integration is not yet available. Stay tuned!`,
      });
      return;
    }

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
        window.open(data.link_url, '_blank', 'width=600,height=700');
        
        toast({
          title: "Connection started",
          description: `Complete the ${deviceName} authorisation in the new window. Return here when done.`,
        });
        
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
  
  // Filter devices by search
  const filteredDevices = DEVICE_CATALOG.filter(device => 
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const connectedDevicesFiltered = filteredDevices.filter(d => connectedDeviceTypes.includes(d.type));
  const availableDevicesFiltered = filteredDevices.filter(d => !connectedDeviceTypes.includes(d.type));

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
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ash" />
              <Input
                type="text"
                placeholder="Search devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

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
            {!isLoading && !loadError && connectedDevicesFiltered.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-carbon mb-6">Your Devices</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {connectedDevicesFiltered.map((device) => {
                    const localDevice = devices.find(d => d.device_type === device.type);
                    const vitalProvider = vitalProviders.find(p => p.slug === device.type);
                    
                    return (
                      <div 
                        key={device.type} 
                        className="relative overflow-hidden rounded-2xl p-6 bg-pearl/50 border border-accent/20 transition-all hover:shadow-md"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 rounded-xl bg-white border border-mist/50 flex items-center justify-center p-2 shadow-sm">
                            <img 
                              src={device.logo} 
                              alt={device.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <span className="text-xs text-accent font-medium">Connected</span>
                          </div>
                        </div>

                        <h3 className="text-base font-semibold text-carbon mb-1">{device.name}</h3>
                        <p className="text-xs text-ash mb-3">{device.description}</p>

                        {/* Metrics Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {device.metrics.slice(0, 3).map((metric, i) => (
                            <span key={i} className="px-2 py-0.5 text-[10px] bg-accent/10 text-accent rounded-full">
                              {metric}
                            </span>
                          ))}
                        </div>
                        
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
            {!isLoading && !loadError && availableDevicesFiltered.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-carbon mb-6">
                  {connectedDevicesFiltered.length > 0 ? "Add More Devices" : "Connect Your Devices"}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {availableDevicesFiltered.map((device) => {
                    const isVitalSupported = VITAL_SUPPORTED.includes(device.type);
                    
                    return (
                      <div 
                        key={device.type} 
                        className={`relative overflow-hidden rounded-2xl p-6 bg-white border transition-all hover:shadow-sm ${
                          isVitalSupported ? 'border-mist/50 hover:border-accent/50' : 'border-mist/30 opacity-75'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 rounded-xl bg-mist/20 border border-mist/30 flex items-center justify-center p-2">
                            <img 
                              src={device.logo} 
                              alt={device.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          </div>
                          {!isVitalSupported && (
                            <span className="text-[10px] text-stone bg-mist/50 px-2 py-0.5 rounded-full">Coming Soon</span>
                          )}
                        </div>

                        <h3 className="text-base font-semibold text-carbon mb-1">{device.name}</h3>
                        <p className="text-xs text-ash mb-3">{device.description}</p>

                        {/* Metrics Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {device.metrics.slice(0, 2).map((metric, i) => (
                            <span key={i} className="px-2 py-0.5 text-[10px] bg-mist/50 text-stone rounded-full">
                              {metric}
                            </span>
                          ))}
                        </div>

                        <Button 
                          size="sm"
                          variant={isVitalSupported ? "default" : "outline"}
                          className="w-full gap-2"
                          onClick={() => handleConnect(device.type, device.name)}
                          disabled={connectingDevice === device.type || !isVitalSupported}
                        >
                          {connectingDevice === device.type ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                          {isVitalSupported ? 'Connect' : 'Not Available'}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !loadError && filteredDevices.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-ash">No devices found matching "{searchQuery}"</p>
                <Button variant="ghost" onClick={() => setSearchQuery("")} className="mt-2">
                  Clear search
                </Button>
              </div>
            )}

            {/* Notification Settings */}
            <div>
              <h2 className="text-lg font-bold text-carbon mb-6">Notification Settings</h2>
              <NotificationSettings />
            </div>

            {/* Data Syncing Stats */}
            <div>
              <h2 className="text-lg font-bold text-carbon mb-6">Data Syncing</h2>
              <Card className="border-mist/30">
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-3xl font-bold text-carbon">{dataStats.dataPoints.toLocaleString()}</p>
                      <p className="text-xs text-ash">Data Points Today</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-carbon">{dataStats.insights}</p>
                      <p className="text-xs text-ash">Insights Generated</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-carbon">{dataStats.recommendations}</p>
                      <p className="text-xs text-ash">Recommendations</p>
                    </div>
                  </div>
                  <p className="text-xs text-ash text-center mt-6">
                    Nova continuously analyses your biometric data to provide personalised insights and recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Privacy & Security */}
            <div>
              <h2 className="text-lg font-bold text-carbon mb-6">Privacy & Security</h2>
              <Card className="border-mist/30">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { icon: Lock, label: "End-to-end encryption" },
                      { icon: Eye, label: "Data anonymisation" },
                      { icon: Shield, label: "GDPR compliant" },
                      { icon: Database, label: "You control your data" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-sm text-carbon">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
