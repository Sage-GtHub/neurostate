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
import { useChatThreads, type ChatThread } from "@/hooks/useChatThreads";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type StreamingMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  persisted?: boolean;
};

const QUICK_ACTIONS = [
  { label: "How am I doing today?", icon: Brain, gradient: "from-violet-500/10 to-indigo-500/10", border: "border-violet-500/20" },
  { label: "How's my sleep been?", icon: Moon, gradient: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/20" },
  { label: "Help me plan my day", icon: Zap, gradient: "from-amber-500/10 to-orange-500/10", border: "border-amber-500/20" },
  { label: "Am I recovering well?", icon: Activity, gradient: "from-emerald-500/10 to-teal-500/10", border: "border-emerald-500/20" },
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

// Streaming cursor blink
function StreamingCursor() {
  return (
    <motion.span
      className="inline-block w-[2px] h-[1.1em] bg-accent ml-0.5 align-text-bottom rounded-full"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
    />
  );
}

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
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] sm:max-w-[75%]">
          <div className="bg-foreground text-background rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
            <p className="text-[15px] sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
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
              {isStreaming && <StreamingCursor />}
            </div>
          ) : (
            <StreamingDots />
          )}
        </div>
      </div>
      
      {msg.content && !isStreaming && (
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl"
    >
      {/* Animated orb */}
      <div className="relative mb-12">
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center"
          animate={isSpeaking ? {
            scale: [1, 1.15, 1.05, 1.2, 1],
            boxShadow: [
              "0 0 40px hsl(var(--accent) / 0.2)",
              "0 0 80px hsl(var(--accent) / 0.4)",
              "0 0 60px hsl(var(--accent) / 0.3)",
              "0 0 90px hsl(var(--accent) / 0.5)",
              "0 0 40px hsl(var(--accent) / 0.2)",
            ]
          } : {
            scale: [1, 1.03, 1],
            boxShadow: [
              "0 0 30px hsl(var(--accent) / 0.15)",
              "0 0 50px hsl(var(--accent) / 0.25)",
              "0 0 30px hsl(var(--accent) / 0.15)",
            ]
          }}
          transition={{ duration: isSpeaking ? 0.8 : 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Volume2 className="w-12 h-12 text-white" />
        </motion.div>
        {/* Ripple rings */}
        {isSpeaking && [0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-accent/20"
            animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
          />
        ))}
      </div>

      <p className="text-lg font-medium text-foreground mb-2">
        {isSpeaking ? "Nova is speaking..." : status === "connected" ? "Listening..." : "Connecting..."}
      </p>
      <p className="text-sm text-muted-foreground/60 mb-10">
        {isSpeaking ? "Wait for me to finish or tap to interrupt" : "Speak naturally — I'm listening"}
      </p>

      <Button
        onClick={onEnd}
        variant="outline"
        size="lg"
        className="rounded-full px-8 gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <PhoneOff className="h-4 w-4" />
        End Voice Chat
      </Button>
    </motion.div>
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

  // Voice input state
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Voice mode (ElevenLabs Conversational AI) state
  const [voiceModeActive, setVoiceModeActive] = useState(false);
  const [voiceModeStatus, setVoiceModeStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [voiceModeSpeaking, setVoiceModeSpeaking] = useState(false);
  const conversationRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const scrollRafRef = useRef<number | null>(null);
  const { toast: showToast } = useToast();

  // Build display messages with stable streaming entry
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
    const threshold = 120; // px from bottom
    isNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  }, []);

  const scrollToBottom = useCallback((force = false) => {
    if (!force && !isNearBottomRef.current) return;
    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    scrollRafRef.current = requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: force ? "smooth" : "auto" });
    });
  }, []);

  // Scroll on new messages (not every streaming token)
  useEffect(() => {
    scrollToBottom(true);
  }, [dbMessages.length]);

  // Scroll during streaming - throttled
  useEffect(() => {
    if (streamingContent !== null) {
      scrollToBottom();
    }
  }, [streamingContent, scrollToBottom]);

  // Track scroll position
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
      if (threads.length > 0) {
        selectThread(threads[0]);
      }
    }
  }, [threadsLoading, authLoading, isAuthenticated, currentThread, threads, selectThread]);

  // ─── Voice Input (Web Speech API) ─────────────────────────
  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast({ title: "Not supported", description: "Speech recognition isn't available in this browser. Try Chrome or Edge.", variant: "destructive" });
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
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interim += transcript;
        }
      }
      setMessage(prev => finalTranscript + interim);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        showToast({ title: "Microphone blocked", description: "Please allow microphone access in your browser settings.", variant: "destructive" });
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-focus textarea after voice input
      setTimeout(() => textareaRef.current?.focus(), 100);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, [showToast]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // ─── Full Voice Mode (ElevenLabs Conversational AI) ───────
  const startVoiceMode = useCallback(async () => {
    setVoiceModeActive(true);
    setVoiceModeStatus("connecting");

    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get signed URL from edge function
      const { data, error } = await supabase.functions.invoke("elevenlabs-signed-url");
      
      if (error || !data?.signed_url) {
        throw new Error(error?.message || "Failed to get voice connection. Please check your ElevenLabs agent configuration.");
      }

      // Dynamically import the ElevenLabs React SDK
      const { useConversation } = await import("@elevenlabs/react");
      
      // We can't use hooks dynamically, so we'll use the lower-level WebSocket approach
      // Connect via WebSocket with the signed URL
      const ws = new WebSocket(data.signed_url);
      conversationRef.current = ws;

      // Set up audio context for playback
      const audioContext = new AudioContext({ sampleRate: 16000 });
      
      // Set up microphone capture
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true, 
          noiseSuppression: true,
          sampleRate: 16000
        } 
      });
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
      const audioChunks: Blob[] = [];

      ws.onopen = () => {
        setVoiceModeStatus("connected");
        console.log("Voice mode connected");
      };

      ws.onmessage = async (event) => {
        try {
          const msg = JSON.parse(event.data);
          
          if (msg.type === "agent_response") {
            setVoiceModeSpeaking(true);
          }
          if (msg.type === "user_transcript") {
            setVoiceModeSpeaking(false);
          }
          if (msg.type === "audio") {
            setVoiceModeSpeaking(true);
            // Decode and play audio
            try {
              const audioData = atob(msg.audio_event?.audio_base_64 || msg.audio?.chunk || "");
              if (audioData.length > 0) {
                const audioBuffer = new Uint8Array(audioData.length);
                for (let i = 0; i < audioData.length; i++) {
                  audioBuffer[i] = audioData.charCodeAt(i);
                }
                // Play via Audio element for simplicity
                const blob = new Blob([audioBuffer], { type: "audio/mpeg" });
                const url = URL.createObjectURL(blob);
                const audio = new Audio(url);
                audio.onended = () => {
                  URL.revokeObjectURL(url);
                  setVoiceModeSpeaking(false);
                };
                await audio.play().catch(() => {});
              }
            } catch {
              // Ignore audio decode errors
            }
          }
          if (msg.type === "conversation_initiation_metadata") {
            console.log("Voice conversation started:", msg.conversation_initiation_metadata_event?.conversation_id);
          }
        } catch {
          // Non-JSON message, ignore
        }
      };

      ws.onerror = (err) => {
        console.error("Voice mode WebSocket error:", err);
        showToast({ title: "Voice connection error", description: "Connection to voice service failed. Please try again.", variant: "destructive" });
        endVoiceMode();
      };

      ws.onclose = () => {
        console.log("Voice mode disconnected");
        setVoiceModeStatus("disconnected");
        setVoiceModeActive(false);
        setVoiceModeSpeaking(false);
        stream.getTracks().forEach(t => t.stop());
      };

      // Send audio to ElevenLabs via WebSocket
      // Use AudioWorklet or ScriptProcessor to capture raw PCM
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        if (ws.readyState !== WebSocket.OPEN) return;
        const inputData = e.inputBuffer.getChannelData(0);
        // Convert float32 to int16
        const int16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        // Convert to base64
        const bytes = new Uint8Array(int16.buffer);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binary);
        
        ws.send(JSON.stringify({
          user_audio_chunk: base64,
        }));
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      // Store cleanup refs
      (conversationRef.current as any).__cleanup = () => {
        processor.disconnect();
        source.disconnect();
        audioContext.close();
        stream.getTracks().forEach(t => t.stop());
      };

    } catch (err) {
      console.error("Voice mode start error:", err);
      const errorMsg = err instanceof Error ? err.message : "Failed to start voice mode";
      showToast({ title: "Voice mode error", description: errorMsg, variant: "destructive" });
      setVoiceModeActive(false);
      setVoiceModeStatus("disconnected");
    }
  }, [showToast]);

  const endVoiceMode = useCallback(() => {
    const ws = conversationRef.current;
    if (ws) {
      if ((ws as any).__cleanup) (ws as any).__cleanup();
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    }
    conversationRef.current = null;
    setVoiceModeActive(false);
    setVoiceModeStatus("disconnected");
    setVoiceModeSpeaking(false);
  }, []);

  // Cleanup voice mode on unmount
  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        endVoiceMode();
      }
    };
  }, [endVoiceMode]);

  // ─── Message Handling ─────────────────────────────────────
  const handleNewThread = useCallback(async () => {
    const thread = await createThread();
    if (thread) {
      setSidebarOpen(false);
    }
  }, [createThread]);

  const handleSend = useCallback(async (customMsg?: string) => {
    const text = customMsg || message.trim();
    if (!text || isLoading || !isAuthenticated) return;

    let threadId = currentThread?.id;
    if (!threadId) {
      const newThread = await createThread(text.slice(0, 50));
      if (!newThread) {
        showToast({ title: "Error", description: "Failed to create conversation thread.", variant: "destructive" });
        return;
      }
      threadId = newThread.id;
    }

    setMessage("");
    setIsLoading(true);
    // Reset streaming timestamp for this response
    streamingTimestamp.current = new Date().toISOString();

    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setDiagnostics(prev => ({ ...prev, requestId, streamingState: "connecting", lastError: null, persistenceState: { userMessage: "pending", assistantMessage: null } }));

    const userMsg = await addMessage("user", text, threadId);
    if (!userMsg) {
      setDiagnostics(prev => ({ ...prev, persistenceState: { ...prev.persistenceState, userMessage: "failed" } }));
      showToast({ title: "Error", description: "Failed to save message.", variant: "destructive" });
      setIsLoading(false);
      return;
    }
    setDiagnostics(prev => ({ ...prev, persistenceState: { ...prev.persistenceState, userMessage: "saved" } }));

    if (currentThread && dbMessages.length === 0) {
      updateThreadTitle(threadId, text.slice(0, 50) + (text.length > 50 ? "…" : ""));
    }

    const conversationHistory = [
      ...dbMessages.map(m => ({ role: m.role, content: m.content })),
      { role: "user" as const, content: text },
    ];

    setDiagnostics(prev => ({ ...prev, persistenceState: { ...prev.persistenceState, assistantMessage: "pending" } }));
    setStreamingContent("");

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nova-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          "x-request-id": requestId,
        },
        body: JSON.stringify({
          messages: conversationHistory,
          context: { mode: diagnostics.mode },
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

      if (!response.body) throw new Error("No response body received.");

      setDiagnostics(prev => ({ ...prev, streamingState: "streaming" }));

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
            if (delta) {
              fullContent += delta;
              setStreamingContent(fullContent);
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
              fullContent += delta;
              setStreamingContent(fullContent);
            }
          } catch { /* ignore */ }
        }
      }

      if (fullContent) {
        const assistantMsg = await addMessage("assistant", fullContent, threadId);
        if (assistantMsg) {
          setDiagnostics(prev => ({ ...prev, persistenceState: { ...prev.persistenceState, assistantMessage: "saved" } }));
        } else {
          setDiagnostics(prev => ({ ...prev, persistenceState: { ...prev.persistenceState, assistantMessage: "failed" } }));
        }
      }

      setStreamingContent(null);
      setDiagnostics(prev => ({ ...prev, streamingState: "complete", messageCount: prev.messageCount + 1 }));

    } catch (error) {
      showToast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      setStreamingContent(null);
      setDiagnostics(prev => ({ ...prev, streamingState: "error" }));
    } finally {
      setIsLoading(false);
    }
  }, [message, isLoading, isAuthenticated, currentThread, dbMessages, createThread, addMessage, updateThreadTitle, diagnostics.mode, showToast]);

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
    if (remaining.length > 0) {
      selectThread(remaining[0]);
    }
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
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
        <NovaNav />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Sign in to chat with Nova</h2>
          <p className="text-sm text-muted-foreground/60 text-center max-w-xs mb-6">
            Nova needs access to your biometric data and protocols to provide personalised insights.
          </p>
          <Button onClick={() => window.location.href = '/auth'} className="bg-accent hover:bg-accent/90 text-white">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Chat with Nova AI | Health Coaching | NeuroState" description="Have intelligent conversations with Nova AI about your cognitive performance, recovery, sleep, and personalised health protocols." noindex={true} />
      <NovaNav />

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
                    {threads.length === 0 ? (
                      <p className="text-xs text-muted-foreground/50 text-center py-12">No conversations yet</p>
                    ) : (
                      <div className="space-y-0.5 px-2">
                        {threads.map((thread) => (
                          <div
                            key={thread.id}
                            className={cn(
                              "group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200",
                              thread.id === currentThread?.id 
                                ? "bg-accent/8 text-foreground" 
                                : "hover:bg-muted/40 text-muted-foreground"
                            )}
                            onClick={() => switchConversation(thread)}
                          >
                            <MessageSquare className="h-4 w-4 flex-shrink-0 opacity-50" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm truncate font-medium">{thread.title}</p>
                              <p className="text-[11px] text-muted-foreground/40 mt-0.5 font-mono">
                                {format(new Date(thread.updated_at), "MMM d, h:mm a")}
                              </p>
                            </div>
                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => { e.stopPropagation(); archiveThread(thread.id); }}
                                className="h-7 w-7 text-muted-foreground/40 hover:text-foreground"
                                title="Archive"
                              >
                                <Archive className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => { e.stopPropagation(); handleDeleteThread(thread.id); }}
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
                  <div className="p-3 border-t border-border/10">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNewThread}
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
            {/* Voice Mode Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={voiceModeActive ? endVoiceMode : startVoiceMode}
              className={cn(
                "h-8 w-8 transition-all",
                voiceModeActive 
                  ? "text-accent bg-accent/10" 
                  : "text-muted-foreground/50 hover:text-foreground"
              )}
              title="Voice conversation"
            >
              {voiceModeActive ? <PhoneOff className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
            </Button>
            <NovaChatDiagnostics state={{ ...diagnostics, threadId: currentThread?.id || null }} />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNewThread}
              className="h-8 w-8 text-muted-foreground/50 hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DeviceStatusIndicator />

        {/* Content Area */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {!hasMessages ? (
            /* Empty State */
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

              {/* Voice CTA in empty state */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={startVoiceMode}
                className="mt-6 flex items-center gap-2 text-sm text-muted-foreground/50 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>or start a voice conversation</span>
              </motion.button>
            </div>
          ) : (
            /* Messages Area */
            <div 
              ref={scrollContainerRef}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y"
              onScroll={checkIfNearBottom}
            >
              <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
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

          {/* Input Area */}
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
                  placeholder={isListening ? "Listening..." : "Ask Nova anything..."}
                  rows={1}
                  disabled={isLoading}
                  className={cn(
                    "flex-1 resize-none bg-transparent border-0 focus:ring-0 focus:outline-none",
                    "text-[15px] sm:text-sm text-foreground placeholder:text-muted-foreground/40",
                    "py-3 px-4 min-h-[48px] max-h-[160px]",
                    isListening && "placeholder:text-accent/60"
                  )}
                  data-swipe-ignore="true"
                />
                <div className="flex items-center gap-1.5 pr-2 pb-2">
                  {/* Voice Input (mic) Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleListening}
                    disabled={isLoading}
                    className={cn(
                      "h-9 w-9 rounded-xl transition-all touch-manipulation",
                      isListening 
                        ? "bg-accent/20 text-accent" 
                        : "text-muted-foreground/50 hover:text-foreground hover:bg-muted/30"
                    )}
                    title={isListening ? "Stop listening" : "Voice input"}
                  >
                    {isListening ? (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                        <MicOff className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>

                  {/* Send Button */}
                  <Button
                    onClick={() => handleSend()}
                    disabled={!message.trim() || isLoading}
                    size="icon"
                    className={cn(
                      "h-9 w-9 rounded-xl flex-shrink-0 transition-all duration-200 touch-manipulation",
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
