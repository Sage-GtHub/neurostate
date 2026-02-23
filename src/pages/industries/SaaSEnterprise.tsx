import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Building2, Brain, Shield, Scale, Clock, Users, AlertTriangle, Target } from "lucide-react";

const industryData = {
  name: "SaaS - Enterprise",
  slug: "saas-enterprise",
  headline: "Keep large software teams healthy and productive at scale.",
  subheadline: "Enterprise software teams face unique pressures: complex systems, high-stakes deployments, and endless coordination. NeuroState gives you the visibility to sustain performance without burning people out.",
  heroStats: [
    { value: "15%", label: "Average turnover" },
    { value: "15%", label: "Productivity loss" },
    { value: "2.1x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "The hidden cost of enterprise complexity",
    paragraphs: [
      "Enterprise software teams operate differently from startups. The systems are more complex, the stakes of failure are higher, and coordinating across dozens or hundreds of people creates mental demands that are invisible to traditional management.",
      "A senior engineer maintaining a legacy billing system while contributing to a platform modernisation carries mental weight that cannot be measured by story points. Holding multiple complex systems in working memory, anticipating failure modes, and coordinating with distributed teams creates persistent strain that builds over months and years.",
      "On-call rotations are a perfect example. The visible cost is the hours worked. The invisible cost is the interrupted sleep, the constant alertness even during off-hours, and the gradual exhaustion that turns engaged engineers into candidates for departure.",
    ]
  },
  whyExistingSolutionsFail: {
    title: "Enterprise wellness was not built for technical teams",
    failures: [
      { point: "Generic programmes miss technical demands", explanation: "Debugging a distributed system is nothing like other knowledge work. Meditation apps and fitness stipends do not address how technical work drains people." },
      { point: "Annual surveys miss on-call impact", explanation: "On-call creates patterns that unfold over weeks. Annual surveys cannot capture interrupted sleep, incident anxiety, or the recovery debt that builds across rotations." },
      { point: "Coordination overhead is invisible", explanation: "When an engineer sits in five cross-functional meetings in a day, the productivity cost appears nowhere. Traditional tools track hours, not exhaustion." },
      { point: "Privacy concerns stop adoption", explanation: "In competitive environments, signalling tiredness can feel career-limiting. Without strong privacy guarantees, the people who need help most will not engage." },
    ]
  },
  howNeuroStateApplies: {
    title: "Health tools designed for enterprise engineering",
    paragraphs: [
      "NeuroState understands technical work. On-call schedules, release cycles, and incident response all inform the health models. Instead of generic wellness content, teams get targeted support calibrated to their actual working patterns.",
      "The platform creates visibility at three levels. Individuals get personalised plans for their role. Managers see team-level trends without accessing individual data. Leadership gets an organisational view of team health as a strategic resource.",
    ],
    workflows: [
      { title: "Release cycle planning", description: "Before major releases, map the energy demands across the whole cycle. Spot bottlenecks and adjust staffing or timing." },
      { title: "On-call rotation design", description: "Design rotations that minimise cumulative tiredness. Balance coverage with recovery needs." },
      { title: "Post-incident recovery", description: "After major incidents, track recovery and make sure teams are properly rested before the next high-stakes period." },
      { title: "Platform migration pacing", description: "Multi-year modernisation projects drain teams. Track capacity across the migration and adjust pace to prevent mid-project burnout." }
    ]
  },
  relevantSignals: [
    { name: "On-call recovery", description: "Sleep quality and energy levels during and after on-call rotations.", importance: "On-call creates hidden tiredness that builds up over time. Visibility helps design better rotations." },
    { name: "Deep work availability", description: "How much uninterrupted focus time engineers actually get for complex technical work.", importance: "Enterprise environments naturally fragment attention. Protecting focus time protects work quality." },
    { name: "Meeting overhead", description: "The mental cost of coordination across teams and functions.", importance: "As organisations grow, meeting load grows faster than headcount. Seeing the real cost enables structural changes." },
  ],
  executiveOutcomes: [
    { title: "Fewer incidents", description: "Tired engineers make mistakes in complex systems. Keeping teams healthy directly reduces errors and outages." },
    { title: "Keep senior engineers", description: "Your most experienced engineers carry the most weight. Visibility into how they are doing means you can protect your hardest-to-replace talent." },
    { title: "Better capacity planning", description: "Move beyond headcount to understand how much complex work your team can actually sustain." },
    { title: "Smoother M&A integration", description: "Acquisitions are mentally exhausting. Visibility into the team impact helps pace integration to maintain productivity." }
  ],
  challenges: [
    { title: "Cross-functional strain", description: "Enterprise deployments need coordination across product, engineering, security, and customer success — each with different demands." },
    { title: "On-call fatigue", description: "24/7 support rotations create recovery debt that builds up over quarters, driving turnover among experienced engineers." },
    { title: "Legacy system burden", description: "Maintaining old systems while building new ones creates chronic overload for senior engineers." },
    { title: "Meeting overload", description: "As teams grow, coordination time grows even faster. Engineers spend more time in meetings, less time doing deep work." },
  ],
  capabilities: [
    { icon: Brain, title: "Role-specific health profiles", description: "Tailored support for engineering, product, and customer-facing roles based on their actual working patterns." },
    { icon: Shield, title: "On-call impact tracking", description: "See the real health cost of support rotations and design schedules for sustainable coverage." },
    { icon: Scale, title: "Workload balancing", description: "Recommendations for distributing work based on real team capacity, not just calendar availability." },
    { icon: Clock, title: "Deep work protection", description: "Identify and protect the best focus windows for complex technical work." },
    { icon: Users, title: "Coordination cost tracking", description: "Measure the real cost of cross-functional alignment and find ways to reduce it." },
    { icon: Target, title: "Release readiness check", description: "Assess team health before major deployments to inform timing decisions." }
  ],
  outcomes: [
    { metric: "34%", label: "Less burnout" },
    { metric: "19%", label: "Lower turnover" },
    { metric: "22%", label: "Better retention" },
    { metric: "2.1x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Major release preparation", description: "Check team energy before committing to release timelines and deployment windows." },
    { title: "Incident recovery", description: "Track recovery after major incidents and make sure teams are rested before the next high-stakes period." },
    { title: "M&A integration", description: "Monitor team health during organisational change and pace integration to maintain productivity." },
    { title: "On-call optimisation", description: "Design rotation schedules that balance coverage with actual recovery needs." },
  ],
  defaultIndustry: "saas-enterprise" as const,
};

export default function SaaSEnterprise() {
  return <IndustryPageTemplate industry={industryData} />;
}
