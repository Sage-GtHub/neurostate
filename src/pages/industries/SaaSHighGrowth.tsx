import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Rocket, Brain, Users, TrendingUp, Zap, Target, Clock, AlertTriangle } from "lucide-react";

const industryData = {
  name: "SaaS - High Growth",
  slug: "saas-high-growth",
  headline: "Scale fast without burning your team out.",
  subheadline: "When speed is everything, your team's health becomes the bottleneck. NeuroState helps fast-growing companies keep performing without the crash.",
  heroStats: [
    { value: "18%", label: "Average turnover" },
    { value: "17%", label: "Productivity loss" },
    { value: "2.3x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "The hidden cost of growing too fast",
    paragraphs: [
      "High-growth companies face a fundamental tension: the same intensity that drives rapid scaling drains the people who make it possible. Every sprint, every all-hands, every customer escalation takes from a limited well of energy that traditional management ignores entirely.",
      "The problem builds up invisibly. A founding engineer who once shipped features in hours now takes days. A sales team that closed deals effortlessly now struggles with objections. These are not motivation problems — they are exhaustion problems.",
      "Venture-backed growth targets create pressure cycles that people cannot sustain. Teams operate in permanent sprint mode, with recovery treated as optional. The result is predictable: waves of burnout at the worst possible moments, departures of irreplaceable people, and a gradual slowdown of the speed that made the company successful.",
    ]
  },
  whyExistingSolutionsFail: {
    title: "Generic wellness cannot keep up with hypergrowth",
    failures: [
      { point: "Annual surveys miss the pace of change", explanation: "High-growth environments change weekly. By the time survey results are compiled, the team and its problems have already shifted." },
      { point: "Same programme for everyone", explanation: "An engineer and a sales rep face completely different pressures. Generic meditation apps and gym stipends help neither of them specifically." },
      { point: "Help arrives too late", explanation: "Traditional wellness responds to visible distress. In high-growth environments, by the time someone shows distress, the damage is already done." },
      { point: "No proof it works", explanation: "Wellness programmes cannot show ROI because they operate outside business logic. Leaders cannot prioritise health when there is no link to results." },
    ]
  },
  howNeuroStateApplies: {
    title: "Health tools that scale with your growth",
    paragraphs: [
      "NeuroState measures real health signals — sleep, heart rate variability, activity, and work patterns — to build a live picture of how your team is actually doing. No surveys, no guesswork.",
      "The system works at every level. Individuals get personalised plans for their role. Managers see team-wide trends that flag risks before they become resignations. Leadership gets visibility into team health as a strategic resource.",
    ],
    workflows: [
      { title: "Pre-launch health check", description: "Before committing to launch dates, see whether your team has the energy to deliver. Adjust scope or staffing based on reality, not assumptions." },
      { title: "Sprint recovery", description: "After intense periods, the system identifies who needs recovery most and gives them specific, practical plans." },
      { title: "Hiring pace calibration", description: "Monitor the impact of rapid onboarding on existing team members. Hire at a pace your team can absorb." },
      { title: "Investor meeting preparation", description: "High-stakes presentations need sharp minds. Build energy reserves ahead of board meetings and fundraising." }
    ]
  },
  relevantSignals: [
    { name: "Sleep quality", description: "Deep sleep, REM cycles, and consistency from wearable devices.", importance: "High-growth cultures often normalise poor sleep. Tracking quality reveals the hidden cost before it becomes visible underperformance." },
    { name: "Heart rate variability (HRV)", description: "A measure of how well your body is recovering from stress.", importance: "In sustained high-pressure environments, HRV trends can predict burnout weeks before people become aware of it." },
    { name: "Recovery debt", description: "The gap between how much energy your team is spending and how much they are getting back.", importance: "Like sleep debt, recovery debt builds up over time. If it is not repaid, people crash." },
  ],
  executiveOutcomes: [
    { title: "Consistent speed", description: "Replace boom-bust sprint cycles with sustainable performance. Your team keeps delivering without the crashes." },
    { title: "Keep your best people", description: "Spot retention risks before resignation conversations. Step in while the situation is still recoverable." },
    { title: "Prove the investment works", description: "Connect health spending to business outcomes. Show your board that looking after people generates measurable returns." },
    { title: "Due diligence readiness", description: "Smart acquirers and investors look at team health. Demonstrate mature operations as evidence of a well-run company." }
  ],
  challenges: [
    { title: "Permanent sprint culture", description: "Continuous sprints without recovery lead to building exhaustion that slows everything down over time." },
    { title: "Hidden burnout", description: "High performers mask tiredness until they suddenly leave. Traditional tools miss the early warning signs." },
    { title: "Too many decisions", description: "Rapid growth means more decisions per person. The mental load grows faster than headcount." },
    { title: "Onboarding overload", description: "Rapid hiring creates extra work for existing team members, compounding their load during already intense periods." },
  ],
  capabilities: [
    { icon: Brain, title: "Team health monitoring", description: "Real-time visibility into how your team is doing across product, engineering, and go-to-market." },
    { icon: Zap, title: "Recovery tracking", description: "See who is building up exhaustion and step in before performance drops." },
    { icon: Users, title: "Team readiness forecasting", description: "Know whether your team has the energy for the next sprint or launch before you commit." },
    { icon: Target, title: "Timely recommendations", description: "Practical suggestions for when to adjust workloads, based on individual patterns." },
    { icon: Clock, title: "Focus time protection", description: "Identify and protect the best concentration windows across the team." },
    { icon: AlertTriangle, title: "Departure risk alerts", description: "Early warning when health patterns suggest someone may be about to disengage." }
  ],
  outcomes: [
    { metric: "47%", label: "Less burnout" },
    { metric: "23%", label: "Lower turnover" },
    { metric: "18%", label: "Faster recovery" },
    { metric: "2.3x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Pre-launch planning", description: "Check team energy levels before committing to product launch timelines." },
    { title: "Post-funding sprint protection", description: "Keep the pace up after funding rounds without sacrificing your team's longevity." },
    { title: "Remote team health", description: "Spot isolation and disconnection patterns in distributed teams early." },
    { title: "Leadership resilience", description: "Protect founder and executive energy during the most demanding phases of company building." },
  ],
  defaultIndustry: "saas-high-growth" as const,
};

export default function SaaSHighGrowth() {
  return <IndustryPageTemplate industry={industryData} />;
}
