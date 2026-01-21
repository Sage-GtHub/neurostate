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
  RotateCcw,
  PanelLeftOpen,
  Plus,
  MessageSquare,
} from "lucide-react";
import { NovaChatDiagnostics, DiagnosticsState } from "@/components/nova/NovaChatDiagnostics";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import { NovaVoiceInterfaceEnhanced } from "@/components/nova/NovaVoiceInterfaceEnhanced";
import { PerplexityInput } from "@/components/nova/PerplexityInput";
import { useNovaUsage } from "@/hooks/useNovaUsage";
import { useChatThreads } from "@/hooks/useChatThreads";
import { ThreadSidebar } from "@/components/nova/ThreadSidebar";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useOnboardingWizard } from "@/hooks/useOnboardingWizard";
import ReactMarkdown from "react-markdown";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  sources?: Array<{ title: string; type?: "study" | "article"; confidence?: "high" | "medium"; url?: string }>;
}

import { NovaTypingAnimation } from "@/components/nova/NovaTypingAnimation";

function TypingIndicator() {
  return <NovaTypingAnimation variant="default" />;
}

const QUICK_SUGGESTIONS = [
  { icon: Activity, label: "Review my protocol", prompt: "How am I doing with my current protocol? Review my progress and give me coaching tips." },
  { icon: Moon, label: "Optimise sleep", prompt: "Create a personalised sleep optimisation protocol for me" },
  { icon: Zap, label: "Boost energy", prompt: "I need more energy in the afternoon. What do you recommend?" },
  { icon: Brain, label: "Focus today", prompt: "Based on my current state, what should I do to maximise focus today?" },
  { icon: Target, label: "Recovery advice", prompt: "What's my optimal recovery approach today based on my recent data?" },
  { icon: Heart, label: "Adjust protocol", prompt: "I'm struggling with my protocol. Can you help me adjust it?" },
];

