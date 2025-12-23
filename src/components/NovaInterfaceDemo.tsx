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
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-carbon/80 backdrop-blur-xl border border-ivory/10 shadow-2xl">
      {/* Glow effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-signal-green/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="relative flex items-center justify-between px-4 py-3 border-b border-ivory/10 bg-carbon/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-signal-green to-emerald-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-carbon" />
          </div>
          <div>
            <div className="text-ivory text-sm font-semibold">Nova AI</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
              <span className="text-signal-green text-[10px]">Active</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative grid grid-cols-2 gap-3 p-3 h-[calc(100%-52px)]">
        {/* Left: Chat Interface */}
        <div className="flex flex-col bg-carbon/40 rounded-xl border border-ivory/5 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-ivory/5">
            <MessageCircle className="w-3.5 h-3.5 text-signal-green" />
            <span className="text-ivory/70 text-xs font-medium">Chat</span>
          </div>
          
          <div className="flex-1 overflow-hidden p-2 space-y-2">
            {chatMessages.slice(0, visibleMessages).map((msg, idx) => {
              const isLatest = idx === visibleMessages - 1;
              const isNova = msg.role === "nova";
              const displayText = isLatest && isNova ? typingText : msg.text;
              
              return (
                <div
                  key={idx}
                  className={`flex ${isNova ? 'justify-start' : 'justify-end'} animate-fade-in`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div
                    className={`max-w-[85%] px-2.5 py-1.5 rounded-lg text-[10px] leading-relaxed ${
                      isNova
                        ? 'bg-signal-green/10 text-ivory/90 border border-signal-green/20'
                        : 'bg-ivory/10 text-ivory/80'
                    }`}
                  >
                    {displayText}
                    {isLatest && isNova && isTyping && (
                      <span className="animate-pulse text-signal-green">|</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Input mock */}
          <div className="px-2 pb-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-ivory/5 rounded-lg border border-ivory/10">
              <span className="text-ivory/30 text-[10px]">Ask Nova anything...</span>
            </div>
          </div>
        </div>

        {/* Right: Metrics & Insights */}
        <div className="flex flex-col gap-2">
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
                      ? 'bg-signal-green/10 border-signal-green/30 scale-[1.02]'
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
                  <div className={`text-[8px] ${isActive ? 'text-signal-green' : 'text-emerald-400/60'}`}>
                    {metric.trend}
                  </div>
                  
                  {isActive && (
                    <div className="absolute inset-0 bg-signal-green/5 rounded-lg animate-pulse" />
                  )}
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
            
            {/* Animated bar chart */}
            <div className="flex items-end justify-between h-16 gap-1 px-1">
              {[65, 72, 58, 80, 75, 82, 78].map((value, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-signal-green/80 to-signal-green/40 rounded-t transition-all duration-1000"
                    style={{
                      height: `${value}%`,
                      animationDelay: `${idx * 0.1}s`,
                    }}
                  />
                  <span className="text-[7px] text-ivory/30">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Insights carousel */}
          <div className="bg-carbon/40 rounded-xl border border-ivory/5 p-2 overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Zap className="w-3 h-3 text-amber-400" />
              <span className="text-ivory/70 text-[9px] font-medium uppercase tracking-wider">Insights</span>
            </div>
            
            <div className="relative h-10 overflow-hidden">
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
                  <div className="text-ivory/50 text-[9px] leading-tight line-clamp-2">
                    {insight.desc}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Insight dots */}
            <div className="flex justify-center gap-1 mt-1">
              {insightsData.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1 h-1 rounded-full transition-all ${
                    idx === activeInsightIndex ? 'bg-signal-green w-3' : 'bg-ivory/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(16, 185, 129, 0.03) 50%, transparent 100%)',
          animation: 'scanline 4s linear infinite',
        }}
      />

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default NovaInterfaceDemo;
