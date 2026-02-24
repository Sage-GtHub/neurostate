import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar, TrendingUp, TrendingDown, AlertCircle, Check,
  RefreshCw, Loader2, Sparkles, Sun, Moon, CloudSun, Zap,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { useHealthForecast, type HealthForecast as ForecastType } from "@/hooks/useHealthForecast";
import { format, addDays, isToday, isTomorrow } from "date-fns";

function getDateLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  if (isToday(d)) return "Today";
  if (isTomorrow(d)) return "Tomorrow";
  return format(d, "EEE");
}

function getDayName(dateStr: string): string {
  return format(new Date(dateStr + 'T00:00:00'), "EEEE");
}

function getReadiness(recovery: number): "optimal" | "moderate" | "low" {
  if (recovery >= 75) return "optimal";
  if (recovery >= 50) return "moderate";
  return "low";
}

const readinessConfig = {
  optimal: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", label: "Optimal" },
  moderate: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", label: "Moderate" },
  low: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30", label: "Low" },
};

const ReadinessIcon = ({ readiness }: { readiness: string }) => {
  if (readiness === "optimal") return <TrendingUp className="w-4 h-4" />;
  if (readiness === "low") return <TrendingDown className="w-4 h-4" />;
  return <AlertCircle className="w-4 h-4" />;
};

const TimeIcon = ({ period }: { period: string }) => {
  if (period === "morning") return <Sun className="w-3.5 h-3.5 text-amber-400" />;
  if (period === "afternoon") return <CloudSun className="w-3.5 h-3.5 text-orange-400" />;
  return <Moon className="w-3.5 h-3.5 text-indigo-400" />;
};

