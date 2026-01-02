import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { TrendingUp, Brain, AlertTriangle, Clock, Shield, BarChart3, Target, Zap } from "lucide-react";

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

  // Industry Problem Deep Dive
  industryProblem: {
    title: "Where cognitive failure becomes financial loss",
    paragraphs: [
      "Financial services operates at the intersection of high stakes and high velocity. A trading desk makes thousands of decisions daily, each carrying potential for significant gain or loss. An M&A team works hundred-hour weeks approaching close. A risk committee must synthesise complex information under time pressure. In each case, cognitive performance is not incidental to the work; it is the work.",
      "The industry has long recognised the value of cognitive performance without having infrastructure to measure or manage it. Firms invest heavily in talent acquisition, assuming that hiring the best minds solves the problem. But even exceptional minds degrade under sustained pressure. Sleep deprivation, decision fatigue, and accumulated stress erode judgment in ways that are invisible until losses materialise.",
      "The regulatory environment adds another layer of cognitive load. Compliance requirements have grown continuously since the financial crisis, creating persistent background demands that compete with core responsibilities. Every new regulation is another system to learn, another process to follow, another potential failure mode to track. This administrative cognitive burden is rarely quantified but constantly present.",
      "Traditional financial services culture compounds the problem. Long hours are worn as badges of honour. Visible exhaustion signals commitment. Taking recovery time suggests weakness. These cultural norms systematically deplete the cognitive resources that the business depends upon, creating an environment where the hardest-working people are often the most cognitively impaired."
    ]
  },

  // Why Existing Solutions Fail
  whyExistingSolutionsFail: {
    title: "Financial services wellness has been compliance theatre",
    failures: [
      {
        point: "EAP programmes address crisis, not performance",
        explanation: "Employee assistance programmes are designed for acute mental health intervention, not cognitive performance optimisation. They activate after problems become severe, far too late for preventative value."
      },
      {
        point: "Wellness offerings signal weakness in competitive cultures",
        explanation: "In environments where exhaustion signals commitment, engaging with wellness programmes can be career-limiting. The people who most need support are least likely to access it."
      },
      {
        point: "No connection between cognitive state and P&L",
        explanation: "Leadership cares about performance metrics. Wellness programmes exist in a parallel universe with no demonstrated connection to trading returns, deal outcomes, or risk management quality."
      },
      {
        point: "Annual surveys miss the cadence of financial markets",
        explanation: "Earnings seasons, quarter-end closes, and market volatility create cognitive patterns that unfold over days and weeks. Annual or quarterly surveys cannot capture these dynamics."
      },
      {
        point: "Generic interventions ignore financial services rhythms",
        explanation: "The cognitive demands of a trading desk during market opens differ fundamentally from those of a risk committee meeting. Generic wellness programmes offer the same content regardless of context."
      },
      {
        point: "Regulatory compliance has consumed wellness budgets",
        explanation: "Since 2008, compliance costs have grown dramatically. Wellness investments have not kept pace, leaving firms with increasingly underpowered programmes for increasingly demanding environments."
      }
    ]
  },

  // How NeuroState Applies
  howNeuroStateApplies: {
    title: "Decision-quality infrastructure for financial performance",
    paragraphs: [
      "NeuroState treats cognitive performance as the core asset it is in financial services. Rather than wellness as a benefit, the platform provides infrastructure for managing decision quality as a competitive advantage. The system measures objective cognitive state and correlates it with performance outcomes, creating visibility into a relationship that has always existed but never been quantified.",
      "The platform is designed for financial services privacy and performance requirements. Data sovereignty options address regulatory concerns. Integration with trading and deal management systems enables contextual recommendations. The competitive sensitivity of cognitive data is recognised and protected with enterprise-grade security.",
      "Real-time intervention distinguishes NeuroState from traditional wellness. During high-stakes periods like earnings season or deal closing, the system provides in-the-moment recommendations calibrated to individual patterns. Rather than generic advice to get more sleep, specific protocols address the actual cognitive demands of the moment."
    ],
    workflows: [
      {
        title: "Trading desk rotation optimisation",
        description: "Design trading schedules that align peak cognitive performance with market conditions. Rotate coverage to prevent cumulative fatigue during volatile periods. Track decision quality metrics alongside P&L."
      },
      {
        title: "Deal sprint cognitive protection",
        description: "During intensive deal periods, monitor team cognitive state and surface targeted interventions. Identify when fatigue threatens quality and recommend specific recovery protocols. Protect the decision-making that determines outcomes."
      },
      {
        title: "Regulatory deadline preparation",
        description: "Build cognitive reserves ahead of filing deadlines and audits. Model the cognitive load of compliance activities and distribute work to prevent quality degradation under time pressure."
      },
      {
        title: "Client presentation optimisation",
        description: "Ensure investment committee members and client-facing professionals are operating at peak cognitive capacity for high-stakes presentations. Schedule preparation and recovery around critical moments."
      }
    ]
  },

  // Relevant Signals
  relevantSignals: [
    {
      name: "Decision fatigue markers",
      description: "Physiological indicators of cognitive depletion during sustained decision-making, including HRV decline, sleep architecture changes, and attention consistency metrics.",
      importance: "Trading and investment decisions made under fatigue show measurably different characteristics. Early detection of decision fatigue enables intervention before it affects outcomes."
    },
    {
      name: "Market hours recovery patterns",
      description: "Tracks cognitive recovery during non-trading hours, including sleep quality, evening HRV, and morning readiness indicators.",
      importance: "Sustainable trading performance requires effective recovery between sessions. Many traders who appear fine during market hours are accumulating irrecoverable debt."
    },
    {
      name: "Volatility stress response",
      description: "Measures individual physiological response to market volatility events, capturing stress activation and recovery patterns during and after high-volatility periods.",
      importance: "Different individuals respond differently to volatility. Understanding individual patterns enables role assignment and support calibrated to actual stress tolerance."
    },
    {
      name: "Regulatory load accumulation",
      description: "Composite signal tracking the cognitive overhead of compliance activities, including time spent, complexity, and impact on core work capacity.",
      importance: "Compliance burden is often invisible until it manifests as performance degradation. Quantifying this load supports staffing decisions and process improvement."
    },
    {
      name: "Deal intensity cognitive impact",
      description: "Tracks cognitive markers during transaction sprints, including sleep, stress, and recovery patterns during intensive deal periods.",
      importance: "M&A and capital markets transactions create extreme cognitive demands. Visibility into impact enables protective interventions during the periods that matter most."
    },
    {
      name: "Client interaction quality indicators",
      description: "Measures cognitive state before and during client interactions, correlating with relationship outcomes and client satisfaction metrics.",
      importance: "Client relationships depend on cognitive presence and quality attention. Ensuring optimal state for critical interactions protects revenue and relationships."
    }
  ],

  // Executive Outcomes
  executiveOutcomes: [
    {
      title: "Improved risk-adjusted returns",
      description: "Decisions made under optimal cognitive conditions show different characteristics than those made under fatigue. Protecting decision quality directly affects portfolio and trading performance."
    },
    {
      title: "Reduced operational risk",
      description: "Cognitive fatigue is a contributing factor in operational failures, compliance errors, and reputational incidents. Managing cognitive capacity is risk management."
    },
    {
      title: "Senior talent retention",
      description: "Experienced professionals carry irreplaceable institutional knowledge and client relationships. Protecting their cognitive sustainability protects firm value."
    },
    {
      title: "Regulatory examination readiness",
      description: "Demonstrating systematic attention to employee cognitive health increasingly matters in regulatory examinations and stakeholder assessments."
    }
  ],

  challenges: [
    { title: "Decision fatigue in volatile markets", description: "Sustained market volatility creates chronic cognitive load that degrades judgment quality over time, often without visible warning signs." },
    { title: "Regulatory cognitive burden", description: "Increasing compliance requirements add persistent cognitive overhead that compounds with core responsibilities." },
    { title: "Peak season burnout", description: "Earnings seasons, year-end closes, and deal cycles create predictable but poorly managed cognitive peaks with lasting impact." },
    { title: "Client entertainment demands", description: "Relationship maintenance activities add cognitive load beyond core work responsibilities, particularly for senior professionals." },
    { title: "Global market coordination", description: "24-hour markets and global teams create chronic circadian disruption for professionals managing cross-timezone responsibilities." },
    { title: "Competitive culture dynamics", description: "Signalling exhaustion as commitment systematically depletes the cognitive resources that competitive advantage depends upon." }
  ],
  capabilities: [
    { icon: Brain, title: "Decision quality correlation", description: "Connect cognitive state metrics to decision outcomes for continuous performance optimisation across trading, investment, and risk functions." },
    { icon: AlertTriangle, title: "Risk-adjusted scheduling", description: "Automatically align high-stakes decisions with optimal cognitive windows based on individual and team patterns." },
    { icon: Clock, title: "Market hours optimisation", description: "Customised protocols for trading hours, deal sprints, and extended coverage periods calibrated to financial services rhythms." },
    { icon: Shield, title: "Compliance load modelling", description: "Quantify cognitive cost of regulatory requirements and optimise workflow design to minimise impact on core performance." },
    { icon: BarChart3, title: "Performance attribution", description: "Connect cognitive metrics to business outcomes, demonstrating ROI in language that resonates with financial leadership." },
    { icon: Target, title: "Client interaction preparation", description: "Ensure optimal cognitive state for high-stakes client meetings and presentations." }
  ],
  outcomes: [
    { metric: "29%", label: "Reduced errors" },
    { metric: "18%", label: "Better decisions" },
    { metric: "23%", label: "Faster recovery" },
    { metric: "2.8x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Trading desk performance", description: "Optimise trader rotation and recovery protocols to sustain decision quality across market hours and volatility events." },
    { title: "Deal team capacity", description: "Model cognitive load of concurrent transactions and prevent quality degradation on critical deals during intensive periods." },
    { title: "Audit season preparation", description: "Build cognitive reserves ahead of predictable high-intensity periods to maintain quality when it matters most." },
    { title: "Leadership resilience", description: "Protect executive cognitive capacity during high-stakes strategic periods including board meetings and regulatory examinations." },
    { title: "Risk committee effectiveness", description: "Ensure committee members are operating at optimal cognitive capacity for the complex synthesis that risk oversight requires." },
    { title: "Client relationship protection", description: "Maintain the cognitive quality required for relationship management that drives revenue and retention." }
  ],
  defaultIndustry: "financial-services" as const,
};

export default function FinancialServices() {
  return <IndustryPageTemplate industry={industryData} />;
}