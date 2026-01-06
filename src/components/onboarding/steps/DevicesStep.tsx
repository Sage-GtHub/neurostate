import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Check, Loader2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

import ouraLogo from "@/assets/wearables/oura-logo.png";
import whoopLogo from "@/assets/wearables/whoop-logo.png";
import fitbitLogo from "@/assets/wearables/fitbit-logo.png";
import garminLogo from "@/assets/wearables/garmin-logo.png";

interface DevicesStepProps {
  connectedDevices: string[];
  onDeviceConnected: (device: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DEVICES = [
  { id: "oura", name: "Oura Ring", logo: ouraLogo, metrics: "Sleep, HRV, Recovery" },
  { id: "whoop", name: "WHOOP", logo: whoopLogo, metrics: "Strain, Recovery, Sleep" },
  { id: "fitbit", name: "Fitbit", logo: fitbitLogo, metrics: "Steps, Sleep, Heart Rate" },
  { id: "garmin", name: "Garmin", logo: garminLogo, metrics: "Training, Sleep, Stress" },
];

export function DevicesStep({ connectedDevices, onDeviceConnected, onNext, onBack }: DevicesStepProps) {
  const [connectingDevice, setConnectingDevice] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = async (deviceId: string) => {
    setConnectingDevice(deviceId);
    
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
            provider: deviceId 
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create connection');
      }

      const data = await response.json();
      
      if (data.link_url) {
        window.open(data.link_url, '_blank', 'width=600,height=700');
        
        toast({
          title: "Connection started",
          description: "Complete authorisation in the new window, then return here.",
        });

        // Poll for connection
        const pollInterval = setInterval(async () => {
          const providersRes = await fetch(
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
          
          if (providersRes.ok) {
            const providersData = await providersRes.json();
            const connectedProviders = providersData.providers?.filter((p: any) => p.status === 'connected').map((p: any) => p.slug) || [];
            
            if (connectedProviders.includes(deviceId)) {
              clearInterval(pollInterval);
              onDeviceConnected(deviceId);
              setConnectingDevice(null);
              
              const device = DEVICES.find(d => d.id === deviceId);
              toast({
                title: "Device connected",
                description: `${device?.name} has been successfully connected.`,
              });
            }
          }
        }, 3000);

        // Clear polling after 2 minutes
        setTimeout(() => {
          clearInterval(pollInterval);
          setConnectingDevice(null);
        }, 120000);
      }
    } catch (error) {
      console.error("Error connecting device:", error);
      toast({
        title: "Connection failed",
        description: "Please try again.",
        variant: "destructive",
      });
      setConnectingDevice(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-3xl mb-3">⌚</div>
        <h2 className="text-xl font-light text-foreground mb-2">
          Connect your wearables
        </h2>
        <p className="text-sm text-muted-foreground">
          Link devices for real biometric tracking. You can skip and add later.
        </p>
      </div>

      {/* Devices list */}
      <div className="space-y-3 flex-1 mb-6">
        {DEVICES.map((device, i) => {
          const isConnected = connectedDevices.includes(device.id);
          const isConnecting = connectingDevice === device.id;
          
          return (
            <motion.div
              key={device.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                isConnected 
                  ? "border-primary/50 bg-primary/5" 
                  : "border-border/50 bg-muted/20"
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Logo */}
              <div className="w-12 h-12 rounded-xl bg-background border border-border/30 flex items-center justify-center p-2 flex-shrink-0">
                <img src={device.logo} alt={device.name} className="w-full h-full object-contain" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-foreground">{device.name}</p>
                  {isConnected && (
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">{device.metrics}</p>
              </div>

              {/* Action */}
              {isConnected ? (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                  <Check className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleConnect(device.id)}
                  disabled={isConnecting}
                  className="rounded-full px-4 gap-2 border-border/50"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Connecting
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-3 h-3" />
                      Connect
                    </>
                  )}
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Connected count */}
      {connectedDevices.length > 0 && (
        <motion.p 
          className="text-center text-xs text-primary mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✓ {connectedDevices.length} device{connectedDevices.length !== 1 ? 's' : ''} connected
        </motion.p>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-border/30">
        <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button 
          onClick={onNext}
          className="gap-2 rounded-full px-6 bg-foreground text-background hover:bg-foreground/90"
        >
          {connectedDevices.length > 0 ? "Continue" : "Skip for Now"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
