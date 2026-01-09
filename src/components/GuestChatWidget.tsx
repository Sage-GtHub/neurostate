import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, ArrowUp, RotateCcw, Copy, Check, ExternalLink, PanelLeftOpen, PanelLeftClose, Trash2, MessageSquare, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

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

const QUICK_SUGGESTIONS = [
  "What is NeuroState?",
  "How does Nova AI work?",
  "Tell me about enterprise pricing",
  "What integrations do you support?",
];

// Perplexity-style typing indicator with animated dots
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-2">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-accent/70"
            style={{
              animation: 'typingDot 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground ml-2">Searching...</span>
    </div>
  );
}

interface GuestChatWidgetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GuestChatWidget({ open, onOpenChange }: GuestChatWidgetProps) {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast: showToast } = useToast();
  const location = useLocation();

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

  useEffect(() => {
    const saved = localStorage.getItem("guest-nova-conversations");
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

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("guest-nova-conversations", JSON.stringify(conversations));
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

  const getPageContext = () => {
    const path = location.pathname;
    if (path.includes('nova')) return 'User is viewing Nova AI pages';
    if (path.includes('solutions')) return 'User is viewing solutions';
    if (path.includes('industries')) return 'User is viewing industry solutions';
    if (path.includes('contact')) return 'User is on the contact page';
    return 'User is on the NeuroState website';
  };

  const streamResponse = useCallback(async (userMsg: Message) => {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: `Context: ${getPageContext()}. User is not logged in.` },
          ...messages.map(({ role, content }) => ({ role, content })),
          { role: userMsg.role, content: userMsg.content }
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) throw new Error("Rate limit exceeded. Please try again in a moment.");
      if (status === 402) throw new Error("Service temporarily unavailable.");
      throw new Error("Failed to get response");
    }

    if (!response.body) throw new Error("No response body");

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

    return content;
  }, [messages, getPageContext]);

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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        hideCloseButton 
        className="w-full sm:w-[500px] md:w-[600px] p-0 flex flex-col h-full bg-background border-l border-border/30 overflow-hidden"
      >
        {/* Conversation History Sidebar - Perplexity style */}
        <div 
          className={cn(
            "absolute inset-y-0 left-0 w-64 bg-muted/30 border-r border-border/30 z-20",
            "transform transition-transform duration-300 ease-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-3 border-b border-border/30">
              <span className="text-sm font-medium">History</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
              >
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {conversations.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-8">No conversations yet</p>
              ) : (
                <div className="space-y-1 px-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={cn(
                        "group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
                        conv.id === currentConversationId 
                          ? "bg-accent/10 text-foreground" 
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => switchConversation(conv.id)}
                    >
                      <MessageSquare className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{conv.title}</p>
                        <p className="text-[10px] text-muted-foreground">
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
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-3 border-t border-border/30">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  createNewConversation();
                  setSidebarOpen(false);
                }}
                className="w-full text-xs"
              >
                <Plus className="h-3 w-3 mr-2" />
                New Thread
              </Button>
            </div>
          </div>
        </div>

        {/* Overlay when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="absolute inset-0 bg-background/60 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Minimal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 relative z-0">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </Button>
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
              <span className="text-xs font-bold text-white">N</span>
            </div>
            <span className="font-medium text-sm">Nova</span>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={createNewConversation}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!hasMessages ? (
            /* Empty State - Perplexity style centered */
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-white">N</span>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                How can I help you?
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm">
                Ask me anything about NeuroState's enterprise cognitive performance platform.
              </p>
              
              {/* Quick suggestions grid */}
              <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                {QUICK_SUGGESTIONS.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion)}
                    disabled={isLoading}
                    className={cn(
                      "text-left px-4 py-3 rounded-xl text-sm",
                      "bg-muted/50 border border-border/50",
                      "hover:bg-muted hover:border-border",
                      "transition-all duration-200",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages Area */
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className="space-y-4">
                    {msg.role === "user" ? (
                      /* User message - Perplexity style */
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium">You</span>
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-foreground font-medium">{msg.content}</p>
                        </div>
                      </div>
                    ) : (
                      /* Assistant message - Perplexity style with sources look */
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-white">N</span>
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              {msg.content ? (
                                <ReactMarkdown
                                  components={{
                                    p: ({ children }) => <p className="text-foreground leading-relaxed mb-3 last:mb-0">{children}</p>,
                                    ul: ({ children }) => <ul className="list-disc pl-4 mb-3 space-y-1">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-3 space-y-1">{children}</ol>,
                                    li: ({ children }) => <li className="text-foreground">{children}</li>,
                                    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                                    a: ({ href, children }) => (
                                      <a href={href} className="text-accent hover:underline inline-flex items-center gap-1">
                                        {children}
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    ),
                                    code: ({ children }) => (
                                      <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">{children}</code>
                                    ),
                                  }}
                                >
                                  {msg.content}
                                </ReactMarkdown>
                              ) : (
                                <TypingIndicator />
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action buttons for assistant messages */}
                        {msg.content && !isLoading && (
                          <div className="flex items-center gap-1 pl-10">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyMessage(i)}
                              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                            >
                              {copiedIndex === i ? (
                                <><Check className="w-3 h-3 mr-1" /> Copied</>
                              ) : (
                                <><Copy className="w-3 h-3 mr-1" /> Copy</>
                              )}
                            </Button>
                            {i === messages.length - 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={regenerate}
                                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                              >
                                <RotateCcw className="w-3 h-3 mr-1" /> Rewrite
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input Area - Perplexity style */}
          <div className="border-t border-border/30 bg-background p-4">
            <div className="max-w-2xl mx-auto">
              <div 
                className={cn(
                  "relative rounded-2xl transition-all duration-200",
                  "bg-muted/40 border",
                  isFocused 
                    ? "border-accent/50 shadow-lg shadow-accent/5" 
                    : "border-border/50 hover:border-border"
                )}
              >
                <div className="flex items-end gap-2 p-3">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Ask follow-up..."
                    disabled={isLoading}
                    rows={1}
                    className={cn(
                      "flex-1 resize-none bg-transparent border-0",
                      "py-2 px-1 text-sm placeholder:text-muted-foreground/50",
                      "focus:outline-none focus:ring-0",
                      "disabled:opacity-50",
                      "min-h-[40px] max-h-[120px]"
                    )}
                  />
                  <Button
                    onClick={() => handleSend()}
                    disabled={!message.trim() || isLoading}
                    size="icon"
                    className={cn(
                      "h-9 w-9 rounded-xl flex-shrink-0",
                      "bg-accent text-accent-foreground hover:bg-accent/90",
                      "disabled:opacity-30"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowUp className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
                Nova may make mistakes. Verify important information.
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
