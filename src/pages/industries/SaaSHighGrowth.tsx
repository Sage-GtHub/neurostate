import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Rocket, Brain, Users, TrendingUp, Zap, Target, Clock, AlertTriangle } from "lucide-react";

const industryData = {
  name: "SaaS - High Growth",
  slug: "saas-high-growth",
  headline: "Cognitive infrastructure for hypergrowth teams.",
  subheadline: "When velocity is everything, cognitive capacity becomes your rate limiter. NeuroState helps fast-scaling teams sustain performance without burning out.",
  heroStats: [
    { value: "18%", label: "Average turnover" },
    { value: "17%", label: "Productivity loss" },
    { value: "2.3x", label: "Typical ROI" },
  ],
  
  // Industry Problem Deep Dive
  industryProblem: {
    title: "The cognitive cost of hypergrowth",
    paragraphs: [
      "High-growth SaaS companies face a fundamental tension: the same intensity that drives rapid scaling systematically depletes the cognitive resources required to sustain it. Every sprint, every all-hands, every customer escalation extracts from a finite cognitive reserve that traditional management frameworks ignore entirely.",
      "The problem compounds in ways that are difficult to observe. A founding engineer who once shipped features in hours now takes days. A sales team that once closed deals effortlessly now struggles with objection handling. These are not motivation problems. They are cognitive capacity problems.",
      "Venture-backed growth targets create pressure cycles that are biologically unsustainable. Teams operate in perpetual sprint mode, with recovery windows treated as optional rather than essential. The result is predictable: burnout waves that coincide with critical milestones, departures of irreplaceable talent, and a gradual erosion of the velocity that defined the company's early success.",
      "Most leadership teams only recognise the problem after significant damage has occurred. By the time turnover spikes or product quality declines, the cognitive debt has been accumulating for quarters. The challenge is not awareness but visibility: there has been no infrastructure to measure, predict, or manage cognitive capacity at scale."
    ]
  },

  // Why Existing Solutions Fail
  whyExistingSolutionsFail: {
    title: "Generic wellness cannot address hypergrowth cognitive demands",
    failures: [
      {
        point: "Annual surveys miss the velocity of change",
        explanation: "High-growth environments evolve weekly. Quarterly or annual engagement surveys capture a snapshot that is outdated before results are compiled. By the time leadership acts, the team composition and challenges have already shifted."
      },
      {
        point: "One-size-fits-all programmes ignore role-specific demands",
        explanation: "The cognitive load of a platform engineer differs fundamentally from that of an account executive. Generic meditation apps and wellness stipends treat these as equivalent, failing to address the actual patterns of depletion in each role."
      },
      {
        point: "Reactive interventions arrive too late",
        explanation: "Traditional wellness responds to visible distress: absenteeism, complaints, resignations. In high-growth environments, visible distress often means the damage is already done. The most valuable interventions are preventative, not reactive."
      },
      {
        point: "No economic linkage to business outcomes",
        explanation: "Wellness programmes cannot demonstrate ROI because they operate outside the business logic. Leadership cannot prioritise cognitive health when there is no quantified connection to velocity, retention, or revenue."
      },
      {
        point: "Privacy concerns limit adoption",
        explanation: "Employees in competitive environments are reluctant to signal vulnerability. Traditional wellness tracking feels like surveillance. Without trust and privacy guarantees, the people who most need support are least likely to engage."
      },
      {
        point: "Scalability breaks at hypergrowth pace",
        explanation: "Coaching and therapy models that work for 50 people fail at 200. The operational complexity of traditional wellness scales linearly with headcount, becoming unmanageable precisely when the company needs it most."
      }
    ]
  },

  // How NeuroState Applies
  howNeuroStateApplies: {
    title: "Cognitive infrastructure that scales with your growth",
    paragraphs: [
      "NeuroState provides the measurement and intervention infrastructure that hypergrowth companies need but have never had. Rather than asking employees how they feel, we continuously measure objective signals of cognitive state: sleep architecture, heart rate variability, activity patterns, and work behaviour. This creates a real-time map of organisational cognitive capacity.",
      "The system operates at multiple levels simultaneously. Individual users receive personalised protocols calibrated to their unique patterns and the demands of their role. Managers see team-level aggregates that highlight emerging risks before they become departures. Leadership gains visibility into organisational cognitive capacity as a strategic resource.",
      "Critically, NeuroState is designed for the privacy expectations of high-performers. Individuals control their data. Team and organisational views are aggregated and anonymised. The goal is not surveillance but infrastructure: creating the visibility that enables better decisions at every level."
    ],
    workflows: [
      {
        title: "Pre-launch cognitive load modelling",
        description: "Before committing to launch timelines, model the cognitive load of the push across your team. Identify which individuals are already approaching capacity limits. Adjust scope or staffing based on actual capacity, not assumptions."
      },
      {
        title: "Sprint recovery optimisation",
        description: "After high-intensity periods, the system identifies individuals with accumulated recovery debt and surfaces targeted interventions. Rather than blanket time off, specific protocols address specific patterns of depletion."
      },
      {
        title: "Hiring velocity calibration",
        description: "As you scale rapidly, monitor the cognitive impact of onboarding on existing team members. Calibrate hiring pace to maintain productivity rather than overwhelming your most experienced contributors."
      },
      {
        title: "Investor meeting preparation",
        description: "High-stakes presentations require peak cognitive performance. The system helps founders and executives build cognitive reserves ahead of board meetings, fundraising, and critical negotiations."
      }
    ]
  },

  // Relevant Signals
  relevantSignals: [
    {
      name: "Sleep architecture",
      description: "Deep sleep duration, REM cycles, and sleep consistency measured through wearable devices. Poor sleep is the primary driver of cognitive degradation in high-intensity environments.",
      importance: "Hypergrowth cultures often normalise sleep deprivation. Tracking sleep quality surfaces the hidden cost of late nights and early meetings before it manifests as visible underperformance."
    },
    {
      name: "Heart rate variability (HRV)",
      description: "A physiological marker of nervous system balance and recovery capacity. Low HRV indicates accumulated stress and reduced cognitive resilience.",
      importance: "In sustained high-pressure environments, HRV trends predict burnout weeks before individuals become aware of it. Early warning enables preventative intervention."
    },
    {
      name: "Recovery debt accumulation",
      description: "A composite metric tracking the gap between cognitive demand and recovery over time. Like technical debt, recovery debt compounds and eventually must be repaid.",
      importance: "Sprint culture creates persistent recovery deficits. Tracking accumulation prevents the sudden crashes that occur when debt reaches critical levels."
    },
    {
      name: "Context switching frequency",
      description: "Measures how often individuals shift between distinct tasks or cognitive contexts throughout the day, derived from calendar and application data.",
      importance: "Engineers and product managers in high-growth environments are frequently interrupted. Excessive switching dramatically reduces the capacity for deep work essential to their roles."
    },
    {
      name: "Focus window availability",
      description: "Tracks the presence and duration of uninterrupted time blocks that enable deep work and complex problem-solving.",
      importance: "As companies scale, focus time naturally erodes. Monitoring this signal helps protect the cognitive conditions required for high-quality output."
    },
    {
      name: "Team synchrony patterns",
      description: "Measures alignment of cognitive peaks and troughs across teams, indicating when collaboration is most and least effective.",
      importance: "Distributed teams often schedule meetings without considering cognitive timing. Optimising synchrony improves collaboration quality without adding hours."
    }
  ],

  // Executive Outcomes
  executiveOutcomes: [
    {
      title: "Predictable velocity maintenance",
      description: "Replace the boom-bust cycle of sprint and crash with sustainable performance. Model cognitive capacity as a strategic resource that can be planned and optimised."
    },
    {
      title: "Reduced regrettable turnover",
      description: "Identify retention risks before resignation conversations. Intervene with high-potential talent when the situation is still recoverable rather than after notice has been given."
    },
    {
      title: "Quantified return on cognitive investment",
      description: "Connect wellness spending to business outcomes. Demonstrate to board and investors that human capital investments generate measurable returns in retention and productivity."
    },
    {
      title: "Due diligence readiness",
      description: "Sophisticated acquirers and investors increasingly examine organisational health. Demonstrate mature cognitive infrastructure as evidence of operational excellence."
    }
  ],

  challenges: [
    { title: "Unsustainable sprint culture", description: "Continuous sprints without recovery windows lead to cumulative cognitive debt that compounds over time, degrading both velocity and quality." },
    { title: "Invisible burnout signals", description: "High performers mask exhaustion until sudden departure. Traditional wellness tools miss the early warning signals that precede visible crisis." },
    { title: "Decision fatigue at scale", description: "Rapid growth means more decisions per person. Cognitive load increases faster than headcount, straining individual capacity." },
    { title: "Onboarding cognitive overhead", description: "Rapid hiring creates onboarding burden on existing team members, compounding their workload during already intense growth periods." },
    { title: "Remote work isolation", description: "Distributed teams lose the informal support and recovery signals that office environments naturally provide." },
    { title: "Founder cognitive bottleneck", description: "Leadership becomes the limiting factor as founders accumulate decisions faster than they can recover capacity to make them well." }
  ],
  capabilities: [
    { icon: Brain, title: "Cognitive load monitoring", description: "Real-time visibility into team cognitive capacity across product, engineering, and go-to-market functions. Track load relative to sustainable baselines." },
    { icon: Zap, title: "Recovery debt tracking", description: "Quantify accumulated fatigue and identify individuals or teams approaching critical thresholds before visible performance degradation." },
    { icon: Users, title: "Team readiness forecasting", description: "Predict capacity for upcoming sprints, launches, or high-stakes periods before commitment. Avoid oversubscription." },
    { icon: Target, title: "Intervention timing", description: "Automated recommendations for when to adjust workloads, calibrated to individual patterns rather than generic guidelines." },
    { icon: Clock, title: "Focus window protection", description: "Identify and protect optimal concentration periods across the team, reducing interruption and context switching." },
    { icon: AlertTriangle, title: "Departure risk indicators", description: "Early warning system for retention risk based on cognitive patterns that precede disengagement and resignation." }
  ],
  outcomes: [
    { metric: "47%", label: "Reduced burnout" },
    { metric: "23%", label: "Lower turnover" },
    { metric: "18%", label: "Faster recovery" },
    { metric: "2.3x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Pre-launch capacity planning", description: "Model cognitive load of upcoming product launches and proactively adjust team composition or timeline to prevent overload." },
    { title: "Post-funding sprint protection", description: "Maintain velocity after funding rounds without sacrificing team longevity. Build sustainable intensity patterns." },
    { title: "Remote team cohesion", description: "Identify isolation patterns and intervention points for distributed engineering teams. Surface hidden disconnection early." },
    { title: "Onboarding optimisation", description: "Calibrate new hire ramp-up based on individual cognitive patterns and team capacity to absorb additional coordination load." },
    { title: "Leadership resilience", description: "Protect founder and executive cognitive capacity during the most demanding phases of company building." },
    { title: "M&A preparation", description: "Ensure leadership and key contributors are operating at peak cognitive capacity during high-stakes transactions." }
  ],
  defaultIndustry: "saas-high-growth" as const,
};

export default function SaaSHighGrowth() {
  return <IndustryPageTemplate industry={industryData} />;
}