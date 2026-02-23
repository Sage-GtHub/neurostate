import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Briefcase, Brain, Users, Calendar, Target, Award, Clock, AlertTriangle } from "lucide-react";

const industryData = {
  name: "Professional Services",
  slug: "professional-services",
  headline: "Sustainable performance for client-facing teams.",
  subheadline: "Consulting, law, and advisory firms sell thinking. NeuroState helps protect your most valuable asset: your people's ability to think clearly under pressure.",
  heroStats: [
    { value: "22%", label: "Average turnover" },
    { value: "19%", label: "Productivity loss" },
    { value: "3.1x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "Your business runs on brainpower — but you are burning it out",
    paragraphs: [
      "Professional services firms have a simple business model: sell the thinking of smart people. But the industry operates as if brainpower were unlimited. An associate billing 2,400 hours a year is not 20% more valuable than one billing 2,000 — they are building up a debt of exhaustion that will show up as resignation, illness, or declining quality.",
      "Juggling multiple clients makes it worse. Most consultants and lawyers carry three, five, or seven matters at once. Every time they switch between them, they lose focus. By late afternoon, their ability to do complex work is gone — even though billable hours keep ticking.",
      "Travel adds another invisible cost. The physical tiredness, the disrupted sleep, the unfamiliar hotels — all of it takes from the same energy reserve that good work requires. A consultant's Thursday deliverable after three days of travel looks very different from one produced after proper rest.",
    ]
  },
  whyExistingSolutionsFail: {
    title: "Wellness perks cannot fix a broken workload model",
    failures: [
      { point: "Every hour on recovery is an hour not billed", explanation: "Until wellness connects to the economic model that drives behaviour, it will always come second to utilisation pressure." },
      { point: "Competitive culture discourages honesty", explanation: "In environments where only a fraction advance, admitting tiredness feels like a career risk. People mask exhaustion instead." },
      { point: "Client demands always win", explanation: "When a client requests weekend work, wellness advice to 'set boundaries' feels naive. Revenue trumps internal programmes." },
      { point: "Partners model the opposite behaviour", explanation: "Associates watch partners work constantly and conclude that sustainable practices are for people without ambition." },
    ]
  },
  howNeuroStateApplies: {
    title: "Health tools that connect to how professional services actually works",
    paragraphs: [
      "NeuroState reframes the conversation from work-life balance to sustainable performance. When health data shows that tired associates produce lower-quality work and damage client relationships, it creates a business case for sustainable practices that wellness messaging alone cannot.",
      "The platform focuses on the moments that matter. Before a big pitch, it helps the team be at their sharpest. During intensive work sprints, it keeps quality high. After travel, it speeds up recovery. This is not wellness — it is performance management.",
    ],
    workflows: [
      { title: "Staffing with real capacity in mind", description: "When scoping new work, see the actual energy levels across the team — not just who has calendar space." },
      { title: "Pitch preparation", description: "Make sure the team presenting to clients is rested, sharp, and ready to deliver their best work." },
      { title: "Travel recovery", description: "After client site travel, personalised recovery plans prevent tiredness from building up across engagements." },
      { title: "Senior leader protection", description: "Partners carry a heavy load. Protecting their energy for the highest-value activities pays dividends across the firm." }
    ]
  },
  relevantSignals: [
    { name: "Client switching frequency", description: "How often someone jumps between different client matters during the day.", importance: "Each switch costs mental energy. Seeing the real switching load reveals hidden capacity problems." },
    { name: "Travel recovery patterns", description: "How quickly someone bounces back after client site travel.", importance: "Travel affects everyone differently. Understanding personal patterns means better scheduling." },
    { name: "Workload sustainability", description: "Whether current billable hour patterns can continue without someone burning out.", importance: "High hours are not always a problem. The question is whether they are sustainable for this person right now." },
  ],
  executiveOutcomes: [
    { title: "Keep your best people", description: "The most expensive turnover is losing high-performers who are burnt out. Visibility into how people are doing means you can act before they resign." },
    { title: "Better client work", description: "Connect team health to deliverable quality and client feedback. Show that looking after people directly improves client outcomes." },
    { title: "Sustainable workloads", description: "Move beyond hours-based planning to understanding what your team can actually sustain. Better work, not just more work." },
    { title: "Protect partner productivity", description: "Senior professionals are your scarcest resource. Protecting their energy for the most important work compounds across the firm." }
  ],
  challenges: [
    { title: "Billable hours pressure", description: "Utilisation targets create chronic overwork that erodes quality over time, even when short-term numbers look healthy." },
    { title: "Multi-client juggling", description: "Switching between different engagements all day drains mental energy faster than anyone realises." },
    { title: "Travel tiredness", description: "Client site work creates irregular schedules and broken recovery patterns that build up over weeks." },
    { title: "Competitive culture", description: "Tournament structures discourage people from asking for help, causing high performers to hide exhaustion until they suddenly leave." },
  ],
  capabilities: [
    { icon: Brain, title: "Workload health scoring", description: "Understand whether current workloads are sustainable — not just whether hours look reasonable on paper." },
    { icon: Calendar, title: "Capacity-based staffing", description: "Staff engagements based on real energy levels, not just calendar availability." },
    { icon: Users, title: "Team balance", description: "Make sure work is distributed fairly and no one is quietly carrying too much." },
    { icon: Target, title: "Recovery planning", description: "Automatically identify and protect recovery time between intense client engagements." },
    { icon: Clock, title: "Travel impact tracking", description: "See the real cost of travel and build it into how you plan and schedule work." },
    { icon: AlertTriangle, title: "Retention early warning", description: "Spot the health patterns that come before someone decides to leave." }
  ],
  outcomes: [
    { metric: "41%", label: "Less turnover" },
    { metric: "27%", label: "Better utilisation" },
    { metric: "34%", label: "Client satisfaction" },
    { metric: "3.1x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Partner performance", description: "Protect senior leadership energy during intensive business development and delivery periods." },
    { title: "Associate retention", description: "Spot early-career burnout risk and step in before losing high-potential people." },
    { title: "Pitch preparation", description: "Get the team into peak condition for high-stakes client presentations." },
    { title: "Matter staffing", description: "Consider real energy levels when allocating people across concurrent engagements." },
  ],
  defaultIndustry: "professional-services" as const,
};

export default function ProfessionalServices() {
  return <IndustryPageTemplate industry={industryData} />;
}
