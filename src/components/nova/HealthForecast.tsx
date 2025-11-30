import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, TrendingDown, AlertCircle, Check } from "lucide-react";

interface ForecastDay {
  date: string;
  dayName: string;
  trainingReadiness: "optimal" | "moderate" | "low";
  energyLevel: number;
  expectedDip: { time: string; reason: string } | null;
  interventions: string[];
  confidence: number;
}

const FORECAST_DATA: ForecastDay[] = [
  {
    date: "Today",
    dayName: "Monday",
    trainingReadiness: "moderate",
    energyLevel: 72,
    expectedDip: { time: "3:00 PM", reason: "Post-lunch circadian dip" },
    interventions: ["Light cardio only", "Increase hydration"],
    confidence: 94,
  },
  {
    date: "Tomorrow",
    dayName: "Tuesday",
    trainingReadiness: "low",
    energyLevel: 58,
    expectedDip: { time: "All day", reason: "Declining recovery trend" },
    interventions: ["Rest day recommended", "Focus on recovery protocols", "Increase magnesium to 600mg"],
    confidence: 91,
  },
  {
    date: "Wed",
    dayName: "Wednesday",
    trainingReadiness: "low",
    energyLevel: 64,
    expectedDip: null,
    interventions: ["Active recovery", "Mobility work"],
    confidence: 87,
  },
  {
    date: "Thu",
    dayName: "Thursday",
    trainingReadiness: "optimal",
    energyLevel: 85,
    expectedDip: null,
    interventions: ["Peak performance window", "High-intensity training recommended"],
    confidence: 89,
  },
  {
    date: "Fri",
    dayName: "Friday",
    trainingReadiness: "optimal",
    energyLevel: 88,
    expectedDip: { time: "2:00 PM", reason: "Natural afternoon lull" },
    interventions: ["Morning training ideal", "Schedule key meetings AM"],
    confidence: 92,
  },
  {
    date: "Sat",
    dayName: "Saturday",
    trainingReadiness: "moderate",
    energyLevel: 76,
    expectedDip: null,
    interventions: ["Moderate intensity OK", "Monitor recovery"],
    confidence: 85,
  },
  {
    date: "Sun",
    dayName: "Sunday",
    trainingReadiness: "optimal",
    energyLevel: 82,
    expectedDip: null,
    interventions: ["Good for endurance work", "Prep protocols for next week"],
    confidence: 88,
  },
];

export function HealthForecast() {
  const [selectedDay, setSelectedDay] = useState<ForecastDay>(FORECAST_DATA[0]);

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
    <Card className="hover-lift">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-h4 font-semibold text-foreground">7-Day Health Forecast</h3>
            <p className="text-body-sm text-muted-foreground">AI-predicted performance windows</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Calendar Timeline */}
          <div className="grid grid-cols-7 gap-2">
            {FORECAST_DATA.map((day, index) => {
              const colors = getReadinessColor(day.trainingReadiness);
              const isSelected = selectedDay.date === day.date;
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDay(day)}
                  className={`relative overflow-hidden rounded-xl p-3 transition-all ${
                    isSelected
                      ? `${colors.bg} border-2 ${colors.border} shadow-md`
                      : "bg-pearl/30 border border-mist/30 hover:bg-pearl/50"
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-[0.6875rem] font-medium uppercase tracking-wider mb-1 ${
                      isSelected ? colors.text : "text-stone"
                    }`}>
                      {day.date}
                    </div>
                    <div className="text-caption text-ash mb-2">{day.dayName}</div>
                    <div className={`w-8 h-8 rounded-lg mx-auto flex items-center justify-center ${
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
