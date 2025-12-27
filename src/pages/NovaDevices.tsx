import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { RefreshCw, Plus, Loader2, ChevronRight, Check, Wifi, WifiOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SEO } from "@/components/SEO";
import { WhoopScoreRing } from "@/components/nova/WhoopScoreRing";

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

const DEVICE_CATALOG = [
  { type: 'oura', name: 'Oura Ring', logo: ouraLogo, metrics: ['Sleep', 'HRV', 'Recovery'] },
  { type: 'whoop', name: 'WHOOP', logo: whoopLogo, metrics: ['Strain', 'Recovery', 'Sleep'] },
  { type: 'fitbit', name: 'Fitbit', logo: fitbitLogo, metrics: ['Steps', 'Sleep', 'HR'] },
  { type: 'garmin', name: 'Garmin', logo: garminLogo, metrics: ['Training', 'Sleep', 'Stress'] },
  { type: 'apple_health', name: 'Apple Health', logo: appleHealthLogo, metrics: ['Steps', 'HR', 'Sleep'] },
  { type: 'withings', name: 'Withings', logo: withingsLogo, metrics: ['Weight', 'Sleep', 'ECG'] },
  { type: 'polar', name: 'Polar', logo: polarLogo, metrics: ['HR', 'Training', 'Recovery'] },
  { type: 'samsung', name: 'Samsung Health', logo: samsungLogo, metrics: ['Steps', 'Sleep', 'Stress'] },
  { type: 'coros', name: 'COROS', logo: corosLogo, metrics: ['Training', 'Recovery', 'HRV'] },
  { type: 'amazfit', name: 'Amazfit', logo: amazfitLogo, metrics: ['Steps', 'Sleep', 'SpO2'] },
];

const VITAL_SUPPORTED = ['oura', 'whoop', 'fitbit', 'garmin'];

export default function NovaDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [vitalProviders, setVitalProviders] = useState<VitalProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncingDevice, setSyncingDevice] = useState<string | null>(null);
  const [connectingDevice, setConnectingDevice] = useState<string | null>(null);
  const [dataStats, setDataStats] = useState({ dataPoints: 0, syncs: 0 });
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
      const { data } = await supabase.from('connected_devices').select('*').eq('user_id', user.id);
      setDevices(data || []);
    } catch (error) {
      console.error("Error loading devices:", error);
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
      const { count } = await supabase
        .from('user_metrics')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);
      setDataStats({ dataPoints: count || 0, syncs: Math.floor((count || 0) / 50) });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleConnect = async (deviceType: string, deviceName: string) => {
    if (!VITAL_SUPPORTED.includes(deviceType)) {
      toast({ title: "Coming Soon", description: `${deviceName} integration is not yet available.` });
      return;
    }
    setConnectingDevice(deviceType);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Sign in required", description: "Please sign in to connect devices", variant: "destructive" });
        setConnectingDevice(null);
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
          body: JSON.stringify({ action: 'create-link', provider: deviceType }),
        }
      );
      if (!response.ok) throw new Error('Failed to create connection');
      const data = await response.json();
      if (data.link_url) {
        window.open(data.link_url, '_blank', 'width=600,height=700');
        toast({ title: "Connection started", description: `Complete ${deviceName} authorisation in the new window.` });
        setTimeout(() => { loadVitalProviders(); loadDevices(); }, 5000);
      }
    } catch (error) {
      toast({ title: "Connection failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setConnectingDevice(null);
    }
  };

  const handleSync = async (deviceType: string) => {
    setSyncingDevice(deviceType);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
          body: JSON.stringify({ action: 'sync-data' }),
        }
      );
      if (response.ok) {
        toast({ title: "Sync complete", description: "Your data has been updated." });
        await loadDevices();
        await loadDataStats();
      }
    } catch (error) {
      toast({ title: "Sync failed", variant: "destructive" });
    } finally {
      setSyncingDevice(null);
    }
  };

  const getTimeSince = (dateString: string | null) => {
    if (!dateString) return "Never";
    const diffMins = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000);
    if (diffMins < 1) return "Now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h`;
    return `${Math.floor(diffMins / 1440)}d`;
  };

  const connectedProviders = vitalProviders.filter(p => p.status === 'connected').map(p => p.slug);
  const connectedDeviceTypes = [...new Set([...devices.map(d => d.device_type), ...connectedProviders])];
  const connectedDevices = DEVICE_CATALOG.filter(d => connectedDeviceTypes.includes(d.type));
  const availableDevices = DEVICE_CATALOG.filter(d => !connectedDeviceTypes.includes(d.type));

  return (
    <NovaSwipeWrapper>
      <SEO title="Device Integration – Wearable Performance Analytics | Nova" description="Connect wearables for continuous biometric data sync and predictive cognitive analytics." />
      <div className="min-h-screen bg-black">
        <NovaNav />
        
        <div className="px-6 pt-8 pb-12">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-10">
            <WhoopScoreRing 
              score={connectedDevices.length > 0 ? 100 : 0} 
              size={160} 
              strokeWidth={8}
              label="DEVICES"
              sublabel="CONNECTED"
              color={connectedDevices.length > 0 ? "green" : "red"}
            />
            
            {/* Stats */}
            <div className="flex items-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{connectedDevices.length}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Sources</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{dataStats.dataPoints.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Data Points</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{dataStats.syncs}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Syncs</div>
              </div>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}

          {/* Connected Devices */}
          {!isLoading && connectedDevices.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Connected</h2>
              <div className="space-y-2">
                {connectedDevices.map((device) => {
                  const localDevice = devices.find(d => d.device_type === device.type);
                  const vitalProvider = vitalProviders.find(p => p.slug === device.type);
                  
                  return (
                    <div 
                      key={device.type}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/30 hover:border-primary/20 transition-all"
                    >
                      {/* Logo */}
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-2 flex-shrink-0">
                        <img src={device.logo} alt={device.name} className="w-full h-full object-contain" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm">{device.name}</h3>
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Synced {getTimeSince(localDevice?.last_sync_at || vitalProvider?.connected_at || null)}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span>{device.metrics.join(' · ')}</span>
                        </div>
                      </div>

                      {/* Sync Button */}
                      <button
                        onClick={() => handleSync(device.type)}
                        disabled={syncingDevice === device.type}
                        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-all disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 text-muted-foreground ${syncingDevice === device.type ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Available Devices */}
          {!isLoading && (
            <div>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {connectedDevices.length > 0 ? "Add Device" : "Connect Device"}
              </h2>
              <div className="space-y-2">
                {availableDevices.map((device) => {
                  const isSupported = VITAL_SUPPORTED.includes(device.type);
                  
                  return (
                    <button
                      key={device.type}
                      onClick={() => handleConnect(device.type, device.name)}
                      disabled={connectingDevice === device.type || !isSupported}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.99] ${
                        isSupported 
                          ? 'bg-card border-border/30 hover:border-primary/30' 
                          : 'bg-card/50 border-border/20 opacity-50'
                      }`}
                    >
                      {/* Logo */}
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center p-2 flex-shrink-0">
                        <img src={device.logo} alt={device.name} className="w-full h-full object-contain opacity-70" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-foreground text-sm mb-0.5">{device.name}</h3>
                        <div className="text-xs text-muted-foreground">
                          {isSupported ? device.metrics.join(' · ') : 'Coming soon'}
                        </div>
                      </div>

                      {/* Action */}
                      {connectingDevice === device.type ? (
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      ) : isSupported ? (
                        <Plus className="w-5 h-5 text-primary" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Privacy Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span>Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span>Your Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
