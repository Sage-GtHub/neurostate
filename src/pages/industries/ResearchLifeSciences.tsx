import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Microscope, Brain, Clock, Target, Lightbulb, Users } from "lucide-react";

const industryData = {
  name: "Research & Life Sciences",
  slug: "research-life-sciences",
  headline: "Cognitive infrastructure for discovery teams.",
  subheadline: "Breakthrough research requires sustained deep thinking. NeuroState helps R&D teams protect the cognitive conditions that enable innovation.",
  heroStats: [
    { value: "16%", label: "Average turnover" },
    { value: "18%", label: "Productivity loss" },
    { value: "2.6x", label: "Typical ROI" },
  ],
  challenges: [
    { title: "Deep work fragmentation", description: "Complex research problems require extended concentration that modern work environments systematically interrupt." },
    { title: "Publication and grant pressure", description: "Deadline-driven cycles create cognitive peaks that erode long-term research quality." },
    { title: "Experiment fatigue", description: "Laboratory work combines cognitive, physical, and emotional demands in patterns unique to research." },
  ],
  capabilities: [
    { icon: Brain, title: "Deep work optimisation", description: "Identify and protect optimal windows for complex cognitive tasks across research teams." },
    { icon: Clock, title: "Experiment scheduling", description: "Align cognitively demanding protocols with peak performance windows." },
    { icon: Target, title: "Grant cycle preparation", description: "Build cognitive reserves ahead of predictable high-intensity submission periods." },
    { icon: Lightbulb, title: "Innovation capacity tracking", description: "Monitor the cognitive conditions that correlate with creative breakthrough." },
  ],
  outcomes: [
    { metric: "29%", label: "More focus time" },
    { metric: "22%", label: "Better output" },
    { metric: "35%", label: "Reduced burnout" },
    { metric: "2.6x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Clinical trial coordination", description: "Maintain team cognitive performance across multi-year trial cycles." },
    { title: "Lab team scheduling", description: "Optimise rotation and coverage for 24/7 experimental monitoring requirements." },
    { title: "Thesis completion support", description: "Protect doctoral candidates during intensive writing and defence periods." },
    { title: "PI resilience", description: "Sustain principal investigator performance across teaching, research, and administrative demands." },
  ],
  defaultIndustry: "healthcare" as const,
};

export default function ResearchLifeSciences() {
  return <IndustryPageTemplate industry={industryData} />;
}
