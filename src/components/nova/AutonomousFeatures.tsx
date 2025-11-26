import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Brain, Activity, Zap, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

interface AutonomousFeature {
  id: string;
  title: string;
  description: string;
  icon: any;
  enabled: boolean;
  status: "active" | "pending" | "disabled";
}

export function AutonomousFeatures() {
  const [features, setFeatures] = useState<AutonomousFeature[]>([
    {
      id: "proactive",
      title: "Proactive Recommendations",
      description: "Nova autonomously suggests protocol changes before performance decline occurs. Based on predictive models trained on your unique patterns.",
      icon: Brain,
      enabled: true,
      status: "active"
    },
    {
      id: "auto-adjust",
      title: "Autonomous Adjustments",
      description: "Automatically modify supplement timing and doses within pre-approved ranges. All changes logged and reversible.",
      icon: Zap,
      enabled: false,
      status: "disabled"
    },
    {
      id: "predictive",
      title: "Predictive Warnings",
      description: "Receive alerts 24-48 hours before predicted performance dips, allowing preemptive protocol optimisation.",
      icon: Activity,
      enabled: true,
      status: "active"
    },
    {
      id: "safety",
      title: "Safety Override System",
      description: "All autonomous changes respect safety boundaries. You maintain ultimate control with instant override capability.",
      icon: Shield,
      enabled: true,
      status: "active"
    }
  ]);

  const handleToggle = (featureId: string) => {
    setFeatures(features.map(feature => 
      feature.id === featureId 
        ? { 
            ...feature, 
            enabled: !feature.enabled,
            status: !feature.enabled ? "active" : "disabled"
          }
        : feature
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-[#10b981]";
      case "pending":
        return "text-ash";
      case "disabled":
        return "text-ash/50";
      default:
        return "text-ash";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#10b981]/10";
      case "pending":
        return "bg-ash/10";
      case "disabled":
        return "bg-ash/5";
      default:
        return "bg-pearl/30";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[1.5rem] font-semibold text-carbon tracking-tight mb-2">Autonomous Coach (Phase 4)</h2>
        <p className="text-sm text-ash leading-relaxed">
          Enable Nova to make intelligent decisions and take proactive action on your behalf
        </p>
      </div>

      <Card className="border-[#10b981]/20 bg-gradient-to-br from-[#10b981]/5 to-[#10b981]/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#10b981]/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-[#10b981]" />
            </div>
            <div>
              <h3 className="text-body font-semibold text-carbon mb-2">Phase 4 Preview</h3>
              <p className="text-sm text-ash leading-relaxed">
                Autonomous features represent the most advanced stage of Nova AI. These capabilities learn from your unique physiology to make intelligent, proactive decisions within your approved parameters.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <Card 
            key={feature.id}
            className="border-mist/30 hover:border-mist transition-all hover:shadow-md group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  feature.enabled ? "bg-gradient-to-br from-carbon/5 to-carbon/10" : "bg-pearl/30"
                }`}>
                  <feature.icon className={`w-6 h-6 ${feature.enabled ? "text-carbon" : "text-ash/50"}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-body font-semibold text-carbon">{feature.title}</h3>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBg(feature.status)} ${getStatusColor(feature.status)}`}>
                          {feature.status === "active" && <CheckCircle className="w-3 h-3" />}
                          <span className="capitalize">{feature.status}</span>
                        </div>
                      </div>
                      <p className="text-sm text-ash leading-relaxed pr-4">
                        {feature.description}
                      </p>
                    </div>
                    <Switch
                      checked={feature.enabled}
                      onCheckedChange={() => handleToggle(feature.id)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-carbon/10 bg-gradient-to-br from-carbon to-slate text-ivory shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-ivory/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-ivory" />
            </div>
            <div>
              <h3 className="text-[1.125rem] font-semibold mb-2 tracking-tight">Your Control, Enhanced</h3>
              <p className="text-sm text-pearl/90 leading-relaxed">
                Phase 4 autonomous features are designed to enhance, not replace, your decision-making. All autonomous actions:
              </p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 pl-16">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-pearl/90">Respect your safety boundaries</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-pearl/90">Can be instantly overridden</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-pearl/90">Are fully transparent and logged</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-pearl/90">Learn from your preferences</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-6 bg-ivory/10 text-ivory border-ivory/20 hover:bg-ivory/20"
          >
            Configure Safety Parameters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
