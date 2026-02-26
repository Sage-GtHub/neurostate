import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { 
  ArrowUp, 
  LogIn, 
  X, 
  Plus, 
  Copy, 
  Check, 
  RotateCcw, 
  PanelLeftOpen, 
  PanelLeftClose, 
  Trash2, 
  MessageSquare,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import neurostateIcon from "@/assets/neurostate-icon.svg";
import { format } from "date-fns";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

const QUICK_PROMPTS = [
  "What industries do you serve?",
  "How does the platform work?",
  "What ROI can we expect?",
  "Tell me about NeuroState AI",
];

// Basic spinner typing indicator
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 py-2">
      <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
      <span className="text-[10px] text-muted-foreground">Thinking...</span>
    </div>
  );
}

export function FloatingNovaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const messages = currentConversation?.messages || [];

  // Check auth status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load conversations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("floating-nova-conversations");
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

  // Save conversations
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("floating-nova-conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px';
    }
  }, [input]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/website-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      body: JSON.stringify({
        messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
      }),
    });

    if (!response.ok) {
      if (response.status === 429) throw new Error("Rate limit exceeded. Please wait a moment.");
      if (response.status === 402) throw new Error("Service temporarily unavailable.");
      throw new Error('Failed to get response');
    }

    if (!response.body) throw new Error('No response body');

    // Add empty assistant message
    updateConversation(conv => ({
      ...conv,
      messages: [...conv.messages, {
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString()
      }],
    }));

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let content = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const json = line.slice(6).trim();
        if (json === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(json);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            content += delta;
            updateConversation(conv => {
              const msgs = [...conv.messages];
              if (msgs.length === 0) return conv;
              msgs[msgs.length - 1] = {
                ...msgs[msgs.length - 1],
                role: "assistant",
                content,
                timestamp: new Date().toISOString()
              };
              return { ...conv, messages: msgs, updatedAt: new Date().toISOString() };
            });
          }
        } catch {
          // Incomplete JSON split across chunks: put it back and wait for more data
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    return content;
  }, [messages]);

  const handleSend = async (prompt?: string) => {
    const messageContent = prompt || input.trim();
    if (!messageContent || !currentConversationId) return;

    const userMessage: Message = { 
      role: "user", 
      content: messageContent, 
      timestamp: new Date().toISOString() 
    };
    
    updateConversation(conv => ({
      ...conv,
      messages: [...conv.messages, userMessage],
      title: conv.messages.length === 0 ? messageContent.slice(0, 25) + (messageContent.length > 25 ? "..." : "") : conv.title,
      updatedAt: new Date().toISOString(),
    }));

    setInput("");
    setIsLoading(true);

    try {
      await streamResponse(userMessage);
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to get response", 
        variant: "destructive" 
      });
      updateConversation(conv => ({
        ...conv,
        messages: conv.messages.filter(m => m.content !== ""),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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

  if (location.pathname.startsWith("/nova")) return null;

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-foreground text-background shadow-lg hover:scale-105 transition-transform flex items-center justify-center group"
        aria-label="Open chat"
      >
        <img src={neurostateIcon} alt="Neurostate" className="w-7 h-7 invert group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
      </button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="right" 
          hideCloseButton
          className="w-full sm:w-[420px] p-0 flex flex-col bg-background border-l border-border/30 overflow-hidden"
        >
          {/* History Sidebar */}
          <div 
            className={cn(
              "absolute inset-y-0 left-0 w-56 bg-muted/30 border-r border-border/30 z-20",
              "transform transition-transform duration-300 ease-out",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-3 border-b border-border/30">
                <span className="text-xs font-medium">History</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <PanelLeftClose className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto py-2">
                {conversations.length === 0 ? (
                  <p className="text-[10px] text-muted-foreground text-center py-6">No conversations</p>
                ) : (
                  <div className="space-y-0.5 px-2">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={cn(
                          "group flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-colors",
                          conv.id === currentConversationId 
                            ? "bg-accent/10 text-foreground" 
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => switchConversation(conv.id)}
                      >
                        <MessageSquare className="h-3 w-3 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] truncate">{conv.title}</p>
                          <p className="text-[9px] text-muted-foreground">
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
                          className="h-5 w-5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-border/30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    createNewConversation();
                    setSidebarOpen(false);
                  }}
                  className="w-full text-[10px] h-7"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  New Thread
                </Button>
              </div>
            </div>
          </div>

          {/* Overlay */}
          {sidebarOpen && (
            <div 
              className="absolute inset-0 bg-background/60 z-10"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-border/30">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(true)}
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
              >
                <PanelLeftOpen className="h-3.5 w-3.5" />
              </Button>
              <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center">
                <img src={neurostateIcon} alt="Neurostate" className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs font-medium text-foreground">NeuroState AI Agent</h2>
                <p className="text-[9px] text-muted-foreground">Your cognitive performance assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!isLoggedIn && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/auth');
                  }}
                  className="flex items-center gap-1 text-[9px] text-accent hover:underline mr-2"
                >
                  <LogIn className="w-2.5 h-2.5" />
                  Sign in
                </button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={createNewConversation}
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {!hasMessages ? (
              <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
                  <img src={neurostateIcon} alt="Neurostate" className="w-6 h-6 opacity-40" />
                </div>
                <p className="text-sm text-foreground mb-1">How can I help?</p>
                <p className="text-[10px] text-muted-foreground mb-6 text-center">
                  Ask about solutions, industries, or how NeuroState works
                </p>
                
                <div className="flex flex-wrap gap-1.5 justify-center max-w-xs">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      disabled={isLoading}
                      className="px-3 py-1.5 rounded-full bg-foreground/5 text-[10px] text-foreground/70 hover:bg-foreground/10 transition-colors disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className="space-y-2">
                      {msg.role === "user" ? (
                        <div className="flex justify-end">
                          <div className="max-w-[85%]">
                            <div className="bg-foreground text-background px-3 py-2 rounded-2xl rounded-br-sm">
                              <p className="text-[11px]">{msg.content}</p>
                            </div>
                            <p className="text-[8px] text-muted-foreground mt-1 text-right">
                              {format(new Date(msg.timestamp), "h:mm a")}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-lg bg-foreground/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <img src={neurostateIcon} alt="" className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                {msg.content ? (
                                  <>
                                    <ReactMarkdown
                                      components={{
                                        p: ({ children }) => <p className="text-[11px] leading-relaxed mb-2 last:mb-0 text-foreground/80">{children}</p>,
                                        ul: ({ children }) => <ul className="list-disc pl-3 mb-2 space-y-0.5 text-[11px]">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal pl-3 mb-2 space-y-0.5 text-[11px]">{children}</ol>,
                                        li: ({ children }) => <li className="text-foreground/70">{children}</li>,
                                        strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
                                        code: ({ children }) => (
                                          <code className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono">{children}</code>
                                        ),
                                      }}
                                    >
                                      {msg.content}
                                    </ReactMarkdown>
                                    {/* Streaming cursor */}
                                    {isLoading && i === messages.length - 1 && (
                                      <span className="inline-block w-0.5 h-3 bg-accent ml-0.5 animate-pulse" />
                                    )}
                                  </>
                                ) : (
                                  <TypingIndicator />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Action buttons */}
                          {msg.content && !isLoading && (
                            <div className="flex items-center gap-1 pl-8">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyMessage(i)}
                                className="h-6 px-2 text-[9px] text-muted-foreground hover:text-foreground"
                              >
                                {copiedIndex === i ? (
                                  <><Check className="w-2.5 h-2.5 mr-1" /> Copied</>
                                ) : (
                                  <><Copy className="w-2.5 h-2.5 mr-1" /> Copy</>
                                )}
                              </Button>
                              {i === messages.length - 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={regenerate}
                                  className="h-6 px-2 text-[9px] text-muted-foreground hover:text-foreground"
                                >
                                  <RotateCcw className="w-2.5 h-2.5 mr-1" /> Rewrite
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

            {/* Input */}
            <div className="border-t border-border/30 p-3">
              <div 
                className={cn(
                  "relative rounded-xl transition-all duration-200",
                  "bg-foreground/5 border",
                  isFocused 
                    ? "border-accent/50 shadow-md shadow-accent/5" 
                    : "border-border/30 hover:border-border/50"
                )}
              >
                <div className="flex items-end gap-2 p-2">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                    rows={1}
                    className={cn(
                      "flex-1 resize-none bg-transparent border-0",
                      "py-1.5 px-1 text-[16px] sm:text-[11px] placeholder:text-muted-foreground/50",
                      "focus:outline-none focus:ring-0",
                      "disabled:opacity-50",
                      "min-h-[32px] max-h-[80px]"
                    )}
                  />
                  <Button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className={cn(
                      "h-7 w-7 rounded-lg flex-shrink-0",
                      "bg-foreground text-background hover:bg-foreground/90",
                      "disabled:opacity-30"
                    )}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
