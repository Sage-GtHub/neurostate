import { useState, useEffect, useRef } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Watch, TrendingUp, Brain, Target, Sparkles, Send, Loader2, Zap, Shield, Clock, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { PhaseIndicator } from "@/components/nova/PhaseIndicator";
import { PredictiveInsights } from "@/components/nova/PredictiveInsights";
import { MorningCheckIn } from "@/components/nova/MorningCheckIn";
import { VoiceInterface } from "@/components/nova/VoiceInterface";
import { RealTimeSimulation } from "@/components/nova/RealTimeSimulation";
import { HealthForecast } from "@/components/nova/HealthForecast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Metric {
  label: string;
  value: string;
  trend?: string;
  icon: any;
  trendColor?: string;
}

export default function Nova() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3 | 4>(2);
  const [showMorningCheckIn, setShowMorningCheckIn] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMetrics();
    const initialMessage: Message = {
      role: "assistant",
      content: "I am Nova. I track your biology, spot patterns, and tell you exactly what you need. What do you want to optimise?"
    };
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMetrics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(20);

      if (data && data.length > 0) {
        const latestMetrics: Metric[] = [];
        
        const hrvMetrics = data.filter(m => m.metric_type === 'hrv');
        if (hrvMetrics.length > 0) {
          const latest = hrvMetrics[0];
          const previous = hrvMetrics[1];
          const change = previous ? ((parseFloat(latest.value.toString()) - parseFloat(previous.value.toString())) / parseFloat(previous.value.toString()) * 100).toFixed(0) : null;
          latestMetrics.push({
            label: "HRV",
            value: latest.value.toString(),
            trend: change ? `${parseFloat(change) > 0 ? '+' : ''}${change}%` : undefined,
            icon: Activity,
            trendColor: change && parseFloat(change) > 0 ? "text-accent" : "text-stone"
          });
        }

        const sleepMetrics = data.filter(m => m.metric_type === 'sleep_quality');
        if (sleepMetrics.length > 0) {
          latestMetrics.push({
            label: "Sleep",
            value: `${sleepMetrics[0].value}/10`,
            icon: Brain
          });
        }

        const focusMetrics = data.filter(m => m.metric_type === 'focus_time');
        if (focusMetrics.length > 0) {
          const total = focusMetrics.reduce((sum, m) => sum + parseFloat(m.value.toString()), 0);
          latestMetrics.push({
            label: "Focus",
            value: Math.round(total).toString(),
            icon: Target
          });
        }

        const recoveryMetrics = data.filter(m => m.metric_type === 'recovery');
        if (recoveryMetrics.length > 0) {
          const latest = recoveryMetrics[0];
          const previous = recoveryMetrics[1];
          const change = previous ? ((parseFloat(latest.value.toString()) - parseFloat(previous.value.toString())) / parseFloat(previous.value.toString()) * 100).toFixed(0) : null;
          latestMetrics.push({
            label: "Recovery",
            value: `${latest.value}%`,
            trend: change ? `${parseFloat(change) > 0 ? '+' : ''}${change}%` : undefined,
            icon: TrendingUp,
            trendColor: change && parseFloat(change) > 0 ? "text-accent" : "text-stone"
          });
        }

        setMetrics(latestMetrics);
      }
    } catch (error) {
      console.error("Error loading metrics:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to chat with Nova",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      await supabase.from('nova_chat_messages').insert({
        user_id: user.id,
        role: 'user',
        content: input
      });

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nova-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to get response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantMessage += content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: "assistant",
                    content: assistantMessage
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      await supabase.from('nova_chat_messages').insert({
        user_id: user.id,
        role: 'assistant',
        content: assistantMessage
      });

    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NovaSwipeWrapper>
      <div className="min-h-screen bg-white">
        <NovaNav />
      
        {/* Header */}
        <div className="border-b border-mist bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 sm:py-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-2">Cognitive Engine</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-carbon">Nova</h1>
                <p className="text-sm text-ash mt-1">Predicts. Adapts. Guides.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-accent animate-pulse' : 'bg-accent'}`} />
                <span className="text-xs text-stone">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-12">
          {/* What Nova Does */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-mist mb-12">
            {[
              { icon: Brain, title: "Predicts", desc: "72 hour forecasting" },
              { icon: Zap, title: "Adapts", desc: "Real time adjustments" },
              { icon: Shield, title: "Prevents", desc: "Burnout detection" },
              { icon: Clock, title: "Learns", desc: "Your biology over time" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 text-center">
                <item.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <p className="text-carbon font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-stone mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Live Metrics */}
          <div className="mb-12">
            <h2 className="text-lg font-bold text-carbon mb-6">Live Data</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.length > 0 ? metrics.map((metric, index) => (
                <div key={index} className="p-6 bg-pearl">
                  <div className="flex items-center gap-2 mb-3">
                    <metric.icon className="w-5 h-5 text-accent" />
                    <span className="text-xs text-stone uppercase tracking-wider">{metric.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-carbon">{metric.value}</p>
                  {metric.trend && (
                    <p className={`text-sm mt-1 ${metric.trendColor}`}>{metric.trend}</p>
                  )}
                </div>
              )) : (
                <>
                  {[
                    { label: "HRV", icon: Activity },
                    { label: "Sleep", icon: Brain },
                    { label: "Focus", icon: Target },
                    { label: "Recovery", icon: TrendingUp }
                  ].map((metric, index) => (
                    <div key={index} className="p-6 bg-pearl">
                      <div className="flex items-center gap-2 mb-3">
                        <metric.icon className="w-5 h-5 text-stone" />
                        <span className="text-xs text-stone uppercase tracking-wider">{metric.label}</span>
                      </div>
                      <p className="text-3xl font-bold text-stone/30">--</p>
                      <p className="text-xs text-stone mt-1">Connect device</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <div className="border border-mist bg-pearl/30">
                {/* Messages */}
                <div className="p-6 max-h-[500px] overflow-y-auto space-y-6">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}>
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-accent" />
                          </div>
                        </div>
                      )}
                      <div className={`max-w-[80%] ${message.role === "user" ? "bg-carbon text-ivory p-4" : ""}`}>
                        <p className={`text-sm leading-relaxed ${message.role === "assistant" ? "text-carbon" : ""}`}>
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-accent animate-spin" />
                      </div>
                      <p className="text-sm text-stone">Processing...</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input */}
                <div className="border-t border-mist p-4 bg-white">
                  <div className="flex gap-3">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about protocols, recovery, performance..."
                      disabled={isLoading}
                      className="flex-1 border-mist bg-pearl min-h-[44px]"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={isLoading || !input.trim()}
                      className="bg-carbon hover:bg-slate px-6 min-h-[44px]"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex justify-center mt-3">
                    <VoiceInterface onSpeakingChange={setIsSpeaking} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <PhaseIndicator currentPhase={currentPhase} />

              {currentPhase >= 2 && (
                <div>
                  <h3 className="text-sm font-bold text-carbon mb-4">Predictions</h3>
                  <PredictiveInsights 
                    insights={[
                      {
                        type: "warning",
                        title: "Recovery declining",
                        description: "HRV trend suggests you need more rest. Skip high intensity today.",
                        confidence: 87,
                        timeframe: "Next 24 hours"
                      },
                      {
                        type: "opportunity",
                        title: "Peak focus window",
                        description: "Based on your patterns, 9 to 11am is optimal for deep work.",
                        confidence: 92,
                        timeframe: "Tomorrow"
                      }
                    ]}
                  />
                </div>
              )}

              {/* Quick Actions */}
              <div className="p-6 bg-pearl">
                <h3 className="text-sm font-bold text-carbon mb-4">Actions</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist"
                    onClick={() => setShowAssessment(true)}
                  >
                    Start Protocol Assessment
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist"
                  >
                    View 7 Day Forecast
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-sm border-mist"
                  >
                    Adjust Protocol
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProtocolAssessment open={showAssessment} onOpenChange={setShowAssessment} />
    </NovaSwipeWrapper>
  );
}
