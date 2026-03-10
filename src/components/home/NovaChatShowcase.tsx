import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles, Send } from "lucide-react";
import { Link } from "react-router-dom";

const chatMessages = [
  {
    role: "user",
    content: "I've been feeling mentally drained after meetings. What does my data show?",
    time: "09:14"
  },
  {
    role: "nova",
    content: "Based on your WHOOP and calendar data, your HRV drops 18% after back-to-back meetings exceeding 90 minutes. Your cognitive recovery takes ~45 minutes. I'd recommend a 15-minute buffer between meetings and a short breathwork session.",
    time: "09:14",
    sources: ["WHOOP HRV", "Google Calendar", "Recovery patterns"]
  },
  {
    role: "nova",
    content: "I've also noticed your best deep-work windows are 7:30–10:00 AM and 2:30–4:00 PM. Want me to build a schedule block protocol?",
    time: "09:15",
    isInsight: true
  }
];

const quickActions = [
  "Analyse my sleep trends",
  "What's my burnout risk?",
  "Optimise my schedule"
];

export function NovaChatShowcase() {
  return (
    <section className="py-16 md:py-32 px-5 md:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Mock Chat UI - Left */}
          <ScrollReveal direction="left" delay={0.1}>
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
                    neurostate.app/nova/chat
                  </div>
                </div>
              </div>

              {/* Chat header */}
              <div className="px-5 py-3 border-b border-border/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">Nova AI</p>
                  <p className="text-[10px] text-primary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Analysing your data
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 max-h-[340px] overflow-hidden">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  >
                    <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border/40"
                    }`}>
                      <p className={`text-xs leading-relaxed ${
                        msg.role === "user" ? "text-primary-foreground" : "text-foreground"
                      }`}>
                        {msg.content}
                      </p>
                      {msg.sources && (
                        <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-border/20">
                          {msg.sources.map((s, j) => (
                            <span key={j} className="text-[8px] px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground font-mono">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                      {msg.isInsight && (
                        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border/20">
                          <Sparkles className="w-3 h-3 text-primary" />
                          <span className="text-[9px] text-primary font-medium">Proactive Insight</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {quickActions.map((action, i) => (
                    <motion.span
                      key={i}
                      className="text-[10px] px-2.5 py-1 rounded-full border border-border/40 text-muted-foreground bg-background hover:border-primary/30 hover:text-primary transition-colors cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.08 }}
                    >
                      {action}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-border/30">
                <div className="flex items-center gap-2 bg-background rounded-lg border border-border/40 px-3 py-2">
                  <span className="text-[11px] text-muted-foreground/60 flex-1">Ask Nova anything...</span>
                  <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                    <Send className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Copy - Right */}
          <ScrollReveal direction="right" delay={0.15}>
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Nova AI</span>
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal text-foreground mt-4 leading-[1.1] tracking-[-0.02em]">
              Your personal performance coach.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-md mt-5 leading-relaxed">
              Nova connects your wearable data, calendar, and work patterns to give you actionable insights — not generic advice. Ask anything, anytime.
            </p>
            <div className="space-y-4 pt-8">
              {[
                "Multi-model AI across biometrics and behaviour",
                "Cites data sources for every recommendation",
                "Proactive insights before you even ask",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="pt-8">
              <Link to="/nova/chat">
                <Button variant="outline" className="h-11 px-7 text-sm font-medium rounded-full group">
                  Try Nova AI
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
