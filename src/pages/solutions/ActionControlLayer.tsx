import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, ArrowRight, Zap, User, Users, Bell, Clock, MessageSquare, Calendar, Target, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const actionCategories = [
  {
    icon: User,
    title: "Personal Coaching Prompts",
    target: "Individual",
    description: "Timely, contextual nudges that guide individuals toward better decisions. These aren't generic wellness tips—they're calibrated to your current state, your patterns, and your upcoming demands.",
    examples: [
      { trigger: "Low readiness + high-stakes meeting", action: "Suggest rescheduling or preparation strategy" },
      { trigger: "Accumulated recovery debt", action: "Recommend specific recovery protocol" },
      { trigger: "Peak focus window approaching", action: "Prompt to block time for deep work" },
      { trigger: "Pattern of late-night work", action: "Surface correlation with next-day performance" },
    ],
    mechanism: "Prompts are delivered through the NeuroState app at moments of maximum impact. Timing is personalised based on when you're most receptive to coaching."
  },
  {
    icon: Clock,
    title: "Workload Timing Recommendations",
    target: "Individual & Team",
    description: "Suggestions for when to schedule high-stakes work based on predicted cognitive capacity. Not just 'take a break'—specific guidance on optimal timing for different types of work.",
    examples: [
      { trigger: "Complex decision required", action: "Schedule for predicted peak readiness window" },
      { trigger: "Creative work needed", action: "Block time when cognitive load is lowest" },
      { trigger: "High-pressure deadline", action: "Map recovery windows around intensity" },
      { trigger: "Cross-timezone collaboration", action: "Find overlap windows that minimise fatigue" },
    ],
    mechanism: "Recommendations integrate with calendar systems. You see not just when you're available, but when you'll be cognitively optimal."
  },
  {
    icon: Users,
    title: "Manager Nudges",
    target: "Team Leads",
    description: "Alerts when team members may need support—without exposing individual data. Managers see risk signals and suggested actions, not personal details. Privacy is preserved while enabling intervention.",
    examples: [
      { trigger: "Team member approaching burnout threshold", action: "Private nudge to check in" },
      { trigger: "Workload imbalance detected", action: "Suggest redistribution strategy" },
      { trigger: "Recovery debt rising across team", action: "Recommend team-level intervention" },
      { trigger: "Pre-deadline capacity risk", action: "Alert to adjust scope or timeline" },
    ],
    mechanism: "Nudges appear in the manager dashboard with suggested talking points. Conversation guidance helps managers act without awkward surveillance."
  },
  {
    icon: AlertTriangle,
    title: "Preventative Interventions",
    target: "Organisation",
    description: "Early warnings that prevent breakdown before it happens—not after. Systemic interventions that address root causes rather than symptoms. This is where NeuroState prevents problems rather than documenting them.",
    examples: [
      { trigger: "Department-wide stress pattern", action: "Recommend policy adjustment" },
      { trigger: "Seasonal burnout risk rising", action: "Suggest proactive recovery measures" },
      { trigger: "Post-acquisition integration stress", action: "Flag for leadership attention" },
      { trigger: "Meeting culture degradation", action: "Surface data to inform cultural change" },
    ],
    mechanism: "Interventions are surfaced to People team and leadership with full context. ROI projections show expected value of each intervention."
  },
];

const interventionPrinciples = [
  { title: "Low friction", description: "Actions should be easy to take. If an intervention requires significant effort, it won't happen." },
  { title: "Right timing", description: "Nudges arrive when they can make a difference, not after the moment has passed." },
  { title: "Clear attribution", description: "Every recommendation traces back to specific signals. No black-box suggestions." },
  { title: "Measurable impact", description: "All interventions are tracked. You'll know what worked and what didn't." },
];

export default function ActionControlLayer() {
  return (
    <>
      <SEO
        title="Action & Control Layer | NeuroState Solutions"
        description="NeuroState converts intelligence into clear, low-friction actions that drive measurable outcomes. Insight without action is noise."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative py-20 lg:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 4 of 6</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Action & Control Layer
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  NeuroState converts intelligence into clear, low-friction actions that drive measurable outcomes. This is where insight becomes intervention—and where the loop closes.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Core Principle</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">Insight without action is noise.</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    Most analytics tools stop at visibility. They show you charts, surface trends, and leave you to figure out what to do about it. The result is information overload without outcome improvement. Dashboards get ignored. Insights decay.
                  </p>
                  <p className="leading-relaxed">
                    The Action & Control Layer closes the gap between knowing and doing. Every piece of intelligence in NeuroState connects to a clear, actionable step. Personal coaching prompts arrive at the right moment. Manager nudges surface when intervention matters. Organisational recommendations come with ROI projections that justify the effort.
                  </p>
                  <p className="leading-relaxed">
                    And critically, every action is tracked. When you follow a recommendation, we measure the outcome. Over time, the system learns what works for your organisation—making future recommendations more effective.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Action Categories - Detailed */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Action Types</span>
                <h2 className="text-2xl font-normal text-foreground">Four layers of intervention</h2>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  From personal nudges to organisational policy—each layer addresses a different scope of impact.
                </p>
              </ScrollReveal>

              <div className="space-y-8">
                {actionCategories.map((category, i) => (
                  <motion.div 
                    key={category.title}
                    className="p-8 rounded-2xl bg-muted/30 border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/3">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <category.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-foreground">{category.title}</h3>
                            <span className="text-[10px] uppercase tracking-wider text-primary">Target: {category.target}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{category.description}</p>
                        <div className="p-4 rounded-xl bg-background border border-border/30">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">How it works</span>
                          <p className="text-xs text-foreground mt-2 leading-relaxed">{category.mechanism}</p>
                        </div>
                      </div>
                      <div className="lg:w-2/3">
                        <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-4">Trigger → Action Examples</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {category.examples.map((example, j) => (
                            <div key={j} className="p-4 rounded-xl bg-background border border-border/30">
                              <div className="flex items-start gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{example.trigger}</span>
                              </div>
                              <div className="flex items-start gap-2 pl-3.5">
                                <ArrowRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-xs font-medium text-foreground">{example.action}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Design Principles */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Design Philosophy</span>
                <h2 className="text-2xl font-normal text-foreground">Principles that drive adoption</h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {interventionPrinciples.map((principle, i) => (
                  <motion.div 
                    key={principle.title}
                    className="p-6 rounded-xl bg-background border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-2">{principle.title}</h4>
                    <p className="text-xs text-muted-foreground">{principle.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Closed Loop */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Closed-Loop System</span>
                  <h2 className="text-2xl font-normal text-foreground">Every intervention is measured</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    When you follow a NeuroState recommendation, we track what happens next. Did the coaching prompt lead to behaviour change? Did the manager nudge result in improved team metrics? Did the policy intervention reduce burnout risk?
                  </p>
                  <p className="leading-relaxed">
                    This closed-loop approach serves two purposes. First, it creates accountability—you can see which interventions delivered value. Second, it improves the system over time. Recommendations that work get reinforced. Those that don't get refined or retired.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">Example Impact</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    "Workload timing intervention applied to Sales team → +11% focus score within 14 days → £17,400 recovered in estimated productivity value."
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Next Layer */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <Link to="/solutions/command-surfaces">
                  <div className="group p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Next: Layer 5</span>
                          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">Command Surfaces by Role</h3>
                          <p className="text-xs text-muted-foreground">Different views for different responsibilities</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-xl font-normal text-foreground">See the Action Layer in practice</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/contact">
                    <Button className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Link to="/solutions">
                    <Button variant="outline" className="h-10 px-5 text-xs font-medium rounded-full">
                      Back to Solutions
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}