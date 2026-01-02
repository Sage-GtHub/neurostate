import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Cpu, Brain, Zap, Target, Cog, Users } from "lucide-react";

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
  challenges: [
    { title: "Long development cycles", description: "Multi-year hardware programmes create sustained cognitive demands that traditional project management ignores." },
    { title: "Physical-cognitive dual load", description: "Laboratory, cleanroom, and manufacturing environments add physical demands to already high cognitive loads." },
    { title: "Supply chain uncertainty", description: "External dependencies create unpredictable cognitive spikes as teams respond to changing constraints." },
  ],
  capabilities: [
    { icon: Brain, title: "Engineering flow protection", description: "Identify and protect optimal cognitive windows for complex hardware design work." },
    { icon: Cog, title: "Lab environment integration", description: "Protocols designed for the unique demands of physical research and development." },
    { icon: Target, title: "Milestone preparation", description: "Build cognitive reserves ahead of critical tape-outs, tests, and reviews." },
    { icon: Zap, title: "Problem-solving readiness", description: "Ensure optimal cognitive state for debugging complex system failures." },
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
    { title: "Cross-functional reviews", description: "Manage cognitive load of intensive design review cycles." },
  ],
  defaultIndustry: "tech-hardware" as const,
};

export default function AdvancedTechnology() {
  return <IndustryPageTemplate industry={industryData} />;
}
