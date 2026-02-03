import { useState, useEffect } from "react";
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

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
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
  };

  const connectedCount = devices.filter(d => d.connection_status === "connected").length;
  const latestSync = devices.find(d => d.last_sync_at)?.last_sync_at;

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
            "w-2 h-2 rounded-full",
            connectedCount > 0 ? "bg-green-500" : "bg-muted-foreground"
          )} />
          <span className="text-muted-foreground">
            {connectedCount} device{connectedCount !== 1 ? "s" : ""} connected
          </span>
        </div>
        {latestSync && (
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
            
            return (
              <div
                key={device.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  isConnected ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{device.device_name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                  </div>
                </div>
                {device.battery_level !== null && (
                  <div className="text-xs text-muted-foreground">
                    {device.battery_level}%
                  </div>
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
