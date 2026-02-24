import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, X, CheckCircle, Clock, Sparkles, Loader2, AlertTriangle,
  Moon, Droplets, Brain, Dumbbell, Heart, Leaf, Target, Zap,
  TrendingUp, BarChart3, Settings2, RefreshCw, Eye, ShieldAlert,
} from "lucide-react";
import { useAutonomousCoaching, AutonomousNudge } from "@/hooks/useAutonomousCoaching";

const categoryIcons: Record<string, React.ElementType> = {
  movement: Dumbbell,
  hydration: Droplets,
  focus: Brain,
  rest: Moon,
  nutrition: Heart,
  mindfulness: Leaf,
  recovery: Sparkles,
  training: Target,
  general: Zap,
};

const typeConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  nudge: { label: "Nudges", icon: Bell, color: "text-accent" },
  risk_alert: { label: "Risk Alerts", icon: ShieldAlert, color: "text-amber-500" },
  pattern: { label: "Patterns", icon: BarChart3, color: "text-violet-500" },
  prediction: { label: "Predictions", icon: TrendingUp, color: "text-blue-500" },
  protocol_adjustment: { label: "Adjustments", icon: Settings2, color: "text-emerald-500" },
};

function NudgeCard({ nudge, onComplete, onDismiss }: {
  nudge: AutonomousNudge;
  onComplete: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  const config = typeConfig[nudge.nudge_type] || typeConfig.nudge;
  const CatIcon = categoryIcons[nudge.category] || Zap;
  const adaptationNote = nudge.metadata?.adaptation_note as string | undefined;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 80 }}
      className={`relative p-5 rounded-xl border bg-card/50 hover:bg-card transition-all ${
        nudge.nudge_type === 'risk_alert'
          ? nudge.priority === 'critical' ? 'border-red-500/30' : 'border-amber-500/20'
          : 'border-foreground/5'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-foreground/[0.03] ${config.color}`}>
          <CatIcon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <h4 className="font-semibold text-sm text-foreground">{nudge.title}</h4>
            {nudge.impact && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-accent/10 text-accent border-accent/20">
                <Zap className="h-2.5 w-2.5 mr-0.5" />
                {nudge.impact}
              </Badge>
            )}
            {nudge.priority === 'critical' && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Critical</Badge>
            )}
            {nudge.priority === 'high' && (
              <Badge className="text-[10px] px-1.5 py-0 bg-amber-500/10 text-amber-600 border-amber-500/20" variant="outline">High</Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-2">{nudge.description}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {nudge.timing && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {nudge.timing}
              </span>
            )}
            {nudge.confidence > 0 && (
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {nudge.confidence}% confidence
              </span>
            )}
          </div>

          {adaptationNote && (
            <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-accent/5 border border-accent/10">
              <p className="text-[11px] text-accent flex items-center gap-1">
                <Sparkles className="h-3 w-3 flex-shrink-0" />
                <span className="italic">{adaptationNote}</span>
              </p>
            </div>
          )}

          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline" onClick={() => onComplete(nudge.id)} className="gap-1.5 h-8 text-xs">
              <CheckCircle className="w-3.5 h-3.5" />
              {nudge.action_label || "Complete"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDismiss(nudge.id)} className="gap-1.5 h-8 text-xs text-muted-foreground">
              <X className="w-3.5 h-3.5" />
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ type, onGenerate, isLoading }: { type: string; onGenerate: () => void; isLoading: boolean }) {
  const config = typeConfig[type] || typeConfig.nudge;
  const Icon = config.icon;
  return (
    <div className="text-center py-10">
      <Icon className={`h-8 w-8 mx-auto mb-3 ${config.color} opacity-40`} />
      <p className="text-sm font-medium text-foreground mb-1">No active {config.label.toLowerCase()}</p>
      <p className="text-xs text-muted-foreground mb-4">Generate coaching actions to get personalised {config.label.toLowerCase()}.</p>
      <Button size="sm" onClick={onGenerate} disabled={isLoading} className="gap-2">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        Generate
      </Button>
    </div>
  );
}

export function BehaviourChangeNudges() {
  const {
    nudges, activeNudges, riskAlerts, patterns, predictions, protocolAdjustments,
    isLoading, isInitialLoading, generateCoaching, completeNudge, dismissNudge,
  } = useAutonomousCoaching();
  const [tab, setTab] = useState("all");

  if (isInitialLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
      </div>
    );
  }

  const tabCounts: Record<string, number> = {
    all: nudges.length,
    nudge: activeNudges.length,
    risk_alert: riskAlerts.length,
    pattern: patterns.length,
    prediction: predictions.length,
    protocol_adjustment: protocolAdjustments.length,
  };

  const filteredNudges = tab === "all" ? nudges : nudges.filter(n => n.nudge_type === tab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Behaviour Change Nudges</h2>
          <p className="text-sm text-muted-foreground">Adaptive coaching that learns from your response patterns</p>
        </div>
        <Button size="sm" variant="outline" onClick={generateCoaching} disabled={isLoading} className="gap-2">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh
        </Button>
      </div>

      {/* Adaptation indicator */}
      {nudges.some(n => n.metadata?.response_patterns_used) && (
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Adaptive coaching active</p>
              <p className="text-xs text-muted-foreground">
                These nudges are personalised based on your response history and biometric triggers.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-transparent p-0">
          <TabsTrigger value="all" className="text-xs data-[state=active]:bg-foreground/5">
            All <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">{tabCounts.all}</Badge>
          </TabsTrigger>
          {Object.entries(typeConfig).map(([key, config]) => (
            <TabsTrigger key={key} value={key} className="text-xs data-[state=active]:bg-foreground/5 gap-1">
              <config.icon className={`h-3 w-3 ${config.color}`} />
              {config.label}
              {tabCounts[key] > 0 && (
                <Badge variant="secondary" className="ml-0.5 text-[10px] px-1.5 py-0">{tabCounts[key]}</Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4">
          <AnimatePresence mode="popLayout">
            {filteredNudges.length > 0 ? (
              <div className="space-y-3">
                {filteredNudges.map(nudge => (
                  <NudgeCard
                    key={nudge.id}
                    nudge={nudge}
                    onComplete={completeNudge}
                    onDismiss={dismissNudge}
                  />
                ))}
              </div>
            ) : (
              <EmptyState type={tab === "all" ? "nudge" : tab} onGenerate={generateCoaching} isLoading={isLoading} />
            )}
          </AnimatePresence>
        </div>
      </Tabs>

      <Card className="border-foreground/5 bg-foreground/[0.01]">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium mb-1">Smart Timing & Adaptation</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nudges adapt to your behaviour: categories you engage with are reinforced, dismissed ones are reframed. 
                Timing is optimised based on your routine and biometric patterns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
