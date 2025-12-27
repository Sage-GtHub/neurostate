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
  Mic,
  Copy,
  Check,
  RotateCcw,
  MicOff
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import { NovaVoiceInterfaceEnhanced } from "@/components/nova/NovaVoiceInterfaceEnhanced";
import { PerplexityInput } from "@/components/nova/PerplexityInput";
import { SourceCitation } from "@/components/nova/SourceCitation";
import ReactMarkdown from "react-markdown";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  sources?: Array<{ title: string; type?: "study" | "article"; confidence?: "high" | "medium" }>;
}

// Perplexity-style quick suggestions - minimal pills
const QUICK_SUGGESTIONS = [
  { icon: Activity, label: "Analyse my HRV", prompt: "Analyse my recent HRV data and give me actionable insights" },
  { icon: Moon, label: "Optimise sleep", prompt: "Create a personalised sleep optimisation protocol for me" },
  { icon: Zap, label: "Boost energy", prompt: "I need more energy in the afternoon. What do you recommend?" },
  { icon: Brain, label: "Focus stack", prompt: "Design a supplement stack for deep focus and cognitive performance" },
  { icon: Target, label: "Recovery plan", prompt: "Create an optimal recovery protocol for today" },
  { icon: Heart, label: "Stress protocol", prompt: "What's the best protocol for managing acute stress?" },
];

const WELCOME_MESSAGE = `I'm Nova, your cognitive performance engine.

I analyse your biometrics, forecast outcomes, and recommend actions that improve cognition, focus, energy, and recovery.

**What I can help with:**
• Interpret HRV, sleep, and recovery patterns
• Design personalised supplement protocols  
• Identify the levers that matter most

What outcome are we optimising for?`;

export default function NovaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTypingWelcome, setIsTypingWelcome] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load chat history
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

  // Perplexity-style empty state - centered, minimal
  const EmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 min-h-[60vh]">
      {/* Logo/Brand */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-2xl nova-gradient blur-2xl opacity-20 scale-150" />
        <div className="relative w-16 h-16 rounded-2xl nova-gradient flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
      </div>
      
      {/* Perplexity-style branding */}
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">
        nova
      </h1>
      <p className="text-muted-foreground text-center max-w-md mb-10">
        Your cognitive performance engine. Ask about protocols, recovery, or optimisation.
      </p>
      
      {/* Perplexity-style input */}
      <div className="w-full max-w-2xl mb-8">
        <PerplexityInput
          value={input}
          onChange={setInput}
          onSubmit={() => handleSendMessage()}
          isLoading={isLoading}
          placeholder="Ask anything about your health, performance, or protocols..."
        />
      </div>
      
      {/* Quick suggestion pills - Perplexity style */}
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {QUICK_SUGGESTIONS.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(suggestion.prompt)}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm",
              "bg-muted/50 text-muted-foreground border border-border/50",
              "hover:bg-muted hover:text-foreground hover:border-border",
              "transition-all duration-200",
              "disabled:opacity-50"
            )}
          >
            <suggestion.icon className="w-3.5 h-3.5" />
            {suggestion.label}
          </button>
        ))}
      </div>
    </div>
  );

  // Loading state
  if (isLoadingHistory) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl nova-gradient blur-xl opacity-40" />
                <div className="relative w-14 h-14 rounded-2xl nova-gradient flex items-center justify-center">
                  <Loader2 className="w-7 h-7 animate-spin text-white" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Chat with Nova – AI Performance Coach | NeuroState"
        description="Have a conversation with Nova, your elite AI performance coach."
      />
      <div className="min-h-screen bg-background flex flex-col">
        <NovaNav />
      
        {/* Minimal header - only show when in conversation */}
        {messages.length > 0 && (
          <div className="border-b border-border/30 sticky top-[57px] z-30 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-3">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl nova-gradient flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-sm font-medium text-foreground">Nova</h1>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <p className="text-[11px] text-muted-foreground">Online</p>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearHistory}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="container mx-auto px-3 sm:px-6 md:px-12 lg:px-20 xl:px-32 flex-1 flex flex-col">
            <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
              
              {messages.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {/* Messages - Perplexity/ChatGPT style */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto py-6 space-y-6"
                  >
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "nova-fade-up",
                        )}
                        style={{ animationDelay: `${Math.min(index * 30, 150)}ms` }}
                      >
                        {message.role === "user" ? (
                          // User message - right aligned, bubble
                          <div className="flex justify-end">
                            <div className="max-w-[80%]">
                              <div className="bg-accent text-accent-foreground px-4 py-3 rounded-2xl rounded-br-md">
                                <p className="text-sm leading-relaxed">{message.content}</p>
                              </div>
                              <p className="text-[10px] text-muted-foreground mt-1 text-right">
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ) : (
                          // Assistant message - Perplexity style with avatar
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-xl nova-gradient flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0 space-y-3">
                              {/* Content */}
                              {message.content ? (
                                <div className="prose prose-sm prose-invert max-w-none">
                                  <ReactMarkdown
                                    components={{
                                      p: ({ children }) => <p className="mb-3 last:mb-0 text-sm leading-relaxed text-foreground">{children}</p>,
                                      strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                                      ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3 text-sm">{children}</ul>,
                                      ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3 text-sm">{children}</ol>,
                                      li: ({ children }) => <li className="text-foreground/90">{children}</li>,
                                      code: ({ children }) => (
                                        <code className="px-1.5 py-0.5 rounded bg-muted text-accent text-xs font-mono">
                                          {children}
                                        </code>
                                      ),
                                    }}
                                  >
                                    {message.content}
                                  </ReactMarkdown>
                                </div>
                              ) : isLoading && index === messages.length - 1 ? (
                                // Typing indicator
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.2s" }} />
                                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.4s" }} />
                                </div>
                              ) : null}
                              
                              {/* Streaming cursor */}
                              {isLoading && index === messages.length - 1 && message.content && (
                                <span className="inline-block w-0.5 h-4 bg-accent ml-0.5 cursor-blink" />
                              )}
                              
                              {/* Sources - Perplexity style */}
                              {message.sources && message.content && !isLoading && (
                                <SourceCitation sources={message.sources} className="pt-2" />
                              )}
                              
                              {/* Actions */}
                              {message.content && !isLoading && (
                                <div className="flex items-center gap-1 pt-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(message.content, `msg-${index}`)}
                                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                  >
                                    {copiedId === `msg-${index}` ? (
                                      <Check className="w-3.5 h-3.5 text-green-500" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </Button>
                                  {index === messages.length - 1 && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={regenerateLastResponse}
                                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                    >
                                      <RotateCcw className="w-3.5 h-3.5" />
                                    </Button>
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
                  
                  {/* Input area - Perplexity style at bottom */}
                  <div className="py-4 sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent">
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