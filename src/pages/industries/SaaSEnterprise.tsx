import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Building2, Brain, Shield, Scale, Clock, Users, AlertTriangle, Target } from "lucide-react";

const industryData = {
  name: "SaaS - Enterprise",
  slug: "saas-enterprise",
  headline: "Performance infrastructure for scaled software organisations.",
  subheadline: "Enterprise software teams face unique cognitive demands: complex systems, high-stakes deployments, and cross-functional coordination. NeuroState provides the visibility to sustain excellence at scale.",
  heroStats: [
    { value: "15%", label: "Average turnover" },
    { value: "15%", label: "Productivity loss" },
    { value: "2.1x", label: "Typical ROI" },
  ],

  // Industry Problem Deep Dive
  industryProblem: {
    title: "The hidden cost of enterprise complexity",
    paragraphs: [
      "Enterprise SaaS organisations operate in a fundamentally different cognitive environment from their high-growth counterparts. The systems are more complex, the stakes of failure are higher, and the coordination requirements span dozens or hundreds of people. This complexity creates cognitive demands that are invisible to traditional management but profoundly affect performance.",
      "A senior engineer maintaining a legacy billing system whilst contributing to a platform modernisation carries cognitive load that cannot be measured by lines of code or story points. The mental overhead of holding multiple complex systems in working memory, anticipating failure modes, and coordinating with distributed teams creates persistent strain that erodes over quarters and years.",
      "On-call rotations exemplify the problem. The visible cost is the hours worked. The invisible cost is the recovery debt accumulated from interrupted sleep, the cognitive vigilance that persists even during off hours, and the gradual depletion that transforms engaged engineers into candidates for departure. Most organisations have no visibility into this accumulation until experienced contributors leave.",
      "Cross-functional coordination adds another layer. Enterprise deployments require alignment across engineering, product, security, compliance, and customer success. Each interaction carries cognitive overhead. As organisations grow, this overhead scales super-linearly: more people means exponentially more coordination, not just linear increases in capacity."
    ]
  },

  // Why Existing Solutions Fail
  whyExistingSolutionsFail: {
    title: "Enterprise wellness programmes were not built for technical complexity",
    failures: [
      {
        point: "Generic programmes ignore technical cognitive demands",
        explanation: "The cognitive load of debugging a distributed system differs categorically from other knowledge work. Enterprise wellness programmes offer meditation and fitness stipends, but these do not address the specific patterns of depletion that technical work creates."
      },
      {
        point: "Annual engagement surveys miss on-call impact",
        explanation: "On-call rotations create cognitive patterns that unfold over weeks and months. Annual surveys cannot capture the accumulation of interrupted sleep, the anxiety of potential incidents, or the recovery debt that compounds across rotations."
      },
      {
        point: "No visibility into cross-functional cognitive cost",
        explanation: "Coordination overhead is invisible to traditional management. When an engineer attends five cross-functional meetings in a day, the productivity cost appears on no dashboard. Traditional tools track hours, not cognitive depletion."
      },
      {
        point: "One-size-fits-all interventions fail specialised roles",
        explanation: "A platform engineer, a security specialist, and a customer success manager face entirely different cognitive demands. Generic wellness offerings treat them as interchangeable, missing the opportunity for targeted, effective intervention."
      },
      {
        point: "No integration with technical workflows",
        explanation: "Enterprise engineers live in Jira, Slack, and their IDEs. Wellness programmes that exist in separate applications fail to integrate with actual work patterns and therefore fail to influence them."
      },
      {
        point: "Privacy concerns are amplified in enterprise environments",
        explanation: "In competitive enterprise environments, signalling stress or fatigue can feel career-limiting. Without robust privacy guarantees, the people who most need support are least likely to engage with wellness tracking."
      }
    ]
  },

  // How NeuroState Applies
  howNeuroStateApplies: {
    title: "Cognitive infrastructure designed for enterprise technical operations",
    paragraphs: [
      "NeuroState addresses the specific cognitive demands of enterprise software organisations with infrastructure that understands technical work. Rather than generic wellness content, the system provides targeted interventions calibrated to the patterns of engineering, product, and customer-facing roles. On-call schedules, release cycles, and incident response all inform the cognitive models.",
      "The platform creates visibility at three levels. Individual contributors receive personalised protocols that account for their role, their current load, and their recovery patterns. Managers see team-level aggregates that highlight emerging risks without exposing individual data. Leadership gains organisational visibility into cognitive capacity as a strategic resource that can be planned and optimised.",
      "Integration with enterprise workflows is fundamental. NeuroState connects with the tools teams actually use: calendar systems, on-call rotations, deployment pipelines. This integration enables proactive recommendations. Before assigning an engineer to on-call during a major release, the system can surface potential cognitive conflicts."
    ],
    workflows: [
      {
        title: "Release cycle cognitive mapping",
        description: "Before major releases, map the cognitive load across the entire cycle: development, testing, staging, and post-deployment monitoring. Identify potential bottlenecks and adjust staffing or timing accordingly."
      },
      {
        title: "On-call rotation optimisation",
        description: "Design rotation schedules that minimise cumulative cognitive impact. Balance coverage requirements with recovery needs. Track the true cost of on-call and build it into capacity planning."
      },
      {
        title: "Incident response recovery",
        description: "After major incidents, monitor recovery trajectories for responding engineers. Ensure adequate cognitive restoration before the next high-stakes period. Prevent the cascade of incidents that often follows unrecovered teams."
      },
      {
        title: "Platform migration sustainability",
        description: "Multi-year infrastructure modernisation projects create sustained cognitive demands. Track team capacity across the migration lifecycle and calibrate pace to prevent mid-project burnout."
      }
    ]
  },

  // Relevant Signals
  relevantSignals: [
    {
      name: "On-call recovery patterns",
      description: "Tracks sleep quality, HRV, and cognitive markers during and after on-call rotations. Identifies individuals accumulating recovery debt from interrupted sleep and sustained vigilance.",
      importance: "On-call creates hidden cognitive costs that compound over time. Visibility into recovery patterns enables rotation optimisation and prevents the burnout that drives experienced engineers to leave."
    },
    {
      name: "Deep work availability",
      description: "Measures the presence and duration of uninterrupted focus blocks essential for complex technical work. Derived from calendar analysis and application context switching.",
      importance: "Enterprise environments naturally fragment attention. Protecting deep work windows is essential for the complex problem-solving that enterprise systems require."
    },
    {
      name: "Cross-functional coordination load",
      description: "Quantifies the cognitive overhead of meetings, communications, and alignment activities across teams and functions.",
      importance: "As organisations scale, coordination overhead grows super-linearly. Visibility into this load enables structural interventions that reduce cognitive tax without sacrificing alignment."
    },
    {
      name: "Deployment stress markers",
      description: "Physiological indicators of stress during and around major deployments, including HRV changes, sleep disruption, and recovery patterns post-release.",
      importance: "Release cycles create predictable stress peaks. Understanding individual and team responses enables better scheduling and support during high-stakes periods."
    },
    {
      name: "Technical debt cognitive burden",
      description: "Composite signal tracking the mental overhead of working with legacy systems, including context switching frequency and sustained attention demands.",
      importance: "Technical debt creates invisible cognitive load beyond the time spent on maintenance. Quantifying this burden supports investment decisions in modernisation."
    },
    {
      name: "Team cognitive synchrony",
      description: "Measures alignment of cognitive peaks across team members, indicating optimal windows for collaborative work versus individual focus time.",
      importance: "Distributed teams often schedule collaboration during cognitive troughs. Optimising synchrony improves meeting quality and preserves focus time."
    }
  ],

  // Executive Outcomes
  executiveOutcomes: [
    {
      title: "Reduced incident frequency",
      description: "Cognitive fatigue is a leading cause of incidents in complex systems. Maintaining cognitive capacity across operations teams directly reduces error rates and system failures."
    },
    {
      title: "Improved senior engineer retention",
      description: "The most experienced engineers carry disproportionate cognitive load. Visibility into their capacity enables targeted protection of your most valuable and hardest-to-replace talent."
    },
    {
      title: "Accurate capacity planning",
      description: "Move beyond headcount-based planning to true capacity modelling. Understand how much complex work your organisation can actually sustain, not just how many people are employed."
    },
    {
      title: "M&A integration success",
      description: "Acquisitions create massive cognitive disruption. Visibility into the cognitive impact of integration enables calibrated pacing that protects productivity through transitions."
    }
  ],

  challenges: [
    { title: "Cross-functional cognitive strain", description: "Enterprise deployments require coordination across product, engineering, security, and customer success, each with different cognitive demands and recovery patterns." },
    { title: "On-call fatigue", description: "24/7 support rotations create recovery debt that compounds across quarters, degrading decision quality and driving turnover among experienced engineers." },
    { title: "Technical debt stress", description: "Maintaining legacy systems whilst building new features creates chronic cognitive overload for senior engineers who must hold multiple complex systems in working memory." },
    { title: "Meeting proliferation", description: "As organisations grow, coordination overhead scales super-linearly. Engineers spend increasing time in meetings, fragmenting focus and depleting cognitive resources." },
    { title: "Incident response burden", description: "Major incidents create acute cognitive stress that requires significant recovery. Without visibility, teams return to high-stakes work before cognitive restoration is complete." },
    { title: "Knowledge concentration risk", description: "Critical system knowledge often concentrates in individuals carrying unsustainable cognitive loads. Their departure creates knowledge loss and operational risk." }
  ],
  capabilities: [
    { icon: Brain, title: "Function-specific baselines", description: "Tailored cognitive profiles for engineering, product, and customer-facing roles with role-specific interventions calibrated to their unique patterns of work and depletion." },
    { icon: Shield, title: "On-call impact analysis", description: "Quantify the true cognitive cost of support rotations and optimise scheduling for sustainable coverage without hidden capacity costs." },
    { icon: Scale, title: "Workload balancing", description: "Algorithmic recommendations for task distribution based on real-time team cognitive capacity, not just availability in calendars." },
    { icon: Clock, title: "Deep work protection", description: "Identify and protect optimal focus windows for complex technical work across time zones and team configurations." },
    { icon: Users, title: "Coordination overhead tracking", description: "Measure the cognitive cost of cross-functional alignment and surface opportunities to reduce tax without sacrificing outcomes." },
    { icon: Target, title: "Release readiness assessment", description: "Evaluate team cognitive state before major deployments to inform timing and risk decisions." }
  ],
  outcomes: [
    { metric: "34%", label: "Reduced burnout" },
    { metric: "19%", label: "Lower turnover" },
    { metric: "22%", label: "Better retention" },
    { metric: "2.1x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Major release preparation", description: "Model cognitive load across the release cycle and identify optimal timing for feature freezes and deployment windows." },
    { title: "Incident response recovery", description: "Track recovery trajectories after major incidents and ensure teams return to baseline before next high-stakes period." },
    { title: "M&A integration", description: "Monitor cognitive impact of organisational change and calibrate integration pace to maintain productivity through transition." },
    { title: "Platform migration", description: "Sustain team performance through multi-year infrastructure modernisation efforts with visibility into long-term cognitive sustainability." },
    { title: "On-call optimisation", description: "Design rotation schedules that balance coverage requirements with cognitive recovery needs based on actual impact data." },
    { title: "Technical leadership resilience", description: "Protect architects and principal engineers whose cognitive capacity is essential to system stability and team effectiveness." }
  ],
  defaultIndustry: "saas-enterprise" as const,
};

export default function SaaSEnterprise() {
  return <IndustryPageTemplate industry={industryData} />;
}