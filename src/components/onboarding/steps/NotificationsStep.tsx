import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Bell, BellOff, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

interface NotificationsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function NotificationsStep({ onNext, onBack }: NotificationsStepProps) {
  const [permissionState, setPermissionState] = useState<"default" | "granted" | "denied">(
    typeof window !== "undefined" && "Notification" in window
      ? Notification.permission
      : "default"
  );
  const [isRequesting, setIsRequesting] = useState(false);
  const isSupported = typeof window !== "undefined" && "Notification" in window;

  const requestPermission = async () => {
    if (!isSupported) return;
    setIsRequesting(true);
    try {
      const result = await Notification.requestPermission();
      setPermissionState(result);
      if (result === "granted") {
        // Show a test notification
        new Notification("NeuroState Nova", {
          body: "Brilliant! You'll receive critical health alerts even when you're away.",
          icon: "/favicon.png",
        });
      }
    } catch {
      // Some browsers block this
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-3xl mb-3">🔔</div>
        <h2 className="text-xl font-light text-foreground mb-2">
          Stay in the loop
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Enable notifications so Nova can alert you to critical health changes, even when you're not in the app.
        </p>
      </div>

      {/* Visual */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 mb-6">
        {/* Preview cards */}
        <div className="w-full max-w-sm space-y-3">
          {[
            { title: "🚨 Recovery Alert", body: "Your HRV dropped 18% overnight. Consider a lighter training day.", priority: "critical" },
            { title: "💡 Smart Nudge", body: "Based on your energy curve, 2:30 PM is your optimal focus window today.", priority: "medium" },
            { title: "✅ Protocol Update", body: "Your sleep protocol has been adjusted based on 7 days of data.", priority: "low" },
          ].map((notif, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className={`flex items-start gap-3 p-4 rounded-2xl border ${
                notif.priority === "critical"
                  ? "border-destructive/30 bg-destructive/5"
                  : "border-border/50 bg-muted/20"
              }`}
            >
              <Smartphone className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{notif.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{notif.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          {permissionState === "granted" ? (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Bell className="w-4 h-4" />
              Notifications enabled
            </div>
          ) : permissionState === "denied" ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BellOff className="w-4 h-4" />
              Blocked — enable in browser settings
            </div>
          ) : isSupported ? (
            <Button
              onClick={requestPermission}
              disabled={isRequesting}
              variant="outline"
              className="gap-2 rounded-full px-6"
            >
              <Bell className="w-4 h-4" />
              {isRequesting ? "Requesting…" : "Enable Notifications"}
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">
              Notifications aren't supported in this browser.
            </p>
          )}
        </motion.div>
      </div>

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
          {permissionState === "granted" ? "Continue" : "Skip for now"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
