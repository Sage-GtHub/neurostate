import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Shield, Brain, Clock, Target, Users, AlertTriangle, Lock } from "lucide-react";

const industryData = {
  name: "Government / Defence",
  slug: "government-defence",
  headline: "Keep mission-critical teams ready and performing.",
  subheadline: "Public sector and defence teams need sustained sharpness under unique pressures. NeuroState provides secure health tools designed for operational environments.",
  heroStats: [
    { value: "11%", label: "Average turnover" },
    { value: "13%", label: "Productivity loss" },
    { value: "1.9x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "When tiredness becomes a mission risk",
    paragraphs: [
      "Government and defence teams work in environments where being sharp directly affects mission outcomes, public safety, and national security. Operations centres, intelligence analysis, and emergency response all depend on sustained mental readiness — regardless of external pressures.",
      "Extended operations create unique demands. Multi-day crisis response, sustained intelligence analysis, and 24/7 watch rotations push people beyond what standard work allows. Traditional wellness programmes were not built for these realities.",
      "Security requirements add invisible mental overhead. Maintaining clearances, handling compartmentalised information, and operating under strict constraints all drain energy in ways that standard frameworks miss."
    ]
  },
  whyExistingSolutionsFail: {
    title: "Government wellness programmes face unique hurdles",
    failures: [
      { point: "Security requirements limit options", explanation: "Most commercial wellness platforms cannot meet government security standards, leaving limited choices." },
      { point: "Operations always come first", explanation: "When the mission demands extended hours, wellness policies get suspended. That is appropriate — but structured recovery must follow." },
      { point: "People move between agencies", explanation: "Staff mobility across agencies disrupts any continuity in wellness support." },
      { point: "Budget cycles create stop-start patterns", explanation: "Programmes vulnerable to budget pressure get cut and restarted, undermining any lasting benefit." }
    ]
  },
  howNeuroStateApplies: {
    title: "Secure health tools for operational readiness",
    paragraphs: [
      "NeuroState offers deployment options that meet government security requirements, including air-gapped and on-premise configurations. The platform is designed for environments where team readiness is mission-critical.",
      "The system supports operational planning by showing team capacity before committing to extended operations. Leadership can understand the real cost of sustained intensity and plan recovery accordingly."
    ],
    workflows: [
      { title: "Watch rotation design", description: "Design shift patterns that keep decision quality high across extended operations." },
      { title: "Crisis response preparation", description: "Build and maintain energy reserves for unpredictable high-intensity periods." },
      { title: "Deployment preparation", description: "Make sure personnel are rested and ready for demanding field assignments." }
    ]
  },
  relevantSignals: [
    { name: "Operational readiness", description: "Tracks how prepared the team is relative to what the mission requires.", importance: "Mission success depends on readiness. Visibility means better planning." },
    { name: "Shift recovery patterns", description: "Monitors how well people recover across 24/7 watch schedules.", importance: "Extended operations create building tiredness. Tracking it enables sustainable scheduling." },
    { name: "Security clearance stress", description: "Measures the hidden mental load of maintaining clearances.", importance: "The administrative and psychological burden of clearances adds strain most people do not see." }
  ],
  executiveOutcomes: [
    { title: "Better operational readiness", description: "Keep the team sharp for mission-critical work across sustained operations." },
    { title: "Fewer errors", description: "Tired people make mistakes. Managing team health reduces operational risk." },
    { title: "Keep cleared personnel", description: "Cleared staff represent a significant investment. Protecting their health protects that investment." }
  ],
  challenges: [
    { title: "Extended operational demands", description: "Mission requirements push people beyond what standard work patterns allow." },
    { title: "Security clearance burden", description: "The administrative and psychological weight of maintaining clearances adds hidden strain." },
    { title: "Cross-agency coordination", description: "Complex multi-stakeholder environments create unique mental switching costs." }
  ],
  capabilities: [
    { icon: Shield, title: "Secure deployment", description: "Air-gapped and on-premise options that meet stringent security requirements." },
    { icon: Brain, title: "Readiness tracking", description: "Real-time visibility into team capacity for mission planning." },
    { icon: Clock, title: "Shift optimisation", description: "Evidence-based scheduling for 24/7 operations that minimises tiredness." },
    { icon: AlertTriangle, title: "Crisis preparation", description: "Build energy reserves for unpredictable high-intensity periods." }
  ],
  outcomes: [
    { metric: "27%", label: "Better readiness" },
    { metric: "19%", label: "Fewer errors" },
    { metric: "23%", label: "Faster recovery" },
    { metric: "1.9x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Operations centre staffing", description: "Design watch patterns that keep decision quality high during extended operations." },
    { title: "Deployment preparation", description: "Build energy reserves ahead of demanding field assignments." },
    { title: "Multi-agency coordination", description: "Manage the mental load of complex multi-stakeholder work." },
    { title: "Leadership transitions", description: "Protect knowledge transfer during leadership changes." }
  ],
  defaultIndustry: "government-defense" as const,
};

export default function GovernmentDefence() {
  return <IndustryPageTemplate industry={industryData} />;
}
