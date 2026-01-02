import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Cpu, Brain, Zap, Target, Cog, Users, AlertTriangle, Clock } from "lucide-react";

const industryData = {
  name: "Advanced Technology",
  slug: "advanced-technology",
  headline: "Cognitive infrastructure for deep tech teams.",
  subheadline: "Hardware, semiconductors, and frontier technology demand sustained complex problem-solving. NeuroState helps engineering teams maintain cognitive performance through demanding development cycles.",
  heroStats: [
    { value: "20%", label: "Average turnover" },
    { value: "18%", label: "Productivity loss" },
    { value: "2.5x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "The cognitive demands of frontier engineering",
    paragraphs: [
      "Advanced technology development operates at the frontier of human cognitive capability. Designing complex hardware systems, debugging physical failures, and pushing the boundaries of what is possible all require sustained concentration and creative problem-solving that depletes cognitive resources in unique ways.",
      "Long development cycles create multi-year cognitive marathons. Unlike software that can be iterated rapidly, hardware programmes commit teams to extended periods of intense focus. A tape-out deadline creates pressure that extends for months, not days.",
      "Physical and cognitive demands compound in laboratory and manufacturing environments. Cleanroom work, prototype testing, and failure analysis all add physical demands to already intense cognitive loads."
    ]
  },
  whyExistingSolutionsFail: {
    title: "Software-centric wellness does not translate to hardware",
    failures: [
      { point: "Multi-year development cycles require different approaches", explanation: "Wellness designed for sprint-based software work cannot address the sustained intensity of hardware programmes." },
      { point: "Laboratory environments are ignored", explanation: "Physical demands of cleanroom and lab work create compound fatigue that desk-based programmes miss." },
      { point: "Debugging complex systems requires protected cognitive state", explanation: "Finding root cause in complex physical systems requires peak cognitive function that generic wellness cannot ensure." },
      { point: "Supply chain uncertainty creates unpredictable cognitive spikes", explanation: "External dependencies create stress patterns that cannot be planned for with traditional approaches." }
    ]
  },
  howNeuroStateApplies: {
    title: "Cognitive infrastructure for sustained engineering excellence",
    paragraphs: [
      "NeuroState provides protocols specifically designed for advanced technology environments. Laboratory-aware recovery, milestone preparation, and long-cycle sustainability address the actual patterns of hardware development.",
      "The system helps engineering leaders maintain team cognitive capacity across multi-year programmes. Rather than hoping teams can endure, leadership gains visibility into capacity and can make informed decisions about pace and staffing."
    ],
    workflows: [
      { title: "Tape-out preparation", description: "Build cognitive reserves ahead of critical semiconductor development milestones." },
      { title: "Failure analysis optimisation", description: "Ensure engineers are operating at peak cognitive capacity for complex root cause analysis." },
      { title: "Cleanroom scheduling", description: "Align demanding fabrication work with optimal cognitive windows." }
    ]
  },
  relevantSignals: [
    { name: "Engineering flow state availability", description: "Tracks presence of deep concentration periods required for complex design work.", importance: "Frontier engineering requires sustained focus. Fragmented time degrades output quality." },
    { name: "Laboratory fatigue patterns", description: "Monitors compound physical-cognitive load from lab and cleanroom work.", importance: "Physical demands add to cognitive load in ways that office work does not." },
    { name: "Milestone stress accumulation", description: "Tracks cognitive impact of approaching critical deadlines.", importance: "Hardware milestones create predictable stress peaks that can be managed." }
  ],
  executiveOutcomes: [
    { title: "Reduced engineering errors", description: "Cognitive fatigue contributes to design errors that are expensive to correct in hardware. Prevention is far more cost-effective." },
    { title: "Senior engineer retention", description: "Experienced hardware engineers are difficult to recruit. Protecting their cognitive sustainability protects irreplaceable capability." },
    { title: "Programme schedule reliability", description: "Burnout-driven departures and errors cause schedule slips. Cognitive management improves programme predictability." }
  ],
  challenges: [
    { title: "Long development cycles", description: "Multi-year hardware programmes create sustained cognitive demands that traditional project management ignores." },
    { title: "Physical-cognitive dual load", description: "Laboratory, cleanroom, and manufacturing environments add physical demands to already high cognitive loads." },
    { title: "Supply chain uncertainty", description: "External dependencies create unpredictable cognitive spikes as teams respond to changing constraints." }
  ],
  capabilities: [
    { icon: Brain, title: "Engineering flow protection", description: "Identify and protect optimal cognitive windows for complex hardware design work." },
    { icon: Cog, title: "Lab environment integration", description: "Protocols designed for the unique demands of physical research and development." },
    { icon: Target, title: "Milestone preparation", description: "Build cognitive reserves ahead of critical tape-outs, tests, and reviews." },
    { icon: Zap, title: "Problem-solving readiness", description: "Ensure optimal cognitive state for debugging complex system failures." }
  ],
  outcomes: [
    { metric: "31%", label: "Reduced burnout" },
    { metric: "24%", label: "Better retention" },
    { metric: "18%", label: "Faster debugging" },
    { metric: "2.5x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Tape-out preparation", description: "Optimise team cognitive state for critical semiconductor development milestones." },
    { title: "Failure analysis", description: "Ensure peak cognitive performance for complex root cause analysis sessions." },
    { title: "Cleanroom scheduling", description: "Align demanding fabrication work with optimal cognitive windows." },
    { title: "Cross-functional reviews", description: "Manage cognitive load of intensive design review cycles." }
  ],
  defaultIndustry: "tech-hardware" as const,
};

export default function AdvancedTechnology() {
  return <IndustryPageTemplate industry={industryData} />;
}