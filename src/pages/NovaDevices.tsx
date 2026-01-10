import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { FloatingNovaChat } from "@/components/nova/FloatingNovaChat";
import { NovaBreadcrumb } from "@/components/nova/NovaBreadcrumb";
import { NovaSkeleton } from "@/components/nova/NovaSkeleton";
import { RefreshCw, Plus, Loader2, Check, WifiOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SEO } from "@/components/SEO";

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

interface Device { id: string; device_type: string; device_name: string; connection_status: string; last_sync_at: string | null; battery_level: number | null; }
interface VitalProvider { name: string; slug: string; status: string; connected_at?: string; }

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

  useEffect(() => { loadDevices(); loadVitalProviders(); loadDataStats(); }, []);

  const loadDevices = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsLoading(false); return; }
      const { data } = await supabase.from('connected_devices').select('*').eq('user_id', user.id);
      setDevices(data || []);
    } catch (error) { console.error("Error loading devices:", error); }
  };

  const loadVitalProviders = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setIsLoading(false); return; }
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify({ action: 'get-providers' }),
      });
      if (response.ok) {
        const data = await response.json();
        setVitalProviders(data.providers || []);
      }
    } catch (error) { console.error("Error loading Vital providers:", error); }
    finally { setIsLoading(false); }
  };

  const loadDataStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { count } = await supabase.from('user_metrics').select('id', { count: 'exact' }).eq('user_id', user.id);
      setDataStats({ dataPoints: count || 0, syncs: Math.floor((count || 0) / 50) });
    } catch (error) { console.error("Error loading stats:", error); }
  };

  const handleConnect = async (deviceType: string, deviceName: string) => {
    if (!VITAL_SUPPORTED.includes(deviceType)) {
      toast({ title: "Coming Soon", description: `${deviceName} integration is not yet available.` });
      return;
    }
    setConnectingDevice(deviceType);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { toast({ title: "Sign in required", variant: "destructive" }); setConnectingDevice(null); return; }
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify({ action: 'create-link', provider: deviceType }),
      });
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      if (data.link_url) {
        window.open(data.link_url, '_blank', 'width=600,height=700');
        toast({ title: "Connection started", description: `Complete authorisation in the new window.` });
        setTimeout(() => { loadVitalProviders(); loadDevices(); }, 5000);
      }
    } catch (error) { toast({ title: "Connection failed", variant: "destructive" }); }
    finally { setConnectingDevice(null); }
  };

  const handleSync = async (deviceType: string) => {
    setSyncingDevice(deviceType);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify({ action: 'sync-data' }),
      });
      if (response.ok) { toast({ title: "Sync complete" }); await loadDevices(); await loadDataStats(); }
    } catch (error) { toast({ title: "Sync failed", variant: "destructive" }); }
    finally { setSyncingDevice(null); }
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
      <SEO title="Devices | Nova AI" description="Connect wearables for continuous biometric data sync." />
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <NovaNav />
        
        <div className="relative container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Connected</p>
            <h1 className="text-2xl font-light text-foreground mb-6">Devices</h1>
            
            {/* Stats */}
            <div className="flex items-center justify-center gap-8">
              {[
                { value: connectedDevices.length, label: "Sources" },
                { value: dataStats.dataPoints.toLocaleString(), label: "Points" },
                { value: dataStats.syncs, label: "Syncs", accent: true },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={`text-2xl font-light ${stat.accent ? 'text-accent' : 'text-foreground'}`}>{stat.value}</div>
                  <div className="text-[10px] text-foreground/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {isLoading && (
            <div className="space-y-4">
              <div className="w-20 h-3 rounded-full bg-foreground/5 skeleton-shimmer mb-4" />
              <NovaSkeleton variant="list" />
            </div>
          )}

          {/* Connected Devices */}
          {!isLoading && connectedDevices.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-4">Connected</p>
              <div className="space-y-2">
                {connectedDevices.map((device) => {
                  const localDevice = devices.find(d => d.device_type === device.type);
                  const vitalProvider = vitalProviders.find(p => p.slug === device.type);
                  
                  return (
                    <div key={device.type} className="flex items-center gap-4 p-5 rounded-3xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors">
                      <div className="w-10 h-10 rounded-2xl bg-foreground/[0.02] flex items-center justify-center p-2 flex-shrink-0">
                        <img src={device.logo} alt={device.name} className="w-full h-full object-contain" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-xs font-medium text-foreground">{device.name}</h3>
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        </div>
                        <p className="text-[10px] text-foreground/40">
                          {getTimeSince(localDevice?.last_sync_at || vitalProvider?.connected_at || null)} · {device.metrics.join(' · ')}
                        </p>
                      </div>

                      <button
                        onClick={() => handleSync(device.type)}
                        disabled={syncingDevice === device.type}
                        className="w-9 h-9 rounded-full bg-foreground/[0.02] flex items-center justify-center hover:bg-foreground/[0.05] transition-colors disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 text-foreground/50 ${syncingDevice === device.type ? 'animate-spin' : ''}`} />
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
              <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-4">Add Device</p>
              <div className="space-y-2">
                {availableDevices.map((device) => {
                  const isSupported = VITAL_SUPPORTED.includes(device.type);
                  
                  return (
                    <button
                      key={device.type}
                      onClick={() => handleConnect(device.type, device.name)}
                      disabled={connectingDevice === device.type || !isSupported}
                      className={`w-full flex items-center gap-4 p-5 rounded-3xl transition-all ${
                        isSupported ? 'bg-foreground/[0.02] hover:bg-foreground/[0.04]' : 'bg-foreground/[0.01] opacity-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-2xl bg-foreground/[0.02] flex items-center justify-center p-2 flex-shrink-0">
                        <img src={device.logo} alt={device.name} className="w-full h-full object-contain opacity-70" />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <h3 className="text-xs font-medium text-foreground mb-0.5">{device.name}</h3>
                        <p className="text-[10px] text-foreground/40">{isSupported ? device.metrics.join(' · ') : 'Coming soon'}</p>
                      </div>

                      {connectingDevice === device.type ? (
                        <Loader2 className="w-4 h-4 animate-spin text-accent" />
                      ) : isSupported ? (
                        <Plus className="w-4 h-4 text-accent" />
                      ) : (
                        <WifiOff className="w-3.5 h-3.5 text-foreground/30" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Privacy Footer */}
          <div className="mt-12 pt-8 border-t border-foreground/5">
            <div className="flex items-center justify-center gap-6 text-[10px] text-foreground/30">
              {["Encrypted", "GDPR Compliant", "Your Data"].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <FloatingNovaChat />
      </div>
    </NovaSwipeWrapper>
  );
}
