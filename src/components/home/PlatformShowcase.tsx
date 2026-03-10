import { motion } from "framer-motion";
import { ArrowRight, Brain, Activity, Shield, Sparkles, BarChart3, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Multi-model AI engine",
    description: "Nova orchestrates across foundation models, selecting the best reasoning path for each query — biometric, contextual, or genomic.",
    icon: Brain,
    span: "col-span-1",
  },
  {
    title: "72-hour forecasting",
    description: "Predict energy crashes, burnout risk, and recovery windows before they happen. Proactive, not reactive.",
    icon: Activity,
    span: "col-span-1",
  },
  {
    title: "Adaptive protocols",
    description: "Personalised action plans that evolve with every data point. No two users get the same recommendation.",
    icon: Sparkles,
    span: "col-span-1",
  },
  {
    title: "Financial attribution",
    description: "Every intervention is scored by ROI. See the pound value of better sleep, reduced sick days, and sharper focus.",
    icon: BarChart3,
    span: "col-span-1",
  },
  {
    title: "Real-time biometric streams",
    description: "Continuous data from 40+ wearables, processed and contextualised in real time. Always current, always actionable.",
    icon: Zap,
    span: "col-span-1",
  },
  {
    title: "Enterprise-grade security",
    description: "End-to-end encryption, SOC 2 compliance, GDPR adherence, and anonymised team-level reporting.",
    icon: Shield,
    span: "col-span-1",
  },
];

export const PlatformShowcase = () => {
  return (
    <section className="py-16 md:py-32 px-5 md:px-8 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.span
              className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Nova AI
            </motion.span>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal text-foreground mt-4 leading-[1.1] tracking-[-0.02em] max-w-2xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              The cognitive performance engine
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/nova">
              <Button variant="outline" className="h-11 px-7 text-sm font-medium rounded-full group">
                Learn more
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Large product mockup */}
        <motion.div
          className="relative rounded-2xl border border-border/50 bg-card overflow-hidden shadow-lg mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/30 bg-muted/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-background/60 rounded-md px-4 py-1.5 text-[11px] text-muted-foreground font-mono text-center max-w-xs mx-auto">
                neurostate.app/nova
              </div>
            </div>
          </div>

          {/* Product interface */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Nova AI</p>
                  <p className="text-[10px] text-muted-foreground">Multi-model cognitive engine</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">Live</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>

            {/* Conversation mock */}
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 space-y-4">
                {/* User message */}
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-primary/8 rounded-2xl rounded-tr-md px-4 py-3 max-w-sm">
                    <p className="text-sm text-foreground">I've been feeling drained by 2pm every day this week. What's going on?</p>
                  </div>
                </motion.div>

                {/* Nova response */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-muted/30 rounded-2xl rounded-tl-md px-4 py-3 max-w-md border border-border/30">
                    <p className="text-sm text-foreground leading-relaxed">
                      Your HRV has dropped 18% since Monday, and your deep sleep averaged just 47 minutes — well below your 72-minute baseline. Combined with back-to-back meetings from 10am–1pm, your cognitive reserves are depleted by early afternoon.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {["WHOOP", "Calendar", "Sleep"].map((source) => (
                        <span key={source} className="text-[9px] font-mono uppercase tracking-wider bg-background px-2 py-0.5 rounded-full border border-border/40 text-muted-foreground">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action card */}
                  <div className="bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">Recommended protocol</span>
                    </div>
                    <p className="text-sm text-foreground">Block 1:30–2pm as a recovery window. 10-min guided breathwork, then resume with your highest-priority task.</p>
                  </div>
                </motion.div>
              </div>

              {/* Side panel - metrics */}
              <motion.div
                className="md:col-span-2 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">Today's biometrics</p>
                {[
                  { label: "HRV", value: "38ms", change: "-18%", negative: true },
                  { label: "Deep Sleep", value: "47min", change: "-35%", negative: true },
                  { label: "Recovery", value: "42%", change: "-12%", negative: true },
                  { label: "Steps", value: "3,241", change: "On track", negative: false },
                ].map((metric, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-background border border-border/30">
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{metric.value}</span>
                      <span className={`text-[10px] font-medium ${metric.negative ? 'text-destructive' : 'text-green-600'}`}>{metric.change}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Feature bento grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={`group p-6 rounded-xl border border-border/30 hover:border-primary/20 transition-all duration-300 ${feature.span}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                <feature.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
