import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Watch, Activity, Shield, Lock, Eye, Database } from "lucide-react";
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

    // Call sync edge function
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
      
      <div className="border-b border-mist bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6">
          <h1 className="text-h3 font-semibold text-carbon">Connected Devices</h1>
          <p className="text-body text-ash mt-2">Manage your wearable integrations and data sync</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {devices.map((device) => (
              <Card key={device.id} className={device.connection_status === 'disconnected' ? "opacity-60" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-pearl flex items-center justify-center">
                      {getDeviceIcon(device.device_type)}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      device.connection_status === "connected" 
                        ? "bg-[#10b981]/10 text-[#10b981]" 
                        : "bg-ash/10 text-ash"
                    }`}>
                      {device.connection_status === "connected" ? "Connected" : "Disconnected"}
                    </div>
                  </div>

                  <h3 className="text-body font-semibold text-carbon mb-2">{device.device_name}</h3>
                  
                  <div className="space-y-2 text-sm text-ash mb-4">
                    <div>Last Sync {getTimeSince(device.last_sync_at)}</div>
                    {device.battery_level && <div>Battery {device.battery_level}%</div>}
                  </div>

                  <Button 
                    variant={device.connection_status === "connected" ? "outline" : "default"} 
                    className="w-full"
                    onClick={() => device.connection_status === "connected" 
                      ? handleSync(device.id) 
                      : handleConnect(device.device_type)}
                    disabled={isLoading}
                  >
                    {device.connection_status === "connected" ? "Sync Now" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-carbon text-ivory">
            <CardContent className="p-8">
              <h2 className="text-h3 font-semibold mb-3">Data Syncing</h2>
              <p className="text-sm text-pearl mb-8 leading-relaxed">
                Nova continuously analyses your biometric data to provide personalised insights
              </p>
              
              <div className="grid sm:grid-cols-3 gap-8">
                <div>
                  <div className="text-caption text-pearl uppercase tracking-wider mb-2">Data Points Today</div>
                  <div className="text-[2.5rem] font-semibold">--</div>
                </div>
                <div>
                  <div className="text-caption text-pearl uppercase tracking-wider mb-2">Insights Generated</div>
                  <div className="text-[2.5rem] font-semibold">--</div>
                </div>
                <div>
                  <div className="text-caption text-pearl uppercase tracking-wider mb-2">Recommendations</div>
                  <div className="text-[2.5rem] font-semibold">--</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-carbon" />
                <h2 className="text-h3 font-semibold text-carbon">Privacy & Security</h2>
              </div>
              
              <p className="text-sm text-ash mb-8 leading-relaxed">
                Your data is encrypted and never shared with third parties
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-carbon mb-1">End-to-end encryption</h3>
                    <p className="text-sm text-ash">All data is encrypted in transit and at rest</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-carbon mb-1">Data anonymisation</h3>
                    <p className="text-sm text-ash">Personal identifiers are removed from analytics</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-carbon mb-1">GDPR compliant</h3>
                    <p className="text-sm text-ash">Full compliance with data protection regulations</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-carbon mb-1">You control your data</h3>
                    <p className="text-sm text-ash">Export or delete your data anytime</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}