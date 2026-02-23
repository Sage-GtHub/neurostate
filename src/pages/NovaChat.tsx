import { useState, useRef, useEffect, useCallback, memo } from "react";
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
  Zap,
  Brain,
  Activity,
  Moon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { NovaNav } from "@/components/NovaNav";
import { NovaChatDiagnostics } from "@/components/nova/NovaChatDiagnostics";
import { DeviceStatusIndicator } from "@/components/nova/DeviceStatusIndicator";
import { motion, AnimatePresence } from "framer-motion";

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
  { label: "What's my readiness today?", icon: Brain, gradient: "from-violet-500/10 to-indigo-500/10", border: "border-violet-500/20" },
  { label: "Show my sleep trends", icon: Moon, gradient: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/20" },
  { label: "Optimise my schedule", icon: Zap, gradient: "from-amber-500/10 to-orange-500/10", border: "border-amber-500/20" },
  { label: "Analyse my recovery", icon: Activity, gradient: "from-emerald-500/10 to-teal-500/10", border: "border-emerald-500/20" },
];

function StreamingDots() {
  return (
    <div className="flex items-center gap-1.5 py-3 px-1">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent/60"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground/60 ml-1.5 font-medium tracking-wide">Thinking</span>
    </div>
  );
}

const MessageBubble = memo(({ msg, index, isLast, copiedIndex, onCopy, onRegenerate, isLoading }: {
  msg: Message;
  index: number;
  isLast: boolean;
  copiedIndex: number | null;
  onCopy: (i: number) => void;
  onRegenerate: () => void;
  isLoading: boolean;
}) => {
  if (msg.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] sm:max-w-[75%]">
          <div className="bg-foreground text-background rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
            <p className="text-[15px] sm:text-sm leading-relaxed">{msg.content}</p>
          </div>
          <p className="text-[10px] text-muted-foreground/40 text-right mt-1.5 mr-1 font-mono">
            {format(new Date(msg.timestamp), "h:mm a")}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="space-y-1.5"
    >
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-accent/20">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          {msg.content ? (
            <div className="prose prose-sm max-w-none text-foreground">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-3 last:mb-0 text-[15px] sm:text-sm leading-[1.7] text-foreground/90">{children}</p>,
                  ul: ({ children }) => <ul className="mb-3 ml-4 list-disc space-y-1.5">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal space-y-1.5">{children}</ol>,
                  li: ({ children }) => <li className="text-[15px] sm:text-sm leading-[1.6] text-foreground/85">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  h1: ({ children }) => <h1 className="text-lg font-semibold text-foreground mt-4 mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-semibold text-foreground mt-3 mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-semibold text-foreground mt-3 mb-1.5">{children}</h3>,
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="px-1.5 py-0.5 rounded-md bg-muted text-[13px] font-mono text-accent">{children}</code>
                    ) : (
                      <code className={cn("block bg-muted/50 rounded-lg p-3 text-[13px] font-mono overflow-x-auto", className)}>
                        {children}
                      </code>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-accent/30 pl-4 italic text-foreground/70">{children}</blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-accent hover:text-accent/80 underline underline-offset-2 decoration-accent/30 hover:decoration-accent/60 transition-colors" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          ) : (
            <StreamingDots />
          )}
        </div>
      </div>
      
      {/* Actions — subtle, appear on hover */}
      {msg.content && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-0.5 ml-10"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCopy(index)}
            className="h-7 w-7 text-muted-foreground/40 hover:text-foreground transition-colors"
          >
            {copiedIndex === index ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
          {isLast && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRegenerate}
              disabled={isLoading}
              className="h-7 w-7 text-muted-foreground/40 hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
});

