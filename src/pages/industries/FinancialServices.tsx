import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { TrendingUp, Brain, AlertTriangle, Clock, Shield, BarChart3, Target, Zap } from "lucide-react";

const industryData = {
  name: "Financial Services",
  slug: "financial-services",
  headline: "Keep high-stakes decision-makers sharp under pressure.",
  subheadline: "In financial services, tired people make expensive mistakes. NeuroState helps teams sustain the sharpness that good decisions require.",
  heroStats: [
    { value: "13%", label: "Average turnover" },
    { value: "14%", label: "Productivity loss" },
    { value: "2.8x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "When tiredness becomes financial loss",
    paragraphs: [
      "Financial services operates at the intersection of high stakes and high speed. A trading desk makes thousands of decisions daily. An M&A team works hundred-hour weeks approaching close. In each case, the quality of thinking is not incidental to the work — it is the work.",
      "The industry has always known sharp minds matter, but has never had tools to measure or manage them. Firms invest heavily in hiring the best people, then subject them to conditions that systematically erode their capabilities. Sleep deprivation, decision fatigue, and accumulated stress degrade judgement in ways that are invisible until losses appear.",
      "Traditional culture makes it worse. Long hours are worn as badges of honour. Visible tiredness signals commitment. Taking recovery time suggests weakness. These norms drain the very mental resources the business depends on.",
    ]
  },
  whyExistingSolutionsFail: {
    title: "Financial services wellness has been compliance box-ticking",
    failures: [
      { point: "Employee assistance programmes address crisis, not performance", explanation: "EAPs are designed for acute mental health support, not daily performance. They activate after problems become severe — far too late." },
      { point: "Engaging with wellness signals weakness", explanation: "In competitive environments where tiredness signals commitment, using wellness programmes can feel career-limiting." },
      { point: "No link between health and financial results", explanation: "Leadership cares about performance numbers. Wellness exists in a parallel universe with no proven connection to trading returns or deal outcomes." },
      { point: "Annual surveys miss market rhythms", explanation: "Earnings seasons, quarter-end closes, and market volatility create patterns that unfold over days and weeks. Annual surveys cannot capture this." },
    ]
  },
  howNeuroStateApplies: {
    title: "Decision-quality tools for financial performance",
    paragraphs: [
      "NeuroState treats mental sharpness as the core asset it is in financial services. The platform measures real health signals and correlates them with performance outcomes, making visible a relationship that has always existed but never been measured.",
      "During high-stakes periods like earnings season or deal closing, the system provides specific support calibrated to individual patterns. Not generic advice to 'get more sleep', but practical plans that address the actual demands of the moment."
    ],
    workflows: [
      { title: "Trading desk scheduling", description: "Design trading schedules that align peak sharpness with market conditions. Rotate coverage to prevent building tiredness during volatile periods." },
      { title: "Deal sprint support", description: "During intensive deal periods, track team health and provide targeted recovery plans. Protect the decision quality that determines outcomes." },
      { title: "Regulatory deadline preparation", description: "Build energy reserves ahead of filing deadlines and audits." },
      { title: "Client presentation readiness", description: "Make sure client-facing professionals are at their sharpest for high-stakes presentations." }
    ]
  },
  relevantSignals: [
    { name: "Decision fatigue markers", description: "Health indicators that show when sustained decision-making is degrading judgement quality.", importance: "Decisions made when tired show measurably different characteristics. Early detection means better outcomes." },
    { name: "Market hours recovery", description: "How well traders and analysts recover during non-trading hours.", importance: "Sustainable trading performance requires effective recovery between sessions." },
    { name: "Volatility stress response", description: "How individuals respond physically to market volatility events.", importance: "Different people handle volatility differently. Understanding patterns enables better role assignment and support." },
  ],
  executiveOutcomes: [
    { title: "Better risk-adjusted returns", description: "Decisions made when people are sharp look different from those made when tired. Protecting decision quality directly affects performance." },
    { title: "Fewer operational errors", description: "Tiredness contributes to compliance errors and operational failures. Managing team health is risk management." },
    { title: "Keep senior talent", description: "Experienced professionals carry irreplaceable knowledge and client relationships. Protecting their health protects firm value." },
    { title: "Regulatory readiness", description: "Demonstrating systematic attention to employee health increasingly matters in regulatory examinations." }
  ],
  challenges: [
    { title: "Decision fatigue in volatile markets", description: "Sustained market volatility creates chronic mental load that degrades judgement over time, often without visible warning." },
    { title: "Regulatory burden", description: "Growing compliance requirements add persistent mental overhead on top of core responsibilities." },
    { title: "Peak season burnout", description: "Earnings seasons, year-end closes, and deal cycles create predictable but poorly managed pressure peaks." },
    { title: "Competitive culture norms", description: "Signalling tiredness as commitment systematically drains the mental resources that competitive advantage depends on." },
  ],
  capabilities: [
    { icon: Brain, title: "Decision quality tracking", description: "Connect health data to decision outcomes for continuous performance improvement across trading and investment teams." },
    { icon: AlertTriangle, title: "Smart scheduling", description: "Align high-stakes decisions with optimal sharpness windows based on individual patterns." },
    { icon: Clock, title: "Market hours support", description: "Custom recovery plans for trading hours, deal sprints, and extended coverage periods." },
    { icon: Shield, title: "Compliance load tracking", description: "See the real mental cost of regulatory requirements and design work to minimise the impact." },
    { icon: BarChart3, title: "Financial attribution", description: "Connect health data to business outcomes in language that resonates with financial leadership." },
    { icon: Target, title: "Client meeting preparation", description: "Make sure teams are at their best for high-stakes client interactions." }
  ],
  outcomes: [
    { metric: "29%", label: "Fewer errors" },
    { metric: "18%", label: "Better decisions" },
    { metric: "23%", label: "Faster recovery" },
    { metric: "2.8x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Trading desk performance", description: "Design rotation and recovery plans to sustain decision quality across market hours." },
    { title: "Deal team capacity", description: "Manage team health during concurrent transactions to prevent quality drops on critical deals." },
    { title: "Audit season preparation", description: "Build energy reserves ahead of predictable high-intensity periods." },
    { title: "Leadership resilience", description: "Protect executive sharpness during high-stakes strategic periods." },
  ],
  defaultIndustry: "financial-services" as const,
};

export default function FinancialServices() {
  return <IndustryPageTemplate industry={industryData} />;
}
