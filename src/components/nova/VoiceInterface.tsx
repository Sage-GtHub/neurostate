import { useState } from "react";
import { useConversation } from "@11labs/react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AGENT_ID = "agent_2601kjdfphrefs5thzmypmv7fn7a";

interface VoiceInterfaceProps {
  onSpeakingChange?: (speaking: boolean) => void;
}

export function VoiceInterface({ onSpeakingChange }: VoiceInterfaceProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      setIsLoading(false);
      toast({
        title: "NeuroState Agent connected",
        description: "Speak naturally — your AI sales agent is listening.",
      });
    },
    onDisconnect: () => {
      onSpeakingChange?.(false);
    },
    onError: (error) => {
      console.error("Voice error:", error);
      toast({
        title: "Connection error",
        description: "Failed to connect to the NeuroState agent. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    },
    onMessage: (message) => {
      if (message.source === "ai") {
        onSpeakingChange?.(true);
      }
    },
  });

  const startConversation = async () => {
    setIsLoading(true);

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast({
        title: "Connection failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to start voice conversation",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
    onSpeakingChange?.(false);
  };

  const isConnected = conversation.status === "connected";

  return (
    <div className="flex items-center justify-center gap-4">
      {!isConnected ? (
        <Button
          onClick={startConversation}
          disabled={isLoading}
          size="lg"
          className="group relative overflow-hidden"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="ml-2">Connecting...</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span className="ml-2">Talk to NeuroState Agent</span>
            </>
          )}
        </Button>
      ) : (
        <div className="flex items-center gap-3">
          {conversation.isSpeaking && (
            <Volume2 className="w-5 h-5 text-primary animate-pulse" />
          )}
          <span className="text-sm text-muted-foreground">
            {conversation.isSpeaking ? "Agent is speaking…" : "Listening…"}
          </span>
          <Button
            onClick={endConversation}
            variant="secondary"
            size="lg"
            className="group relative overflow-hidden"
          >
            <MicOff className="w-5 h-5" />
            <span className="ml-2">End Conversation</span>
          </Button>
        </div>
      )}
    </div>
  );
}
