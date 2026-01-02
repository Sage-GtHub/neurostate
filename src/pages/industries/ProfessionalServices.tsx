import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Briefcase, Brain, Users, Calendar, Target, Award, Clock, AlertTriangle } from "lucide-react";

const industryData = {
  name: "Professional Services",
  slug: "professional-services",
  headline: "Sustainable performance for client-facing teams.",
  subheadline: "Consulting, law, and advisory firms sell cognitive output. NeuroState helps protect your most valuable asset: your people's capacity to think clearly.",
  heroStats: [
    { value: "22%", label: "Average turnover" },
    { value: "19%", label: "Productivity loss" },
    { value: "3.1x", label: "Typical ROI" },
  ],

  // Industry Problem Deep Dive
  industryProblem: {
    title: "The cognitive economics of professional services",
    paragraphs: [
      "Professional services firms have a straightforward business model: sell the cognitive output of their people. Consulting deliverables, legal advice, and strategic recommendations are all products of thinking. Yet the industry operates as if cognitive capacity were infinite, extractable without limit through willpower and dedication. This fundamental error creates the turnover crisis that plagues the sector.",
      "The utilisation model is the core dysfunction. Partners track billable hours as the primary metric of value, driving behaviours that systematically deplete cognitive resources. An associate billing 2,400 hours annually is not 20% more valuable than one billing 2,000; they are accumulating cognitive debt that will manifest as departure, illness, or degraded quality. But the utilisation model cannot see this accumulation.",
      "Multi-client juggling compounds the problem. A consultant or lawyer rarely has the luxury of focusing on a single engagement. Instead, they simultaneously carry context for three, five, or seven matters, each requiring mental models, deadlines, and relationship management. Every context switch carries cognitive cost. By late afternoon, the effective capacity for complex work approaches zero, even as billable hours continue to accumulate.",
      "Travel adds another dimension invisible to traditional metrics. The physical demands of client site work, the cognitive load of unfamiliar environments, and the recovery disruption of hotels and time zones all extract from a finite reserve. A consultant's Thursday deliverable after three days of travel reflects very different cognitive conditions than the same work produced after rest and routine. Quality suffers, but the causes remain invisible."
    ]
  },

  // Why Existing Solutions Fail
  whyExistingSolutionsFail: {
    title: "Wellness cannot overcome the utilisation model",
    failures: [
      {
        point: "Utilisation incentives override wellness intentions",
        explanation: "Every hour spent on recovery is an hour not billed. Until wellness investments connect to the economic model that drives behaviour, they will remain secondary to utilisation pressure."
      },
      {
        point: "Up-or-out culture discourages vulnerability",
        explanation: "In tournament structures where only a fraction advance, admitting struggle feels like competitive disadvantage. High performers mask exhaustion rather than signal weakness."
      },
      {
        point: "Client demands override internal programmes",
        explanation: "When a client requests weekend work, wellness programme advice to set boundaries feels naive. Client relationships and revenue trump internal wellness policies."
      },
      {
        point: "Partner role modelling contradicts wellness messaging",
        explanation: "Associates observe partners working constantly and conclude that sustainable practices are for those who lack ambition. Official wellness messaging conflicts with observed success patterns."
      },
      {
        point: "Generic programmes ignore professional services rhythms",
        explanation: "The cognitive patterns of deal closing, trial preparation, or deliverable crunches follow specific rhythms. Generic wellness content addresses none of these realities."
      },
      {
        point: "No economic case for sustainable staffing",
        explanation: "Without quantified connection between cognitive sustainability and quality, there is no business case for protective staffing. Short-term margin pressure always wins."
      }
    ]
  },

  // How NeuroState Applies
  howNeuroStateApplies: {
    title: "Cognitive infrastructure that connects to the utilisation model",
    paragraphs: [
      "NeuroState addresses the core dysfunction of professional services by connecting cognitive performance to the economic model that drives behaviour. Rather than wellness as a separate initiative, the platform makes cognitive capacity visible alongside utilisation, enabling staffing and scheduling decisions that account for actual sustainable capacity.",
      "The system reframes the conversation from work-life balance to performance optimisation. Partners care about quality and client satisfaction. When cognitive data demonstrates that fatigued associates produce lower-quality work and damage client relationships, it creates business pressure for sustainable practices that wellness messaging alone cannot generate.",
      "Practical intervention focuses on the moments that matter. Before major pitch presentations, the system ensures team cognitive readiness. During intensive matter sprints, targeted protocols maintain cognitive quality. After travel or intensive periods, recovery recommendations accelerate return to baseline. This is not wellness; it is performance infrastructure."
    ],
    workflows: [
      {
        title: "Engagement staffing with cognitive capacity",
        description: "When scoping new engagements, model the cognitive load against team current capacity, not just calendar availability. Identify when adding work to already-depleted individuals threatens quality."
      },
      {
        title: "Pitch preparation optimisation",
        description: "Ensure the team presenting to potential clients is operating at peak cognitive capacity. Schedule preparation and recovery to deliver best-quality work during highest-stakes moments."
      },
      {
        title: "Travel recovery protocols",
        description: "After client site travel, surface personalised recovery recommendations based on individual patterns. Prevent the accumulation of travel debt across engagements."
      },
      {
        title: "Partner capacity protection",
        description: "Senior professionals carry disproportionate client relationship and business development load. Protect their cognitive capacity for the highest-leverage activities."
      }
    ]
  },

  // Relevant Signals
  relevantSignals: [
    {
      name: "Context switching frequency",
      description: "Measures transitions between distinct client matters or cognitive contexts throughout the day. Derived from calendar, email, and application activity patterns.",
      importance: "Professional services professionals often carry 5-10 active matters. Each switch carries cognitive cost. Quantifying switching load reveals hidden capacity constraints."
    },
    {
      name: "Travel recovery trajectory",
      description: "Tracks cognitive markers before, during, and after travel periods, identifying individual patterns of depletion and recovery from client site work.",
      importance: "Travel impact varies dramatically across individuals. Understanding personal patterns enables better scheduling and travel assignment decisions."
    },
    {
      name: "Utilisation sustainability ratio",
      description: "Compares billable hour patterns against cognitive sustainability indicators, identifying when high utilisation is creating unsustainable cognitive debt.",
      importance: "High utilisation is not inherently problematic. The question is whether it occurs within sustainable cognitive parameters. This signal answers that question."
    },
    {
      name: "Client interaction quality patterns",
      description: "Correlates cognitive state with scheduled client interactions, identifying when important meetings occur during cognitive troughs.",
      importance: "Client relationships depend on cognitive presence. Scheduling high-stakes interactions during depleted periods damages relationships that drive revenue."
    },
    {
      name: "Deep work window availability",
      description: "Measures the presence and duration of uninterrupted focus blocks required for complex deliverables, analysis, and drafting work.",
      importance: "Professional services work product requires concentrated thinking. Fragmented calendars produce fragmented work. Protecting focus windows protects quality."
    },
    {
      name: "Weekend recovery effectiveness",
      description: "Tracks whether weekends provide actual cognitive restoration or merely continued depletion through work intrusion and inadequate rest.",
      importance: "Weekend recovery is essential for sustainable weekly performance. When weekends fail to restore, weekly capacity degrades progressively."
    }
  ],

  // Executive Outcomes
  executiveOutcomes: [
    {
      title: "Reduced regrettable attrition",
      description: "The most expensive turnover is losing high-performers who are burnt out, not underperforming. Visibility into cognitive sustainability enables intervention before departure."
    },
    {
      title: "Improved quality metrics",
      description: "Connect cognitive state to deliverable quality, client feedback, and error rates. Demonstrate that cognitive investment directly affects client outcomes."
    },
    {
      title: "Sustainable utilisation models",
      description: "Move beyond hours-based metrics to capacity-based planning that accounts for actual sustainable output. Bill for value, not for cognitive extraction."
    },
    {
      title: "Partner productivity protection",
      description: "Senior professionals are the scarcest resource. Protecting their cognitive capacity for highest-value activities compounds across the firm."
    }
  ],

  challenges: [
    { title: "Billable hours pressure", description: "Utilisation targets create chronic overwork patterns that degrade long-term cognitive performance and client quality, even as short-term metrics appear healthy." },
    { title: "Multi-client cognitive switching", description: "Context switching between engagements creates hidden cognitive costs that accumulate throughout the day and across weeks." },
    { title: "Travel-induced fatigue", description: "Client site requirements create irregular schedules and recovery deficits that compound over engagements, invisible to traditional tracking." },
    { title: "Up-or-out culture pressure", description: "Tournament structures discourage vulnerability, causing high performers to mask exhaustion until sudden departure." },
    { title: "Weekend work normalisation", description: "Client demands erode recovery time, preventing the cognitive restoration required for sustained weekly performance." },
    { title: "Partner role modelling", description: "Visible partner overwork signals that sustainability is incompatible with success, undermining wellness initiatives." }
  ],
  capabilities: [
    { icon: Brain, title: "Utilisation health scoring", description: "Move beyond hours-based metrics to understand true cognitive sustainability of workloads across the firm." },
    { icon: Calendar, title: "Engagement capacity modelling", description: "Predict team capacity for new engagements based on current cognitive load, not just calendar availability." },
    { icon: Users, title: "Team composition optimisation", description: "Balance engagement staffing based on cognitive complementarity, ensuring teams can sustain intensity together." },
    { icon: Target, title: "Recovery window planning", description: "Automatically identify and protect recovery periods between high-intensity client engagements." },
    { icon: Clock, title: "Travel impact tracking", description: "Quantify the true cognitive cost of travel and build it into capacity planning and scheduling." },
    { icon: AlertTriangle, title: "Attrition risk indicators", description: "Early warning system for retention risk based on cognitive patterns that precede disengagement." }
  ],
  outcomes: [
    { metric: "41%", label: "Reduced turnover" },
    { metric: "27%", label: "Better utilisation" },
    { metric: "34%", label: "Client satisfaction" },
    { metric: "3.1x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Partner performance", description: "Protect senior leadership cognitive capacity during intensive business development and delivery periods." },
    { title: "Associate retention", description: "Identify early-career burnout risk and intervene before losing high-potential talent to competitors or industry departure." },
    { title: "Pitch preparation", description: "Optimise team cognitive state for high-stakes client presentations and new business pursuits." },
    { title: "Matter staffing", description: "Account for cognitive load when allocating resources across concurrent engagements, preventing quality degradation." },
    { title: "Trial and transaction preparation", description: "Build cognitive reserves for intensive periods and ensure sustainable performance when stakes are highest." },
    { title: "Practice group health", description: "Monitor cognitive sustainability at the practice level to identify structural issues before they manifest as attrition." }
  ],
  defaultIndustry: "professional-services" as const,
};

export default function ProfessionalServices() {
  return <IndustryPageTemplate industry={industryData} />;
}