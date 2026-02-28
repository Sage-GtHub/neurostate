import { useState, useRef, useEffect, useCallback, memo, useMemo } from "react";
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
  Archive,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Volume2,
  Square,
  StopCircle,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { NovaNav } from "@/components/NovaNav";
import { motion, AnimatePresence } from "framer-motion";
import { useChatThreads, type ChatThread } from "@/hooks/useChatThreads";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { AutonomousNudgePanel } from "@/components/nova/AutonomousNudgePanel";

type StreamingMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  persisted?: boolean;
};

const QUICK_ACTIONS = [
  { label: "How am I doing today?", icon: Brain, description: "Get a readiness overview" },
  { label: "How's my sleep been?", icon: Moon, description: "Analyse sleep patterns" },
  { label: "Help me plan my day", icon: Zap, description: "Optimise your schedule" },
  { label: "Am I recovering well?", icon: Activity, description: "Check recovery status" },
];

// ─── Streaming Indicators ────────────────────────────────────────────
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
      <span className="text-xs text-muted-foreground ml-1.5 font-medium">Thinking</span>
    </div>
  );
}

function StreamingCursor() {
  return (
    <motion.span
      className="inline-block w-[2px] h-[1.1em] bg-accent ml-0.5 align-text-bottom rounded-full"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Message Component ───────────────────────────────────────────────
const MessageBubble = memo(({ msg, index, isLast, copiedIndex, onCopy, onRegenerate, isLoading, isStreaming }: {
  msg: StreamingMessage;
  index: number;
  isLast: boolean;
  copiedIndex: number | null;
  onCopy: (i: number) => void;
  onRegenerate: () => void;
  isLoading: boolean;
  isStreaming?: boolean;
}) => {
  if (msg.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]">
          <motion.div 
            className="bg-foreground text-background rounded-3xl rounded-br-lg px-5 py-3.5"
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          {msg.content ? (
            <div className="prose prose-sm max-w-none text-foreground">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-3 last:mb-0 text-[15px] leading-[1.75] text-foreground/95">{children}</p>,
                  ul: ({ children }) => <ul className="mb-3 ml-4 list-disc space-y-1.5 marker:text-accent/50">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal space-y-1.5">{children}</ol>,
                  li: ({ children }) => <li className="text-[15px] leading-[1.65] text-foreground/90 pl-1">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  em: ({ children }) => <em className="text-foreground/75">{children}</em>,
                  h1: ({ children }) => <h1 className="text-lg font-semibold text-foreground mt-5 mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-semibold text-foreground mt-4 mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-[15px] font-semibold text-foreground mt-3 mb-1.5">{children}</h3>,
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="px-1.5 py-0.5 rounded-md bg-muted text-[13px] font-mono text-accent">{children}</code>
                    ) : (
                      <code className={cn("block bg-muted/60 rounded-xl p-4 text-[13px] font-mono overflow-x-auto border border-border/30", className)}>
                        {children}
                      </code>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-accent/30 pl-4 italic text-foreground/70 my-3">{children}</blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-accent hover:text-accent/80 underline underline-offset-2 decoration-accent/30 hover:decoration-accent/60 transition-colors" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  hr: () => <hr className="my-4 border-border/30" />,
                }}
              >
                {msg.content}
              </ReactMarkdown>
              {isStreaming && <StreamingCursor />}
            </div>
          ) : (
            <StreamingDots />
          )}
        </div>
      </div>
      
      {/* Action bar — appears on hover/focus, always visible on mobile for last message */}
      {msg.content && !isStreaming && (
        <div className={cn(
          "flex items-center gap-1 ml-12 sm:ml-12 mt-1 transition-opacity duration-200",
          isLast ? "opacity-60" : "opacity-0 group-hover:opacity-60"
        )}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(index)}
            className="h-7 px-2 text-muted-foreground/50 hover:text-foreground text-xs gap-1.5"
          >
            {copiedIndex === index ? (
              <><Check className="h-3 w-3 text-emerald-500" /> Copied</>
            ) : (
              <><Copy className="h-3 w-3" /> Copy</>
            )}
          </Button>
          {isLast && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              disabled={isLoading}
              className="h-7 px-2 text-muted-foreground/50 hover:text-foreground text-xs gap-1.5"
            >
              <RotateCcw className="h-3 w-3" /> Regenerate
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
});

MessageBubble.displayName = "MessageBubble";

// ─── Voice Mode Overlay ─────────────────────────────────────────────────
function VoiceModeOverlay({ 
  isActive, 
  isSpeaking, 
  status,
  onEnd 
}: { 
  isActive: boolean; 
  isSpeaking: boolean;
  status: string;
  onEnd: () => void;
}) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.03)_0%,transparent_70%)]" />
      
      {/* Animated orb */}
      <div className="relative mb-16">
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-8 rounded-full"
          animate={isSpeaking ? {
            background: [
              "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
              "radial-gradient(circle, hsl(var(--accent) / 0.25) 0%, transparent 70%)",
              "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
            ],
            scale: [1, 1.2, 1],
          } : {
            background: "radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: isSpeaking ? 1 : 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="relative w-36 h-36 rounded-full bg-gradient-to-br from-accent via-accent/80 to-accent/40 flex items-center justify-center"
          animate={isSpeaking ? {
            scale: [1, 1.12, 1.05, 1.15, 1],
          } : {
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: isSpeaking ? 0.8 : 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            boxShadow: isSpeaking 
              ? "0 0 60px hsl(var(--accent) / 0.3), 0 0 120px hsl(var(--accent) / 0.1)"
              : "0 0 40px hsl(var(--accent) / 0.15)"
          }}
        >
          <Volume2 className="w-14 h-14 text-white/90" />
        </motion.div>

        {/* Ripple rings */}
        {isSpeaking && [0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-accent/15"
            animate={{ scale: [1, 2.8], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
          />
        ))}
      </div>

      <motion.p 
        className="text-xl font-medium text-foreground mb-2 tracking-tight"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isSpeaking ? "Nova is speaking" : status === "connected" ? "Listening..." : "Connecting..."}
      </motion.p>
      <p className="text-sm text-muted-foreground/50 mb-12 max-w-xs text-center">
        {isSpeaking ? "Tap below to interrupt" : "Speak naturally — Nova is listening to you"}
      </p>

      <Button
        onClick={onEnd}
        size="lg"
        className="rounded-full px-8 h-12 gap-2.5 bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20 shadow-none"
      >
        <PhoneOff className="h-5 w-5" />
        End Conversation
      </Button>
    </motion.div>
  );
}

