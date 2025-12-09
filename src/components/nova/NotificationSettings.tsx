import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, BellOff, Loader2, AlertTriangle } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export function NotificationSettings() {
  const { isSupported, isSubscribed, isLoading, subscribe, unsubscribe } = usePushNotifications();

  if (!isSupported) {
    return (
      <Card className="border-mist/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-carbon mb-1">Notifications Not Supported</h3>
              <p className="text-sm text-ash">
                Your browser does not support push notifications. Try using Chrome, Firefox, or Edge.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-mist/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isSubscribed ? 'bg-accent/10' : 'bg-mist'
            }`}>
              {isSubscribed ? (
                <Bell className="w-5 h-5 text-accent" />
              ) : (
                <BellOff className="w-5 h-5 text-ash" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-carbon mb-1">Push Notifications</h3>
              <p className="text-sm text-ash">
                {isSubscribed 
                  ? "You'll receive alerts for health insights and significant metric changes."
                  : "Enable notifications to receive important health alerts and insights."
                }
              </p>
            </div>
          </div>
          
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-ash" />
          ) : (
            <Switch
              checked={isSubscribed}
              onCheckedChange={(checked) => checked ? subscribe() : unsubscribe()}
            />
          )}
        </div>

        {isSubscribed && (
          <div className="mt-6 pt-6 border-t border-mist/30">
            <h4 className="text-sm font-medium text-carbon mb-4">Notification Types</h4>
            <div className="space-y-3">
              {[
                { label: "Health Insights", desc: "AI-generated recommendations based on your data" },
                { label: "Metric Alerts", desc: "When HRV, sleep, or recovery changes significantly" },
                { label: "Protocol Reminders", desc: "Daily check-in and supplement reminders" },
                { label: "Device Sync", desc: "When your devices sync new data" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-pearl/50">
                  <div>
                    <p className="text-sm font-medium text-carbon">{item.label}</p>
                    <p className="text-xs text-ash">{item.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
