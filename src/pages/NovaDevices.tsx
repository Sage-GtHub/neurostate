import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { Button } from "@/components/ui/button";
import { Watch, Activity, Shield, Lock, Eye, Database, RefreshCw } from "lucide-react";
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
          description: "To connect your Oura Ring, you'll need to set up OAuth credentials. Contact contact@neurostate.co.uk for instructions.",
        });
      } else if (deviceType === 'whoop') {
        toast({
          title: "Whoop Integration",
          description: "Contact contact@neurostate.co.uk to enable Whoop integration",
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
        return <div className="w-6 h-6 rounded-full border-2 border-carbon" />;
      case 'apple_watch':
        return <Watch className="w-6 h-6 text-carbon" />;
      case 'whoop':
        return <Activity className="w-6 h-6 text-carbon" />;
      default:
        return <Activity className="w-6 h-6 text-carbon" />;
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
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      <div className="border-b border-mist/20 bg-gradient-to-b from-ivory to-pearl/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          <h1 className="text-[2rem] font-normal text-carbon tracking-tight mb-3">Connected Devices</h1>
          <p className="text-sm text-ash/70">Manage your wearable integrations and data synchronisation</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16">
        <div className="space-y-20 animate-fade-in">
          <div className="grid md:grid-cols-3 gap-8">
            {devices.map((device) => (
              <div key={device.id} className={`group p-10 bg-gradient-to-br from-pearl/20 to-transparent rounded-3xl transition-all duration-500 hover:from-pearl/30 ${device.connection_status === 'disconnected' ? "opacity-50" : ""}`}>
                <div className="flex items-start justify-between mb-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-carbon/5 to-ash/5 flex items-center justify-center">
                    {getDeviceIcon(device.device_type)}
                  </div>
                  <div className={`px-4 py-2 rounded-full text-xs font-normal tracking-wide ${
                    device.connection_status === "connected" 
                      ? "bg-[#10b981]/10 text-[#10b981]" 
                      : "bg-ash/10 text-ash/60"
                  }`}>
                    {device.connection_status === "connected" ? "Connected" : "Disconnected"}
                  </div>
                </div>

                <h3 className="text-body font-normal text-carbon mb-8">{device.device_name}</h3>
                
                <div className="space-y-3 text-sm text-ash/70 mb-10">
                  <div className="flex justify-between">
                    <span>Last Sync</span>
                    <span className="font-normal text-carbon">{getTimeSince(device.last_sync_at)}</span>
                  </div>
                  {device.battery_level && (
                    <div className="flex justify-between">
                      <span>Battery</span>
                      <span className="font-normal text-carbon">{device.battery_level}%</span>
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
            ))}
          </div>

          <div className="p-14 bg-gradient-to-br from-carbon to-slate text-ivory rounded-3xl">
            <h2 className="text-[1.5rem] font-normal mb-4 tracking-tight">Data Synchronisation</h2>
            <p className="text-sm text-pearl/80 mb-14 leading-relaxed max-w-2xl">
              Nova continuously analyses your biometric data to provide personalised insights and adaptive recommendations
            </p>
            
            <div className="grid sm:grid-cols-3 gap-16">
              {[
                { label: "Data Points Today", value: "--" },
                { label: "Insights Generated", value: "--" },
                { label: "Recommendations", value: "--" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-caption text-pearl/60 uppercase tracking-[0.15em] mb-5 font-normal">{stat.label}</div>
                  <div className="text-[2.5rem] font-normal tracking-tighter">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-14 py-8">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-carbon/5 to-ash/5 flex items-center justify-center">
                <Shield className="w-6 h-6 text-carbon" />
              </div>
              <h2 className="text-[1.5rem] font-normal text-carbon tracking-tight">Privacy & Security</h2>
            </div>
            
            <p className="text-sm text-ash/70 mb-14 leading-relaxed max-w-2xl">
              Your data is encrypted end-to-end and never shared with third parties. You maintain complete control over your biometric information.
            </p>

            <div className="grid sm:grid-cols-2 gap-12">
              {[
                { icon: Lock, title: "End-to-end encryption", description: "All data is encrypted in transit and at rest using industry-standard protocols" },
                { icon: Eye, title: "Data anonymisation", description: "Personal identifiers are removed from analytics and aggregated insights" },
                { icon: Shield, title: "GDPR compliant", description: "Full compliance with data protection regulations across all jurisdictions" },
                { icon: Database, title: "You control your data", description: "Export or permanently delete your data anytime through your account settings" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-carbon/5 to-ash/5 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <h3 className="text-body font-normal text-carbon mb-3">{item.title}</h3>
                    <p className="text-sm text-ash/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
