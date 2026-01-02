import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Rocket, Brain, Users, TrendingUp, Zap, Target } from "lucide-react";

const industryData = {
  name: "SaaS – High Growth",
  slug: "saas-high-growth",
  headline: "Cognitive infrastructure for hypergrowth teams.",
  subheadline: "When velocity is everything, cognitive capacity becomes your rate limiter. NeuroState helps fast-scaling teams sustain performance without burning out.",
  heroStats: [
    { value: "18%", label: "Average turnover" },
    { value: "17%", label: "Productivity loss" },
    { value: "2.3x", label: "Typical ROI" },
  ],
  challenges: [
    { title: "Unsustainable sprint culture", description: "Continuous sprints without recovery windows lead to cumulative cognitive debt that compounds over time." },
    { title: "Invisible burnout signals", description: "High performers mask exhaustion until sudden departure. Traditional wellness tools miss early warning signals." },
    { title: "Decision fatigue at scale", description: "Rapid growth means more decisions per person. Cognitive load increases faster than headcount." },
  ],
  capabilities: [
    { icon: Brain, title: "Cognitive load monitoring", description: "Real-time visibility into team cognitive capacity across product, engineering, and go-to-market functions." },
    { icon: Zap, title: "Recovery debt tracking", description: "Quantify accumulated fatigue and identify individuals or teams approaching critical thresholds." },
    { icon: Users, title: "Team readiness forecasting", description: "Predict capacity for upcoming sprints, launches, or high-stakes periods before commitment." },
    { icon: Target, title: "Intervention timing", description: "Automated recommendations for when to adjust workloads, not just that adjustment is needed." },
  ],
  outcomes: [
    { metric: "47%", label: "Reduced burnout" },
    { metric: "23%", label: "Lower turnover" },
    { metric: "18%", label: "Faster recovery" },
    { metric: "2.3x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Pre-launch capacity planning", description: "Model cognitive load of upcoming product launches and proactively adjust team composition." },
    { title: "Post-funding sprint protection", description: "Maintain velocity after funding rounds without sacrificing team longevity." },
    { title: "Remote team cohesion", description: "Identify isolation patterns and intervention points for distributed engineering teams." },
    { title: "Onboarding optimisation", description: "Calibrate new hire ramp-up based on individual cognitive patterns and team capacity." },
  ],
  defaultIndustry: "saas-high-growth" as const,
};

export default function SaaSHighGrowth() {
  return <IndustryPageTemplate industry={industryData} />;
}
