import { useState } from "react";
import { useConversation } from "@11labs/react";
import { Mic, MicOff, Loader2, Volume2, X, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const AGENT_ID = "agent_2601kjdfphrefs5thzmypmv7fn7a";

// Pages where the agent should NOT appear (authenticated/app pages)
const HIDDEN_ROUTES = [
  "/nova",
  "/dashboard",
  "/profile",
  "/team",
  "/settings",
  "/mobile-chat",
];

export function FloatingVoiceAgent() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const conversation = useConversation({
    onConnect: () => {
      setIsLoading(false);
      toast({
        title: "NeuroState Agent connected",
        description: "Speak naturally — your AI agent is listening.",
      });
    },
    onDisconnect: () => {
      setIsExpanded(false);
    },
    onError: (error) => {
      console.error("Voice error:", error);
      toast({
        title: "Connection error",
        description: "Failed to connect. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const isConnected = conversation.status === "connected";

  // Hide on authenticated/app routes
  const shouldHide = HIDDEN_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );
  if (shouldHide) return null;

  const startConversation = async () => {
    setIsLoading(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "webrtc",
      });
      setIsExpanded(true);
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
      setIsLoading(false);
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
    setIsExpanded(false);
  };

  // Collapsed: floating mic button
  if (!isConnected && !isLoading) {
    return (
      <button
        onClick={startConversation}
        className={cn(
          "fixed bottom-6 right-20 z-50",
          "flex items-center gap-2 px-4 py-3 rounded-full",
          "bg-primary text-primary-foreground shadow-lg",
          "hover:scale-105 active:scale-95 transition-all duration-200",
          "group"
        )}
        aria-label="Talk to NeuroState sales agent"
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">
          Talk to Sales
        </span>
      </button>
    );
  }

  // Loading state
  if (isLoading && !isConnected) {
    return (
      <button
        disabled
        className={cn(
          "fixed bottom-6 right-20 z-50",
          "flex items-center gap-2 px-4 py-3 rounded-full",
          "bg-primary text-primary-foreground shadow-lg opacity-80",
          "cursor-wait"
        )}
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium hidden sm:inline">
          Connecting…
        </span>
      </button>
    );
  }

  // Connected: expanded panel
  return (
    <div
      className={cn(
        "fixed bottom-6 right-20 z-50",
        "flex items-center gap-3 px-5 py-3 rounded-full",
        "bg-card border border-border shadow-xl",
        "animate-in slide-in-from-bottom-2 duration-300"
      )}
    >
      {/* Pulsing indicator */}
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "w-3 h-3 rounded-full",
            conversation.isSpeaking
              ? "bg-primary animate-pulse"
              : "bg-green-500"
          )}
        />
        {conversation.isSpeaking && (
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/40 animate-ping" />
        )}
      </div>

      {/* Status text */}
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
            <Mic className="w-4 h-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Listening…</span>
          </>
        )}
      </div>

      {/* End button */}
      <button
        onClick={endConversation}
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