MessageBubble.displayName = "MessageBubble";

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
  const conversationsRef = useRef<Conversation[]>([]);
  const { toast: showToast } = useToast();

  useEffect(() => { conversationsRef.current = conversations; }, [conversations]);

  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const messages = currentConversation?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [message]);

  useEffect(() => {
    const saved = localStorage.getItem("nova-chat-conversations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConversations(parsed);
        if (parsed.length > 0) setCurrentConversationId(parsed[0].id);
        else createNewConversation();
      } catch { createNewConversation(); }
    } else createNewConversation();
  }, []);

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

  const handleSend = async (customMsg?: string) => {
    const text = customMsg || message.trim();
    if (!text || isLoading || !currentConversationId) return;

    const userMsg: Message = { role: "user", content: text, timestamp: new Date().toISOString() };
    const convId = currentConversationId;
    const currentMessages = conversationsRef.current.find(c => c.id === convId)?.messages || [];
    const allMessages = [...currentMessages, userMsg];
    
    setConversations(prev => prev.map(c => c.id === convId ? {
      ...c,
      messages: [...c.messages, userMsg],
      title: c.messages.length === 0 ? text.slice(0, 40) + (text.length > 40 ? "…" : "") : c.title,
      updatedAt: new Date().toISOString(),
    } : c));

    setMessage("");
    setIsLoading(true);

    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setDiagnostics(prev => ({ ...prev, requestId, streamingState: "connecting", lastError: null }));

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) {
        const status = response.status;
        let errorMsg = "Failed to get response from Nova.";
        if (status === 429) errorMsg = "Rate limit exceeded. Please wait a moment and try again.";
        if (status === 402) errorMsg = "Service temporarily unavailable.";
        try { const errBody = await response.json(); if (errBody?.error) errorMsg = errBody.error; } catch {}
        setDiagnostics(prev => ({ ...prev, streamingState: "error", lastError: { message: errorMsg, timestamp: new Date() } }));
        throw new Error(errorMsg);
      }

      if (!response.body) {
        setDiagnostics(prev => ({ ...prev, streamingState: "error", lastError: { message: "No response body", timestamp: new Date() } }));
        throw new Error("No response body received.");
      }

      setDiagnostics(prev => ({ ...prev, streamingState: "streaming" }));

      setConversations(prev => prev.map(c => c.id === convId ? {
        ...c,
        messages: [...c.messages, { role: "assistant" as const, content: "", timestamp: new Date().toISOString() }],
      } : c));

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let content = "";

      while (true) {
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
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              content += delta;
              const updatedContent = content;
              setConversations(prev => prev.map(c => {
                if (c.id !== convId) return c;
                const msgs = [...c.messages];
                const lastMsg = msgs[msgs.length - 1];
                if (lastMsg && lastMsg.role === "assistant") {
                  msgs[msgs.length - 1] = { ...lastMsg, content: updatedContent };
                }
                return { ...c, messages: msgs, updatedAt: new Date().toISOString() };
              }));
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              content += delta;
              const updatedContent = content;
              setConversations(prev => prev.map(c => {
                if (c.id !== convId) return c;
                const msgs = [...c.messages];
                const lastMsg = msgs[msgs.length - 1];
                if (lastMsg && lastMsg.role === "assistant") {
                  msgs[msgs.length - 1] = { ...lastMsg, content: updatedContent };
                }
                return { ...c, messages: msgs, updatedAt: new Date().toISOString() };
              }));
            }
          } catch { /* ignore partial leftovers */ }
        }
      }

      setDiagnostics(prev => ({ ...prev, streamingState: "complete", messageCount: prev.messageCount + 1 }));

    } catch (error) {
      showToast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      setConversations(prev => prev.map(c => {
        if (c.id !== convId) return c;
        const msgs = c.messages.filter(m => !(m.role === "assistant" && m.content === ""));
        return { ...c, messages: msgs };
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
    setConversations(prev => prev.map(c => c.id === currentConversationId 
      ? { ...c, messages: c.messages.slice(0, idx) } 
      : c
    ));
    setTimeout(() => handleSend(lastUserMsg.content), 150);
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
      if (remaining.length > 0) setCurrentConversationId(remaining[0].id);
      else createNewConversation();
    }
  };

  const switchConversation = (convId: string) => {
    setCurrentConversationId(convId);
    setSidebarOpen(false);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Chat with Nova AI | Health Coaching | NeuroState" description="Have intelligent conversations with Nova AI about your cognitive performance, recovery, sleep, and personalised health protocols." noindex={true} />
      <NovaNav />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute inset-y-0 left-0 w-[85%] max-w-[300px] bg-background/95 backdrop-blur-xl border-r border-border/20 z-20 shadow-2xl"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-border/10">
                    <span className="text-sm font-semibold tracking-tight">Conversations</span>
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="h-8 w-8 text-muted-foreground/60 hover:text-foreground">
                      <PanelLeftClose className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto py-2 overscroll-contain">
                    {conversations.length === 0 ? (
                      <p className="text-xs text-muted-foreground/50 text-center py-12">No conversations yet</p>
                    ) : (
                      <div className="space-y-0.5 px-2">
                        {conversations.map((conv) => (
                          <div
                            key={conv.id}
                            className={cn(
                              "group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200",
                              conv.id === currentConversationId 
                                ? "bg-accent/8 text-foreground" 
                                : "hover:bg-muted/40 text-muted-foreground"
                            )}
                            onClick={() => switchConversation(conv.id)}
                          >
                            <MessageSquare className="h-4 w-4 flex-shrink-0 opacity-50" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm truncate font-medium">{conv.title}</p>
                              <p className="text-[11px] text-muted-foreground/40 mt-0.5 font-mono">
                                {format(new Date(conv.updatedAt), "MMM d, h:mm a")}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}
                              className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground/40 hover:text-destructive transition-opacity"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-border/10">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { createNewConversation(); setSidebarOpen(false); }}
                      className="w-full h-9 text-xs font-medium border-border/20 hover:bg-muted/40"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      New Thread
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 border-b border-border/10 relative z-0 min-h-[52px] bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)}
              className="h-8 w-8 text-muted-foreground/50 hover:text-foreground"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-sm shadow-accent/20">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="font-semibold text-sm tracking-tight">Nova</span>
              <span className="text-[10px] font-mono text-muted-foreground/40 bg-muted/30 px-1.5 py-0.5 rounded-full">AI</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <NovaChatDiagnostics state={{ ...diagnostics, threadId: currentConversationId }} />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={createNewConversation}
              className="h-8 w-8 text-muted-foreground/50 hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DeviceStatusIndicator />

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!hasMessages ? (
            /* Empty State — Premium */
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center shadow-lg shadow-accent/20">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <motion.div
                    className="absolute -inset-2 rounded-3xl bg-accent/10"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-1.5 tracking-tight">
                  How can I help you?
                </h2>
                <p className="text-sm text-muted-foreground/60 text-center mb-8 max-w-xs">
                  Ask me anything about cognitive performance, recovery, and protocols.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md"
              >
                {QUICK_ACTIONS.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSend(action.label)}
                      disabled={isLoading}
                      className={cn(
                        "flex items-center gap-3 text-left px-4 py-3.5 rounded-xl text-sm",
                        "bg-gradient-to-br", action.gradient,
                        "border", action.border,
                        "transition-all duration-200",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "hover:shadow-sm"
                      )}
                    >
                      <Icon className="h-4 w-4 text-foreground/60 flex-shrink-0" />
                      <span className="text-foreground/80 font-medium text-[13px]">{action.label}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          ) : (
            /* Messages Area */
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                {messages.map((msg, i) => (
                  <MessageBubble
                    key={`${i}-${msg.timestamp}`}
                    msg={msg}
                    index={i}
                    isLast={i === messages.length - 1 && msg.role === "assistant"}
                    copiedIndex={copiedIndex}
                    onCopy={copyMessage}
                    onRegenerate={regenerate}
                    isLoading={isLoading}
                  />
                ))}
                
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0 shadow-sm shadow-accent/20">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                    <StreamingDots />
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input Area — Premium */}
          <div className="border-t border-border/10 bg-background/80 backdrop-blur-sm">
            <div className="max-w-2xl mx-auto p-3 sm:p-4 pb-safe">
              <div className={cn(
                "flex items-end gap-2 rounded-2xl border transition-all duration-300",
                "bg-muted/20 border-border/20",
                "focus-within:border-accent/30 focus-within:bg-muted/30 focus-within:shadow-sm focus-within:shadow-accent/5"
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
                    "text-[15px] sm:text-sm text-foreground placeholder:text-muted-foreground/40",
                    "py-3 px-4 min-h-[48px] max-h-[160px]"
                  )}
                  data-swipe-ignore="true"
                />
                <div className="pr-2 pb-2">
                  <Button
                    onClick={() => handleSend()}
                    disabled={!message.trim() || isLoading}
                    size="icon"
                    className={cn(
                      "h-9 w-9 rounded-xl flex-shrink-0 transition-all duration-200",
                      message.trim() && !isLoading
                        ? "bg-accent hover:bg-accent/90 text-white shadow-sm shadow-accent/20"
                        : "bg-muted/30 text-muted-foreground/30 cursor-not-allowed"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowUp className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground/30 text-center mt-2 font-mono tracking-wider">
                Nova can make mistakes · Consider checking important information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
