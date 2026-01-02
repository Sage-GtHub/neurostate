import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Shield, Brain, Clock, Target, Users, AlertTriangle } from "lucide-react";

const industryData = {
  name: "Government / Defence",
  slug: "government-defence",
  headline: "Mission-critical cognitive performance.",
  subheadline: "Public sector and defence organisations require sustained cognitive performance under unique constraints. NeuroState provides secure infrastructure for operational readiness.",
  heroStats: [
    { value: "11%", label: "Average turnover" },
    { value: "13%", label: "Productivity loss" },
    { value: "1.9x", label: "Typical ROI" },
  ],
  challenges: [
    { title: "Extended operational demands", description: "Mission requirements create sustained cognitive loads that exceed standard work patterns." },
    { title: "Security clearance stress", description: "The administrative and psychological burden of maintaining clearances adds hidden cognitive overhead." },
    { title: "Cross-agency coordination", description: "Complex multi-stakeholder environments create unique cognitive switching costs." },
  ],
  capabilities: [
    { icon: Shield, title: "Secure deployment options", description: "Air-gapped and on-premise deployment options that meet stringent security requirements." },
    { icon: Brain, title: "Operational readiness tracking", description: "Real-time visibility into team cognitive capacity for mission planning and execution." },
    { icon: Clock, title: "Shift pattern optimisation", description: "Evidence-based scheduling for 24/7 operations that minimises cognitive degradation." },
    { icon: AlertTriangle, title: "Crisis response preparation", description: "Build and maintain cognitive reserves for unpredictable high-intensity periods." },
  ],
  outcomes: [
    { metric: "27%", label: "Better readiness" },
    { metric: "19%", label: "Reduced errors" },
    { metric: "23%", label: "Faster recovery" },
    { metric: "1.9x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Operations centre staffing", description: "Optimise watch rotation patterns to maintain decision quality across extended operations." },
    { title: "Deployment preparation", description: "Build cognitive reserves ahead of demanding field assignments." },
    { title: "Inter-agency coordination", description: "Manage cognitive load of complex multi-stakeholder initiatives." },
    { title: "Leadership succession", description: "Protect institutional knowledge transfer during leadership transitions." },
  ],
  defaultIndustry: "government-defense" as const,
};

export default function GovernmentDefence() {
  return <IndustryPageTemplate industry={industryData} />;
}
