import { useEffect, useState } from "react";
import { Brain, MessageCircle, TrendingUp, Zap, Moon, Activity, Heart, Target } from "lucide-react";

// Simulated chat messages
const chatMessages = [
  { role: "user", text: "How's my recovery looking today?" },
  { role: "nova", text: "Based on your HRV of 68ms and 7.2hrs sleep, your recovery score is 82%. Great for high-intensity training!" },
  { role: "user", text: "What's my optimal focus window?" },
  { role: "nova", text: "Your peak cognitive window is 9:30-11:30 AM. I recommend tackling complex tasks then." },
  { role: "user", text: "Any supplement recommendations?" },
  { role: "nova", text: "Given your stress markers, consider 400mg Magnesium tonight and L-Theanine before your focus block." },
];

// Simulated metrics
const metricsData = [
  { icon: Heart, label: "HRV", value: 68, unit: "ms", trend: "+5%" },
  { icon: Moon, label: "Sleep", value: 7.2, unit: "hrs", trend: "+0.4" },
  { icon: Activity, label: "Readiness", value: 82, unit: "%", trend: "+8%" },
  { icon: Target, label: "Goals", value: 4, unit: "/5", trend: "On Track" },
];

// Simulated insights
const insightsData = [
  { type: "alert", title: "Stress Pattern Detected", desc: "HRV dropped 15% this week. Consider recovery protocol." },
  { type: "success", title: "Sleep Consistency", desc: "7-day streak! Your circadian rhythm is optimising." },
  { type: "tip", title: "Peak Performance", desc: "Schedule important meetings between 10-11 AM." },
];

