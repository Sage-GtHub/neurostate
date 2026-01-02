import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Building2, Brain, Shield, Scale, Clock, Users } from "lucide-react";

const industryData = {
  name: "SaaS – Enterprise",
  slug: "saas-enterprise",
  headline: "Performance infrastructure for scaled software organisations.",
  subheadline: "Enterprise software teams face unique cognitive demands—complex systems, high-stakes deployments, and cross-functional coordination. NeuroState provides the visibility to sustain excellence.",
  heroStats: [
    { value: "15%", label: "Average turnover" },
    { value: "15%", label: "Productivity loss" },
    { value: "2.1x", label: "Typical ROI" },
  ],
  challenges: [
    { title: "Cross-functional cognitive strain", description: "Enterprise deployments require coordination across product, engineering, security, and customer success—each with different cognitive demands." },
    { title: "On-call fatigue", description: "24/7 support rotations create recovery debt that compounds across quarters, degrading decision quality." },
    { title: "Technical debt stress", description: "Maintaining legacy systems whilst building new features creates chronic cognitive overload for senior engineers." },
  ],
  capabilities: [
    { icon: Brain, title: "Function-specific baselines", description: "Tailored cognitive profiles for engineering, product, and customer-facing roles with role-specific interventions." },
    { icon: Shield, title: "On-call impact analysis", description: "Quantify the true cognitive cost of support rotations and optimise scheduling for sustainable coverage." },
    { icon: Scale, title: "Workload balancing", description: "Algorithmic recommendations for task distribution based on real-time team cognitive capacity." },
    { icon: Clock, title: "Deep work protection", description: "Identify and protect optimal focus windows for complex technical work across time zones." },
  ],
  outcomes: [
    { metric: "34%", label: "Reduced burnout" },
    { metric: "19%", label: "Lower turnover" },
    { metric: "22%", label: "Better retention" },
    { metric: "2.1x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Major release preparation", description: "Model cognitive load across the release cycle and identify optimal timing for feature freezes." },
    { title: "Incident response recovery", description: "Track recovery trajectories after major incidents and ensure teams return to baseline before next high-stakes period." },
    { title: "M&A integration", description: "Monitor cognitive impact of organisational change and calibrate integration pace accordingly." },
    { title: "Platform migration", description: "Sustain team performance through multi-year infrastructure modernisation efforts." },
  ],
  defaultIndustry: "saas-enterprise" as const,
};

export default function SaaSEnterprise() {
  return <IndustryPageTemplate industry={industryData} />;
}
