import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Briefcase, Brain, Users, Calendar, Target, Award } from "lucide-react";

const industryData = {
  name: "Professional Services",
  slug: "professional-services",
  headline: "Sustainable performance for client-facing teams.",
  subheadline: "Consulting, law, and advisory firms sell cognitive output. NeuroState helps protect your most valuable asset—your people's capacity to think clearly.",
  heroStats: [
    { value: "22%", label: "Average turnover" },
    { value: "19%", label: "Productivity loss" },
    { value: "3.1x", label: "Typical ROI" },
  ],
  challenges: [
    { title: "Billable hours pressure", description: "Utilisation targets create chronic overwork patterns that degrade long-term cognitive performance and client quality." },
    { title: "Multi-client cognitive switching", description: "Context switching between engagements creates hidden cognitive costs that accumulate throughout the day." },
    { title: "Travel-induced fatigue", description: "Client site requirements create irregular schedules and recovery deficits that compound over engagements." },
  ],
  capabilities: [
    { icon: Brain, title: "Utilisation health scoring", description: "Move beyond hours-based metrics to understand true cognitive sustainability of workloads." },
    { icon: Calendar, title: "Engagement capacity modelling", description: "Predict team capacity for new engagements based on current cognitive load, not just availability." },
    { icon: Users, title: "Team composition optimisation", description: "Balance engagement staffing based on cognitive complementarity, not just skill matching." },
    { icon: Target, title: "Recovery window planning", description: "Automatically schedule cognitive recovery between high-intensity client engagements." },
  ],
  outcomes: [
    { metric: "41%", label: "Reduced turnover" },
    { metric: "27%", label: "Better utilisation" },
    { metric: "34%", label: "Client satisfaction" },
    { metric: "3.1x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Partner performance", description: "Protect senior leadership cognitive capacity during intensive business development and delivery periods." },
    { title: "Associate retention", description: "Identify early-career burnout risk and intervene before losing high-potential talent." },
    { title: "Pitch preparation", description: "Optimise team cognitive state for high-stakes client presentations." },
    { title: "Matter staffing", description: "Account for cognitive load when allocating resources across concurrent engagements." },
  ],
  defaultIndustry: "professional-services" as const,
};

export default function ProfessionalServices() {
  return <IndustryPageTemplate industry={industryData} />;
}
