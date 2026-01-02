import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, ArrowRight, TrendingUp, Calendar, Target, Sparkles, AlertTriangle, BarChart3, Clock, Zap, Cpu, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const forecastTypes = [
  {
    icon: Calendar,
    title: "Near-term Forecasting",
    timeframe: "7-30 days",
    description: "Daily projections of team and individual cognitive capacity based on historical patterns, upcoming commitments, and current trajectory.",
    capabilities: [
      { name: "Readiness forecasts", detail: "Predicted cognitive capacity for each day, accounting for scheduled demands and recovery patterns." },
      { name: "Burnout probability", detail: "Rolling risk score with trend direction—rising, falling, or stable." },
      { name: "Recovery trajectory", detail: "How quickly capacity will return if current patterns change." },
      { name: "Optimal scheduling", detail: "Which days and times are best for high-stakes work." },
    ],
    useCase: "A product team can see that Thursday will be a low-capacity day due to accumulated meeting load. They reschedule the sprint planning to Tuesday morning when readiness peaks."
  },
  {
    icon: Target,
    title: "Scenario Modelling",
    timeframe: "What-if analysis",
    description: "Simulate the cognitive impact of decisions before you make them. Model workload changes, deadline shifts, travel, and organisational restructures.",
    capabilities: [
      { name: "Deadline impact analysis", detail: "What happens to team capacity if you pull in the launch date by two weeks?" },
      { name: "Travel fatigue modelling", detail: "Quantify the cognitive cost of upcoming travel and conferences." },
      { name: "Team restructure simulation", detail: "How will capacity redistribute if you move people between teams?" },
      { name: "Intervention effectiveness", detail: "Predict the impact of recovery days, workload reductions, or policy changes." },
    ],
    useCase: "Before committing to a Q4 deadline, leadership models the cognitive impact across Engineering. The simulation shows 40% burnout probability—they add two weeks and a recovery buffer."
  },
];

const forecastExamples = [
  { scenario: "Q1 product launch", impact: "-12 CCI points", risk: "+£34,000 exposure", recommendation: "Add recovery buffer post-launch" },
  { scenario: "Team offsite (3 days)", impact: "+8 CCI points", risk: "-£14,200 exposure", recommendation: "Schedule after high-intensity sprint" },
  { scenario: "New hire onboarding (x4)", impact: "-6 CCI points", risk: "+£18,000 exposure", recommendation: "Stagger start dates by 2 weeks" },
];

export default function PredictionSimulation() {
  return (
    <>
      <SEO
        title="Prediction & Simulation | NeuroState Solutions"
        description="NeuroState does not stop at visibility. It forecasts what is likely to happen next—and lets you model the impact of decisions before you make them."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative py-20 lg:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 3 of 6</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Prediction & Simulation
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  NeuroState does not stop at visibility. It forecasts what is likely to happen next—and lets you model the impact of decisions before you make them. This is where understanding becomes foresight.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Why Prediction Matters */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Challenge</span>
                  <h2 className="text-2xl font-normal text-foreground">Why prediction changes everything</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    Most cognitive visibility tools are rearview mirrors. They show you what happened yesterday—useful for understanding, but not for preventing. By the time you see burnout in historical data, someone has already resigned. By the time you notice a team is struggling, the project is already delayed.
                  </p>
                  <p className="leading-relaxed">
                    The Prediction & Simulation layer changes the timeline. Instead of reacting to problems, you anticipate them. Instead of hoping a deadline is realistic, you model its cognitive impact. Instead of guessing whether an intervention will work, you simulate its expected effect.
                  </p>
                  <p className="leading-relaxed">
                    This is decision support grounded in evidence. Every forecast comes with confidence intervals. Every simulation is traceable to the data that informed it. This isn't crystal-ball guessing—it's statistical prediction with accountability.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Forecast Types - Detailed */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Capabilities</span>
                <h2 className="text-2xl font-normal text-foreground">Two modes of foresight</h2>
              </ScrollReveal>

              <div className="space-y-8">
                {forecastTypes.map((type, i) => (
                  <motion.div 
                    key={type.title}
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
                            <type.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-foreground">{type.title}</h3>
                            <span className="text-[10px] uppercase tracking-wider text-primary">{type.timeframe}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{type.description}</p>
                        <div className="p-4 rounded-xl bg-background border border-border/30">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Example</span>
                          <p className="text-xs text-foreground mt-2 leading-relaxed">{type.useCase}</p>
                        </div>
                      </div>
                      <div className="lg:w-2/3">
                        <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-4">Specific Capabilities</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {type.capabilities.map((cap, j) => (
                            <div key={j} className="p-4 rounded-xl bg-background border border-border/30">
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-3 h-3 text-primary" />
                                <span className="text-xs font-medium text-foreground">{cap.name}</span>
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-relaxed">{cap.detail}</p>
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

          {/* Scenario Examples */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">In Practice</span>
                <h2 className="text-2xl font-normal text-foreground">Scenario modelling examples</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Real scenarios that leadership can model before committing.
                </p>
              </ScrollReveal>

              <div className="space-y-4">
                {forecastExamples.map((example, i) => (
                  <motion.div 
                    key={i}
                    className="p-6 rounded-xl bg-background border border-border/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-foreground">{example.scenario}</h4>
                          <p className="text-xs text-muted-foreground">{example.recommendation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <span className={`text-sm font-semibold ${example.impact.startsWith('+') ? 'text-green-600' : 'text-amber-500'}`}>
                            {example.impact}
                          </span>
                          <p className="text-[10px] text-muted-foreground">Capacity Impact</p>
                        </div>
                        <div className="text-center">
                          <span className={`text-sm font-semibold ${example.risk.startsWith('-') ? 'text-green-600' : 'text-red-500'}`}>
                            {example.risk}
                          </span>
                          <p className="text-[10px] text-muted-foreground">Risk Change</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Methodology</span>
                  <h2 className="text-2xl font-normal text-foreground">Decision support, not speculation</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    Every prediction from NeuroState is grounded in data. Our forecasting models combine individual baseline patterns, team dynamics, historical correlations, and contextual factors like upcoming deadlines or scheduled travel. Confidence intervals tell you how certain the prediction is.
                  </p>
                  <p className="leading-relaxed">
                    When you run a scenario simulation, you can trace every assumption. What if you shift the deadline by a week? The model shows you exactly which team members are affected, how capacity redistributes, and what the financial impact looks like. No black boxes.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <Brain className="w-6 h-6 text-primary mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-1">Pattern Recognition</h4>
                    <p className="text-xs text-muted-foreground">Historical correlations inform predictions</p>
                  </div>
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-1">Context Awareness</h4>
                    <p className="text-xs text-muted-foreground">Calendar, deadlines, and external factors</p>
                  </div>
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <AlertTriangle className="w-6 h-6 text-primary mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-1">Confidence Intervals</h4>
                    <p className="text-xs text-muted-foreground">Uncertainty is quantified, not hidden</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Next Layer */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <Link to="/solutions/action-layer">
                  <div className="group p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Zap className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Next: Layer 4</span>
                          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">Action & Control Layer</h3>
                          <p className="text-xs text-muted-foreground">Where foresight becomes intervention</p>
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
                <h2 className="text-xl font-normal text-foreground">See predictive intelligence in action</h2>
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