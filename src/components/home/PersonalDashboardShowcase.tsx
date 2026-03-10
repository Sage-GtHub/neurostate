import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Activity, Moon, Flame, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const metrics = [
  { label: "Readiness", value: 84, icon: Zap, color: "text-primary", bg: "bg-primary/10" },
  { label: "Recovery", value: 72, icon: Heart, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Strain", value: 12.4, icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
  { label: "Sleep", value: "7h 42m", icon: Moon, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const todayProtocol = [
  { time: "07:00", task: "Morning breathwork", status: "done" },
  { time: "09:30", task: "Deep work block", status: "done" },
  { time: "12:00", task: "Movement break", status: "current" },
  { time: "15:00", task: "Cold exposure", status: "upcoming" },
  { time: "21:30", task: "Wind-down protocol", status: "upcoming" },
];

export function PersonalDashboardShowcase() {
  return (
    <section className="py-16 md:py-32 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Copy - Left */}
          <ScrollReveal>
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">For individuals</span>
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal text-foreground mt-4 leading-[1.1] tracking-[-0.02em]">
              Your health data. Finally useful.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-md mt-5 leading-relaxed">
              One unified dashboard that pulls from every wearable you own. See your readiness, recovery, and personalised protocols — all in real time.
            </p>
            <div className="space-y-4 pt-8">
              {[
                "Unified metrics from WHOOP, Oura, Garmin & more",
                "AI-generated daily protocols based on your data",
                "Track streaks, progress, and long-term trends",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="pt-8">
              <Link to="/nova/dashboard">
                <Button variant="outline" className="h-11 px-7 text-sm font-medium rounded-full group">
                  Explore Personal Dashboard
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Mock Dashboard UI - Right */}
          <ScrollReveal direction="right" delay={0.15}>
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
                    neurostate.app/nova/dashboard
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Readiness Ring + Greeting */}
                <motion.div
                  className="flex items-center gap-4 bg-background rounded-lg border border-border/30 p-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--border))" strokeWidth="4" opacity="0.3" />
                      <circle
                        cx="32" cy="32" r="28"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${84 * 1.76} ${176}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-foreground">84</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Good morning, Alex</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Your readiness is strong today. Perfect for a high-intensity session.</p>
                  </div>
                </motion.div>

                {/* Metric cards */}
                <div className="grid grid-cols-4 gap-2">
                  {metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      className="bg-background rounded-lg border border-border/30 p-2.5 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                    >
                      <div className={`w-6 h-6 rounded-md ${m.bg} flex items-center justify-center mx-auto mb-1.5`}>
                        <m.icon className={`w-3 h-3 ${m.color}`} />
                      </div>
                      <p className={`text-sm font-semibold ${m.color}`}>{m.value}</p>
                      <p className="text-[8px] text-muted-foreground uppercase tracking-wider mt-0.5">{m.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Today's Protocol */}
                <motion.div
                  className="bg-background rounded-lg border border-border/30 p-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Today's Protocol</p>
                    <span className="text-[9px] text-primary font-medium">3/5 complete</span>
                  </div>
                  <div className="space-y-1.5">
                    {todayProtocol.map((item, i) => (
                      <motion.div
                        key={i}
                        className={`flex items-center gap-2.5 py-1.5 px-2 rounded-md text-xs ${
                          item.status === "current" ? "bg-primary/5 border border-primary/20" : ""
                        }`}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.06 }}
                      >
                        <span className="text-[10px] font-mono text-muted-foreground w-10 flex-shrink-0">{item.time}</span>
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.status === "done" ? "bg-primary" :
                          item.status === "current" ? "border-2 border-primary" :
                          "border border-border/60"
                        }`}>
                          {item.status === "done" && <Check className="w-2 h-2 text-primary-foreground" />}
                          {item.status === "current" && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </div>
                        <span className={`text-xs ${
                          item.status === "done" ? "text-muted-foreground line-through" :
                          item.status === "current" ? "text-foreground font-medium" :
                          "text-muted-foreground"
                        }`}>{item.task}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
