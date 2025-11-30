import { Check, X } from "lucide-react";

export function HealthClubsComparisonTable() {
  const features = [
    {
      category: "Value Proposition",
      traditional: "Equipment access and group classes",
      neurostate: "Complete wellness ecosystem with personalised protocols and community"
    },
    {
      category: "Member Engagement",
      traditional: "Average 4-6 visits per month with declining attendance",
      neurostate: "28% increase in class attendance through integrated wellness tracking"
    },
    {
      category: "Revenue Model",
      traditional: "Membership fees only (£60-90/month)",
      neurostate: "Membership + £42/member additional monthly revenue through retail integration"
    },
    {
      category: "Retention Strategy",
      traditional: "Annual contracts with 28% churn rate",
      neurostate: "34% retention improvement through personalised member experience"
    },
    {
      category: "Differentiation",
      traditional: "Competing on price and equipment",
      neurostate: "Premium positioning with technology-driven wellness outcomes"
    },
    {
      category: "Member Experience",
      traditional: "Generic workout environment",
      neurostate: "Branded member portal with protocols, progress tracking, and challenges"
    },
    {
      category: "Results Tracking",
      traditional: "No measurement beyond attendance",
      neurostate: "Quantified wellness metrics showing member progress and engagement"
    },
    {
      category: "Implementation",
      traditional: "N/A - traditional model",
      neurostate: "Seamless integration with Mindbody, Glofox, and club management systems"
    }
  ];

  return (
    <div className="bg-pearl rounded-3xl p-10">
      <h3 className="text-2xl font-bold text-carbon mb-2">NeuroState vs Traditional Gym Model</h3>
      <p className="text-sm text-stone mb-8">
        See how NeuroState transforms your facility from a commodity gym into a premium wellness destination
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
                    Traditional Gym Model
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
                    NeuroState Partnership
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