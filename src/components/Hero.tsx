import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Brain, BarChart3, Zap, Sparkles, Check, TrendingUp, Activity, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const demoTabs = [
  { id: 'chat', label: 'AI Chat', icon: MessageCircle },
  { id: 'insights', label: 'Insights', icon: Brain },
  { id: 'metrics', label: 'Metrics', icon: BarChart3 },
  { id: 'actions', label: 'Actions', icon: Zap },
];

const quickReplies = [
  "Show my energy forecast",
  "Any burnout risks?",
  "Optimise my afternoon",
];

// Animated counter
function useAnimatedValue(target: number, duration = 1200, active = true) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>();
  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased * 10) / 10);
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration, active]);
  return value;
}

const MiniSparkline = ({ data, color = "stroke-primary" }: { data: number[]; color?: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 80 - 10}`).join(' ');
  return (
    <svg viewBox="0 0 100 100" className="w-full h-8" preserveAspectRatio="none">
      <polyline fill="none" className={`${color} opacity-60`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

const MetricCard = ({ metric, index, active }: { metric: { label: string; value: number; unit: string; trend: string; sparkline: number[] }; index: number; active: boolean }) => {
  const animatedValue = useAnimatedValue(metric.value, 1000 + index * 200, active);
  const displayValue = metric.unit === 'hrs' ? animatedValue.toFixed(1) : Math.round(animatedValue);
  return (
    <motion.div
      className="p-4 rounded-xl border border-border/30 hover:border-primary/20 transition-colors cursor-default group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ scale: 1.02 }}
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-mono">{metric.label}</p>
      <div className="flex items-baseline gap-1">
        <p className="text-2xl font-light text-foreground tabular-nums">{displayValue}</p>
        <span className="text-[12px] text-muted-foreground">{metric.unit}</span>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <TrendingUp className="w-3 h-3 text-signal-green" />
        <p className="text-[11px] text-signal-green">{metric.trend}</p>
      </div>
      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <MiniSparkline data={metric.sparkline} />
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [extraMessages, setExtraMessages] = useState<{ role: string; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedActions, setCompletedActions] = useState<Set<number>>(new Set());
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);

  const chatMessages = [
    { role: 'nova', text: "Good morning. Your team's recovery is trending 12% above average. I've adjusted the focus window to 10am–1pm." },
    { role: 'user', text: "What should I prioritise?" },
    { role: 'nova', text: "Q4 strategy deck — complexity matches your current cognitive state. Block 90 minutes before lunch." },
  ];

  const metricsData = [
    { label: "HRV", value: 68, unit: "ms", trend: "+5%", sparkline: [52, 55, 58, 54, 60, 63, 65, 68] },
    { label: "Sleep", value: 7.2, unit: "hrs", trend: "+0.4", sparkline: [6.5, 6.8, 6.6, 7.0, 6.9, 7.1, 7.0, 7.2] },
    { label: "Readiness", value: 82, unit: "%", trend: "+8%", sparkline: [68, 72, 70, 74, 76, 78, 80, 82] },
    { label: "Recovery", value: 91, unit: "%", trend: "+3%", sparkline: [82, 85, 83, 88, 86, 89, 90, 91] },
  ];

  const insightsData = [
    { title: "Sleep consistency improved", desc: "7-day streak. Circadian rhythm optimising.", confidence: 94, dot: "bg-signal-green", detail: "Your bedtime variance dropped to ±12 minutes. This consistency is driving a 15% improvement in deep sleep duration and morning alertness scores." },
    { title: "HRV downtrend detected", desc: "15% decline over 5 days. Consider recovery.", confidence: 87, dot: "bg-warning-amber", detail: "Stress load from back-to-back meetings is the likely cause. I recommend capping meetings at 3 hours tomorrow and adding a 20-min breathing session.", sparkline: [72, 68, 65, 63, 61] },
    { title: "Peak focus window shifting", desc: "Optimal period moved 30 mins earlier this week.", confidence: 82, dot: "bg-primary", detail: "Your cognitive peak now sits at 9:30am–12pm instead of 10am–12:30pm. This aligns with your earlier wake time. I've updated your focus blocks." },
  ];

  const actionsData = [
    { title: "Schedule a recovery day", impact: "High", timing: "This week" },
    { title: "Move deep work to 9–11 AM", impact: "Medium", timing: "Tomorrow" },
    { title: "Increase magnesium intake", impact: "Medium", timing: "Tonight" },
    { title: "Cap meetings at 4 hours", impact: "High", timing: "This week" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeTab === 'chat') {
      setVisibleMessages(0);
      setExtraMessages([]);
      const timers: ReturnType<typeof setTimeout>[] = [];
      chatMessages.forEach((_, i) => {
        timers.push(setTimeout(() => setVisibleMessages(prev => prev + 1), 400 + i * 800));
      });
      return () => timers.forEach(clearTimeout);
    }
  }, [activeTab]);

  const handleQuickReply = useCallback((reply: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setExtraMessages(prev => [...prev, { role: 'user', text: reply }]);
    setIsTyping(true);
    const responses: Record<string, string> = {
      "Show my energy forecast": "Your energy peaks at 10:30am today. I'd schedule complex tasks before noon — your afternoon dip is predicted earlier than usual.",
      "Any burnout risks?": "Two team members show elevated cortisol patterns. I've flagged them for a check-in and suggested lighter schedules this week.",
      "Optimise my afternoon": "Done. I've moved your 3pm meeting to async, blocked 2–3:30pm for focused work, and added a 15-min walk reminder at 4pm.",
    };
    setTimeout(() => {
      setIsTyping(false);
      setExtraMessages(prev => [...prev, { role: 'nova', text: responses[reply] || "I'll look into that for you." }]);
      setIsProcessing(false);
    }, 1800);
  }, [isProcessing]);

  const handleInputSend = useCallback(() => {
    if (!inputValue.trim() || isProcessing) return;
    setIsProcessing(true);
    const text = inputValue.trim();
    setInputValue("");
    setExtraMessages(prev => [...prev, { role: 'user', text }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setExtraMessages(prev => [...prev, { role: 'nova', text: "Based on your biometric data, I'd recommend focusing on recovery today. Your HRV suggests you'll perform best with lighter cognitive tasks this afternoon." }]);
      setIsProcessing(false);
    }, 2000);
  }, [inputValue, isProcessing]);

  const toggleAction = useCallback((i: number) => {
    setCompletedActions(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  }, []);

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Hero Copy — Centered, above the product */}
      <div className="w-full max-w-5xl mx-auto px-5 md:px-8 pt-24 md:pt-36 lg:pt-44 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/nova/overview"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-background hover:border-primary/40 transition-colors group mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[12px] text-muted-foreground font-medium">
              Introducing Nova 2.0 — Workforce intelligence, reimagined
            </span>
            <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        </motion.div>

        <motion.h1 
          className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] font-medium text-foreground tracking-[-0.03em] leading-[1.05] mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          Turn your team's health data into better performance.
        </motion.h1>
        
        <motion.p 
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          NeuroState connects to wearables your team already uses, spots early signs of burnout, and delivers clear actions to keep people at their best.
        </motion.p>

        <motion.div 
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          <Link to="/contact">
            <Button size="lg" className="h-11 px-7 text-[13px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
              Book a Demo
            </Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button size="lg" variant="outline" className="h-11 px-7 text-[13px] font-medium rounded-full border-border hover:border-foreground/30">
              Try for Free
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Full-width Product Showcase — The hero of the hero */}
      <motion.div 
        className="w-full max-w-6xl mx-auto px-5 md:px-8 mt-14 md:mt-20 pb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative rounded-2xl border border-border/60 bg-background shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 bg-muted/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning-amber/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-signal-green/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-muted/60 border border-border/30">
                <Shield className="w-3 h-3 text-signal-green" />
                <span className="text-[11px] text-muted-foreground font-mono">neurostate.ai/nova</span>
              </div>
            </div>
          </div>

          {/* App layout — sidebar + main */}
          <div className="flex min-h-[420px] md:min-h-[480px]">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-56 border-r border-border/30 bg-muted/10 p-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground">Nova</span>
              </div>

              {/* Sidebar metrics */}
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Readiness</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary rounded-full" 
                        initial={{ width: 0 }}
                        animate={isLoaded ? { width: '82%' } : {}}
                        transition={{ duration: 1.2, delay: 0.8 }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground">82%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Recovery</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-signal-green rounded-full" 
                        initial={{ width: 0 }}
                        animate={isLoaded ? { width: '91%' } : {}}
                        transition={{ duration: 1.2, delay: 1 }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground">91%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Energy</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary rounded-full" 
                        initial={{ width: 0 }}
                        animate={isLoaded ? { width: '74%' } : {}}
                        transition={{ duration: 1.2, delay: 1.2 }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground">74%</span>
                  </div>
                </div>
              </div>

              {/* Sidebar nav */}
              <nav className="space-y-1 mt-auto">
                {demoTabs.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <TabIcon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              {/* User pill */}
              <div className="mt-6 pt-4 border-t border-border/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-semibold text-primary">JM</div>
                  <div>
                    <p className="text-[12px] font-medium text-foreground">James M.</p>
                    <p className="text-[10px] text-muted-foreground">Engineering Lead</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile tab bar */}
            <div className="md:hidden flex items-center gap-0 px-3 pt-2 border-b border-border/30 w-full absolute top-[41px] bg-background z-10">
              {demoTabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-2.5 text-[11px] font-medium transition-colors ${
                      activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div layoutId="mobile-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main content area */}
            <div className="flex-1 p-5 md:p-8 overflow-y-auto max-h-[420px] md:max-h-[480px] pt-14 md:pt-5">
              <AnimatePresence mode="wait">
                {/* ---- CHAT ---- */}
                {activeTab === 'chat' && (
                  <motion.div key="chat" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-3">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Nova AI</p>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <p className="text-[10px] text-muted-foreground">Online</p>
                        </div>
                      </div>
                    </div>

                    {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                      <motion.div
                        key={`base-${i}`}
                        className={`p-3.5 rounded-2xl text-[13px] leading-relaxed ${msg.role === 'nova' ? 'bg-muted/50 max-w-[88%]' : 'bg-primary/8 ml-auto max-w-[75%] text-right'}`}
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-foreground">{msg.text}</p>
                      </motion.div>
                    ))}

                    {extraMessages.map((msg, i) => (
                      <motion.div
                        key={`extra-${i}`}
                        className={`p-3.5 rounded-2xl text-[13px] leading-relaxed ${msg.role === 'nova' ? 'bg-muted/50 max-w-[88%]' : 'bg-primary/8 ml-auto max-w-[75%] text-right'}`}
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                      >
                        <p className="text-foreground">{msg.text}</p>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div className="bg-muted/50 max-w-[60px] p-3 rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex gap-1">
                          {[0, 1, 2].map(d => (
                            <motion.div key={d} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }} />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {visibleMessages >= chatMessages.length && extraMessages.length === 0 && (
                      <motion.div className="flex flex-wrap gap-2 pt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        {quickReplies.map((reply) => (
                          <button
                            key={reply}
                            onClick={() => handleQuickReply(reply)}
                            className="px-3 py-1.5 text-[11px] rounded-full border border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all active:scale-95"
                          >
                            {reply}
                          </button>
                        ))}
                      </motion.div>
                    )}

                    <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/30 border border-border/30 mt-3">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputSend()}
                        placeholder="Ask Nova anything…"
                        className="text-[13px] text-foreground placeholder:text-muted-foreground flex-1 pl-1 bg-transparent outline-none"
                      />
                      <button
                        onClick={handleInputSend}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${inputValue.trim() ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ---- INSIGHTS ---- */}
                {activeTab === 'insights' && (
                  <motion.div key="insights" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-3">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4">AI-Generated Insights</p>
                    {insightsData.map((insight, i) => (
                      <motion.div
                        key={i}
                        className="rounded-xl border border-border/30 hover:border-primary/20 transition-all cursor-pointer overflow-hidden"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => setExpandedInsight(expandedInsight === i ? null : i)}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`w-2 h-2 rounded-full ${insight.dot}`} />
                                <p className="text-[13px] font-medium text-foreground">{insight.title}</p>
                              </div>
                              <p className="text-[12px] text-muted-foreground">{insight.desc}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-xl font-light text-primary">{insight.confidence}%</p>
                              <p className="text-[10px] text-muted-foreground">confidence</p>
                            </div>
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedInsight === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                              <div className="px-4 pb-4 pt-0 border-t border-border/20">
                                <p className="text-[12px] text-muted-foreground leading-relaxed mt-3">{insight.detail}</p>
                                {'sparkline' in insight && insight.sparkline && (
                                  <div className="mt-2"><MiniSparkline data={insight.sparkline} color="stroke-warning-amber" /></div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* ---- METRICS ---- */}
                {activeTab === 'metrics' && (
                  <motion.div key="metrics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4">Live Biometrics</p>
                    <div className="grid grid-cols-2 gap-3">
                      {metricsData.map((metric, i) => (
                        <MetricCard key={i} metric={metric} index={i} active={activeTab === 'metrics'} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ---- ACTIONS ---- */}
                {activeTab === 'actions' && (
                  <motion.div key="actions" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Today's Actions</p>
                      <p className="text-[11px] text-primary font-medium">{completedActions.size}/{actionsData.length} done</p>
                    </div>
                    {actionsData.map((action, i) => {
                      const done = completedActions.has(i);
                      return (
                        <motion.button
                          key={i}
                          onClick={() => toggleAction(i)}
                          className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${done ? 'border-primary/20 bg-primary/5' : 'border-border/30 hover:border-primary/20'}`}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          whileHover={{ scale: 1.005 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${done ? 'bg-primary text-primary-foreground' : 'bg-primary/10'}`}>
                            {done ? <Check className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5 text-primary" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[13px] font-medium transition-all ${done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{action.title}</p>
                            <p className="text-[11px] text-muted-foreground">{action.timing}</p>
                          </div>
                          <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${done ? 'bg-primary/10 text-primary' : action.impact === 'High' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                            {done ? '✓ Done' : action.impact}
                          </span>
                        </motion.button>
                      );
                    })}
                    <motion.div className="mt-3 pt-3 border-t border-border/20">
                      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${(completedActions.size / actionsData.length) * 100}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right panel — contextual info */}
            <div className="hidden lg:flex flex-col w-64 border-l border-border/30 bg-muted/5 p-5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-4">Quick Stats</p>
              
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl border border-border/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-medium text-foreground">Team Readiness</span>
                  </div>
                  <p className="text-2xl font-light text-foreground">82%</p>
                  <p className="text-[10px] text-signal-green mt-0.5">↑ 8% vs last week</p>
                </div>
                
                <div className="p-3.5 rounded-xl border border-border/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-signal-green" />
                    <span className="text-[11px] font-medium text-foreground">Burnout Risk</span>
                  </div>
                  <p className="text-2xl font-light text-foreground">Low</p>
                  <p className="text-[10px] text-signal-green mt-0.5">2 members flagged</p>
                </div>

                <div className="p-3.5 rounded-xl border border-border/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-medium text-foreground">Focus Score</span>
                  </div>
                  <p className="text-2xl font-light text-foreground">91</p>
                  <p className="text-[10px] text-signal-green mt-0.5">↑ 12% today</p>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-border/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-signal-green" />
                  <span className="text-[10px] text-muted-foreground">3 devices synced</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] text-muted-foreground">Last sync: 2 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating highlights below the product */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8 pb-4">
          {[
            { label: "40+ wearable integrations", icon: Activity },
            { label: "72-hour early warnings", icon: Shield },
            { label: "Real-time team dashboards", icon: BarChart3 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
            >
              <item.icon className="w-4 h-4 text-primary" />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
