import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, ArrowRight, Users, User, Shield, Crown, BarChart3, Calculator, Lock, Eye, Brain, Zap, TrendingUp, Target, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const roles = [
  { 
    icon: User, 
    title: "Individual Contributor", 
    tagline: "Personal performance and coaching",
    description: "For team members who want to understand and optimise their own cognitive performance. This view is entirely private—only you see your data.",
    capabilities: [
      { name: "Daily readiness score", detail: "Your predicted cognitive capacity for today, based on sleep, recovery, and baseline." },
      { name: "Optimal focus windows", detail: "When your brain is best suited for deep work, meetings, or creative tasks." },
      { name: "Recovery protocols", detail: "Personalised recommendations for rest, exercise, and recovery based on your patterns." },
      { name: "Progress tracking", detail: "How your cognitive metrics are trending over time—and what's driving the changes." },
      { name: "Personal coaching prompts", detail: "Timely nudges that help you make better decisions about work and recovery." },
    ],
    privacy: "Your data belongs to you. Nothing is shared with managers or the organisation without your explicit consent."
  },
  { 
    icon: Shield, 
    title: "Manager", 
    tagline: "Team risk and intervention guidance",
    description: "For team leads who need visibility into team health without surveillance. You see aggregate patterns and risk signals—never individual details unless someone consents to share.",
    capabilities: [
      { name: "Team readiness overview", detail: "Aggregate capacity across your team. Is the team ready for a sprint or running on empty?" },
      { name: "Burnout risk signals", detail: "Which parts of your team are approaching risk thresholds—without naming individuals." },
      { name: "Workload distribution", detail: "Is work balanced across the team, or are some people carrying too much?" },
      { name: "Intervention suggestions", detail: "Recommended actions with talking points—how to check in without awkwardness." },
      { name: "1:1 preparation", detail: "Context that helps you have better conversations with your direct reports." },
    ],
    privacy: "You see patterns, not personal data. Individual consent is required for any drill-down."
  },
  { 
    icon: BarChart3, 
    title: "Head of People / HR", 
    tagline: "Organisational patterns and prevention",
    description: "For People leaders who need to understand systemic patterns, benchmark across departments, and justify investment in cognitive health programmes.",
    capabilities: [
      { name: "Department comparisons", detail: "How does Engineering compare to Sales? Where are the hot spots?" },
      { name: "Trend analysis", detail: "Is burnout rising or falling? What's driving the changes?" },
      { name: "Intervention ROI", detail: "Which programmes actually work? What's the return on investment?" },
      { name: "Policy impact modelling", detail: "What would happen if we changed the meeting policy or added a wellness programme?" },
      { name: "Retention risk indicators", detail: "Early warning signals for departure risk at team and department level." },
    ],
    privacy: "Organisational view only. No individual data without multi-layer consent."
  },
  { 
    icon: Crown, 
    title: "CEO / Executive", 
    tagline: "Cognitive risk exposure at scale",
    description: "For executives who need to understand organisational capacity as a strategic asset. This is cognitive health as a board-level metric—not wellness as HR theatre.",
    capabilities: [
      { name: "Enterprise cognitive capacity", detail: "The Cognitive Capacity Index (CCI) for the entire organisation. Your north star metric." },
      { name: "Strategic capacity planning", detail: "Do we have the cognitive capacity for the Q1 push? What's the cost if we don't?" },
      { name: "Risk exposure quantification", detail: "How much revenue is at risk from current cognitive decline? What's the turnover exposure?" },
      { name: "Competitive benchmarking", detail: "How does our cognitive health compare to industry baselines?" },
      { name: "Board-ready reporting", detail: "Dashboards and reports that translate cognitive health into language the board understands." },
    ],
    privacy: "Executive view is strictly aggregate. No path to individual data."
  },
];

