import { useState, useEffect, useRef, useCallback } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Send, 
  Loader2, 
  Copy, 
  Check, 
  RotateCcw, 
  Trash2,
  Zap,
  Brain,
  Moon,
  Activity,
  ArrowUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import { NovaResponseCard } from "@/components/nova/NovaResponseCard";
import { NovaVoiceInterface } from "@/components/nova/NovaVoiceInterface";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const QUICK_ACTIONS = [
  { icon: Activity, label: "Analyse my HRV", prompt: "Analyse my recent HRV data and give me actionable insights", color: "from-emerald-500/20 to-emerald-500/5" },
  { icon: Moon, label: "Sleep protocol", prompt: "Create a personalised sleep optimisation protocol for me", color: "from-indigo-500/20 to-indigo-500/5" },
  { icon: Zap, label: "Energy boost", prompt: "I need more energy in the afternoon. What do you recommend?", color: "from-amber-500/20 to-amber-500/5" },
  { icon: Brain, label: "Focus stack", prompt: "Design a supplement stack for deep focus and cognitive performance", color: "from-violet-500/20 to-violet-500/5" },
];

const WELCOME_MESSAGE = `Here's what matters: I'm Nova, your cognitive operating system.

I analyse your biometrics, forecast outcomes, and recommend actions that improve cognition, focus, energy, and recovery.

**What I do:**
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
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
      } else {
        // Show welcome message with typing animation
        setIsTypingWelcome(true);
        setMessages([{
          role: "assistant",
          content: "",
          timestamp: new Date()
        }]);
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= WELCOME_MESSAGE.length) {
            setMessages([{
              role: "assistant",
              content: WELCOME_MESSAGE.slice(0, charIndex),
              timestamp: new Date()
            }]);
            charIndex += 2;
          } else {
            clearInterval(typeInterval);
            setIsTypingWelcome(false);
          }
        }, 12);
      }
      setIsLoadingHistory(false);
    };

    loadHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

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

    setMessages(prev => [...prev, { role: "assistant", content: "", timestamp: new Date() }]);

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
                role: "assistant",
                content: assistantContent,
                timestamp: new Date()
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

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
          }
        } catch { /* ignore */ }
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  // Premium Empty State
  const EmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-16">
      {/* Nova Avatar */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full nova-gradient blur-2xl opacity-30 scale-150" />
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl nova-gradient flex items-center justify-center nova-glow">
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-3 border-background flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center">
        Chat with Nova
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md mb-10 px-4 leading-relaxed">
        Your AI cognitive coach. Ask about protocols, recovery, supplements, or performance optimisation.
      </p>
      
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg px-2">
        {QUICK_ACTIONS.map((action, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(action.prompt)}
            disabled={isLoading}
            className={cn(
              "group relative flex items-center gap-4 p-4 rounded-2xl",
              "bg-gradient-to-br", action.color,
              "border border-border/30 hover:border-accent/30",
              "transition-all duration-300 text-left",
              "hover:shadow-lg hover:-translate-y-0.5",
              "nova-card-hover"
            )}
          >
            <div className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
              "bg-background/80 group-hover:bg-background transition-colors"
            )}>
              <action.icon className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">{action.label}</span>
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
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl nova-gradient blur-xl opacity-40" />
                <div className="relative w-16 h-16 rounded-2xl nova-gradient flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-white" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Loading conversation...</p>
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
        description="Have a conversation with Nova, your elite AI performance coach. Get personalised advice on protocols, recovery, and optimisation."
      />
      <div className="min-h-screen bg-background flex flex-col">
        <NovaNav />
      
        {/* Premium Header */}
        <div className="nova-glass border-b border-border/30 sticky top-[57px] z-30">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-3">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div className="flex items-center gap-4">
                {/* Nova Avatar with Ring */}
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-xl nova-avatar-ring" />
                  <div className="relative w-11 h-11 rounded-xl nova-gradient flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <h1 className="text-base font-semibold text-foreground">Nova</h1>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-xs text-muted-foreground">Online • AI Cognitive Coach</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Voice Interface */}
                <NovaVoiceInterface 
                  onTranscript={(text, role) => {
                    if (role === "user") {
                      setMessages(prev => [...prev, { role: "user", content: text, timestamp: new Date() }]);
                    } else {
                      setMessages(prev => [...prev, { role: "assistant", content: text, timestamp: new Date() }]);
                    }
                  }}
                />
                {messages.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearHistory}
                    className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="container mx-auto px-3 sm:px-6 md:px-12 lg:px-20 xl:px-32 flex-1 flex flex-col">
            <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
              
              {messages.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {/* Messages */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto py-6 space-y-1"
                  >
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "group py-3 px-1 nova-message-animate",
                          message.role === "assistant" && "hover:bg-muted/20 rounded-2xl"
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className={cn(
                          "flex gap-3",
                          message.role === "user" && "flex-row-reverse"
                        )}>
                          {/* Nova Avatar */}
                          {message.role === "assistant" && (
                            <div className="flex-shrink-0">
                              <div className="w-9 h-9 rounded-xl nova-gradient flex items-center justify-center nova-glow-sm">
                                <Sparkles className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                          
                          {/* Message Content */}
                          <div className={cn(
                            "flex-1 min-w-0",
                            message.role === "user" && "flex flex-col items-end"
                          )}>
                            {message.role === "user" ? (
                              <div className="max-w-[85%]">
                                <div className="nova-bubble-user px-4 py-3 shadow-sm">
                                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1.5 mr-1">
                                  {formatTime(message.timestamp)}
                                </p>
                              </div>
                            ) : (
                              <NovaResponseCard
                                content={message.content}
                                timestamp={message.timestamp}
                                confidence="high"
                                baselineDays={14}
                                isStreaming={isLoading && index === messages.length - 1 && !message.content}
                                onCopy={() => copyToClipboard(message.content, `msg-${index}`)}
                                onRegenerate={index === messages.length - 1 && !isLoading ? regenerateLastResponse : undefined}
                                isCopied={copiedId === `msg-${index}`}
                                showActions={true}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </>
              )}
              
              {/* Premium Input Area */}
              <div className="py-4 px-1 border-t border-border/20 bg-gradient-to-t from-background via-background to-transparent sticky bottom-0 pb-safe">
                <div 
                  className="relative flex items-end gap-3 nova-input-focus rounded-2xl border border-border/50 bg-muted/20 p-2 transition-all duration-200"
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Nova..."
                    disabled={isLoading}
                    rows={1}
                    className={cn(
                      "flex-1 resize-none bg-transparent border-0",
                      "px-3 py-2.5 text-[15px] sm:text-sm placeholder:text-muted-foreground/60",
                      "focus:outline-none focus:ring-0",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                  <Button
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSendMessage();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSendMessage();
                    }}
                    disabled={!input.trim() || isLoading}
                    className={cn(
                      "flex-shrink-0 h-11 w-11 rounded-xl",
                      "nova-fab text-white",
                      "disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
                      "touch-manipulation"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ArrowUp className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground/60 text-center mt-2 hidden sm:block">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
