import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { TrendingUp, Brain, AlertTriangle, Clock, Shield, BarChart3 } from "lucide-react";

const industryData = {
  name: "Financial Services",
  slug: "financial-services",
  headline: "Cognitive edge for high-stakes decision environments.",
  subheadline: "In financial services, cognitive performance directly impacts returns. NeuroState provides the infrastructure to sustain peak decision-making under pressure.",
  heroStats: [
    { value: "13%", label: "Average turnover" },
    { value: "14%", label: "Productivity loss" },
    { value: "2.8x", label: "Typical ROI" },
  ],
  challenges: [
    { title: "Decision fatigue in volatile markets", description: "Sustained market volatility creates chronic cognitive load that degrades judgment quality over time." },
    { title: "Regulatory cognitive burden", description: "Increasing compliance requirements add cognitive overhead that compounds with core responsibilities." },
    { title: "Peak season burnout", description: "Earnings seasons, year-end closes, and deal cycles create predictable but poorly managed cognitive peaks." },
  ],
  capabilities: [
    { icon: Brain, title: "Decision quality correlation", description: "Connect cognitive state metrics to decision outcomes for continuous performance optimisation." },
    { icon: AlertTriangle, title: "Risk-adjusted scheduling", description: "Automatically align high-stakes decisions with optimal cognitive windows." },
    { icon: Clock, title: "Market hours optimisation", description: "Customised protocols for trading hours, deal sprints, and extended coverage periods." },
    { icon: Shield, title: "Compliance load modelling", description: "Quantify cognitive cost of regulatory requirements and optimise workflow design." },
  ],
  outcomes: [
    { metric: "29%", label: "Reduced errors" },
    { metric: "18%", label: "Better decisions" },
    { metric: "23%", label: "Faster recovery" },
    { metric: "2.8x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Trading desk performance", description: "Optimise trader rotation and recovery protocols to sustain decision quality across market hours." },
    { title: "Deal team capacity", description: "Model cognitive load of concurrent transactions and prevent quality degradation on critical deals." },
    { title: "Audit season preparation", description: "Build cognitive reserves ahead of predictable high-intensity periods." },
    { title: "Leadership resilience", description: "Protect executive cognitive capacity during high-stakes strategic periods." },
  ],
  defaultIndustry: "financial-services" as const,
};

export default function FinancialServices() {
  return <IndustryPageTemplate industry={industryData} />;
}
