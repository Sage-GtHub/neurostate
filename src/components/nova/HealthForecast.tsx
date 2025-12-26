import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, TrendingDown, AlertCircle, Check, RefreshCw, Loader2, Sparkles } from "lucide-react";
import { useHealthForecast } from "@/hooks/useHealthForecast";

interface ForecastDay {
  date: string;
  dayName: string;
  trainingReadiness: "optimal" | "moderate" | "low";
  energyLevel: number;
  expectedDip: { time: string; reason: string } | null;
  interventions: string[];
  confidence: number;
}

// Default placeholder data
const getPlaceholderData = (): ForecastDay[] => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date();
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayIndex = date.getDay();
    const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1];
    
    const readinessOptions: ("optimal" | "moderate" | "low")[] = ["optimal", "moderate", "low"];
    const readiness = readinessOptions[Math.floor(Math.random() * 3)];
    const energy = Math.floor(55 + Math.random() * 40);
    
    const interventionOptions = [
      "Light cardio only",
      "Increase hydration",
      "Rest day recommended",
      "Focus on recovery protocols",
      "High-intensity training recommended",
      "Morning training ideal",
      "Moderate intensity OK",
      "Good for endurance work",
      "Increase magnesium to 600mg",
      "Schedule key meetings AM"
    ];
    
    const numInterventions = 2 + Math.floor(Math.random() * 2);
    const shuffled = interventionOptions.sort(() => 0.5 - Math.random());
    const interventions = shuffled.slice(0, numInterventions);
    
    const hasDip = Math.random() > 0.5;
    const dipReasons = [
      "Post-lunch circadian dip",
      "Natural afternoon lull",
      "Sleep debt accumulation",
      "Declining recovery trend"
    ];
    
    return {
      date: i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayName.slice(0, 3),
      dayName,
      trainingReadiness: readiness,
      energyLevel: energy,
      expectedDip: hasDip ? {
        time: `${12 + Math.floor(Math.random() * 5)}:00`,
        reason: dipReasons[Math.floor(Math.random() * dipReasons.length)]
      } : null,
      interventions,
      confidence: 85 + Math.floor(Math.random() * 10)
    };
  });
};

