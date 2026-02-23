import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Heart, Brain, Shield, Clock, Users, AlertTriangle, Target, Activity } from "lucide-react";

const industryData = {
  name: "Healthcare",
  slug: "healthcare",
  headline: "Protect the people who protect patients.",
  subheadline: "Healthcare professionals face unique pressures: life-critical decisions, shift work, and emotional weight. NeuroState helps protect clinician wellbeing and patient safety together.",
  heroStats: [
    { value: "19%", label: "Average turnover" },
    { value: "16%", label: "Productivity loss" },
    { value: "2.4x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "Tired clinicians put patients at risk",
    paragraphs: [
      "Healthcare is unique — the stakes of tiredness are measured in patient outcomes. A fatigued nurse miscalculates a medication dose. An exhausted surgeon's attention drifts at a critical moment. A burnt-out physician misses a diagnosis that would have been obvious on a good day. These are not character failures — they are system failures.",
      "Shift work creates chronic disruption that compounds into lasting tiredness. Night shifts, rotating schedules, and extended hours all violate the biological patterns that keep people sharp. Healthcare has normalised schedules that would be considered dangerous in aviation.",
      "The emotional weight adds another layer. Compassion fatigue, moral injury from resource constraints, and the psychological burden of patient suffering all drain the same energy reserves that clinical decision-making requires."
    ]
  },
  whyExistingSolutionsFail: {
    title: "Healthcare wellness has focused on resilience, not systems",
    failures: [
      { point: "Individual resilience cannot fix broken systems", explanation: "Training clinicians to be tougher does not fix schedules, staffing, and workloads that exceed what people can sustain." },
      { point: "Shift work damage is accepted as inevitable", explanation: "Healthcare has normalised tiredness from shift work rather than designing schedules around actual recovery needs." },
      { point: "Admitting tiredness feels career-threatening", explanation: "In cultures that value stoicism, asking for help can feel like a professional risk." },
      { point: "No link to patient safety data", explanation: "Wellness programmes exist separately from quality and safety systems, missing the chance to show that healthier staff means safer patients." }
    ]
  },
  howNeuroStateApplies: {
    title: "Health tools that protect both staff and patients",
    paragraphs: [
      "NeuroState addresses healthcare's unique demands with shift-aware recovery plans, tracking designed for irregular schedules, and support calibrated to clinical roles.",
      "Patient safety and staff wellbeing become aligned goals. Protecting team health protects patients, creating organisational motivation for sustainable practices."
    ],
    workflows: [
      { title: "Shift scheduling", description: "Design rotation patterns that minimise building tiredness while meeting coverage requirements." },
      { title: "Pre-procedure readiness", description: "Make sure surgical and procedural teams are at their sharpest for complex cases." },
      { title: "ICU rotation sustainability", description: "Track the health impact of intensive care rotations and ensure proper recovery between assignments." }
    ]
  },
  relevantSignals: [
    { name: "Shift recovery patterns", description: "How well people recover between shift rotations.", importance: "Shift work tiredness builds up over time. Early visibility enables protective scheduling." },
    { name: "Decision fatigue indicators", description: "Health state during high-decision periods like morning rounds.", importance: "Clinical decisions made when tired show different error patterns." },
    { name: "Compassion fatigue markers", description: "The impact of emotional demands on energy and sharpness.", importance: "Emotional demands drain the same reserves as clinical decision-making." }
  ],
  executiveOutcomes: [
    { title: "Fewer preventable errors", description: "Tiredness contributes to medical errors. Managing staff health is patient safety infrastructure." },
    { title: "Better clinician retention", description: "Healthcare faces critical workforce shortages. Protecting staff health reduces the burnout driving departures." },
    { title: "Regulatory and accreditation alignment", description: "Patient safety and staff wellbeing increasingly matter in regulatory and accreditation assessments." }
  ],
  challenges: [
    { title: "Shift work disruption", description: "Rotating schedules create chronic tiredness that compounds into lasting impairment." },
    { title: "Decision fatigue in critical care", description: "High-stakes, high-frequency decisions drain energy faster than normal recovery allows." },
    { title: "Emotional weight", description: "The burden of caring creates hidden tiredness that traditional wellness measures miss." }
  ],
  capabilities: [
    { icon: Brain, title: "Shift-aware health profiles", description: "Health tracking that accounts for shift patterns and their effects on recovery." },
    { icon: Shield, title: "Clinical readiness checks", description: "Visibility into team health before high-stakes clinical decisions." },
    { icon: Clock, title: "Recovery plan optimisation", description: "Evidence-based recovery support designed for healthcare shift patterns." },
    { icon: AlertTriangle, title: "Early warning systems", description: "Spot tiredness patterns before they affect clinical performance." }
  ],
  outcomes: [
    { metric: "38%", label: "Less burnout" },
    { metric: "24%", label: "Better retention" },
    { metric: "31%", label: "Safer decisions" },
    { metric: "2.4x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Shift scheduling", description: "Design rotation patterns that minimise tiredness while meeting coverage needs." },
    { title: "Surgical team preparation", description: "Make sure the team is at their best for complex procedures." },
    { title: "ICU staff support", description: "Protect high-intensity unit teams with targeted recovery plans." },
    { title: "Resident wellbeing", description: "Support junior doctors through demanding training periods." }
  ],
  defaultIndustry: "healthcare" as const,
};

export default function Healthcare() {
  return <IndustryPageTemplate industry={industryData} />;
}
