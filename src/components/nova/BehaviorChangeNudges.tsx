import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, X, CheckCircle, Clock, Calendar } from "lucide-react";

interface Nudge {
  id: string;
  title: string;
  message: string;
  type: "reminder" | "suggestion" | "warning";
  time: string;
  completed: boolean;
}

export function BehaviorChangeNudges() {
  const [activeNudges, setActiveNudges] = useState<Nudge[]>([
    {
      id: "1",
      title: "Evening Protocol Reminder",
      message: "Take Magnesium Complex 400mg. Based on your sleep patterns, this timing optimises overnight recovery.",
      type: "reminder",
      time: "7:30 PM",
      completed: false
    },
    {
      id: "2",
      title: "Hydration Check",
      message: "Your HRV dropped 5% today. Increasing water intake by 500ml may help recovery.",
      type: "suggestion",
      time: "3:00 PM",
      completed: false
    },
    {
      id: "3",
      title: "Screen Time Alert",
      message: "Screens after 9pm reduce sleep quality by 23%. Consider blue light filters or earlier screen cutoff.",
      type: "warning",
      time: "8:45 PM",
      completed: false
    }
  ]);

  const handleComplete = (id: string) => {
    setActiveNudges(nudges => 
      nudges.map(nudge => 
        nudge.id === id ? { ...nudge, completed: true } : nudge
      )
    );
    
    setTimeout(() => {
      setActiveNudges(nudges => nudges.filter(nudge => nudge.id !== id));
    }, 500);
  };

  const handleDismiss = (id: string) => {
    setActiveNudges(nudges => nudges.filter(nudge => nudge.id !== id));
  };

  const getNudgeIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Bell className="w-5 h-5 text-carbon" />;
      case "suggestion":
        return <Clock className="w-5 h-5 text-[#10b981]" />;
      case "warning":
        return <Calendar className="w-5 h-5 text-ash" />;
      default:
        return <Bell className="w-5 h-5 text-carbon" />;
    }
  };

  const getNudgeBg = (type: string) => {
    switch (type) {
      case "reminder":
        return "bg-carbon/5";
      case "suggestion":
        return "bg-[#10b981]/5";
      case "warning":
        return "bg-ash/5";
      default:
        return "bg-pearl/30";
    }
  };

  const getNudgeBorder = (type: string) => {
    switch (type) {
      case "reminder":
        return "border-carbon/20";
      case "suggestion":
        return "border-[#10b981]/20";
      case "warning":
        return "border-ash/20";
      default:
        return "border-mist/30";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[1.5rem] font-semibold text-carbon tracking-tight mb-2">Behaviour Change Nudges</h2>
        <p className="text-sm text-ash leading-relaxed">
          Timely reminders and suggestions based on your goals and patterns
        </p>
      </div>

      {activeNudges.length > 0 ? (
        <div className="space-y-4">
          {activeNudges.map((nudge, index) => (
            <Card 
              key={nudge.id}
              className={`border-mist/30 hover:border-mist transition-all hover:shadow-md group animate-fade-in ${getNudgeBorder(nudge.type)} ${
                nudge.completed ? "opacity-50" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${getNudgeBg(nudge.type)}`}>
                    {getNudgeIcon(nudge.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-body font-semibold text-carbon">{nudge.title}</h3>
                          <span className="text-xs font-medium text-ash px-2 py-1 rounded-full bg-pearl/50">
                            {nudge.time}
                          </span>
                        </div>
                        <p className="text-sm text-ash leading-relaxed">
                          {nudge.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => handleComplete(nudge.id)}
                        className="gap-2"
                        disabled={nudge.completed}
                      >
                        {nudge.completed ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Completed</span>
                          </>
                        ) : (
                          <span>Mark Complete</span>
                        )}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDismiss(nudge.id)}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Dismiss</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-mist/30">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pearl to-mist mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[#10b981]" />
            </div>
            <p className="text-body text-ash mb-2">All caught up</p>
            <p className="text-sm text-ash">
              No active nudges right now. Check back later for personalised recommendations.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="border-carbon/10 bg-gradient-to-br from-pearl/50 to-mist/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-carbon flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-carbon font-medium mb-1">Smart Timing</p>
              <p className="text-sm text-ash leading-relaxed">
                Nudges are delivered at optimal moments based on your routine and biometric patterns. You can customise notification preferences in settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
