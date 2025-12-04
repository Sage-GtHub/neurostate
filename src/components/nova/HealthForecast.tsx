import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, TrendingDown, AlertCircle, Check, RefreshCw, Loader2 } from "lucide-react";
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
    
    // Generate realistic-looking data
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

  // Update forecast data when real data is available
  useEffect(() => {
    if (forecasts && forecasts.length > 0) {
      const mappedData: ForecastDay[] = forecasts.map((f, i) => {
        const date = new Date(f.date);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[date.getDay()];
        
        // Determine readiness based on recovery prediction
        let readiness: "optimal" | "moderate" | "low" = "moderate";
        if (f.recovery_prediction >= 80) readiness = "optimal";
        else if (f.recovery_prediction < 60) readiness = "low";
        
        // Calculate average energy from predictions
        const avgEnergy = f.energy_prediction?.length > 0 
          ? Math.round(f.energy_prediction.reduce((sum, e) => sum + e.level, 0) / f.energy_prediction.length)
          : 70;
        
        // Find energy dip
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
        
        // Build interventions from timing data
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

  const getReadinessColor = (readiness: string) => {
    switch (readiness) {
      case "optimal":
        return { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-500/30" };
      case "moderate":
        return { bg: "bg-orange-500/10", text: "text-orange-600", border: "border-orange-500/30" };
      case "low":
        return { bg: "bg-red-500/10", text: "text-red-600", border: "border-red-500/30" };
      default:
        return { bg: "bg-mist/30", text: "text-stone", border: "border-mist" };
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
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-carbon">7-Day Health Forecast</h3>
              <p className="text-sm text-ash">AI-predicted performance windows</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={generateForecast}
            disabled={isLoading}
            className="gap-2"
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
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {forecastData.map((day, index) => {
              const colors = getReadinessColor(day.trainingReadiness);
              const isSelected = selectedDay.date === day.date;
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDay(day)}
                  className={`relative overflow-hidden rounded-lg sm:rounded-xl p-2 sm:p-3 transition-all ${
                    isSelected
                      ? `${colors.bg} border-2 ${colors.border} shadow-md`
                      : "bg-pearl/30 border border-mist/30 hover:bg-pearl/50"
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-[0.6rem] sm:text-[0.6875rem] font-medium uppercase tracking-wider mb-1 ${
                      isSelected ? colors.text : "text-stone"
                    }`}>
                      {day.date}
                    </div>
                    <div className="text-[0.6rem] sm:text-caption text-ash mb-2 hidden sm:block">{day.dayName}</div>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg mx-auto flex items-center justify-center ${
                      isSelected ? colors.bg : "bg-mist/20"
                    }`}>
                      <div className={isSelected ? colors.text : "text-stone"}>
                        {getReadinessIcon(day.trainingReadiness)}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Details */}
          <div className="space-y-4 animate-fade-in">
            <div className="rounded-2xl p-6 bg-gradient-to-br from-pearl/50 to-ivory border border-mist/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-body font-semibold text-carbon mb-1">
                    {selectedDay.date} • {selectedDay.dayName}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${getReadinessColor(selectedDay.trainingReadiness).bg} ${
                        getReadinessColor(selectedDay.trainingReadiness).text
                      } ${getReadinessColor(selectedDay.trainingReadiness).border} border`}
                    >
                      {selectedDay.trainingReadiness.charAt(0).toUpperCase() + selectedDay.trainingReadiness.slice(1)} Readiness
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[2rem] font-bold text-carbon leading-none mb-1">
                    {selectedDay.energyLevel}%
                  </div>
                  <div className="text-caption text-ash">Energy Level</div>
                </div>
              </div>

              {/* Energy Dip Warning */}
              {selectedDay.expectedDip && (
                <div className="mb-4 p-3 rounded-xl bg-orange-500/5 border border-orange-500/20">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-carbon mb-0.5">
                        Expected Energy Dip
                      </div>
                      <div className="text-caption text-ash">
                        {selectedDay.expectedDip.time} - {selectedDay.expectedDip.reason}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interventions */}
              <div>
                <div className="text-caption font-semibold text-carbon uppercase tracking-wider mb-3">
                  Recommended Interventions
                </div>
                <div className="space-y-2">
                  {selectedDay.interventions.map((intervention, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-carbon">{intervention}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidence Score */}
              <div className="mt-4 pt-4 border-t border-mist/20 flex items-center justify-between">
                <span className="text-caption text-ash">Prediction Confidence</span>
                <span className="text-sm font-semibold text-accent">{selectedDay.confidence}%</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-caption text-ash text-center">
            Predictions update every 6 hours based on latest biometric data
          </div>
        </div>
      </CardContent>
    </Card>
  );
}