// ─── Thread Sidebar ─────────────────────────────────────────────────────
function ThreadSidebar({
  threads,
  currentThread,
  onSelect,
  onNew,
  onDelete,
  onArchive,
  onClose,
}: {
  threads: ChatThread[];
  currentThread: ChatThread | null;
  onSelect: (t: ChatThread) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = search 
    ? threads.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    : threads;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <h3 className="text-sm font-semibold tracking-tight">Conversations</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onNew} className="h-8 w-8 text-muted-foreground/60 hover:text-foreground">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-muted-foreground/60 hover:text-foreground">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/30 border border-border/10">
          <Search className="h-3.5 w-3.5 text-muted-foreground/40" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="flex-1 bg-transparent border-0 outline-none text-sm text-foreground placeholder:text-muted-foreground/40"
          />
        </div>
      </div>
      
      {/* Thread list */}
      <div className="flex-1 overflow-y-auto px-2 overscroll-contain">
        {filtered.length === 0 ? (
          <p className="text-xs text-muted-foreground/40 text-center py-12">
            {search ? "No matching conversations" : "No conversations yet"}
          </p>
        ) : (
          <div className="space-y-0.5">
            {filtered.map((thread) => (
              <div
                key={thread.id}
                className={cn(
                  "group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-150",
                  thread.id === currentThread?.id 
                    ? "bg-accent/8 text-foreground" 
                    : "hover:bg-muted/30 text-muted-foreground"
                )}
                onClick={() => onSelect(thread)}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0 opacity-40" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate font-medium">{thread.title}</p>
                  <p className="text-[10px] text-muted-foreground/35 mt-0.5 font-mono">
                    {format(new Date(thread.updated_at), "MMM d")}
                  </p>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); onArchive(thread.id); }}
                    className="h-7 w-7 text-muted-foreground/40 hover:text-foreground"
                  >
                    <Archive className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); onDelete(thread.id); }}
                    className="h-7 w-7 text-muted-foreground/40 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Chat Component ─────────────────────────────────────────────────
