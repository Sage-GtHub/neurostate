import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, ShoppingCart, Lightbulb, Lock } from "lucide-react";
import { useState } from "react";

interface AutonomousSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  available: boolean;
  comingSoon?: boolean;
  icon: any;
}

export function AutonomousFeatures() {
  const [settings, setSettings] = useState<AutonomousSetting[]>([
    {
      id: "auto_ordering",
      name: "Automatic Reordering",
      description: "Nova automatically orders supplements when you're running low",
      enabled: false,
      available: false,
      comingSoon: true,
      icon: ShoppingCart
    },
    {
      id: "calendar_integration",
      name: "Calendar Intelligence",
      description: "Adjusts protocols based on your schedule and upcoming events",
      enabled: false,
      available: false,
      comingSoon: true,
      icon: Calendar
    },
    {
      id: "proactive_adjustments",
      name: "Proactive Protocol Adjustments",
      description: "Makes protocol changes without requiring approval",
      enabled: false,
      available: false,
      comingSoon: true,
      icon: Lightbulb
    },
    {
      id: "ecosystem_control",
      name: "Ecosystem Orchestration",
      description: "Controls connected NeuroState hardware (red light, ice bath, etc.)",
      enabled: false,
      available: false,
      comingSoon: true,
      icon: Sparkles
    }
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(s => 
      s.id === id && s.available ? { ...s, enabled: !s.enabled } : s
    ));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-carbon" />
            <h3 className="text-body font-semibold text-carbon">Autonomous Features</h3>
          </div>
          <p className="text-sm text-ash leading-relaxed">
            Phase 4 capabilities that enable Nova to operate as your fully autonomous performance coach
          </p>
        </div>

        <div className="space-y-4">
          {settings.map((setting) => {
            const Icon = setting.icon;
            return (
              <div
                key={setting.id}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  setting.available ? "bg-ivory border-mist" : "bg-pearl/30 border-mist/50"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  setting.available ? "bg-carbon" : "bg-mist"
                }`}>
                  <Icon className={`w-5 h-5 ${setting.available ? "text-ivory" : "text-stone"}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-semibold ${
                      setting.available ? "text-carbon" : "text-ash"
                    }`}>
                      {setting.name}
                    </span>
                    {setting.comingSoon && (
                      <Badge variant="outline" className="text-xs border-carbon text-carbon">
                        Phase 4
                      </Badge>
                    )}
                    {!setting.available && (
                      <Lock className="w-3 h-3 text-ash" />
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    setting.available ? "text-ash" : "text-stone"
                  }`}>
                    {setting.description}
                  </p>
                </div>

                <Switch
                  checked={setting.enabled}
                  onCheckedChange={() => toggleSetting(setting.id)}
                  disabled={!setting.available}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-pearl/50 rounded-lg p-4">
          <p className="text-xs text-ash leading-relaxed">
            Autonomous features are being developed as part of Nova Phase 4. 
            Enable notifications to be the first to know when they become available.
          </p>
          <Button variant="outline" className="w-full mt-3" size="sm">
            Notify Me When Available
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}