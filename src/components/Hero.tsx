import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Brain, BarChart3, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const demoTabs = [
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'insights', label: 'Insights', icon: Brain },
  { id: 'metrics', label: 'Metrics', icon: BarChart3 },
  { id: 'actions', label: 'Actions', icon: Zap },
];

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section className="relative flex flex-col bg-background overflow-hidden">
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left — Copy */}
            <motion.div 
              className="space-y-7 lg:pr-4"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <Link 
                  to="/nova/overview"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-background hover:border-primary/40 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[12px] text-muted-foreground font-medium">
                    Introducing Nova 2.0 — Workforce intelligence, reimagined
                  </span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              </motion.div>

              <motion.h1 
                className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-medium text-foreground tracking-[-0.03em] leading-[1.05]"
                variants={itemVariants}
              >
                Turn your team's health data into better performance.
              </motion.h1>
              
              <motion.p 
                className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed"
                variants={itemVariants}
              >
                NeuroState connects to wearables your team already uses, spots early signs of burnout, and delivers clear actions to keep people at their best.
              </motion.p>

              <motion.div 
                className="flex flex-wrap items-center gap-3 pt-2"
                variants={itemVariants}
              >
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="h-11 px-7 text-[13px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                  >
                    Book a Demo
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="h-11 px-7 text-[13px] font-medium rounded-full border-border hover:border-foreground/30"
                  >
                    Try for Free
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — Interactive Tabbed Product Demo */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative rounded-2xl border border-border/60 bg-background shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                {/* App header bar */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 bg-muted/20">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-3 py-1 rounded-md bg-muted text-[11px] text-muted-foreground font-mono">neurostate.ai/nova</div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-0 px-4 pt-3 border-b border-border/40">
                  {demoTabs.map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-medium border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-primary text-foreground'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <TabIcon className="w-3.5 h-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="p-5 md:p-6 min-h-[300px]">
                  <AnimatePresence mode="wait">
                    {/* Chat Tab */}
                    {activeTab === 'chat' && (
                      <motion.div
                        key="chat"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div>
                            <p className="text-[11px] font-medium text-foreground">Nova AI</p>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                              <p className="text-[10px] text-muted-foreground">Online</p>
                            </div>
                          </div>
                        </div>
                        {[
                          { role: 'nova', text: "Good morning. Your team's recovery is trending 12% above average. I've adjusted the focus window to 10am–1pm." },
                          { role: 'user', text: "What should I prioritise?" },
                          { role: 'nova', text: "Q4 strategy deck — complexity matches your current cognitive state. Block 90 minutes before lunch." },
                        ].map((msg, i) => (
                          <motion.div
                            key={i}
                            className={`p-3 rounded-xl text-[13px] leading-relaxed ${msg.role === 'nova' ? 'bg-muted/50 max-w-[90%]' : 'bg-primary/8 ml-auto max-w-[75%]'}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12 }}
                          >
                            <p className="text-foreground">{msg.text}</p>
                          </motion.div>
                        ))}
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/30 border border-border/30 mt-2">
                          <span className="text-[12px] text-muted-foreground flex-1 pl-1">Ask Nova anything…</span>
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                            <ArrowRight className="w-3.5 h-3.5 text-primary" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Insights Tab */}
                    {activeTab === 'insights' && (
                      <motion.div
                        key="insights"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        {[
                          { title: "Sleep consistency improved", desc: "7-day streak. Circadian rhythm optimising.", confidence: 94, dot: "bg-signal-green" },
                          { title: "HRV downtrend detected", desc: "15% decline over 5 days. Consider recovery.", confidence: 87, dot: "bg-warning-amber" },
                          { title: "Peak focus window shifting", desc: "Optimal period moved 30 mins earlier this week.", confidence: 82, dot: "bg-primary" },
                        ].map((insight, i) => (
                          <motion.div
                            key={i}
                            className="p-3.5 rounded-xl border border-border/30 hover:border-primary/20 transition-colors"
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className={`w-2 h-2 rounded-full ${insight.dot}`} />
                                  <p className="text-[13px] font-medium text-foreground">{insight.title}</p>
                                </div>
                                <p className="text-[12px] text-muted-foreground">{insight.desc}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-lg font-light text-primary">{insight.confidence}%</p>
                                <p className="text-[10px] text-muted-foreground">confidence</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* Metrics Tab */}
                    {activeTab === 'metrics' && (
                      <motion.div
                        key="metrics"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: "HRV", value: "68", unit: "ms", trend: "+5%" },
                            { label: "Sleep", value: "7.2", unit: "hrs", trend: "+0.4" },
                            { label: "Readiness", value: "82", unit: "%", trend: "+8%" },
                            { label: "Recovery", value: "91", unit: "%", trend: "+3%" },
                          ].map((metric, i) => (
                            <motion.div
                              key={i}
                              className="p-4 rounded-xl border border-border/30"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.06 }}
                            >
                              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-mono">{metric.label}</p>
                              <div className="flex items-baseline gap-1">
                                <p className="text-2xl font-light text-foreground">{metric.value}</p>
                                <span className="text-[12px] text-muted-foreground">{metric.unit}</span>
                              </div>
                              <p className="text-[11px] text-signal-green mt-1">{metric.trend}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Actions Tab */}
                    {activeTab === 'actions' && (
                      <motion.div
                        key="actions"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        {[
                          { title: "Schedule a recovery day", impact: "High", timing: "This week" },
                          { title: "Move deep work to 9–11 AM", impact: "Medium", timing: "Tomorrow" },
                          { title: "Increase magnesium intake", impact: "Medium", timing: "Tonight" },
                          { title: "Cap meetings at 4 hours", impact: "High", timing: "This week" },
                        ].map((action, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3 p-3.5 rounded-xl border border-border/30 hover:border-primary/20 transition-colors"
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                          >
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Zap className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-medium text-foreground">{action.title}</p>
                              <p className="text-[11px] text-muted-foreground">{action.timing}</p>
                            </div>
                            <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                              action.impact === 'High' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                            }`}>
                              {action.impact}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
