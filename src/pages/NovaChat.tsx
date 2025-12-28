import { useState, useEffect, useRef, useCallback } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Loader2, 
  Trash2,
  Zap,
  Brain,
  Moon,
  Activity,
  ArrowUp,
  Target,
  Heart,
  Copy,
  Check,
  RotateCcw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import { NovaVoiceInterfaceEnhanced } from "@/components/nova/NovaVoiceInterfaceEnhanced";
import { PerplexityInput } from "@/components/nova/PerplexityInput";
import { SourceCitation } from "@/components/nova/SourceCitation";
import { useNovaUsage } from "@/hooks/useNovaUsage";
import ReactMarkdown from "react-markdown";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  sources?: Array<{ title: string; type?: "study" | "article"; confidence?: "high" | "medium" }>;
}

const QUICK_SUGGESTIONS = [
  { icon: Activity, label: "Analyse my HRV", prompt: "Analyse my recent HRV data and give me actionable insights" },
  { icon: Moon, label: "Optimise sleep", prompt: "Create a personalised sleep optimisation protocol for me" },
  { icon: Zap, label: "Boost energy", prompt: "I need more energy in the afternoon. What do you recommend?" },
  { icon: Brain, label: "Focus stack", prompt: "Design a supplement stack for deep focus and cognitive performance" },
  { icon: Target, label: "Recovery plan", prompt: "Create an optimal recovery protocol for today" },
  { icon: Heart, label: "Stress protocol", prompt: "What's the best protocol for managing acute stress?" },
];

