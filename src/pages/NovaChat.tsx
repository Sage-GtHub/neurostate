import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  ArrowUp, 
  RotateCcw, 
  Copy, 
  Check, 
  PanelLeftOpen, 
  PanelLeftClose, 
  Trash2, 
  MessageSquare, 
  Loader2, 
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { NovaNav } from "@/components/NovaNav";
import { NovaChatDiagnostics } from "@/components/nova/NovaChatDiagnostics";
import { DeviceStatusIndicator } from "@/components/nova/DeviceStatusIndicator";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

const QUICK_ACTIONS = [
  { label: "What's my readiness today?", icon: "🎯" },
  { label: "Show my sleep trends", icon: "😴" },
  { label: "Optimise my schedule", icon: "📅" },
  { label: "Analyse my recovery", icon: "💪" },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 py-2">
      <Loader2 className="w-4 h-4 animate-spin text-accent/70" />
      <span className="text-sm text-muted-foreground">Thinking...</span>
    </div>
  );
}

export default function NovaChat() {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [diagnostics, setDiagnostics] = useState({
    requestId: null as string | null,
    lastError: null as { message: string; timestamp: Date } | null,
    streamingState: "idle" as "idle" | "connecting" | "streaming" | "complete" | "error",
    persistenceState: {
      userMessage: null as "pending" | "saved" | "failed" | null,
      assistantMessage: null as "pending" | "saved" | "failed" | null,
    },
    threadId: null as string | null,
    mode: "default" as "default" | "focus",
    messageCount: 0,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast: showToast } = useToast();

  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const messages = currentConversation?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  // Load conversations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("nova-chat-conversations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConversations(parsed);
        if (parsed.length > 0) {
          setCurrentConversationId(parsed[0].id);
        } else {
          createNewConversation();
        }
      } catch {
        createNewConversation();
      }
    } else {
      createNewConversation();
    }
  }, []);

  // Save conversations to localStorage
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("nova-chat-conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  const createNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "New conversation",
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setConversations(prev => [newConv, ...prev]);
    setCurrentConversationId(newConv.id);
  };

  const updateConversation = (updater: (conv: Conversation) => Conversation) => {
    setConversations(prev => prev.map(c => c.id === currentConversationId ? updater(c) : c));
  };

  const streamResponse = useCallback(async (userMsg: Message) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setDiagnostics(prev => ({ ...prev, requestId, streamingState: "connecting", lastError: null }));

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          ...messages.map(({ role, content }) => ({ role, content })),
          { role: userMsg.role, content: userMsg.content }
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      let errorMsg = "Failed to get response";
      if (status === 429) errorMsg = "Rate limit exceeded. Please try again in a moment.";
      if (status === 402) errorMsg = "Service temporarily unavailable.";
      setDiagnostics(prev => ({ ...prev, streamingState: "error", lastError: { message: errorMsg, timestamp: new Date() } }));
      throw new Error(errorMsg);
    }

    if (!response.body) {
      const errorMsg = "No response body";
      setDiagnostics(prev => ({ ...prev, streamingState: "error", lastError: { message: errorMsg, timestamp: new Date() } }));
      throw new Error(errorMsg);
    }

    setDiagnostics(prev => ({ ...prev, streamingState: "streaming" }));

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let content = "";

    // Add empty assistant message
    updateConversation(conv => ({
      ...conv,
      messages: [...conv.messages, { role: "assistant", content: "", timestamp: new Date().toISOString() }],
    }));

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;

        const json = line.slice(6).trim();
        if (json === "[DONE]") break;

        try {
          const parsed = JSON.parse(json);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            content += delta;
            updateConversation(conv => {
              const msgs = [...conv.messages];
              msgs[msgs.length - 1] = { role: "assistant", content, timestamp: new Date().toISOString() };
              return { ...conv, messages: msgs, updatedAt: new Date().toISOString() };
            });
          }
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    setDiagnostics(prev => ({ ...prev, streamingState: "complete" }));
    return content;
  }, [messages, updateConversation]);

  const handleSend = async (customMsg?: string) => {
    const text = customMsg || message.trim();
    if (!text || isLoading || !currentConversationId) return;

    const userMsg: Message = { role: "user", content: text, timestamp: new Date().toISOString() };
    
    updateConversation(conv => ({
      ...conv,
      messages: [...conv.messages, userMsg],
      title: conv.messages.length === 0 ? text.slice(0, 30) + (text.length > 30 ? "..." : "") : conv.title,
      updatedAt: new Date().toISOString(),
    }));

    setMessage("");
    setIsLoading(true);

    try {
      await streamResponse(userMsg);
    } catch (error) {
      showToast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      updateConversation(conv => ({
        ...conv,
        messages: conv.messages.filter(m => m.content !== ""),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const copyMessage = async (index: number) => {
    const msg = messages[index];
    if (msg) {
      await navigator.clipboard.writeText(msg.content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const regenerate = async () => {
    if (messages.length < 2) return;
    const lastUserIdx = [...messages].reverse().findIndex(m => m.role === "user");
    if (lastUserIdx === -1) return;
    
    const idx = messages.length - 1 - lastUserIdx;
    const lastUserMsg = messages[idx];
    
    updateConversation(conv => ({ ...conv, messages: conv.messages.slice(0, idx) }));
    setTimeout(() => handleSend(lastUserMsg.content), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const deleteConversation = (convId: string) => {
    setConversations(prev => prev.filter(c => c.id !== convId));
    if (currentConversationId === convId) {
      const remaining = conversations.filter(c => c.id !== convId);
      if (remaining.length > 0) {
        setCurrentConversationId(remaining[0].id);
      } else {
        createNewConversation();
      }
    }
  };

  const switchConversation = (convId: string) => {
    setCurrentConversationId(convId);
    setSidebarOpen(false);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NovaNav />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Conversation History Sidebar */}
        <div 
          className={cn(
            "absolute inset-y-0 left-0 w-[85%] max-w-[280px] bg-muted/30 backdrop-blur-sm border-r border-border/30 z-20",
            "transform transition-transform duration-300 ease-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <span className="text-base font-medium">History</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="h-10 w-10 text-muted-foreground hover:text-foreground touch-manipulation"
              >
                <PanelLeftClose className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto py-2 overscroll-contain">
              {conversations.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No conversations yet</p>
              ) : (
                <div className="space-y-1 px-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={cn(
                        "group flex items-center gap-3 px-3 py-3.5 rounded-xl cursor-pointer transition-colors touch-manipulation",
                        conv.id === currentConversationId 
                          ? "bg-accent/10 text-foreground" 
                          : "active:bg-muted/70 text-muted-foreground"
                      )}
                      onClick={() => switchConversation(conv.id)}
                    >
                      <MessageSquare className="h-5 w-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{conv.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {format(new Date(conv.updatedAt), "MMM d, h:mm a")}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}
                        className="h-9 w-9 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-muted-foreground hover:text-destructive touch-manipulation"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-border/30 pb-safe">
              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  createNewConversation();
                  setSidebarOpen(false);
                }}
                className="w-full h-11 text-sm touch-manipulation"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Thread
              </Button>
            </div>
          </div>
        </div>

        {/* Overlay when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-border/30 relative z-0 min-h-[56px]">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)}
              className="h-10 w-10 text-muted-foreground hover:text-foreground touch-manipulation"
            >
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-base">Nova</span>
          </div>
          <div className="flex items-center gap-0.5">
            <NovaChatDiagnostics state={{
              ...diagnostics,
              threadId: currentConversationId,
            }} />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={createNewConversation}
              className="h-10 w-10 text-muted-foreground hover:text-foreground touch-manipulation"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Device Status Indicator */}
        <DeviceStatusIndicator />

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!hasMessages ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
              <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center mb-5 sm:mb-6">
                <Sparkles className="h-7 w-7 sm:h-6 sm:w-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-xl font-semibold text-foreground mb-2 text-center">
                How can I help you?
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-6 sm:mb-8 max-w-sm px-2">
                Ask me anything about your cognitive performance, recovery, and protocols.
              </p>
              
              {/* Quick action buttons */}
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 w-full max-w-md px-2">
                {QUICK_ACTIONS.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(action.label)}
                    disabled={isLoading}
                    className={cn(
                      "flex items-center gap-3 text-left px-4 py-3.5 sm:py-3 rounded-xl text-sm",
                      "bg-muted/50 border border-border/50",
                      "active:bg-muted active:border-border sm:hover:bg-muted sm:hover:border-border",
                      "transition-all duration-200 touch-manipulation",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages Area */
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-5 sm:space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className="space-y-3 sm:space-y-4">
                    {msg.role === "user" ? (
                      /* User message */
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium">You</span>
                        </div>
                        <div className="flex-1 pt-1.5 sm:pt-1">
                          <p className="text-foreground font-medium text-[15px] sm:text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    ) : (
                      /* Assistant message */
                      <div className="space-y-2.5 sm:space-y-3">
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-white" />
                          </div>
                          <div className="flex-1 pt-1.5 sm:pt-1">
                            {msg.content ? (
                              <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                                <ReactMarkdown
                                  components={{
                                    p: ({ children }) => <p className="mb-3 last:mb-0 text-[15px] sm:text-sm">{children}</p>,
                                    ul: ({ children }) => <ul className="mb-3 ml-4 list-disc space-y-1">{children}</ul>,
                                    ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal space-y-1">{children}</ol>,
                                    li: ({ children }) => <li className="text-[15px] sm:text-sm">{children}</li>,
                                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                    a: ({ href, children }) => (
                                      <a href={href} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                                        {children}
                                      </a>
                                    ),
                                  }}
                                >
                                  {msg.content}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              <TypingIndicator />
                            )}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        {msg.content && (
                          <div className="flex items-center gap-1 ml-10 sm:ml-10">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyMessage(i)}
                              className="h-8 w-8 text-muted-foreground hover:text-foreground touch-manipulation"
                            >
                              {copiedIndex === i ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            {i === messages.length - 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={regenerate}
                                disabled={isLoading}
                                className="h-8 w-8 text-muted-foreground hover:text-foreground touch-manipulation"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-white" />
                    </div>
                    <div className="flex-1 pt-1.5 sm:pt-1">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border/30 p-3 sm:p-4 pb-safe">
            <div className="max-w-2xl mx-auto">
              <div className={cn(
                "flex items-end gap-2 p-2 rounded-2xl border bg-muted/30 transition-colors",
                "border-border/50 focus-within:border-accent/50"
              )}>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Nova anything..."
                  rows={1}
                  disabled={isLoading}
                  className={cn(
                    "flex-1 resize-none bg-transparent border-0 focus:ring-0 focus:outline-none",
                    "text-[15px] sm:text-sm text-foreground placeholder:text-muted-foreground",
                    "py-2.5 px-2 min-h-[44px] max-h-[120px]"
                  )}
                  data-swipe-ignore="true"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!message.trim() || isLoading}
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-xl flex-shrink-0 touch-manipulation",
                    message.trim() && !isLoading
                      ? "bg-accent hover:bg-accent/90 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowUp className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Nova can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
