import { Check, X } from "lucide-react";

export function SportsComparisonTable() {
  const features = [
    {
      category: "Approach",
      traditional: "Generic supplements and basic nutrition advice",
      neurostate: "Periodized protocols integrated with training load and competition schedule"
    },
    {
      category: "Recovery Optimization",
      traditional: "Standard post-training recovery routines",
      neurostate: "AI-adjusted protocols based on HRV, sleep, and strain data from wearables"
    },
    {
      category: "Injury Prevention",
      traditional: "Reactive: treat injuries after they occur",
      neurostate: "Proactive: real-time readiness tracking and inflammation management"
    },
    {
      category: "Performance Tracking",
      traditional: "Disconnected data from training apps and medical staff",
      neurostate: "Unified dashboard integrating Strava, TrainingPeaks, Whoop, and team systems"
    },
    {
      category: "Cognitive Performance",
      traditional: "Rarely addressed in traditional sports programs",
      neurostate: "Cognitive enhancement protocols for decision-making and focus under pressure"
    },
    {
      category: "Squad Management",
      traditional: "Manual tracking via spreadsheets and subjective reports",
      neurostate: "Real-time squad readiness dashboard for coaches and performance staff"
    },
    {
      category: "Results Timeline",
      traditional: "Gradual improvements over 3-6 months",
      neurostate: "Measurable recovery and performance gains within 2-4 weeks"
    },
    {
      category: "Cost Structure",
      traditional: "£50-80/athlete/month for basic supplements",
      neurostate: "£85-225/athlete/month with integrated performance ecosystem and proven results"
    }
  ];

  return (
    <div className="bg-pearl rounded-3xl p-10">
      <h3 className="text-2xl font-bold text-carbon mb-2">NeuroState vs Traditional Sports Nutrition</h3>
      <p className="text-sm text-stone mb-8">
        See how NeuroState's integrated performance approach compares to conventional sports supplements and nutrition programs
      </p>

      <div className="space-y-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-ivory rounded-2xl p-6">
            <div className="text-xs font-bold text-accent uppercase tracking-wider mb-4">
              {feature.category}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-stone/20 flex items-center justify-center mt-0.5">
                  <X className="w-4 h-4 text-stone" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone uppercase tracking-wider mb-1">
                    Traditional Programs
                  </div>
                  <div className="text-sm text-carbon">{feature.traditional}</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
                    NeuroState
                  </div>
                  <div className="text-sm text-carbon font-medium">{feature.neurostate}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}