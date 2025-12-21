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
  MessageSquare,
  Zap,
  Brain,
  Moon,
  Activity
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

import { SEO } from "@/components/SEO";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const QUICK_ACTIONS = [
  { icon: Activity, label: "Analyse my HRV", prompt: "Analyse my recent HRV data and give me actionable insights" },
  { icon: Moon, label: "Sleep protocol", prompt: "Create a personalised sleep optimisation protocol for me" },
  { icon: Zap, label: "Energy boost", prompt: "I need more energy in the afternoon. What do you recommend?" },
  { icon: Brain, label: "Focus stack", prompt: "Design a supplement stack for deep focus and cognitive performance" },
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
        // Show welcome message with typing animation for new users
        setIsTypingWelcome(true);
        setMessages([{
          role: "assistant",
          content: "",
          timestamp: new Date()
        }]);
        
        // Animate the welcome message
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= WELCOME_MESSAGE.length) {
            setMessages([{
              role: "assistant",
              content: WELCOME_MESSAGE.slice(0, charIndex),
              timestamp: new Date()
            }]);
            charIndex += 2; // Type 2 chars at a time for speed
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

  // Empty state - no messages
  const EmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 text-center">Chat with Nova</h2>
      <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md mb-6 sm:mb-8 px-4">
        Your AI performance coach. Ask about protocols, recovery, or supplements.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-w-lg px-2">
        {QUICK_ACTIONS.map((action, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(action.prompt)}
            disabled={isLoading}
            className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-border hover:shadow-sm transition-all text-left min-h-[52px]"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <action.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <span className="text-sm font-medium text-foreground">{action.label}</span>
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
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
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
      
        {/* Header - Mobile optimised */}
        <div className="border-b border-border/30 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-3 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-2 sm:py-3">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent border-2 border-background" />
                </div>
                <div>
                  <h1 className="text-base font-semibold text-foreground">Nova</h1>
                  <p className="text-xs text-muted-foreground">AI Cognitive Coach</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearHistory}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container - Mobile optimised */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="container mx-auto px-2 sm:px-6 md:px-12 lg:px-20 xl:px-32 flex-1 flex flex-col">
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
                          "group py-4 px-1 transition-colors",
                          message.role === "user" ? "" : "hover:bg-muted/20 rounded-xl"
                        )}
                      >
                        <div className={cn(
                          "flex gap-3",
                          message.role === "user" ? "flex-row-reverse" : ""
                        )}>
                          {/* Avatar */}
                          {message.role === "assistant" && (
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-accent" />
                              </div>
                            </div>
                          )}
                          
                          {/* Message Content */}
                          <div className={cn(
                            "flex-1 min-w-0",
                            message.role === "user" ? "flex flex-col items-end" : ""
                          )}>
                            {message.role === "user" ? (
                              <div className="max-w-[85%]">
                                <div className="bg-foreground text-background px-4 py-3 rounded-2xl rounded-tr-md shadow-sm">
                                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 mr-1">
                                  {formatTime(message.timestamp)}
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {message.content ? (
                                  <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90">
                                    <ReactMarkdown
                                      components={{
                                        p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                                        ul: ({ children }) => <ul className="mb-3 list-disc pl-5 space-y-1">{children}</ul>,
                                        ol: ({ children }) => <ol className="mb-3 list-decimal pl-5 space-y-1">{children}</ol>,
                                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                                        h1: ({ children }) => <h1 className="text-lg font-bold mb-3 mt-4 first:mt-0">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-base font-semibold mb-2 mt-4 first:mt-0">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-sm font-semibold mb-2 mt-3 first:mt-0">{children}</h3>,
                                        code: ({ children }) => (
                                          <code className="bg-muted/50 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                                        ),
                                        pre: ({ children }) => (
                                          <pre className="bg-muted/50 p-3 rounded-lg overflow-x-auto my-3">{children}</pre>
                                        ),
                                        blockquote: ({ children }) => (
                                          <blockquote className="border-l-2 border-accent/50 pl-4 italic text-muted-foreground my-3">{children}</blockquote>
                                        ),
                                      }}
                                    >
                                    {message.content}
                                    </ReactMarkdown>
                                    {isTypingWelcome && index === 0 && (
                                      <span className="inline-block w-1.5 h-4 bg-accent animate-pulse ml-0.5 align-middle" />
                                    )}
                                    
                                    {/* Quick action buttons after welcome message */}
                                    {!isTypingWelcome && index === 0 && messages.length === 1 && (
                                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {QUICK_ACTIONS.map((action, i) => (
                                          <button
                                            key={i}
                                            onClick={() => handleSendMessage(action.prompt)}
                                            disabled={isLoading}
                                            className="group flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-accent/30 hover:shadow-sm transition-all text-left"
                                          >
                                            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                              <action.icon className="w-4 h-4 text-accent" />
                                            </div>
                                            <span className="text-sm font-medium text-foreground">{action.label}</span>
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 py-2">
                                    <div className="flex gap-1">
                                      <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                      <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                      <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                    <span className="text-xs text-muted-foreground">Nova is thinking...</span>
                                  </div>
                                )}
                                
                                {/* Action buttons for assistant messages */}
                                {message.content && (
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                                      onClick={() => copyToClipboard(message.content, `msg-${index}`)}
                                    >
                                      {copiedId === `msg-${index}` ? (
                                        <Check className="w-3 h-3" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </Button>
                                    {index === messages.length - 1 && !isLoading && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                                        onClick={regenerateLastResponse}
                                      >
                                        <RotateCcw className="w-3 h-3" />
                                      </Button>
                                    )}
                                    <span className="text-[10px] text-muted-foreground ml-2">
                                      {formatTime(message.timestamp)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </>
              )}
              
              {/* Input Area - Mobile optimised */}
              <div className="py-3 sm:py-4 px-1 border-t border-border/30 bg-background sticky bottom-0 pb-safe">
                <div 
                  className="relative flex items-end gap-2"
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
                      "flex-1 resize-none rounded-xl border border-border/50 bg-muted/30",
                      "px-3 sm:px-4 py-3 text-base sm:text-sm placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "transition-all duration-200"
                    )}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
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
                      "flex-shrink-0 h-12 w-12 sm:h-10 sm:w-10 rounded-xl",
                      "bg-accent hover:bg-accent/90 text-accent-foreground",
                      "disabled:opacity-30 disabled:cursor-not-allowed",
                      "transition-all duration-200 touch-manipulation"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-1.5 sm:mt-2 hidden sm:block">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
