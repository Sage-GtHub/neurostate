import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Shield, Brain, Clock, Target, Users, AlertTriangle, Lock } from "lucide-react";

const industryData = {
  name: "Government / Defence",
  slug: "government-defence",
  headline: "Mission-critical cognitive performance.",
  subheadline: "Public sector and defence organisations require sustained cognitive performance under unique constraints. NeuroState provides secure infrastructure for operational readiness.",
  heroStats: [
    { value: "11%", label: "Average turnover" },
    { value: "13%", label: "Productivity loss" },
    { value: "1.9x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "Cognitive readiness in mission-critical environments",
    paragraphs: [
      "Government and defence organisations operate in environments where cognitive performance directly affects mission outcomes, public safety, and national security. Operations centres, intelligence analysis, and emergency response all depend on sustained cognitive readiness that must be maintained regardless of external pressures.",
      "Extended operations create unique cognitive demands. Multi-day crisis response, sustained intelligence analysis, and 24/7 watch rotations all exceed the cognitive parameters of standard work. Traditional wellness approaches do not address these operational realities.",
      "Security requirements add complexity. Personnel must maintain clearances, compartmentalise information, and operate under constraints that create persistent cognitive overhead invisible to standard frameworks."
    ]
  },
  whyExistingSolutionsFail: {
    title: "Government wellness programmes face unique constraints",
    failures: [
      { point: "Security requirements limit data solutions", explanation: "Commercial wellness platforms cannot meet government security requirements, limiting available options." },
      { point: "Operational demands override wellness policies", explanation: "When mission requires extended operations, wellness policies are suspended. This is appropriate but must be followed by structured recovery." },
      { point: "Inter-agency mobility complicates continuity", explanation: "Personnel movement across agencies disrupts wellness programme continuity." },
      { point: "Budget cycles create inconsistent support", explanation: "Wellness programmes vulnerable to budget pressure create stop-start patterns that undermine effectiveness." }
    ]
  },
  howNeuroStateApplies: {
    title: "Secure cognitive infrastructure for operational readiness",
    paragraphs: [
      "NeuroState provides deployment options that meet government security requirements, including air-gapped and on-premise configurations. The platform is designed for operational environments where cognitive readiness is mission-critical.",
      "The system supports operational planning by modelling cognitive capacity for sustained operations. Before committing to extended operations, leadership can understand the cognitive cost and plan recovery accordingly."
    ],
    workflows: [
      { title: "Operations centre watch optimisation", description: "Design watch rotation patterns that maintain cognitive readiness across extended operations." },
      { title: "Crisis response preparation", description: "Build and maintain cognitive reserves for unpredictable high-intensity periods." },
      { title: "Deployment preparation", description: "Ensure personnel are cognitively prepared for demanding field assignments." }
    ]
  },
  relevantSignals: [
    { name: "Operational readiness markers", description: "Tracks cognitive state relative to mission requirements.", importance: "Mission success depends on cognitive readiness. Visibility enables better planning." },
    { name: "Watch rotation recovery", description: "Monitors recovery patterns across 24/7 watch schedules.", importance: "Extended operations create cumulative fatigue. Tracking enables sustainable scheduling." },
    { name: "Security clearance stress patterns", description: "Measures cognitive overhead of clearance maintenance.", importance: "Clearance burden creates hidden cognitive load." }
  ],
  executiveOutcomes: [
    { title: "Improved operational readiness", description: "Maintain cognitive capacity for mission-critical functions across sustained operations." },
    { title: "Reduced error rates", description: "Cognitive fatigue contributes to operational errors. Managing capacity reduces mission risk." },
    { title: "Better retention of cleared personnel", description: "Cleared personnel represent significant investment. Protecting them protects that investment." }
  ],
  challenges: [
    { title: "Extended operational demands", description: "Mission requirements create sustained cognitive loads that exceed standard work patterns." },
    { title: "Security clearance stress", description: "The administrative and psychological burden of maintaining clearances adds hidden cognitive overhead." },
    { title: "Cross-agency coordination", description: "Complex multi-stakeholder environments create unique cognitive switching costs." }
  ],
  capabilities: [
    { icon: Shield, title: "Secure deployment options", description: "Air-gapped and on-premise deployment options that meet stringent security requirements." },
    { icon: Brain, title: "Operational readiness tracking", description: "Real-time visibility into team cognitive capacity for mission planning and execution." },
    { icon: Clock, title: "Shift pattern optimisation", description: "Evidence-based scheduling for 24/7 operations that minimises cognitive degradation." },
    { icon: AlertTriangle, title: "Crisis response preparation", description: "Build and maintain cognitive reserves for unpredictable high-intensity periods." }
  ],
  outcomes: [
    { metric: "27%", label: "Better readiness" },
    { metric: "19%", label: "Reduced errors" },
    { metric: "23%", label: "Faster recovery" },
    { metric: "1.9x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Operations centre staffing", description: "Optimise watch rotation patterns to maintain decision quality across extended operations." },
    { title: "Deployment preparation", description: "Build cognitive reserves ahead of demanding field assignments." },
    { title: "Inter-agency coordination", description: "Manage cognitive load of complex multi-stakeholder initiatives." },
    { title: "Leadership succession", description: "Protect institutional knowledge transfer during leadership transitions." }
  ],
  defaultIndustry: "government-defense" as const,
};

export default function GovernmentDefence() {
  return <IndustryPageTemplate industry={industryData} />;
}