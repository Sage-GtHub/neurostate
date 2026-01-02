import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Heart, Brain, Shield, Clock, Users, AlertTriangle, Target, Activity } from "lucide-react";

const industryData = {
  name: "Healthcare",
  slug: "healthcare",
  headline: "Cognitive resilience for care delivery teams.",
  subheadline: "Healthcare professionals face unique cognitive demands: life-critical decisions, shift work, and emotional labour. NeuroState provides infrastructure to protect clinician wellbeing and patient safety.",
  heroStats: [
    { value: "19%", label: "Average turnover" },
    { value: "16%", label: "Productivity loss" },
    { value: "2.4x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "Where cognitive failure becomes patient harm",
    paragraphs: [
      "Healthcare operates in a unique cognitive environment where the stakes of underperformance are measured in patient outcomes. A fatigued nurse miscalculates a medication dosage. An exhausted surgeon's attention wanders during a critical moment. A burnt-out physician misses a diagnosis that would have been obvious under better conditions. These are not character failures; they are system failures.",
      "Shift work creates chronic circadian disruption that compounds into persistent cognitive impairment. Night shifts, rotating schedules, and extended hours all violate the biological patterns that sustain cognitive function. Healthcare has normalised schedules that would be considered dangerous in aviation or transportation.",
      "The emotional dimension adds cognitive load invisible to traditional frameworks. Compassion fatigue, moral injury from resource constraints, and the psychological weight of patient suffering all extract from the same cognitive reserve that clinical decision-making requires."
    ]
  },
  whyExistingSolutionsFail: {
    title: "Healthcare wellness has focused on resilience, not systems",
    failures: [
      { point: "Individual resilience cannot overcome systemic demands", explanation: "Training clinicians to be more resilient does not address schedules, staffing, and workloads that exceed sustainable cognitive parameters." },
      { point: "Shift work impact is accepted as inevitable", explanation: "Healthcare has normalised cognitive impairment from shift work rather than engineering schedules around actual recovery requirements." },
      { point: "Wellness stigma in medical culture", explanation: "Admitting cognitive struggle can feel career-threatening in cultures that value stoicism and endurance." },
      { point: "No connection to patient safety metrics", explanation: "Wellness programmes exist separately from quality and safety systems, missing opportunities to demonstrate direct patient impact." }
    ]
  },
  howNeuroStateApplies: {
    title: "Cognitive infrastructure for patient safety and clinician sustainability",
    paragraphs: [
      "NeuroState addresses healthcare's unique cognitive demands with shift-aware protocols, recovery tracking designed for irregular schedules, and interventions calibrated to clinical roles. The system connects cognitive state to operational decisions.",
      "Patient safety and clinician wellbeing become aligned objectives. Protecting cognitive capacity protects patients, creating organisational incentive for sustainable practices."
    ],
    workflows: [
      { title: "Shift scheduling optimisation", description: "Design rotation patterns that minimise cumulative cognitive debt whilst meeting coverage requirements." },
      { title: "Pre-procedure readiness", description: "Ensure surgical and procedural teams are operating at optimal cognitive state for complex cases." },
      { title: "ICU rotation sustainability", description: "Track cognitive impact of intensive care rotations and ensure adequate recovery between assignments." }
    ]
  },
  relevantSignals: [
    { name: "Circadian disruption markers", description: "Tracks sleep architecture and recovery patterns across shift rotations.", importance: "Shift work cognitive impact compounds over time. Early visibility enables protective scheduling." },
    { name: "Decision fatigue indicators", description: "Measures cognitive state during high-decision-density periods like morning rounds.", importance: "Clinical decisions made under fatigue show different error patterns." },
    { name: "Compassion fatigue markers", description: "Composite signal tracking emotional labour impact on cognitive capacity.", importance: "Emotional demands extract from the same cognitive reserve as clinical work." }
  ],
  executiveOutcomes: [
    { title: "Reduced preventable adverse events", description: "Cognitive fatigue contributes to medical errors. Managing cognitive capacity is patient safety infrastructure." },
    { title: "Improved clinician retention", description: "Healthcare faces critical workforce shortages. Protecting cognitive sustainability reduces the burnout driving departure." },
    { title: "Regulatory and accreditation alignment", description: "Patient safety and staff wellbeing increasingly matter in regulatory and accreditation assessments." }
  ],
  challenges: [
    { title: "Shift work cognitive disruption", description: "Rotating schedules create chronic circadian disruption that compounds into persistent cognitive impairment." },
    { title: "Decision fatigue in critical care", description: "High-stakes, high-frequency decisions deplete cognitive resources faster than standard recovery allows." },
    { title: "Moral injury and compassion fatigue", description: "Emotional burden of care creates cognitive overhead invisible to traditional wellness measures." }
  ],
  capabilities: [
    { icon: Brain, title: "Shift-aware baseline modelling", description: "Cognitive profiles that account for circadian patterns and shift rotation effects." },
    { icon: Shield, title: "Critical decision readiness", description: "Real-time visibility into cognitive state before high-stakes clinical decisions." },
    { icon: Clock, title: "Recovery protocol optimisation", description: "Evidence-based interventions calibrated for healthcare shift patterns." },
    { icon: AlertTriangle, title: "Early warning systems", description: "Identify cognitive deterioration patterns before they impact clinical performance." }
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
    { title: "Resident wellbeing", description: "Support junior doctors through demanding training periods with evidence-based cognitive support." }
  ],
  defaultIndustry: "healthcare" as const,
};

export default function Healthcare() {
  return <IndustryPageTemplate industry={industryData} />;
}