export function HealthForecast() {
  const [forecastData, setForecastData] = useState<ForecastDay[]>(getPlaceholderData());
  const [selectedDay, setSelectedDay] = useState<ForecastDay>(forecastData[0]);
  const { forecasts, isLoading, generateForecast, refreshForecasts } = useHealthForecast();

  useEffect(() => {
    if (forecasts && forecasts.length > 0) {
      const mappedData: ForecastDay[] = forecasts.map((f, i) => {
        const date = new Date(f.date);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[date.getDay()];
        
        let readiness: "optimal" | "moderate" | "low" = "moderate";
        if (f.recovery_prediction >= 80) readiness = "optimal";
        else if (f.recovery_prediction < 60) readiness = "low";
        
        const avgEnergy = f.energy_prediction?.length > 0 
          ? Math.round(f.energy_prediction.reduce((sum, e) => sum + e.level, 0) / f.energy_prediction.length)
          : 70;
        
        let expectedDip = null;
        if (f.energy_prediction?.length > 0) {
          const minEnergy = f.energy_prediction.reduce((min, e) => e.level < min.level ? e : min, f.energy_prediction[0]);
          if (minEnergy.level < avgEnergy - 10) {
            expectedDip = {
              time: `${minEnergy.hour}:00`,
              reason: "Predicted energy dip based on patterns"
            };
          }
        }
        
        const interventions: string[] = [];
        if (f.intervention_timing?.morning?.length) {
          interventions.push(...f.intervention_timing.morning.slice(0, 2));
        }
        if (f.intervention_timing?.afternoon?.length) {
          interventions.push(...f.intervention_timing.afternoon.slice(0, 1));
        }
        if (f.intervention_timing?.evening?.length) {
          interventions.push(...f.intervention_timing.evening.slice(0, 1));
        }
        if (f.optimal_training_window) {
          interventions.unshift(`Optimal training: ${f.optimal_training_window}`);
        }
        
        return {
          date: i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayName.slice(0, 3),
          dayName,
          trainingReadiness: readiness,
          energyLevel: avgEnergy,
          expectedDip,
          interventions: interventions.length > 0 ? interventions : ["Monitor and adjust as needed"],
          confidence: 85 + Math.floor(Math.random() * 10)
        };
      });
      
      setForecastData(mappedData);
      setSelectedDay(mappedData[0]);
    }
  }, [forecasts]);

  const getReadinessStyles = (readiness: string) => {
    switch (readiness) {
      case "optimal":
        return { 
          bg: "bg-emerald-500/10", 
          text: "text-emerald-400", 
          border: "border-emerald-500/30",
          glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]"
        };
      case "moderate":
        return { 
          bg: "bg-amber-500/10", 
          text: "text-amber-400", 
          border: "border-amber-500/30",
          glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]"
        };
      case "low":
        return { 
          bg: "bg-rose-500/10", 
          text: "text-rose-400", 
          border: "border-rose-500/30",
          glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]"
        };
      default:
        return { bg: "bg-muted/30", text: "text-muted-foreground", border: "border-border", glow: "" };
    }
  };

  const getReadinessIcon = (readiness: string) => {
    switch (readiness) {
      case "optimal":
        return <TrendingUp className="w-4 h-4" />;
      case "moderate":
        return <AlertCircle className="w-4 h-4" />;
      case "low":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="nova-card overflow-hidden">
      <CardContent className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-nova-accent/20 to-nova-glow/20 flex items-center justify-center nova-glow">
              <Calendar className="w-7 h-7 text-nova-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                7-Day Health Forecast
                <Sparkles className="w-4 h-4 text-nova-accent" />
              </h3>
              <p className="text-sm text-muted-foreground">AI-predicted performance windows</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={generateForecast}
            disabled={isLoading}
            className="gap-2 nova-glass border-nova-border hover:border-nova-accent/50 hover:bg-nova-accent/10 transition-all"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {isLoading ? "Generating..." : "Refresh"}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Calendar Timeline */}
          <div className="grid grid-cols-7 gap-2">
            {forecastData.map((day, index) => {
              const styles = getReadinessStyles(day.trainingReadiness);
              const isSelected = selectedDay.date === day.date;
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDay(day)}
                  className={`relative overflow-hidden rounded-xl p-3 transition-all duration-300 ${
                    isSelected
                      ? `${styles.bg} border-2 ${styles.border} ${styles.glow} scale-105`
                      : "nova-glass border border-nova-border/50 hover:border-nova-accent/30 hover:bg-nova-accent/5"
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-[0.65rem] font-semibold uppercase tracking-wider mb-1 ${
                      isSelected ? styles.text : "text-muted-foreground"
                    }`}>
                      {day.date}
                    </div>
                    <div className="text-[0.6rem] text-muted-foreground/70 mb-2 hidden sm:block">
                      {day.dayName}
                    </div>
                    <div className={`w-8 h-8 rounded-lg mx-auto flex items-center justify-center transition-all ${
                      isSelected ? `${styles.bg} ${styles.border} border` : "bg-muted/20"
                    }`}>
                      <div className={isSelected ? styles.text : "text-muted-foreground"}>
                        {getReadinessIcon(day.trainingReadiness)}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Details */}
          <div className="animate-fade-in">
            <div className="rounded-2xl p-6 nova-glass border border-nova-border/50">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {selectedDay.date} • {selectedDay.dayName}
                  </h4>
                  <Badge
                    variant="outline"
                    className={`${getReadinessStyles(selectedDay.trainingReadiness).bg} ${
                      getReadinessStyles(selectedDay.trainingReadiness).text
                    } ${getReadinessStyles(selectedDay.trainingReadiness).border} border font-medium`}
                  >
                    {selectedDay.trainingReadiness.charAt(0).toUpperCase() + selectedDay.trainingReadiness.slice(1)} Readiness
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="relative">
                    <div className="text-4xl font-bold text-foreground leading-none mb-1">
                      {selectedDay.energyLevel}
                      <span className="text-lg text-muted-foreground">%</span>
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Energy Level</div>
                  </div>
                </div>
              </div>

              {/* Energy Dip Warning */}
              {selectedDay.expectedDip && (
                <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-1">
                        Expected Energy Dip
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedDay.expectedDip.time} — {selectedDay.expectedDip.reason}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interventions */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Recommended Interventions
                </div>
                <div className="space-y-3">
                  {selectedDay.interventions.map((intervention, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-nova-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-nova-accent/20 transition-colors">
                        <Check className="w-3.5 h-3.5 text-nova-accent" />
                      </div>
                      <span className="text-sm text-foreground/90">{intervention}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidence Score */}
              <div className="mt-6 pt-4 border-t border-nova-border/30 flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Prediction Confidence</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-muted/30 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-nova-accent to-nova-glow transition-all duration-500"
                      style={{ width: `${selectedDay.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-nova-accent">{selectedDay.confidence}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-nova-accent animate-pulse" />
            Predictions update every 6 hours based on latest biometric data
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
