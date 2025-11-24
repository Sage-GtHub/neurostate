import { Check, X } from "lucide-react";

export function CorporateComparisonTable() {
  const features = [
    {
      category: "Approach",
      traditional: "Generic wellness perks (gym memberships, meditation apps)",
      neurostate: "Personalized cognitive enhancement and recovery protocols"
    },
    {
      category: "Measurement",
      traditional: "Participation rates and satisfaction surveys",
      neurostate: "Real-time cognitive performance, burnout metrics, and productivity tracking"
    },
    {
      category: "Personalization",
      traditional: "One-size-fits-all wellness programs",
      neurostate: "AI-driven individual protocols based on role, stress, and sleep data"
    },
    {
      category: "Integration",
      traditional: "Separate apps with low adoption (typically 15-25%)",
      neurostate: "Built into Slack/Teams workflows with 70%+ adoption"
    },
    {
      category: "Results Timeline",
      traditional: "6-12 months to see marginal improvements",
      neurostate: "Measurable cognitive gains within 4-6 weeks"
    },
    {
      category: "ROI Tracking",
      traditional: "Difficult to measure business impact",
      neurostate: "Direct correlation to productivity, retention, and healthcare cost reduction"
    },
    {
      category: "Employee Focus",
      traditional: "Reactive: address burnout after it happens",
      neurostate: "Proactive: optimize performance and prevent burnout"
    },
    {
      category: "Cost Structure",
      traditional: "£20-35/employee/month for low-engagement programs",
      neurostate: "£45-125/employee/month with proven ROI and high engagement"
    }
  ];

  return (
    <div className="bg-pearl rounded-3xl p-10">
      <h3 className="text-2xl font-bold text-carbon mb-2">NeuroState vs Traditional Wellness</h3>
      <p className="text-sm text-stone mb-8">
        See how NeuroState's performance-first approach compares to conventional corporate wellness programs
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
                    Traditional Wellness
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