export default function NovaChat() {
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatMode, setChatMode] = useState<"default" | "focus">("default");
  const [diagnostics, setDiagnostics] = useState<DiagnosticsState>({
    requestId: null,
    lastError: null,
    streamingState: "idle",
    persistenceState: { userMessage: null, assistantMessage: null },
    threadId: null,
    mode: "default",
    messageCount: 0,
  });
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Onboarding wizard
  const { showOnboarding, isChecking, completeOnboarding } = useOnboardingWizard();
  
  // Thread management
  const {
    threads,
    archivedThreads,
    currentThread,
    messages: threadMessages,
    loading: threadsLoading,
    messagesLoading,
    createThread,
    updateThreadTitle,
    archiveThread,
    unarchiveThread,
    deleteThread,
    addMessage,
    clearThreadMessages,
    selectThread,
    fetchArchivedThreads,
  } = useChatThreads();

  // Nova usage tracking
  const { startSession, incrementMessages, endSession } = useNovaUsage();
  const sessionIdRef = useRef<string | null>(null);

  // Combine thread messages with local streaming messages.
  // Filter out local duplicates once the same message is persisted via realtime (prevents UI jitter/twitching).
  const displayMessages: Message[] = currentThread
    ? (() => {
        const persisted = threadMessages.map(m => ({
          id: m.id,
          role: m.role as 'user' | 'assistant',
          content: m.content,
          timestamp: new Date(m.created_at),
        }));
        const recent = persisted.slice(-10);
        const localFiltered = localMessages.filter(lm => !recent.some(pm => pm.role === lm.role && pm.content === lm.content));
        return [...persisted, ...localFiltered];
      })()
    : localMessages;

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

    return () => {
      if (sessionIdRef.current) {
        endSession(sessionIdRef.current);
      }
    };
  }, [startSession, endSession]);

  // Avoid smooth-scrolling on every streamed token (causes visible "twitching").
  useEffect(() => {
    const behavior: ScrollBehavior = isLoading ? "auto" : "smooth";
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, [displayMessages.length, isLoading, currentThread?.id]);

  const streamChat = useCallback(async (userMessage: Message, contextMessages: Message[]) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setDiagnostics(prev => ({ 
      ...prev, 
      requestId, 
      streamingState: "connecting",
      mode: chatMode 
    }));
    
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nova-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        'X-Request-ID': requestId,
      },
      body: JSON.stringify({
        messages: [...contextMessages, userMessage].map(m => ({ role: m.role, content: m.content })),
        context: { mode: chatMode },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      
      const errorMsg = response.status === 429 
        ? `Too many messages. Please wait ${errorData.retryAfter || 30} seconds.`
        : (errorData.error || `HTTP ${response.status}`);
      
      setDiagnostics(prev => ({
        ...prev,
        streamingState: "error",
        lastError: { message: errorMsg, timestamp: new Date() }
      }));
      
      throw new Error(errorMsg);
    }

    if (!response.body) {
      setDiagnostics(prev => ({
        ...prev,
        streamingState: "error",
        lastError: { message: "No response body", timestamp: new Date() }
      }));
      throw new Error('No response body');
    }
    
    setDiagnostics(prev => ({ ...prev, streamingState: "streaming" }));

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantContent = "";
    let textBuffer = "";

    // Add streaming assistant message placeholder (do not overwrite existing local state)
    setLocalMessages((prev) => {
      if (prev.some((m) => m.role === "assistant")) return prev;
      return [...prev, { role: "assistant" as const, content: "", timestamp: new Date() }];
    });

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
            // Update only the assistant message content
            setLocalMessages((prev) => {
              const lastAssistantIndexFromEnd = [...prev]
                .reverse()
                .findIndex((m) => m.role === "assistant");
              if (lastAssistantIndexFromEnd === -1) return prev;
              const idx = prev.length - 1 - lastAssistantIndexFromEnd;
              return prev.map((m, i) => (i === idx ? { ...m, content: assistantContent } : m));
            });
          }
        } catch {
          // Incomplete JSON, put back in buffer and wait for more data
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
    setDiagnostics(prev => ({ ...prev, streamingState: "complete" }));

    return assistantContent;
  }, [chatMode]);

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

    setInput("");
    setIsLoading(true);
    
    // Reset diagnostics for new request
    setDiagnostics(prev => ({
      ...prev,
      requestId: null,
      lastError: null,
      streamingState: "idle",
      persistenceState: { userMessage: "pending", assistantMessage: null },
      threadId: currentThread?.id || null,
      mode: chatMode,
      messageCount: displayMessages.length,
    }));

    const userMessage: Message = { role: "user", content, timestamp: new Date() };
    
    // Add user message locally for immediate display.
    // (We keep this even with threads; duplicates are filtered out once persisted.)
    setLocalMessages([userMessage]);
    
    // Build context from existing thread messages BEFORE any state changes
    const contextMessages = threadMessages.map(m => ({ 
      role: m.role as 'user' | 'assistant', 
      content: m.content 
    }));

    try {
      // Create thread if needed
      let threadId = currentThread?.id;
      if (!threadId) {
        const title = content.length > 50 ? content.substring(0, 47) + "..." : content;
        const newThread = await createThread(title);
        threadId = newThread?.id;
        if (!threadId) {
          setDiagnostics(prev => ({
            ...prev,
            lastError: { message: "Failed to create conversation", timestamp: new Date() }
          }));
          throw new Error("Failed to create conversation");
        }
      }
      
      setDiagnostics(prev => ({ ...prev, threadId }));

      // Save user message to database
      const savedUser = await addMessage('user', content, threadId);
      if (!savedUser) {
        setDiagnostics(prev => ({
          ...prev,
          persistenceState: { ...prev.persistenceState, userMessage: "failed" },
          lastError: { message: "Failed to save user message", timestamp: new Date() }
        }));
        throw new Error("Failed to save your message. Please try again.");
      }
      
      setDiagnostics(prev => ({
        ...prev,
        persistenceState: { ...prev.persistenceState, userMessage: "saved", assistantMessage: "pending" }
      }));

      const assistantContent = await streamChat(userMessage, contextMessages);

      let canClearLocal = true;

      if (assistantContent) {
        // Save assistant message to database
        const savedAssistant = await addMessage('assistant', assistantContent, threadId);
        if (!savedAssistant) {
          // Keep local streaming message visible if persistence fails
          canClearLocal = false;
          setDiagnostics(prev => ({
            ...prev,
            persistenceState: { ...prev.persistenceState, assistantMessage: "failed" },
            lastError: { message: "Failed to save assistant response", timestamp: new Date() }
          }));
          toast({
            title: "Couldn't save Nova's reply",
            description: "Nova replied, but saving the response failed. Your chat history may not update until you reload.",
            variant: "destructive",
          });
        } else {
          setDiagnostics(prev => ({
            ...prev,
            persistenceState: { ...prev.persistenceState, assistantMessage: "saved" },
            messageCount: prev.messageCount + 2,
          }));
        }
        
        // Track usage
        if (sessionIdRef.current) {
          await incrementMessages(sessionIdRef.current, assistantContent.length);
        }
      }

      // Clear local messages once persistence succeeded
      if (canClearLocal) setLocalMessages([]);

    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send message";
      
      setDiagnostics(prev => ({
        ...prev,
        streamingState: "error",
        lastError: prev.lastError || { message: errorMessage, timestamp: new Date() }
      }));
      
      // Check for rate limit errors
      if (errorMessage.includes("Too many") || errorMessage.includes("Rate limit") || errorMessage.includes("429")) {
        toast({
          title: "Rate limited",
          description: "Please wait a moment before sending another message.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      
      // Remove streaming messages on error, keep user message for retry
      setLocalMessages([userMessage]);
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
    if (currentThread) {
      await clearThreadMessages(currentThread.id);
    }
    setLocalMessages([]);
    toast({ description: "Conversation cleared" });
  };

  const regenerateLastResponse = async () => {
    const msgs = displayMessages;
    if (msgs.length < 2) return;
    
    const lastUserMessageIndex = [...msgs].reverse().findIndex(m => m.role === "user");
    if (lastUserMessageIndex === -1) return;

    const actualIndex = msgs.length - 1 - lastUserMessageIndex;
    const lastUserMessage = msgs[actualIndex];
    
    // Can't easily regenerate with thread system, so just send same message
    await handleSendMessage(lastUserMessage.content);
  };

  const handleNewConversation = async () => {
    selectThread(null);
    setLocalMessages([]);
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
          mode={chatMode}
          onModeChange={setChatMode}
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
              "bg-card text-foreground/60 border border-foreground/5",
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

  if (threadsLoading) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-12">
            <div className="max-w-3xl mx-auto">
              {/* Header skeleton */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-foreground/5 skeleton-shimmer" />
                <div className="space-y-2">
                  <div className="w-24 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                  <div className="w-16 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
                </div>
              </div>
              {/* Message skeletons */}
              <div className="space-y-6">
                {/* User message skeleton */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] space-y-2">
                    <div className="w-48 h-4 rounded-lg bg-foreground/5 skeleton-shimmer ml-auto" />
                    <div className="w-32 h-4 rounded-lg bg-foreground/5 skeleton-shimmer ml-auto" />
                  </div>
                </div>
                {/* Assistant message skeleton */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-foreground/5 skeleton-shimmer flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="w-full h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                    <div className="w-3/4 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                    <div className="w-1/2 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                  </div>
                </div>
                {/* User message skeleton */}
                <div className="flex justify-end">
                  <div className="w-36 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                </div>
                {/* Assistant message skeleton */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-foreground/5 skeleton-shimmer flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="w-full h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                    <div className="w-5/6 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  const messages = displayMessages;

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Nova AI | Predictive Cognitive Modelling Interface"
        description="Interact with Nova's multi-model AI engine for real-time cognitive forecasting, performance analytics, and predictive insights."
      />
      
      {/* Onboarding Wizard for new users */}
      <OnboardingWizard open={showOnboarding} onComplete={completeOnboarding} />
      
      <div className="min-h-screen bg-background flex flex-col relative">
        <NovaNav />
        
        {/* Thread Sidebar */}
        <ThreadSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          threads={threads}
          archivedThreads={archivedThreads}
          currentThread={currentThread}
          loading={threadsLoading}
          onSelectThread={selectThread}
          onCreateThread={handleNewConversation}
          onRenameThread={updateThreadTitle}
          onArchiveThread={archiveThread}
          onUnarchiveThread={unarchiveThread}
          onDeleteThread={deleteThread}
          onFetchArchived={fetchArchivedThreads}
        />
        
        {/* Floating orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      
        {messages.length > 0 && (
          <div className="relative border-b border-foreground/5 sticky top-[57px] z-20 bg-background/80 backdrop-blur-xl">
            <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-3">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(true)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <PanelLeftOpen className="h-4 w-4" />
                  </Button>
                  <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-foreground/60" />
                  </div>
                  <div>
                    <h1 className="text-xs font-medium text-foreground">
                      {currentThread?.title || "Nova"}
                    </h1>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <p className="text-[10px] text-foreground/40">Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNewConversation}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <NovaVoiceInterfaceEnhanced 
                    onTranscript={(text, role) => {
                      if (role === "user") {
                        handleSendMessage(text);
                      } else {
                        setLocalMessages(prev => [...prev, { role: "assistant", content: text, timestamp: new Date() }]);
                      }
                    }}
                  />
                  <NovaChatDiagnostics state={diagnostics} />
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
              
              {messages.length === 0 && !messagesLoading ? (
                <EmptyState />
              ) : messagesLoading ? (
                <div className="flex-1 py-8 space-y-6">
                  {/* Messages loading skeleton */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] space-y-2">
                      <div className="w-40 h-4 rounded-lg bg-foreground/5 skeleton-shimmer ml-auto" />
                      <div className="w-24 h-4 rounded-lg bg-foreground/5 skeleton-shimmer ml-auto" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-foreground/5 skeleton-shimmer flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="w-full h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                      <div className="w-4/5 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                      <div className="w-3/5 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-32 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-foreground/5 skeleton-shimmer flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="w-full h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                      <div className="w-2/3 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div 
                    ref={chatContainerRef}
                    data-swipe-ignore="true"
                    className="flex-1 overflow-y-auto py-8 space-y-6"
                  >
                    {messages.map((message, index) => (
                      <div 
                        key={message.id || index} 
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
                            
                            <div className="flex-1 min-w-0 space-y-3">
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
                                  {isLoading && index === messages.length - 1 && (
                                    <span className="inline-block w-0.5 h-4 bg-accent ml-0.5 animate-pulse" />
                                  )}
                                </div>
                              ) : (
                                <TypingIndicator />
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
                    <div data-swipe-ignore="true">
                    <PerplexityInput
                      value={input}
                      onChange={setInput}
                      onSubmit={() => handleSendMessage()}
                      isLoading={isLoading}
                      mode={chatMode}
                      onModeChange={setChatMode}
                      placeholder="Follow up..."
                    />
                    </div>
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