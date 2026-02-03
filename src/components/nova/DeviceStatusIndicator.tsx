import { useState, useEffect, useCallback } from "react";
import { Watch, Activity, Zap, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

type Device = {
  id: string;
  device_name: string;
  device_type: string;
  connection_status: string;
  last_sync_at: string | null;
  battery_level: number | null;
};

type SyncingDevice = {
  id: string;
  startedAt: number;
};

const DEVICE_ICONS: Record<string, typeof Watch> = {
  oura: Watch,
  whoop: Activity,
  fitbit: Activity,
  garmin: Watch,
  apple_watch: Watch,
  default: Zap,
};

export function DeviceStatusIndicator() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncingDevices, setSyncingDevices] = useState<SyncingDevice[]>([]);

  const fetchDevices = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setDevices([]);
        return;
      }

      const { data, error } = await supabase
        .from("connected_devices")
        .select("*")
        .eq("user_id", user.id)
        .order("last_sync_at", { ascending: false });

      if (!error && data) {
        setDevices(data);
      }
    } catch (err) {
      console.error("Error fetching devices:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();

    // Subscribe to real-time updates for connected_devices
    const setupSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const channel = supabase
        .channel('device-sync-status')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'connected_devices',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const updatedDevice = payload.new as Device;
            
            // Check if this is a sync update (last_sync_at changed)
            const oldDevice = payload.old as Device;
            if (updatedDevice.last_sync_at !== oldDevice.last_sync_at) {
              // Add to syncing devices with animation
              setSyncingDevices(prev => [
                ...prev.filter(d => d.id !== updatedDevice.id),
                { id: updatedDevice.id, startedAt: Date.now() }
              ]);
              
              // Remove after animation completes (2 seconds)
              setTimeout(() => {
                setSyncingDevices(prev => prev.filter(d => d.id !== updatedDevice.id));
              }, 2000);
            }
            
            // Update device in state
            setDevices(prev => prev.map(d => 
              d.id === updatedDevice.id ? updatedDevice : d
            ));
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    const cleanup = setupSubscription();
    return () => {
      cleanup.then(fn => fn?.());
    };
  }, [fetchDevices]);

  const handleManualSync = async (deviceId: string) => {
    // Trigger syncing animation
    setSyncingDevices(prev => [
      ...prev.filter(d => d.id !== deviceId),
      { id: deviceId, startedAt: Date.now() }
    ]);

    // Simulate sync (in real app, this would call an edge function)
    setTimeout(() => {
      setSyncingDevices(prev => prev.filter(d => d.id !== deviceId));
    }, 2000);
  };

  const isDeviceSyncing = (deviceId: string) => {
    return syncingDevices.some(d => d.id === deviceId);
  };

  const connectedCount = devices.filter(d => d.connection_status === "connected").length;
  const latestSync = devices.find(d => d.last_sync_at)?.last_sync_at;
  const anySyncing = syncingDevices.length > 0;

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
        <RefreshCw className="h-3 w-3 animate-spin" />
        <span>Loading devices...</span>
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground border-b border-border/30">
        <Watch className="h-3.5 w-3.5" />
        <span>No devices connected</span>
        <a 
          href="/nova/devices" 
          className="ml-auto text-accent hover:underline"
        >
          Connect
        </a>
      </div>
    );
  }

  return (
    <div className="border-b border-border/30">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-muted/30 touch-manipulation"
      >
        <div className="flex items-center gap-1.5">
          <div className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            connectedCount > 0 ? "bg-green-500" : "bg-muted-foreground",
            anySyncing && "animate-pulse ring-2 ring-green-500/30"
          )} />
          <span className="text-muted-foreground">
            {connectedCount} device{connectedCount !== 1 ? "s" : ""} connected
          </span>
          {anySyncing && (
            <span className="flex items-center gap-1 text-accent">
              <RefreshCw className="h-3 w-3 animate-spin" />
              <span className="hidden sm:inline">Syncing...</span>
            </span>
          )}
        </div>
        {!anySyncing && latestSync && (
          <span className="text-muted-foreground/70 hidden sm:inline">
            · Synced {formatDistanceToNow(new Date(latestSync), { addSuffix: true })}
          </span>
        )}
        <div className="ml-auto text-muted-foreground">
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2">
          {devices.map((device) => {
            const Icon = DEVICE_ICONS[device.device_type.toLowerCase()] || DEVICE_ICONS.default;
            const isConnected = device.connection_status === "connected";
            const isSyncing = isDeviceSyncing(device.id);
            
            return (
              <div
                key={device.id}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg bg-muted/30 transition-all duration-300",
                  isSyncing && "ring-1 ring-accent/50 bg-accent/5"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center relative",
                  isConnected ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className={cn("h-4 w-4", isSyncing && "animate-pulse")} />
                  {isSyncing && (
                    <div className="absolute inset-0 rounded-lg ring-2 ring-accent/40 animate-ping" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{device.device_name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {isSyncing ? (
                      <span className="flex items-center gap-1 text-accent">
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        Syncing...
                      </span>
                    ) : (
                      <>
                        <span className={cn(
                          "flex items-center gap-1",
                          isConnected ? "text-green-500" : "text-muted-foreground"
                        )}>
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isConnected ? "bg-green-500" : "bg-muted-foreground"
                          )} />
                          {isConnected ? "Connected" : "Offline"}
                        </span>
                        {device.last_sync_at && (
                          <span>
                            · {formatDistanceToNow(new Date(device.last_sync_at), { addSuffix: true })}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {device.battery_level !== null && (
                  <div className="text-xs text-muted-foreground">
                    {device.battery_level}%
                  </div>
                )}
                {isConnected && !isSyncing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleManualSync(device.id);
                    }}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors touch-manipulation"
                    aria-label="Sync now"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>
            );
          })}
          <a
            href="/nova/devices"
            className="block text-center text-xs text-accent hover:underline py-1"
          >
            Manage devices
          </a>
        </div>
      )}
    </div>
  );
}