const NovaInterfaceDemo = () => {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Cycle through chat messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev >= chatMessages.length) {
          return 0; // Reset to start
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(messageInterval);
  }, []);

  // Typing effect for Nova responses
  useEffect(() => {
    const currentMessage = chatMessages[visibleMessages - 1];
    if (currentMessage?.role === "nova") {
      setIsTyping(true);
      let i = 0;
      const text = currentMessage.text;
      setTypingText("");
      
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setTypingText(text.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 20);
      
      return () => clearInterval(typeInterval);
    }
  }, [visibleMessages]);

  // Cycle metrics highlight
  useEffect(() => {
    const metricInterval = setInterval(() => {
      setActiveMetricIndex((prev) => (prev + 1) % metricsData.length);
    }, 2000);
    return () => clearInterval(metricInterval);
  }, []);

  // Cycle insights
  useEffect(() => {
    const insightInterval = setInterval(() => {
      setActiveInsightIndex((prev) => (prev + 1) % insightsData.length);
    }, 4000);
    return () => clearInterval(insightInterval);
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-carbon/80 backdrop-blur-xl border border-ivory/10 shadow-2xl">
      {/* Glow effects - simplified on mobile */}
      <div className="hidden sm:block absolute -top-20 -right-20 w-40 h-40 bg-signal-green/20 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute -bottom-20 -left-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="relative flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-ivory/10 bg-carbon/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-signal-green to-emerald-600 flex items-center justify-center">
            <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-carbon" />
          </div>
          <div>
            <div className="text-ivory text-xs sm:text-sm font-semibold">Nova AI</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
              <span className="text-signal-green text-[8px] sm:text-[10px]">Active</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400/80" />
          <div className="w-2 h-2 rounded-full bg-amber-400/80" />
          <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
        </div>
      </div>

      {/* Main Content - Stack on mobile, grid on desktop */}
      <div className="relative flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-3 p-2 sm:p-3 h-[calc(100%-40px)] sm:h-[calc(100%-52px)] overflow-hidden">
        {/* Chat Interface */}
        <div className="flex flex-col bg-carbon/40 rounded-lg sm:rounded-xl border border-ivory/5 overflow-hidden min-h-0 flex-1 sm:flex-none">
          <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border-b border-ivory/5 shrink-0">
            <MessageCircle className="w-3 h-3 text-signal-green" />
            <span className="text-ivory/70 text-[10px] sm:text-xs font-medium">Chat</span>
          </div>
          
          <div className="flex-1 overflow-hidden p-1.5 sm:p-2 space-y-1.5 sm:space-y-2 min-h-0">
            {chatMessages.slice(0, Math.min(visibleMessages, 3)).map((msg, idx) => {
              const isLatest = idx === visibleMessages - 1;
              const isNova = msg.role === "nova";
              const displayText = isLatest && isNova ? typingText : msg.text;
              
              return (
                <div
                  key={idx}
                  className={`flex ${isNova ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[90%] sm:max-w-[85%] px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] leading-relaxed ${
                      isNova
                        ? 'bg-signal-green/10 text-ivory/90 border border-signal-green/20'
                        : 'bg-ivory/10 text-ivory/80'
                    }`}
                  >
                    {displayText.slice(0, 80)}{displayText.length > 80 ? '...' : ''}
                    {isLatest && isNova && isTyping && (
                      <span className="animate-pulse text-signal-green">|</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Input mock */}
          <div className="px-1.5 sm:px-2 pb-1.5 sm:pb-2 shrink-0">
            <div className="flex items-center gap-2 px-2 py-1 sm:px-2.5 sm:py-1.5 bg-ivory/5 rounded-lg border border-ivory/10">
              <span className="text-ivory/30 text-[9px] sm:text-[10px]">Ask Nova...</span>
            </div>
          </div>
        </div>

        {/* Right side - Metrics & Insights - Hidden on very small screens */}
        <div className="hidden sm:flex flex-col gap-2">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {metricsData.map((metric, idx) => {
              const MetricIcon = metric.icon;
              const isActive = idx === activeMetricIndex;
              
              return (
                <div
                  key={metric.label}
                  className={`relative p-2 rounded-lg border transition-all duration-500 ${
                    isActive
                      ? 'bg-signal-green/10 border-signal-green/30'
                      : 'bg-carbon/40 border-ivory/5'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <MetricIcon className={`w-3 h-3 ${isActive ? 'text-signal-green' : 'text-ivory/50'}`} />
                    <span className="text-ivory/60 text-[9px] uppercase tracking-wider">{metric.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-lg font-bold ${isActive ? 'text-signal-green' : 'text-ivory'}`}>
                      {metric.value}
                    </span>
                    <span className="text-ivory/40 text-[9px]">{metric.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart mock */}
          <div className="flex-1 bg-carbon/40 rounded-xl border border-ivory/5 p-2 overflow-hidden">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-3 h-3 text-signal-green" />
              <span className="text-ivory/70 text-[9px] font-medium uppercase tracking-wider">Weekly Trend</span>
            </div>
            
            <div className="flex items-end justify-between h-12 gap-1 px-1">
              {[65, 72, 58, 80, 75, 82, 78].map((value, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-0.5">
                  <div
                    className="w-full bg-gradient-to-t from-signal-green/80 to-signal-green/40 rounded-t"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-[6px] text-ivory/30">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="bg-carbon/40 rounded-xl border border-ivory/5 p-2 overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Zap className="w-3 h-3 text-amber-400" />
              <span className="text-ivory/70 text-[9px] font-medium uppercase tracking-wider">Insights</span>
            </div>
            
            <div className="relative h-8 overflow-hidden">
              {insightsData.map((insight, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-500 ${
                    idx === activeInsightIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="text-ivory text-[10px] font-medium leading-tight">
                    {insight.title}
                  </div>
                  <div className="text-ivory/50 text-[9px] leading-tight line-clamp-1">
                    {insight.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile-only: Compact metrics row */}
        <div className="flex sm:hidden gap-2 shrink-0">
          {metricsData.slice(0, 3).map((metric, idx) => {
            const MetricIcon = metric.icon;
            return (
              <div
                key={metric.label}
                className="flex-1 p-1.5 rounded-lg bg-carbon/40 border border-ivory/5"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <MetricIcon className="w-2.5 h-2.5 text-signal-green" />
                  <span className="text-ivory/60 text-[7px] uppercase">{metric.label}</span>
                </div>
                <div className="text-ivory text-sm font-bold">{metric.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NovaInterfaceDemo;
