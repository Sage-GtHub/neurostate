import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Brain, Moon, Zap, TrendingUp, Sparkles, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";

interface DataPoint {
  value: number;
  time: string;
}

interface MetricStream {
  label: string;
  value: number;
  unit: string;
  data: DataPoint[];
  color: string;
  icon: typeof Activity;
}

const LiveDemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [aiThinking, setAiThinking] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(94);
  const [processingStep, setProcessingStep] = useState(0);
  const animationRef = useRef<number>();

  const processingSteps = [
    "Ingesting biometric streams...",
    "Analysing HRV patterns...",
    "Computing recovery trajectory...",
    "Correlating sleep architecture...",
    "Generating 72-hour forecast...",
    "Optimising protocol recommendations..."
  ];

  const [metrics, setMetrics] = useState<MetricStream[]>([
    {
      label: "Heart Rate Variability",
      value: 62,
      unit: "ms",
      data: Array.from({ length: 20 }, (_, i) => ({ value: 55 + Math.random() * 15, time: `${i}` })),
      color: "hsl(var(--primary))",
      icon: Activity
    },
    {
      label: "Sleep Quality",
      value: 85,
      unit: "/100",
      data: Array.from({ length: 20 }, (_, i) => ({ value: 75 + Math.random() * 20, time: `${i}` })),
      color: "hsl(142, 71%, 45%)",
      icon: Moon
    },
    {
      label: "Recovery Score",
      value: 78,
      unit: "%",
      data: Array.from({ length: 20 }, (_, i) => ({ value: 65 + Math.random() * 25, time: `${i}` })),
      color: "hsl(38, 92%, 50%)",
      icon: TrendingUp
    },
    {
      label: "Cognitive Load",
      value: 34,
      unit: "/100",
      data: Array.from({ length: 20 }, (_, i) => ({ value: 25 + Math.random() * 20, time: `${i}` })),
      color: "hsl(280, 87%, 65%)",
      icon: Brain
    }
  ]);

  const predictions = [
    { time: "Tomorrow 9am", label: "Peak Focus", score: 92, trend: "up" },
    { time: "Tomorrow 2pm", label: "Energy Dip", score: 68, trend: "down" },
    { time: "Tomorrow 6pm", label: "Recovery", score: 75, trend: "up" }
  ];

  // Animate metrics
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const newValue = metric.value + (Math.random() * 6 - 3);
        const clampedValue = Math.max(
          metric.label.includes("Load") ? 20 : 50,
          Math.min(metric.label.includes("Load") ? 50 : 95, newValue)
        );
        
        const newData = [...metric.data.slice(1), { value: clampedValue, time: Date.now().toString() }];
        
        return { ...metric, value: Math.round(clampedValue), data: newData };
      }));

      setConfidenceScore(prev => Math.max(92, Math.min(99, prev + (Math.random() * 2 - 1))));
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Cycle through processing steps
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProcessingStep(prev => (prev + 1) % processingSteps.length);
      
      // Trigger AI thinking animation periodically
      if (Math.random() > 0.7) {
        setAiThinking(true);
        setTimeout(() => setAiThinking(false), 1500);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Cycle predictions
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentPrediction(prev => (prev + 1) % predictions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const MiniChart = ({ data, color }: { data: DataPoint[]; color: string }) => {
    const max = Math.max(...data.map(d => d.value));
    const min = Math.min(...data.map(d => d.value));
    const range = max - min || 1;

    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.value - min) / range) * 80 - 10;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg viewBox="0 0 100 100" className="w-full h-16" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <motion.polygon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${color.replace(/[^a-z0-9]/gi, '')})`}
        />
        
        {/* Line */}
        <motion.polyline
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Current value dot */}
        <motion.circle
          cx={100}
          cy={100 - ((data[data.length - 1].value - min) / range) * 80 - 10}
          r="3"
          fill={color}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    );
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-8 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal className="text-center mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Live Demo</span>
          <h2 className="text-large-display text-foreground">
            Watch Nova AI in action
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Real-time analysis of biometric data streams, generating predictions and optimising protocols autonomously.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main metrics panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Control bar */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/50">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: isPlaying ? [1, 0.4, 1] : 0.4 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs text-muted-foreground">
                  {isPlaying ? "Processing live data" : "Demo paused"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-8 px-3 text-xs gap-2"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
            </div>

            {/* Metrics grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${metric.color}15` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: metric.color }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{metric.label}</span>
                      </div>
                      <motion.div
                        key={metric.value}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-right"
                      >
                        <span className="text-xl font-semibold text-foreground">{metric.value}</span>
                        <span className="text-xs text-muted-foreground ml-1">{metric.unit}</span>
                      </motion.div>
                    </div>
                    <MiniChart data={metric.data} color={metric.color} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* AI Analysis panel */}
          <div className="space-y-4">
            {/* AI Status */}
            <motion.div 
              className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
              animate={{ 
                boxShadow: aiThinking 
                  ? ["0 0 0 0 hsl(var(--primary) / 0)", "0 0 30px 5px hsl(var(--primary) / 0.15)", "0 0 0 0 hsl(var(--primary) / 0)"]
                  : "0 0 0 0 hsl(var(--primary) / 0)"
              }}
              transition={{ duration: 1.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: aiThinking ? 360 : 0 }}
                  transition={{ duration: 2, repeat: aiThinking ? Infinity : 0, ease: "linear" }}
                  className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-foreground">Nova AI</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {aiThinking ? "Processing..." : "Analysing"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="text-foreground font-medium">{Math.round(confidenceScore)}%</span>
                </div>
                <div className="h-1.5 bg-background rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${confidenceScore}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={processingStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[11px] text-muted-foreground"
                  >
                    {processingSteps[processingStep]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Predictions */}
            <div className="p-5 rounded-2xl bg-card border border-border/50">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-4">72-Hour Forecast</p>
              
              <div className="space-y-3">
                {predictions.map((pred, index) => (
                  <motion.div
                    key={pred.time}
                    initial={{ opacity: 0.5, x: -10 }}
                    animate={{ 
                      opacity: currentPrediction === index ? 1 : 0.5,
                      x: currentPrediction === index ? 0 : -5,
                      scale: currentPrediction === index ? 1 : 0.98
                    }}
                    className={`p-3 rounded-xl transition-colors duration-300 ${
                      currentPrediction === index ? 'bg-primary/10 border border-primary/20' : 'bg-background/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-muted-foreground">{pred.time}</span>
                      <div className="flex items-center gap-1">
                        <Zap className={`w-3 h-3 ${pred.trend === 'up' ? 'text-green-500' : 'text-amber-500'}`} />
                        <span className={`text-xs font-medium ${pred.trend === 'up' ? 'text-green-500' : 'text-amber-500'}`}>
                          {pred.score}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-foreground font-medium">{pred.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-5 rounded-2xl bg-card border border-border/50"
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Auto-Adjustment</p>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-foreground font-medium">Protocol Updated</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    +100mg Magnesium tonight based on HRV trends
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom status bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-6 text-[10px] text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>4 biometric streams</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <span>&lt;50ms latency</span>
          <div className="w-px h-3 bg-border" />
          <span>Sample data • No account required</span>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveDemoSection;
