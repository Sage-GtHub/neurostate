import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, AlertTriangle, Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";

const insightCards = [
  {
    type: "prediction",
    title: "Energy dip predicted Thursday PM",
    detail: "Based on your sleep debt (1.4hrs) and meeting load, expect a 22% energy drop after 2 PM Thursday.",
    confidence: 87,
    icon: TrendingUp,
    action: "Reschedule deep work"
  },
  {
    type: "warning",
    title: "Recovery below baseline",
    detail: "Your 7-day recovery average is 14% below your personal baseline. Consider reducing training intensity.",
    confidence: 92,
    icon: AlertTriangle,
    action: "View recovery plan"
  },
  {
    type: "opportunity",
    title: "Optimal focus window detected",
    detail: "Your HRV and cortisol patterns suggest peak cognitive performance between 8:00–10:30 AM this week.",
    confidence: 94,
    icon: Sparkles,
    action: "Block calendar"
  }
];

const trendMetrics = [
  { label: "Avg HRV", value: "62ms", change: "+8%", positive: true },
  { label: "Sleep Score", value: "81", change: "+5%", positive: true },
  { label: "Strain Load", value: "14.2", change: "-12%", positive: true },
  { label: "Focus Hours", value: "4.2h", change: "+18%", positive: true },
];

export function InsightsShowcase() {
  return (
    <section className="py-16 md:py-32 px-5 md:px-8 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Predictive Intelligence</span>
          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal text-foreground mt-4 leading-[1.1] tracking-[-0.02em]">
            See what's coming before it arrives.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-5">
            Nova analyses patterns across your biometrics, behaviour, and environment to forecast performance up to 72 hours ahead.
          </p>
        </ScrollReveal>

        {/* Full-width mock UI */}
        <ScrollReveal>
          <motion.div
            className="relative rounded-xl border border-border/50 bg-card overflow-hidden shadow-lg"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <div className="flex-1 mx-3">
                <div className="bg-background/60 rounded-md px-3 py-1 text-[10px] text-muted-foreground font-mono text-center">
                  neurostate.app/nova/insights
                </div>
              </div>
            </div>

            <div className="p-5 md:p-6">
              {/* Trend strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {trendMetrics.map((m, i) => (
                  <motion.div
                    key={i}
                    className="bg-background rounded-lg border border-border/30 p-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">{m.label}</p>
                    <div className="flex items-end gap-2">
                      <p className="text-lg font-semibold text-foreground">{m.value}</p>
                      <span className={`text-[10px] font-medium flex items-center gap-0.5 mb-0.5 ${
                        m.positive ? "text-green-500" : "text-destructive"
                      }`}>
                        {m.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {m.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chart + Insights grid */}
              <div className="grid md:grid-cols-5 gap-4">
                {/* Chart area */}
                <motion.div
                  className="md:col-span-2 bg-background rounded-lg border border-border/30 p-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-4">30-Day Performance Trend</p>
                  <svg viewBox="0 0 200 80" className="w-full h-20" fill="none">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="200" y2="20" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
                    <line x1="0" y1="40" x2="200" y2="40" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
                    <line x1="0" y1="60" x2="200" y2="60" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
                    {/* Area fill */}
                    <path
                      d="M0,55 Q15,52 30,48 T60,42 T90,38 T120,35 T150,30 T180,28 T200,22 L200,80 L0,80 Z"
                      fill="hsl(var(--primary))"
                      opacity="0.06"
                    />
                    {/* Line */}
                    <path
                      d="M0,55 Q15,52 30,48 T60,42 T90,38 T120,35 T150,30 T180,28 T200,22"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Current dot */}
                    <circle cx="200" cy="22" r="3" fill="hsl(var(--primary))" />
                  </svg>
                  <div className="flex justify-between mt-2">
                    <span className="text-[8px] text-muted-foreground">30 days ago</span>
                    <span className="text-[8px] text-primary font-medium">Today</span>
                  </div>
                </motion.div>

                {/* Insight cards */}
                <div className="md:col-span-3 space-y-2.5">
                  {insightCards.map((card, i) => (
                    <motion.div
                      key={i}
                      className="bg-background rounded-lg border border-border/30 p-3.5 hover:border-primary/20 transition-colors"
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          card.type === "prediction" ? "bg-primary/10" :
                          card.type === "warning" ? "bg-orange-500/10" :
                          "bg-green-500/10"
                        }`}>
                          <card.icon className={`w-3.5 h-3.5 ${
                            card.type === "prediction" ? "text-primary" :
                            card.type === "warning" ? "text-orange-500" :
                            "text-green-500"
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-medium text-foreground">{card.title}</p>
                            <span className="text-[8px] font-mono text-muted-foreground flex-shrink-0">{card.confidence}% conf</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{card.detail}</p>
                          <button className="text-[10px] text-primary font-medium mt-2 hover:underline">{card.action} →</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/nova/insights">
            <Button variant="outline" className="h-11 px-7 text-sm font-medium rounded-full group">
              Explore Insights
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