export default function NovaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Nova usage tracking
  const { startSession, incrementMessages, endSession, currentSessionId } = useNovaUsage();
  const sessionIdRef = useRef<string | null>(null);

  // Start session on mount
  useEffect(() => {
    const initSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const newSessionId = await startSession('chat');
        if (newSessionId) {
          sessionIdRef.current = newSessionId;
        }
      }
    };
    initSession();

    // End session on unmount
    return () => {
      if (sessionIdRef.current) {
        endSession(sessionIdRef.current);
      }
    };
  }, [startSession, endSession]);

  useEffect(() => {
    const loadHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoadingHistory(false);
        return;
      }

      const { data: history } = await supabase
        .from('nova_chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(50);

      if (history && history.length > 0) {
        setMessages(history.map(h => ({
          id: h.id,
          role: h.role as "user" | "assistant",
          content: h.content,
          timestamp: new Date(h.created_at)
        })));
      }
      setIsLoadingHistory(false);
    };

    loadHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const streamChat = useCallback(async (userMessage: Message) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nova-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantContent = "";
    let textBuffer = "";

    setMessages(prev => [...prev, { 
      role: "assistant", 
      content: "", 
      timestamp: new Date(),
      sources: [
        { title: "Huberman Lab", type: "article", confidence: "high" },
        { title: "PubMed Central", type: "study", confidence: "high" },
      ]
    }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                ...newMessages[newMessages.length - 1],
                content: assistantContent,
              };
              return newMessages;
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    return assistantContent;
  }, [messages]);

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || input.trim();
    if (!content || isLoading) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to chat with Nova",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { role: "user", content, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      await supabase.from('nova_chat_messages').insert({
        user_id: user.id,
        role: 'user',
        content
      });

      const assistantContent = await streamChat(userMessage);

      if (assistantContent) {
        await supabase.from('nova_chat_messages').insert({
          user_id: user.id,
          role: 'assistant',
          content: assistantContent
        });
        
        // Track usage - increment message count for this session
        if (sessionIdRef.current) {
          await incrementMessages(sessionIdRef.current, assistantContent.length);
        }
      }

    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      setMessages(prev => prev.filter(m => m.content !== ""));
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast({ description: "Copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('nova_chat_messages').delete().eq('user_id', user.id);
    setMessages([]);
    toast({ description: "Conversation cleared" });
  };

  const regenerateLastResponse = async () => {
    if (messages.length < 2) return;
    
    const lastUserMessageIndex = [...messages].reverse().findIndex(m => m.role === "user");
    if (lastUserMessageIndex === -1) return;

    const actualIndex = messages.length - 1 - lastUserMessageIndex;
    const lastUserMessage = messages[actualIndex];
    
    setMessages(prev => prev.slice(0, actualIndex));
    
    setTimeout(() => handleSendMessage(lastUserMessage.content), 100);
  };

  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const EmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 min-h-[60vh]">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-foreground/5 blur-2xl scale-150" />
        <div className="relative w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-foreground/60" />
        </div>
      </div>
      
      <h1 className="text-2xl sm:text-3xl font-medium text-foreground mb-3 tracking-tight">
        nova
      </h1>
      <p className="text-foreground/50 text-sm text-center max-w-md mb-12">
        Your cognitive performance engine. Ask about protocols, recovery, or optimisation.
      </p>
      
      <div className="w-full max-w-2xl mb-10">
        <PerplexityInput
          value={input}
          onChange={setInput}
          onSubmit={() => handleSendMessage()}
          isLoading={isLoading}
          placeholder="Ask anything about your health, performance, or protocols..."
        />
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {QUICK_SUGGESTIONS.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(suggestion.prompt)}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px]",
              "bg-white text-foreground/60 border border-foreground/5",
              "hover:bg-foreground/5 hover:text-foreground hover:border-foreground/10",
              "transition-all duration-200",
              "disabled:opacity-50"
            )}
          >
            <suggestion.icon className="w-3 h-3" />
            {suggestion.label}
          </button>
        ))}
      </div>
    </div>
  );

  if (isLoadingHistory) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />
              </div>
              <p className="text-[11px] text-foreground/40">Loading...</p>
            </div>
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Nova AI | Predictive Cognitive Modelling Interface"
        description="Interact with Nova's multi-model AI engine for real-time cognitive forecasting, performance analytics, and predictive insights."
      />
      <div className="min-h-screen bg-background flex flex-col">
        <NovaNav />
        
        {/* Floating orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      
        {messages.length > 0 && (
          <div className="relative border-b border-foreground/5 sticky top-[57px] z-30 bg-background/80 backdrop-blur-xl">
            <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-3">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-foreground/60" />
                  </div>
                  <div>
                    <h1 className="text-xs font-medium text-foreground">Nova</h1>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <p className="text-[10px] text-foreground/40">Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <NovaVoiceInterfaceEnhanced 
                    onTranscript={(text, role) => {
                      if (role === "user") {
                        handleSendMessage(text);
                      } else {
                        setMessages(prev => [...prev, { role: "assistant", content: text, timestamp: new Date() }]);
                      }
                    }}
                  />
                  <button
                    onClick={clearHistory}
                    className="p-2 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden flex flex-col relative">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32 flex-1 flex flex-col">
            <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
              
              {messages.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto py-8 space-y-6"
                  >
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className="animate-fade-in"
                        style={{ animationDelay: `${Math.min(index * 30, 150)}ms` }}
                      >
                        {message.role === "user" ? (
                          <div className="flex justify-end">
                            <div className="max-w-[80%]">
                              <div className="bg-foreground text-background px-5 py-3 rounded-2xl rounded-br-md">
                                <p className="text-xs leading-relaxed">{message.content}</p>
                              </div>
                              <p className="text-[9px] text-foreground/30 mt-1.5 text-right">
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
                                <Sparkles className="w-3.5 h-3.5 text-foreground/60" />
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0 space-y-4">
                              {message.content ? (
                                <div className="prose prose-sm max-w-none">
                                  <ReactMarkdown
                                    components={{
                                      p: ({ children }) => <p className="mb-3 last:mb-0 text-xs leading-relaxed text-foreground/80">{children}</p>,
                                      strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
                                      ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3 text-xs">{children}</ul>,
                                      ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3 text-xs">{children}</ol>,
                                      li: ({ children }) => <li className="text-foreground/70">{children}</li>,
                                      code: ({ children }) => (
                                        <code className="px-1.5 py-0.5 rounded bg-foreground/5 text-foreground text-[10px] font-mono">
                                          {children}
                                        </code>
                                      ),
                                    }}
                                  >
                                    {message.content}
                                  </ReactMarkdown>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-pulse" />
                                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
                                </div>
                              )}
                              
                              {message.sources && message.sources.length > 0 && message.content && (
                                <SourceCitation sources={message.sources} />
                              )}
                              
                              {message.content && (
                                <div className="flex items-center gap-2 pt-1">
                                  <button
                                    onClick={() => copyToClipboard(message.content, message.id || index.toString())}
                                    className="p-1.5 rounded-full text-foreground/30 hover:text-foreground/60 hover:bg-foreground/5 transition-all"
                                  >
                                    {copiedId === (message.id || index.toString()) ? (
                                      <Check className="w-3 h-3" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                  {index === messages.length - 1 && (
                                    <button
                                      onClick={regenerateLastResponse}
                                      className="p-1.5 rounded-full text-foreground/30 hover:text-foreground/60 hover:bg-foreground/5 transition-all"
                                    >
                                      <RotateCcw className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="sticky bottom-0 py-6 bg-gradient-to-t from-background via-background to-transparent">
                    <PerplexityInput
                      value={input}
                      onChange={setInput}
                      onSubmit={() => handleSendMessage()}
                      isLoading={isLoading}
                      placeholder="Follow up..."
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}