import { useState, useEffect, useRef } from "react";
import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Watch, TrendingUp, Brain, Target, Sparkles, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { PhaseIndicator } from "@/components/nova/PhaseIndicator";
import { PredictiveInsights } from "@/components/nova/PredictiveInsights";
import { MorningCheckIn } from "@/components/nova/MorningCheckIn";

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
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3 | 4>(1);
  const [showMorningCheckIn, setShowMorningCheckIn] = useState(true);
  const [predictiveInsights, setPredictiveInsights] = useState<any[]>([]);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMetrics();
    const initialMessage: Message = {
      role: "assistant",
      content: "Hello! I'm Nova, your AI performance assistant. I'm here to help you improve your cognitive performance, recovery, and overall wellbeing. How can I help you today?"
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
            label: "HRV Score",
            value: latest.value.toString(),
            trend: change ? `${parseFloat(change) > 0 ? '+' : ''}${change}%` : undefined,
            icon: Activity,
            trendColor: change && parseFloat(change) > 0 ? "text-[#10b981]" : "text-ash"
          });
        }

        const sleepMetrics = data.filter(m => m.metric_type === 'sleep_quality');
        if (sleepMetrics.length > 0) {
          latestMetrics.push({
            label: "Sleep Quality",
            value: `${sleepMetrics[0].value}/10`,
            icon: Brain
          });
        }

        const focusMetrics = data.filter(m => m.metric_type === 'focus_time');
        if (focusMetrics.length > 0) {
          const total = focusMetrics.reduce((sum, m) => sum + parseFloat(m.value.toString()), 0);
          latestMetrics.push({
            label: "Focus Sessions",
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
            trendColor: change && parseFloat(change) > 0 ? "text-[#10b981]" : "text-ash"
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
        title: "Authentication required",
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
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      {/* Header */}
      <div className="border-b border-mist bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-h3 font-semibold text-carbon">Nova – AI Performance Assistant</h1>
            <div className="flex items-center gap-2 text-sm text-ash">
              <div className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span>Synced 2 min ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Chat + Metrics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Morning Check-in (Phase 2) */}
            {showMorningCheckIn && currentPhase >= 2 && (
              <MorningCheckIn
                data={{
                  sleepHours: 6.2,
                  hrvChange: -8,
                  recoveryScore: 72,
                  recommendation: "Your recovery is declining. Skip high-intensity training today. Focus on recovery protocols and light movement.",
                  adjustedProtocol: [
                    "Increased Magnesium Complex to 600mg",
                    "Added L-Theanine 200mg for stress management",
                    "Reduced morning stimulants"
                  ]
                }}
                onDismiss={() => setShowMorningCheckIn(false)}
              />
            )}
            {/* Chat Interface */}
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                  {messages.map((message, index) => (
                    <div key={index} className="flex gap-4">
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-carbon flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-ivory" />
                          </div>
                        </div>
                      )}
                      <div className={`flex-1 ${message.role === "user" ? "ml-auto max-w-[80%]" : ""}`}>
                        <div className={`${message.role === "user" ? "bg-pearl p-4 rounded-lg" : ""}`}>
                          <p className="text-body text-carbon leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-carbon flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-ivory animate-spin" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-body text-ash">Nova is typing...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Nova about supplements, protocols, or performance..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Live Metrics */}
            <div>
              <h2 className="text-h3 font-semibold text-carbon mb-6">Live Metrics</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.length > 0 ? metrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <metric.icon className="w-4 h-4 text-ash" />
                        <span className="text-caption text-ash uppercase tracking-wider">{metric.label}</span>
                      </div>
                      <div className="text-[2rem] font-semibold text-carbon mb-1">{metric.value}</div>
                      {metric.trend && (
                        <div className={`text-caption ${metric.trendColor || "text-ash"}`}>{metric.trend}</div>
                      )}
                    </CardContent>
                  </Card>
                )) : (
                  <>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-ash" />
                          <span className="text-caption text-ash uppercase tracking-wider">HRV Score</span>
                        </div>
                        <div className="text-[2rem] font-semibold text-carbon mb-1">--</div>
                        <div className="text-caption text-ash">No data</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-ash" />
                          <span className="text-caption text-ash uppercase tracking-wider">Sleep Quality</span>
                        </div>
                        <div className="text-[2rem] font-semibold text-carbon mb-1">--</div>
                        <div className="text-caption text-ash">No data</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-ash" />
                          <span className="text-caption text-ash uppercase tracking-wider">Focus Sessions</span>
                        </div>
                        <div className="text-[2rem] font-semibold text-carbon mb-1">--</div>
                        <div className="text-caption text-ash">No data</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-ash" />
                          <span className="text-caption text-ash uppercase tracking-wider">Recovery</span>
                        </div>
                        <div className="text-[2rem] font-semibold text-carbon mb-1">--</div>
                        <div className="text-caption text-ash">No data</div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Devices + Phase + Insights */}
          <div className="space-y-8">
            {/* Phase Indicator */}
            <PhaseIndicator currentPhase={currentPhase} />

            {/* Predictive Insights (Phase 2+) */}
            {currentPhase >= 2 && (
              <div>
                <h3 className="text-body font-semibold text-carbon mb-4">Predictive Insights</h3>
                <PredictiveInsights 
                  insights={[
                    {
                      type: "warning",
                      title: "Performance Decline Predicted",
                      description: "Your recovery is declining. Expect reduced performance in 2-3 days unless you adjust protocol.",
                      confidence: 87,
                      timeframe: "2-3 days"
                    },
                    {
                      type: "pattern",
                      title: "Sleep Pattern Identified",
                      description: "Your best sleep happens when you take magnesium before 8pm and avoid screens after 9pm.",
                      confidence: 92,
                      timeframe: "Ongoing"
                    }
                  ]}
                />
              </div>
            )}

            {/* Connected Devices */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-body font-semibold text-carbon mb-4">Connected Devices</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border-2 border-carbon" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-carbon">Oura Ring Gen 3</div>
                        <div className="text-caption text-ash">2 minutes ago</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center">
                        <Watch className="w-5 h-5 text-carbon" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-carbon">Apple Watch Ultra</div>
                        <div className="text-caption text-ash">5 minutes ago</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Manage Devices
                </Button>
              </CardContent>
            </Card>

            {/* Nova Intelligence */}
            <Card className="bg-carbon text-ivory">
              <CardContent className="p-6">
                <h3 className="text-body font-semibold mb-6">Nova Intelligence</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-caption text-pearl uppercase tracking-wider mb-1">Data Points Analysed</div>
                    <div className="text-[2rem] font-semibold">12,847</div>
                  </div>
                  <div>
                    <div className="text-caption text-pearl uppercase tracking-wider mb-1">Insights Generated</div>
                    <div className="text-[2rem] font-semibold">156</div>
                  </div>
                  <div>
                    <div className="text-caption text-pearl uppercase tracking-wider mb-1">Performance Gain</div>
                    <div className="text-[2rem] font-semibold text-[#10b981]">+23%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Get Started CTA */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-body font-semibold text-carbon mb-3">Get Started</h3>
                <p className="text-sm text-ash mb-4 leading-relaxed">
                  Take our 2-minute assessment for a personalised supplement protocol
                </p>
                <Button className="w-full" onClick={() => setShowAssessment(true)}>Start Assessment</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ProtocolAssessment 
        open={showAssessment} 
        onOpenChange={setShowAssessment}
        onComplete={loadMetrics}
      />
    </div>
  );
}