export default function NovaChat() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const {
    threads,
    currentThread,
    messages: dbMessages,
    loading: threadsLoading,
    createThread,
    updateThreadTitle,
    deleteThread,
    archiveThread,
    addMessage,
    selectThread,
  } = useChatThreads();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [streamingContent, setStreamingContent] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Voice input state
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Voice mode state
  const [voiceModeActive, setVoiceModeActive] = useState(false);
  const [voiceModeStatus, setVoiceModeStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [voiceModeSpeaking, setVoiceModeSpeaking] = useState(false);
  const conversationRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const scrollRafRef = useRef<number | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const { toast: showToast } = useToast();

  // Build display messages
  const streamingTimestamp = useRef(new Date().toISOString());
  
  const displayMessages: StreamingMessage[] = useMemo(() => {
    const msgs: StreamingMessage[] = dbMessages.map(m => ({
      role: m.role as "user" | "assistant",
      content: m.content,
      timestamp: m.created_at,
      persisted: true,
    }));
    if (streamingContent !== null) {
      msgs.push({
        role: "assistant",
        content: streamingContent,
        timestamp: streamingTimestamp.current,
        persisted: false,
      });
    }
    return msgs;
  }, [dbMessages, streamingContent]);

  // ─── Smart Auto-Scroll ────────────────────────────────────
  const checkIfNearBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const threshold = 120;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    isNearBottomRef.current = nearBottom;
    setShowScrollBtn(!nearBottom && displayMessages.length > 3);
  }, [displayMessages.length]);

  const scrollToBottom = useCallback((force = false) => {
    if (!force && !isNearBottomRef.current) return;
    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    scrollRafRef.current = requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: force ? "smooth" : "auto" });
      setShowScrollBtn(false);
    });
  }, []);

  useEffect(() => { scrollToBottom(true); }, [dbMessages.length]);
  useEffect(() => { if (streamingContent !== null) scrollToBottom(); }, [streamingContent, scrollToBottom]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const handler = () => checkIfNearBottom();
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [checkIfNearBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [message]);

  // Auto-select first thread
  useEffect(() => {
    if (!threadsLoading && !authLoading && isAuthenticated && !currentThread) {
      if (threads.length > 0) selectThread(threads[0]);
    }
  }, [threadsLoading, authLoading, isAuthenticated, currentThread, threads, selectThread]);

  // ─── Voice Input (Web Speech API) ─────────────────────────
  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast({ title: "Not supported", description: "Speech recognition isn't available in this browser.", variant: "destructive" });
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-GB";
    let finalTranscript = "";
    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript;
        else interim += transcript;
      }
      setMessage(finalTranscript + interim);
    };
    recognition.onerror = (event: any) => {
      if (event.error === "not-allowed") {
        showToast({ title: "Microphone blocked", description: "Please allow microphone access.", variant: "destructive" });
      }
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    };
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, [showToast]);

  const stopListening = useCallback(() => { recognitionRef.current?.stop(); setIsListening(false); }, []);
  const toggleListening = useCallback(() => { isListening ? stopListening() : startListening(); }, [isListening, startListening, stopListening]);

  // ─── Full Voice Mode (ElevenLabs) ─────────────────────────
  const startVoiceMode = useCallback(async () => {
    setVoiceModeActive(true);
    setVoiceModeStatus("connecting");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const { data, error } = await supabase.functions.invoke("elevenlabs-signed-url");
      if (error || !data?.signed_url) throw new Error(error?.message || "Failed to get voice connection.");

      const ws = new WebSocket(data.signed_url);
      conversationRef.current = ws;
      const audioContext = new AudioContext({ sampleRate: 16000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 16000 } });

      ws.onopen = () => { setVoiceModeStatus("connected"); };
      ws.onmessage = async (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "agent_response") setVoiceModeSpeaking(true);
          if (msg.type === "user_transcript") setVoiceModeSpeaking(false);
          if (msg.type === "audio") {
            setVoiceModeSpeaking(true);
            try {
              const audioData = atob(msg.audio_event?.audio_base_64 || msg.audio?.chunk || "");
              if (audioData.length > 0) {
                const audioBuffer = new Uint8Array(audioData.length);
                for (let i = 0; i < audioData.length; i++) audioBuffer[i] = audioData.charCodeAt(i);
                const blob = new Blob([audioBuffer], { type: "audio/mpeg" });
                const url = URL.createObjectURL(blob);
                const audio = new Audio(url);
                audio.onended = () => { URL.revokeObjectURL(url); setVoiceModeSpeaking(false); };
                await audio.play().catch(() => {});
              }
            } catch {}
          }
        } catch {}
      };
      ws.onerror = () => {
        showToast({ title: "Voice connection error", description: "Connection failed. Please try again.", variant: "destructive" });
        endVoiceMode();
      };
      ws.onclose = () => {
        setVoiceModeStatus("disconnected");
        setVoiceModeActive(false);
        setVoiceModeSpeaking(false);
        stream.getTracks().forEach(t => t.stop());
      };

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processor.onaudioprocess = (e) => {
        if (ws.readyState !== WebSocket.OPEN) return;
        const inputData = e.inputBuffer.getChannelData(0);
        const int16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        const bytes = new Uint8Array(int16.buffer);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        ws.send(JSON.stringify({ user_audio_chunk: btoa(binary) }));
      };
      source.connect(processor);
      processor.connect(audioContext.destination);
      (conversationRef.current as any).__cleanup = () => {
        processor.disconnect();
        source.disconnect();
        audioContext.close();
        stream.getTracks().forEach(t => t.stop());
      };
    } catch (err) {
      showToast({ title: "Voice mode error", description: err instanceof Error ? err.message : "Failed to start voice mode", variant: "destructive" });
      setVoiceModeActive(false);
      setVoiceModeStatus("disconnected");
    }
  }, [showToast]);

  const endVoiceMode = useCallback(() => {
    const ws = conversationRef.current;
    if (ws) {
      if ((ws as any).__cleanup) (ws as any).__cleanup();
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) ws.close();
    }
    conversationRef.current = null;
    setVoiceModeActive(false);
    setVoiceModeStatus("disconnected");
    setVoiceModeSpeaking(false);
  }, []);

  useEffect(() => { return () => { if (conversationRef.current) endVoiceMode(); }; }, [endVoiceMode]);

  // ─── Message Handling ─────────────────────────────────────
  const handleNewThread = useCallback(async () => {
    const thread = await createThread();
    if (thread) setSidebarOpen(false);
  }, [createThread]);

  const stopGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
    setStreamingContent(null);
  }, []);

  const handleSend = useCallback(async (customMsg?: string) => {
    const text = customMsg || message.trim();
    if (!text || isLoading || !isAuthenticated) return;

    let threadId = currentThread?.id;
    if (!threadId) {
      const newThread = await createThread(text.slice(0, 50));
      if (!newThread) {
        showToast({ title: "Error", description: "Failed to create conversation.", variant: "destructive" });
        return;
      }
      threadId = newThread.id;
    }

    setMessage("");
    setIsLoading(true);
    streamingTimestamp.current = new Date().toISOString();

    const userMsg = await addMessage("user", text, threadId);
    if (!userMsg) {
      showToast({ title: "Error", description: "Failed to save message.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    if (currentThread && dbMessages.length === 0) {
      updateThreadTitle(threadId, text.slice(0, 50) + (text.length > 50 ? "…" : ""));
    }

    const conversationHistory = [
      ...dbMessages.map(m => ({ role: m.role, content: m.content })),
      { role: "user" as const, content: text },
    ];

    setStreamingContent("");
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nova-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: conversationHistory }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const status = response.status;
        let errorMsg = "Failed to get response from Nova.";
        if (status === 429) errorMsg = "Too many requests. Please wait a moment.";
        if (status === 402) errorMsg = "Service temporarily unavailable.";
        try { const errBody = await response.json(); if (errBody?.error) errorMsg = errBody.error; } catch {}
        throw new Error(errorMsg);
      }

      if (!response.body) throw new Error("No response body.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullContent = "";

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
            if (delta) { fullContent += delta; setStreamingContent(fullContent); }
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
            if (delta) { fullContent += delta; setStreamingContent(fullContent); }
          } catch {}
        }
      }

      if (fullContent) await addMessage("assistant", fullContent, threadId);
      setStreamingContent(null);

    } catch (error) {
      if ((error as Error).name === "AbortError") {
        // User stopped generation
        if (streamingContent) await addMessage("assistant", streamingContent, threadId);
        setStreamingContent(null);
      } else {
        showToast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to send message",
          variant: "destructive",
        });
        setStreamingContent(null);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [message, isLoading, isAuthenticated, currentThread, dbMessages, createThread, addMessage, updateThreadTitle, showToast, streamingContent]);

  const copyMessage = async (index: number) => {
    const msg = displayMessages[index];
    if (msg) {
      await navigator.clipboard.writeText(msg.content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const regenerate = useCallback(async () => {
    if (dbMessages.length < 2) return;
    const lastUserMsg = [...dbMessages].reverse().find(m => m.role === "user");
    if (!lastUserMsg) return;
    handleSend(lastUserMsg.content);
  }, [dbMessages, handleSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDeleteThread = useCallback(async (threadId: string) => {
    await deleteThread(threadId);
    const remaining = threads.filter(t => t.id !== threadId);
    if (remaining.length > 0) selectThread(remaining[0]);
  }, [deleteThread, threads, selectThread]);

  const switchConversation = useCallback((thread: ChatThread) => {
    selectThread(thread);
    setSidebarOpen(false);
  }, [selectThread]);

  const hasMessages = displayMessages.length > 0;

  // Auth gate
  if (authLoading || threadsLoading) {
    return (
      <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
        <NovaNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground">Loading Nova...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
        <NovaNav />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
            <Sparkles className="h-9 w-9 text-white" />
          </div>
          <h2 className="text-2xl font-semibold mb-2 tracking-tight">Sign in to use Nova</h2>
          <p className="text-sm text-muted-foreground text-center max-w-sm mb-8">
            Nova needs access to your biometric data and protocols to provide personalised cognitive performance insights.
          </p>
          <Button onClick={() => window.location.href = '/auth'} size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 h-12">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
      <SEO title="Nova AI — Cognitive Performance Agent | NeuroState" description="Intelligent conversations about cognitive performance, recovery, sleep, and personalised health protocols." noindex={true} />
      
      {/* Desktop only: full NovaNav */}
      <div className="hidden md:block">
        <NovaNav />
      </div>

      {/* Voice Mode Overlay */}
      <AnimatePresence>
        {voiceModeActive && (
          <VoiceModeOverlay
            isActive={voiceModeActive}
            isSpeaking={voiceModeSpeaking}
            status={voiceModeStatus}
            onEnd={endVoiceMode}
          />
        )}
      </AnimatePresence>
      
      <div className="flex-1 min-h-0 flex flex-col relative overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-background border-r border-border/15 z-20 shadow-2xl"
              >
                <ThreadSidebar
                  threads={threads}
                  currentThread={currentThread}
                  onSelect={switchConversation}
                  onNew={handleNewThread}
                  onDelete={handleDeleteThread}
                  onArchive={archiveThread}
                  onClose={() => setSidebarOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Chat Header — compact, no duplicate branding */}
        <div className="md:hidden flex items-center justify-between px-3 py-2 pt-safe border-b border-border/8 relative z-40 bg-background/95 backdrop-blur-xl fixed top-0 left-0 right-0">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)}
              className="h-9 w-9 text-muted-foreground/50 hover:text-foreground rounded-xl touch-manipulation active:scale-90 transition-transform"
            >
              <PanelLeftOpen className="h-4.5 w-4.5" />
            </Button>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-semibold text-sm tracking-tight">Nova</span>
            </motion.div>
          </div>
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={voiceModeActive ? endVoiceMode : startVoiceMode}
              className={cn(
                "h-9 w-9 rounded-xl transition-all touch-manipulation active:scale-90",
                voiceModeActive 
                  ? "text-accent bg-accent/10" 
                  : "text-muted-foreground/40 hover:text-foreground"
              )}
            >
              {voiceModeActive ? <PhoneOff className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNewThread}
              className="h-9 w-9 text-muted-foreground/40 hover:text-foreground rounded-xl touch-manipulation active:scale-90 transition-transform"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Mobile header spacer */}
        <div className="md:hidden h-12 pt-safe flex-shrink-0" />

        {/* Desktop Chat Header */}
        <div className="hidden md:flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/8 relative z-0 min-h-[52px]">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)}
              className="h-9 w-9 text-muted-foreground/40 hover:text-foreground rounded-xl"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-semibold text-sm tracking-tight">Nova</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={voiceModeActive ? endVoiceMode : startVoiceMode}
              className={cn(
                "h-9 w-9 rounded-xl transition-all",
                voiceModeActive 
                  ? "text-accent bg-accent/10" 
                  : "text-muted-foreground/40 hover:text-foreground"
              )}
              title="Voice conversation"
            >
              {voiceModeActive ? <PhoneOff className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNewThread}
              className="h-9 w-9 text-muted-foreground/40 hover:text-foreground rounded-xl"
              title="New conversation"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
          {!hasMessages ? (
            /* ─── Empty State ─── */
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center w-full max-w-lg"
              >
                {/* Nova breathing orb — ChatGPT-style */}
                <div className="relative mb-8">
                  {/* Outer breathing glow ring */}
                  <motion.div
                    className="absolute -inset-6 rounded-full"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.9, 1.15, 0.9],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      background: "radial-gradient(circle, hsl(12 100% 52% / 0.2) 0%, hsl(12 100% 52% / 0.05) 50%, transparent 70%)",
                    }}
                  />
                  {/* Secondary pulse ring */}
                  <motion.div
                    className="absolute -inset-3 rounded-full border border-accent/10"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                  />
                  {/* Third ripple */}
                  <motion.div
                    className="absolute -inset-3 rounded-full border border-accent/5"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  />
                  {/* Main orb */}
                  <motion.div 
                    className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent via-accent/80 to-accent/40 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.06, 1],
                      boxShadow: [
                        "0 0 30px hsl(12 100% 52% / 0.2), 0 0 60px hsl(12 100% 52% / 0.08)",
                        "0 0 50px hsl(12 100% 52% / 0.35), 0 0 100px hsl(12 100% 52% / 0.12)",
                        "0 0 30px hsl(12 100% 52% / 0.2), 0 0 60px hsl(12 100% 52% / 0.08)",
                      ],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Inner highlight */}
                    <div className="absolute inset-1 rounded-full opacity-30"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)" }}
                    />
                    <Sparkles className="h-9 w-9 text-white relative z-10" />
                  </motion.div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2 tracking-tight text-center">
                  What can I help with?
                </h1>
                <p className="text-sm text-muted-foreground text-center mb-10 max-w-sm leading-relaxed">
                  Your cognitive performance agent. Ask about readiness, recovery, sleep patterns, or protocol optimisation.
                </p>
                
                {/* Quick actions grid */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8">
                  {QUICK_ACTIONS.map((action, i) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSend(action.label)}
                        disabled={isLoading}
                        className={cn(
                          "flex flex-col items-start gap-2 text-left p-4 rounded-2xl",
                          "bg-muted/20 border border-border/15",
                          "hover:bg-muted/40 hover:border-border/30",
                          "transition-all duration-200",
                          "disabled:opacity-50"
                        )}
                      >
                        <Icon className="h-5 w-5 text-accent/70" />
                        <div>
                        <p className="text-sm font-medium text-foreground leading-tight">{action.label}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{action.description}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Voice CTA */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={startVoiceMode}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-accent transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <span>Start a voice conversation</span>
                </motion.button>
              </motion.div>

              {/* Smart Nudges */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-lg mt-8 px-2"
              >
                <AutonomousNudgePanel />
              </motion.div>
            </div>
          ) : (
            /* ─── Messages Area ─── */
            <div 
              ref={scrollContainerRef}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y"
              onScroll={checkIfNearBottom}
            >
              <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-7">
                {displayMessages.map((msg, i) => (
                  <MessageBubble
                    key={msg.persisted ? `db-${i}` : `stream-${i}`}
                    msg={msg}
                    index={i}
                    isLast={i === displayMessages.length - 1 && msg.role === "assistant" && msg.persisted === true}
                    copiedIndex={copiedIndex}
                    onCopy={copyMessage}
                    onRegenerate={regenerate}
                    isLoading={isLoading}
                    isStreaming={!msg.persisted && msg.role === "assistant"}
                  />
                ))}
                
                {isLoading && streamingContent === null && displayMessages[displayMessages.length - 1]?.role === "user" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <StreamingDots />
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Scroll to bottom */}
          <AnimatePresence>
            {showScrollBtn && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => scrollToBottom(true)}
                  className="rounded-full shadow-lg bg-background/95 backdrop-blur-sm border-border/30 hover:bg-background gap-1.5 px-4 h-8"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                  <span className="text-xs">New messages</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Input Area ─── */}
          <div className="border-t border-border/8 bg-background/95 backdrop-blur-xl">
            <div className="max-w-2xl mx-auto p-3 sm:p-4 pb-safe">
              <motion.div 
                className={cn(
                  "flex items-end gap-2 rounded-2xl border transition-all duration-300",
                  "bg-muted/15 border-border/15",
                  "focus-within:border-accent/25 focus-within:bg-muted/25 focus-within:shadow-lg focus-within:shadow-accent/[0.04]"
                )}
                layout
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              >
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isListening ? "Listening..." : "Message Nova..."}
                  rows={1}
                  disabled={isLoading && !streamingContent}
                  className={cn(
                    "flex-1 resize-none bg-transparent border-0 focus:ring-0 focus:outline-none",
                    "text-[16px] sm:text-[15px] text-foreground placeholder:text-muted-foreground/30",
                    "py-3.5 px-4 min-h-[52px] max-h-[160px]",
                    isListening && "placeholder:text-accent/50"
                  )}
                  data-swipe-ignore="true"
                />
                <div className="flex items-center gap-1 pr-2.5 pb-2.5">
                  {/* Mic button */}
                  <motion.div whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={toggleListening}
                      disabled={isLoading}
                      className={cn(
                        "h-10 w-10 rounded-xl transition-all touch-manipulation",
                        isListening 
                          ? "bg-accent/15 text-accent" 
                          : "text-muted-foreground/30 hover:text-foreground hover:bg-muted/30"
                      )}
                    >
                      {isListening ? (
                        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                          <MicOff className="h-4.5 w-4.5" />
                        </motion.div>
                      ) : (
                        <Mic className="h-4.5 w-4.5" />
                      )}
                    </Button>
                  </motion.div>

                  {/* Send / Stop button */}
                  <motion.div whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                    {isLoading ? (
                      <Button
                        onClick={stopGeneration}
                        size="icon"
                        className="h-10 w-10 rounded-xl bg-foreground/10 hover:bg-foreground/20 text-foreground transition-all touch-manipulation"
                        title="Stop generating"
                      >
                        <Square className="h-3.5 w-3.5 fill-current" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleSend()}
                        disabled={!message.trim()}
                        size="icon"
                        className={cn(
                          "h-10 w-10 rounded-xl flex-shrink-0 transition-all duration-200 touch-manipulation",
                          message.trim()
                            ? "bg-accent hover:bg-accent/90 text-white shadow-sm shadow-accent/20"
                            : "bg-muted/20 text-muted-foreground/20 cursor-not-allowed"
                        )}
                      >
                        <ArrowUp className="h-4.5 w-4.5" />
                      </Button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
              <p className="text-[10px] text-muted-foreground/60 text-center mt-2 tracking-wide">
                Nova may produce inaccurate information · Not a substitute for medical advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