export function HealthForecast() {
  const { forecasts, isLoading, isInitialLoading, generateForecast } = useHealthForecast();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedForecast = forecasts[selectedIndex] || null;

  // Energy curve data for chart
  const energyCurveData = useMemo(() => {
    if (!selectedForecast?.energy_prediction?.length) return [];
    return selectedForecast.energy_prediction
      .filter(e => e.hour >= 6 && e.hour <= 22)
      .sort((a, b) => a.hour - b.hour)
      .map(e => ({
        time: `${e.hour}:00`,
        energy: e.level,
      }));
  }, [selectedForecast]);

  // Find energy dip
  const energyDip = useMemo(() => {
    if (!selectedForecast?.energy_prediction?.length) return null;
    const points = selectedForecast.energy_prediction.filter(e => e.hour >= 10 && e.hour <= 18);
    if (!points.length) return null;
    const avg = points.reduce((s, e) => s + e.level, 0) / points.length;
    const min = points.reduce((m, e) => e.level < m.level ? e : m, points[0]);
    if (min.level < avg - 10) return { hour: min.hour, level: min.level };
    return null;
  }, [selectedForecast]);

  const avgEnergy = useMemo(() => {
    if (!selectedForecast?.energy_prediction?.length) return 0;
    return Math.round(
      selectedForecast.energy_prediction.reduce((s, e) => s + e.level, 0) /
      selectedForecast.energy_prediction.length
    );
  }, [selectedForecast]);

  if (isInitialLoading) {
    return (
      <Card className="border-foreground/5 bg-card">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="w-14 h-14 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-48 rounded-2xl" />
        </CardContent>
      </Card>
    );
  }

  // Empty state — no forecasts yet
  if (!forecasts.length) {
    return (
      <Card className="border-foreground/5 bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Calendar className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                7-Day Health Forecast <Sparkles className="w-4 h-4 text-accent" />
              </h3>
              <p className="text-sm text-muted-foreground">AI-predicted performance windows</p>
            </div>
          </div>
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-7 h-7 text-accent" />
            </div>
            <h4 className="text-foreground font-medium mb-2">No forecasts yet</h4>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Generate your first 7-day forecast. Nova will analyse your biometric data to predict energy levels, recovery windows, and optimal training times.
            </p>
            <Button onClick={generateForecast} disabled={isLoading} className="gap-2">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isLoading ? "Generating…" : "Generate Forecast"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const readiness = getReadiness(selectedForecast?.recovery_prediction || 0);
  const styles = readinessConfig[readiness];

  return (
    <Card className="border-foreground/5 bg-card overflow-hidden">
      <CardContent className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Calendar className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                7-Day Health Forecast <Sparkles className="w-4 h-4 text-accent" />
              </h3>
              <p className="text-sm text-muted-foreground">AI-predicted performance windows</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateForecast}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {isLoading ? "Generating…" : "Refresh"}
          </Button>
        </div>

        {/* Day selector */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {forecasts.map((f, i) => {
            const r = getReadiness(f.recovery_prediction);
            const s = readinessConfig[r];
            const isSelected = i === selectedIndex;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedIndex(i)}
                className={`rounded-xl p-3 transition-all duration-200 ${
                  isSelected
                    ? `${s.bg} border-2 ${s.border} scale-[1.03]`
                    : "bg-foreground/[0.02] border border-foreground/5 hover:border-foreground/10"
                }`}
              >
                <div className="text-center">
                  <div className={`text-[0.65rem] font-semibold uppercase tracking-wider mb-1 ${isSelected ? s.text : "text-muted-foreground"}`}>
                    {getDateLabel(f.date)}
                  </div>
                  <div className="text-[0.6rem] text-muted-foreground/60 mb-2 hidden sm:block">
                    {getDayName(f.date)}
                  </div>
                  <div className={`w-8 h-8 rounded-lg mx-auto flex items-center justify-center ${isSelected ? `${s.bg}` : "bg-foreground/[0.03]"}`}>
                    <div className={isSelected ? s.text : "text-muted-foreground"}>
                      <ReadinessIcon readiness={r} />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedForecast && (
          <div className="space-y-6">
            {/* Overview Row */}
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {getDateLabel(selectedForecast.date)} · {getDayName(selectedForecast.date)}
                </h4>
                <Badge variant="outline" className={`${styles.bg} ${styles.text} ${styles.border} border font-medium`}>
                  {styles.label} Readiness
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-foreground leading-none mb-1">
                  {selectedForecast.recovery_prediction}<span className="text-lg text-muted-foreground">%</span>
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Recovery</div>
              </div>
            </div>

            {/* Training Window */}
            {selectedForecast.optimal_training_window && (
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Optimal Training Window</div>
                    <div className="text-sm text-muted-foreground">{selectedForecast.optimal_training_window}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Energy Curve Chart */}
            {energyCurveData.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Predicted Energy Curve
                  </p>
                  <p className="text-xs text-muted-foreground">Avg: {avgEnergy}%</p>
                </div>
                <div className="h-40 -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={energyCurveData}>
                      <defs>
                        <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="time"
                        tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--foreground) / 0.1)',
                          borderRadius: '12px',
                          fontSize: '11px',
                        }}
                        formatter={(value: number) => [`${value}%`, 'Energy']}
                      />
                      {energyDip && (
                        <ReferenceLine
                          x={`${energyDip.hour}:00`}
                          stroke="hsl(var(--destructive))"
                          strokeDasharray="3 3"
                          strokeOpacity={0.5}
                        />
                      )}
                      <Area
                        type="monotone"
                        dataKey="energy"
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                        fill="url(#energyGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Energy Dip Warning */}
            {energyDip && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground mb-1">Expected Energy Dip</div>
                    <div className="text-sm text-muted-foreground">
                      {energyDip.hour}:00 — Energy predicted to drop to {energyDip.level}%. Consider scheduling breaks or light activity.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Intervention Timing */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Recommended Interventions
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {(["morning", "afternoon", "evening"] as const).map(period => {
                  const items = selectedForecast.intervention_timing?.[period] || [];
                  if (!items.length) return null;
                  return (
                    <div key={period} className="p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                      <div className="flex items-center gap-2 mb-3">
                        <TimeIcon period={period} />
                        <span className="text-xs font-semibold text-foreground capitalize">{period}</span>
                      </div>
                      <div className="space-y-2">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-foreground/80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Predictions update when you refresh with latest biometric data
        </div>
      </CardContent>
    </Card>
  );
}
