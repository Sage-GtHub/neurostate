import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Sparkles, X, MessageSquare, Plus, Copy, Check, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

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
  "What helps with better sleep?",
  "Tell me about your bundles",
  "How does red light therapy work?",
  "Which supplements support recovery?",
];

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
  const [showHistory, setShowHistory] = useState(false);
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
      messages: [{
        role: "assistant",
        content: "I am Nova, your NeuroState performance assistant. How can I help you optimise your performance today?",
        timestamp: new Date().toISOString(),
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setConversations(prev => [newConv, ...prev]);
    setCurrentConversationId(newConv.id);
    setShowHistory(false);
  };

  const updateConversation = (updater: (conv: Conversation) => Conversation) => {
    setConversations(prev => prev.map(c => c.id === currentConversationId ? updater(c) : c));
  };

  const getPageContext = () => {
    const path = location.pathname;
    if (path.startsWith('/product/')) return `User is viewing a product page: ${path}`;
    if (path.includes('bundles')) return 'User is viewing product bundles';
    if (path.includes('shop')) return 'User is browsing the shop';
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
      title: conv.messages.length === 1 ? text.slice(0, 30) + (text.length > 30 ? "..." : "") : conv.title,
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

  const copyMessage = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
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

  const deleteConversation = (id: string) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (id === currentConversationId) {
        if (filtered.length > 0) {
          setCurrentConversationId(filtered[0].id);
        } else {
          createNewConversation();
          return prev;
        }
      }
      return filtered;
    });
  };

  const clearAll = () => {
    setConversations([]);
    localStorage.removeItem("guest-nova-conversations");
    createNewConversation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    if (isToday(d)) return format(d, "HH:mm");
    if (isYesterday(d)) return `Yesterday ${format(d, "HH:mm")}`;
    return format(d, "dd MMM HH:mm");
  };

  const groupByDate = () => {
    const groups: Record<string, Conversation[]> = {};
    conversations.forEach(c => {
      const d = new Date(c.updatedAt);
      const key = isToday(d) ? "Today" : isYesterday(d) ? "Yesterday" : format(d, "dd MMM yyyy");
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    });
    return groups;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" hideCloseButton className="w-full sm:w-[420px] p-0 flex flex-col h-full bg-background border-l border-border/50">
        {/* Header */}
        <SheetHeader className="border-b border-border/50 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <SheetTitle className="text-base font-semibold text-foreground">Nova</SheetTitle>
                <p className="text-xs text-muted-foreground truncate">
                  {currentConversation?.title || "Performance assistant"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setShowHistory(!showHistory)} className="h-8 w-8">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={createNewConversation}>
                    <Plus className="h-4 w-4 mr-2" /> New conversation
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearAll} className="text-destructive">
                    <X className="h-4 w-4 mr-2" /> Clear all
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        {showHistory ? (
          <ScrollArea className="flex-1">
            <div className="p-4">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">History</h3>
              {Object.entries(groupByDate()).map(([date, convs]) => (
                <div key={date} className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">{date}</p>
                  <div className="space-y-1">
                    {convs.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setCurrentConversationId(c.id); setShowHistory(false); }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          c.id === currentConversationId ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{c.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {c.messages.length} messages · {formatDistanceToNow(new Date(c.updatedAt), { addSuffix: true })}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 flex-shrink-0 opacity-0 group-hover:opacity-100"
                            onClick={(e) => { e.stopPropagation(); deleteConversation(c.id); }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                    {msg.role === "assistant" && (
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                        </div>
                      </div>
                    )}
                    <div className={`group relative max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-foreground text-background px-3 py-2 rounded-2xl rounded-br-sm"
                        : ""
                    }`}>
                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground text-sm">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                              ul: ({ children }) => <ul className="mb-2 list-disc pl-4 space-y-1">{children}</ul>,
                              li: ({ children }) => <li>{children}</li>,
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              a: ({ href, children }) => (
                                <a href={href} className="text-accent hover:underline" target={href?.startsWith('http') ? '_blank' : undefined}>
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {msg.content || "..."}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      )}
                      
                      {msg.role === "assistant" && msg.content && (
                        <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-muted-foreground"
                            onClick={() => copyMessage(msg.content, i)}
                          >
                            {copiedIndex === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </Button>
                          {i === messages.length - 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-muted-foreground"
                              onClick={regenerate}
                              disabled={isLoading}
                            >
                              <RotateCcw className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && messages[messages.length - 1]?.content === "" && (
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                      <Loader2 className="w-3.5 h-3.5 text-accent animate-spin" />
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                {/* Quick suggestions */}
                {messages.length === 1 && (
                  <div className="pt-2 space-y-2">
                    <p className="text-xs text-muted-foreground">Quick questions</p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_SUGGESTIONS.map((s, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="text-xs h-auto py-1.5 px-3"
                          onClick={() => handleSend(s)}
                          disabled={isLoading}
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>


            {/* Input */}
            <div className="border-t border-border/50 p-3">
              <div className="flex gap-2 items-end">
                <Textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about products, protocols..."
                  disabled={isLoading}
                  className="flex-1 resize-none min-h-[40px] max-h-[120px] text-sm"
                  rows={1}
                />
                <Button
                  size="icon"
                  onClick={() => handleSend()}
                  disabled={isLoading || !message.trim()}
                  className="h-10 w-10"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                Nova helps with product questions, not medical advice
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
