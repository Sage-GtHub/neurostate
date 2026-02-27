import { useState } from "react";
import { useConversation } from "@elevenlabs/react";
import { 
  MessageCircle, Phone, X, Mic, MicOff, Loader2, Volume2, Sparkles 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { LiveChat } from "@/components/LiveChat";
import { motion, AnimatePresence } from "framer-motion";

const AGENT_ID = "agent_2601kjdfphrefs5thzmypmv7fn7a";

const HIDDEN_ROUTES = [
  "/nova",
  "/nova/dashboard",
  "/profile",
  "/team",
  "/settings",
  "/mobile-chat",
];

export function FloatingContactHub() {
  const { toast } = useToast();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      setVoiceLoading(false);
      setMenuOpen(false);
      toast({
        title: "NeuroState Agent connected",
        description: "Speak naturally — your AI agent is listening.",
      });
    },
    onDisconnect: () => {},
    onError: (error) => {
      console.error("Voice error:", error);
      toast({
        title: "Connection error",
        description: "Failed to connect. Please try again.",
        variant: "destructive",
      });
      setVoiceLoading(false);
    },
  });

  const isVoiceConnected = conversation.status === "connected";

  const shouldHide = HIDDEN_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );
  if (shouldHide) return null;

  const startVoice = async () => {
    setVoiceLoading(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "websocket",
      });
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast({
        title: "Connection failed",
        description:
          error instanceof Error
            ? error.message
            : "Could not start voice conversation",
        variant: "destructive",
      });
      setVoiceLoading(false);
    }
  };

  const endVoice = async () => {
    await conversation.endSession();
  };

  const openChat = () => {
    setMenuOpen(false);
    setChatOpen(true);
  };

  // Voice active panel
  if (isVoiceConnected) {
    return (
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "flex items-center gap-3 px-5 py-3 rounded-full",
          "bg-card border border-border shadow-xl",
          "animate-in slide-in-from-bottom-2 duration-300"
        )}
      >
        <div className="relative flex items-center justify-center">
          <div
            className={cn(
              "w-3 h-3 rounded-full",
              conversation.isSpeaking
                ? "bg-primary animate-pulse"
                : "bg-emerald-500"
            )}
          />
          {conversation.isSpeaking && (
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/40 animate-ping" />
          )}
        </div>

        <div className="flex items-center gap-2">
          {conversation.isSpeaking ? (
            <>
              <Volume2 className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-foreground font-medium">
                Agent speaking…
              </span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-muted-foreground">Listening…</span>
            </>
          )}
        </div>

        <button
          onClick={endVoice}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
            "bg-destructive/10 text-destructive hover:bg-destructive/20",
            "transition-colors text-sm font-medium"
          )}
          aria-label="End conversation"
        >
          <MicOff className="w-4 h-4" />
          <span className="hidden sm:inline">End</span>
        </button>
      </div>
    );
  }

  // Voice loading
  if (voiceLoading) {
    return (
      <button
        disabled
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "flex items-center gap-2 p-4 rounded-full",
          "bg-primary text-primary-foreground shadow-lg opacity-80",
          "cursor-wait"
        )}
      >
        <Loader2 className="w-5 h-5 animate-spin" />
      </button>
    );
  }

  return (
    <>
      {/* Main floating button + menu */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2 mb-1"
            >
              {/* Talk to Sales option */}
              <button
                onClick={startVoice}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-full",
                  "bg-card border border-border shadow-lg",
                  "hover:bg-accent/5 hover:border-primary/30",
                  "transition-all duration-200 group"
                )}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left pr-2">
                  <p className="text-sm font-medium text-foreground">Talk to Sales</p>
                  <p className="text-xs text-muted-foreground">Live voice conversation</p>
                </div>
              </button>

              {/* Chat option */}
              <button
                onClick={openChat}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-full",
                  "bg-card border border-border shadow-lg",
                  "hover:bg-accent/5 hover:border-primary/30",
                  "transition-all duration-200 group"
                )}
              >
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div className="text-left pr-2">
                  <p className="text-sm font-medium text-foreground">Chat with AI</p>
                  <p className="text-xs text-muted-foreground">Text-based assistant</p>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className={cn(
            "p-4 rounded-full shadow-xl transition-all duration-200",
            "hover:scale-105 active:scale-95",
            menuOpen
              ? "bg-muted text-foreground rotate-0"
              : "bg-primary text-primary-foreground"
          )}
          aria-label={menuOpen ? "Close contact menu" : "Contact us"}
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Chat Sheet — controlled externally */}
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
}
