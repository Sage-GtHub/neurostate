import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Heart, Brain, Shield, Clock, Users, AlertTriangle } from "lucide-react";

const industryData = {
  name: "Healthcare",
  slug: "healthcare",
  headline: "Cognitive resilience for care delivery teams.",
  subheadline: "Healthcare professionals face unique cognitive demands—life-critical decisions, shift work, and emotional labour. NeuroState provides infrastructure to protect clinician wellbeing and patient safety.",
  heroStats: [
    { value: "19%", label: "Average turnover" },
    { value: "16%", label: "Productivity loss" },
    { value: "2.4x", label: "Typical ROI" },
  ],
  challenges: [
    { title: "Shift work cognitive disruption", description: "Rotating schedules create chronic circadian disruption that compounds into persistent cognitive impairment." },
    { title: "Decision fatigue in critical care", description: "High-stakes, high-frequency decisions deplete cognitive resources faster than standard recovery allows." },
    { title: "Moral injury and compassion fatigue", description: "Emotional burden of care creates cognitive overhead invisible to traditional wellness measures." },
  ],
  capabilities: [
    { icon: Brain, title: "Shift-aware baseline modelling", description: "Cognitive profiles that account for circadian patterns and shift rotation effects." },
    { icon: Shield, title: "Critical decision readiness", description: "Real-time visibility into cognitive state before high-stakes clinical decisions." },
    { icon: Clock, title: "Recovery protocol optimisation", description: "Evidence-based interventions calibrated for healthcare shift patterns and demands." },
    { icon: AlertTriangle, title: "Early warning systems", description: "Identify cognitive deterioration patterns before they impact clinical performance." },
  ],
  outcomes: [
    { metric: "38%", label: "Reduced burnout" },
    { metric: "24%", label: "Better retention" },
    { metric: "31%", label: "Safer decisions" },
    { metric: "2.4x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Shift scheduling optimisation", description: "Design rotation patterns that minimise cumulative cognitive debt whilst meeting coverage requirements." },
    { title: "Surgical team preparation", description: "Ensure optimal cognitive state for complex procedures through pre-operative protocols." },
    { title: "ICU staff resilience", description: "Protect high-intensity unit teams through targeted recovery interventions." },
    { title: "Resident wellbeing", description: "Support junior doctors through demanding training periods with evidence-based cognitive support." },
  ],
  defaultIndustry: "healthcare" as const,
};

export default function Healthcare() {
  return <IndustryPageTemplate industry={industryData} />;
}
