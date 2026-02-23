import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Cpu, Brain, Zap, Target, Cog, Users, AlertTriangle, Clock } from "lucide-react";

const industryData = {
  name: "Advanced Technology",
  slug: "advanced-technology",
  headline: "Keep deep tech teams sharp through long development cycles.",
  subheadline: "Hardware, semiconductors, and frontier technology demand sustained concentration. NeuroState helps engineering teams stay healthy and focused through demanding programmes.",
  heroStats: [
    { value: "20%", label: "Average turnover" },
    { value: "18%", label: "Productivity loss" },
    { value: "2.5x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "The demands of building complex hardware",
    paragraphs: [
      "Advanced technology teams work at the edge of what is possible. Designing complex hardware, debugging physical failures, and solving problems that nobody has solved before all require sustained concentration. This kind of work drains people in unique ways that standard office wellness programmes do not address.",
      "Long development cycles mean teams face multi-year marathons of intense focus. Unlike software that ships in sprints, hardware programmes commit people to months of pressure building towards a single deadline.",
      "Physical environments like cleanrooms and labs add to the strain. When your body is tired from standing and precise manual work, your mind suffers too. Most wellness programmes ignore this completely."
    ]
  },
  whyExistingSolutionsFail: {
    title: "Software-focused wellness does not work for hardware teams",
    failures: [
      { point: "Multi-year cycles need a different approach", explanation: "Wellness built for two-week sprints cannot address the sustained pressure of hardware development programmes." },
      { point: "Lab and cleanroom work is ignored", explanation: "The physical demands of research and manufacturing environments create compound tiredness that desk-based programmes miss entirely." },
      { point: "Complex debugging needs protected thinking time", explanation: "Finding root causes in complex physical systems requires peak mental sharpness that generic wellness tips cannot deliver." },
      { point: "Supply chain disruptions create unpredictable stress", explanation: "External dependencies cause sudden pressure spikes that cannot be planned for with traditional approaches." }
    ]
  },
  howNeuroStateApplies: {
    title: "Health tools designed for engineering environments",
    paragraphs: [
      "NeuroState provides recovery plans specifically designed for technology environments. Lab-aware recovery schedules, milestone preparation, and long-cycle sustainability address the real patterns of hardware development.",
      "Engineering leaders get visibility into how their teams are actually doing across multi-year programmes. Instead of hoping people can endure, you can see capacity and make informed decisions about pace and staffing."
    ],
    workflows: [
      { title: "Milestone preparation", description: "Build energy reserves ahead of critical development milestones like tape-outs." },
      { title: "Better debugging performance", description: "Make sure engineers are at their sharpest for complex root cause analysis sessions." },
      { title: "Lab scheduling", description: "Schedule demanding fabrication work when people are at their best." }
    ]
  },
  relevantSignals: [
    { name: "Deep focus availability", description: "Tracks how much uninterrupted concentration time engineers actually get.", importance: "Frontier engineering needs sustained focus. Fragmented time means lower quality work." },
    { name: "Lab fatigue patterns", description: "Monitors the combined physical and mental load from lab and cleanroom work.", importance: "Physical demands add to mental tiredness in ways that office work does not." },
    { name: "Deadline stress build-up", description: "Tracks how approaching deadlines affect the team's health and energy.", importance: "Hardware milestones create predictable stress peaks that can be managed proactively." }
  ],
  executiveOutcomes: [
    { title: "Fewer engineering errors", description: "Tired engineers make costly mistakes. Preventing fatigue is far cheaper than fixing hardware errors after the fact." },
    { title: "Keep your best engineers", description: "Experienced hardware engineers are nearly impossible to replace. Looking after their health protects irreplaceable expertise." },
    { title: "More predictable schedules", description: "Burnout-driven departures and errors cause delays. Managing team health improves programme predictability." }
  ],
  challenges: [
    { title: "Long development cycles", description: "Multi-year hardware programmes create sustained demands that traditional project management overlooks." },
    { title: "Physical and mental double load", description: "Lab, cleanroom, and manufacturing work adds physical strain on top of already demanding mental work." },
    { title: "Supply chain uncertainty", description: "External dependencies create sudden pressure spikes as teams respond to changing constraints." }
  ],
  capabilities: [
    { icon: Brain, title: "Protect focus time", description: "Identify and protect the best windows for complex hardware design work." },
    { icon: Cog, title: "Lab-aware recovery", description: "Recovery plans designed for the unique demands of physical research environments." },
    { icon: Target, title: "Milestone preparation", description: "Build energy reserves ahead of critical tape-outs, tests, and reviews." },
    { icon: Zap, title: "Problem-solving readiness", description: "Make sure engineers are at their best for debugging complex system failures." }
  ],
  outcomes: [
    { metric: "31%", label: "Less burnout" },
    { metric: "24%", label: "Better retention" },
    { metric: "18%", label: "Faster debugging" },
    { metric: "2.5x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Tape-out preparation", description: "Get the team ready for critical semiconductor development milestones." },
    { title: "Failure analysis", description: "Make sure engineers are sharp for complex root cause analysis sessions." },
    { title: "Cleanroom scheduling", description: "Schedule demanding fabrication work when people are at their best." },
    { title: "Design reviews", description: "Manage the mental load of intensive cross-functional review cycles." }
  ],
  defaultIndustry: "tech-hardware" as const,
};

export default function AdvancedTechnology() {
  return <IndustryPageTemplate industry={industryData} />;
}