export default function CommandSurfaces() {
  return (
    <>
      <SEO
        title="Command Surfaces by Role | NeuroState Solutions"
        description="One system. Different truths. Role-specific interfaces that deliver the right information to the right people—with privacy by design."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative py-20 lg:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 5 of 6</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Command Surfaces by Role
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  One system. Different truths. Role-specific interfaces that deliver the right information to the right people—with privacy protected at every layer.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Why Role-Based Matters */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Design Philosophy</span>
                  <h2 className="text-2xl font-normal text-foreground">The same system, different truths</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    A CEO and an individual contributor have fundamentally different relationships with cognitive data. The CEO needs to understand organisational capacity as a strategic asset. The IC needs to understand their own patterns and optimise their own performance. The manager sits in between—responsible for team health without becoming a surveillance operation.
                  </p>
                  <p className="leading-relaxed">
                    NeuroState addresses this by providing role-specific command surfaces. Each role sees exactly what they need to see—no more, no less. Privacy boundaries are enforced by design, not policy. And the system maintains trust at every level because people know their data is protected.
                  </p>
                  <p className="leading-relaxed">
                    This isn't just about access control. Each interface is designed for the specific decisions that role needs to make. The language, the metrics, the visualisations—all calibrated to the context.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Role Grid - Detailed */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Role Interfaces</span>
                <h2 className="text-2xl font-normal text-foreground">Four perspectives, one system</h2>
              </ScrollReveal>

              <div className="space-y-8">
                {roles.map((role, i) => (
                  <motion.div 
                    key={role.title}
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
                            <role.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-foreground">{role.title}</h3>
                            <span className="text-[10px] uppercase tracking-wider text-primary">{role.tagline}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{role.description}</p>
                        <div className="p-4 rounded-xl bg-background border border-border/30">
                          <div className="flex items-center gap-2 mb-2">
                            <Lock className="w-3 h-3 text-primary" />
                            <span className="text-[10px] uppercase tracking-wider text-primary font-medium">Privacy Guarantee</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{role.privacy}</p>
                        </div>
                      </div>
                      <div className="lg:w-2/3">
                        <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-4">Key Capabilities</h4>
                        <div className="grid gap-4">
                          {role.capabilities.map((cap, j) => (
                            <div key={j} className="p-4 rounded-xl bg-background border border-border/30">
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                </div>
                                <div>
                                  <span className="text-xs font-medium text-foreground">{cap.name}</span>
                                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{cap.detail}</p>
                                </div>
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

          {/* Privacy Architecture */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Trust Architecture</span>
                <h2 className="text-2xl font-normal text-foreground">Privacy by design, not policy</h2>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Privacy isn't a feature we added. It's the foundation the system is built on.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div 
                  className="p-6 rounded-xl bg-background border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Eye className="w-6 h-6 text-primary mb-4" />
                  <h4 className="text-sm font-medium text-foreground mb-2">Aggregation by default</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Team and org views show only aggregate data. There is no path to individual metrics without explicit, revocable consent from that individual.
                  </p>
                </motion.div>
                <motion.div 
                  className="p-6 rounded-xl bg-background border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Lock className="w-6 h-6 text-primary mb-4" />
                  <h4 className="text-sm font-medium text-foreground mb-2">Role-enforced boundaries</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Access controls are built into the data layer, not the UI. There's no admin override that exposes individual data without consent.
                  </p>
                </motion.div>
                <motion.div 
                  className="p-6 rounded-xl bg-background border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Shield className="w-6 h-6 text-primary mb-4" />
                  <h4 className="text-sm font-medium text-foreground mb-2">Consent-based escalation</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    If a manager needs to see individual data to help someone, that person must actively grant access. Consent is visible and revocable.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Visual Hierarchy */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="text-center space-y-8">
                <div className="space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Information Hierarchy</span>
                  <h2 className="text-2xl font-normal text-foreground">From individual to enterprise</h2>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center min-w-[120px]">
                    <User className="w-5 h-5 text-primary mx-auto mb-2" />
                    <span className="text-xs font-medium text-foreground">Individual</span>
                    <p className="text-[10px] text-muted-foreground">Your data</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/50 text-center min-w-[120px]">
                    <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                    <span className="text-xs font-medium text-foreground">Manager</span>
                    <p className="text-[10px] text-muted-foreground">Team aggregates</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/50 text-center min-w-[120px]">
                    <BarChart3 className="w-5 h-5 text-primary mx-auto mb-2" />
                    <span className="text-xs font-medium text-foreground">People Lead</span>
                    <p className="text-[10px] text-muted-foreground">Dept patterns</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/50 text-center min-w-[120px]">
                    <Crown className="w-5 h-5 text-primary mx-auto mb-2" />
                    <span className="text-xs font-medium text-foreground">Executive</span>
                    <p className="text-[10px] text-muted-foreground">Enterprise view</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Next Layer */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <Link to="/solutions/roi-layer">
                  <div className="group p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Calculator className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Next: Layer 6</span>
                          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">Economic & ROI Layer</h3>
                          <p className="text-xs text-muted-foreground">Where cognitive health becomes measurable value</p>
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
                <h2 className="text-xl font-normal text-foreground">See the role-based experience</h2>
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