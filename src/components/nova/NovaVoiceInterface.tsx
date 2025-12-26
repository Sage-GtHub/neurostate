import { useState, useCallback, useEffect, useRef } from "react";
import { useConversation } from "@elevenlabs/react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2, Phone, PhoneOff, Volume2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface NovaVoiceInterfaceProps {
  onTranscript?: (text: string, role: "user" | "assistant") => void;
  className?: string;
}

export function NovaVoiceInterface({ onTranscript, className }: NovaVoiceInterfaceProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const animationRef = useRef<number>();
  const { toast } = useToast();

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to Nova voice agent");
      toast({
        title: "Voice connected",
        description: "Nova is listening. Speak naturally.",
      });
    },
    onDisconnect: () => {
      console.log("Disconnected from Nova voice agent");
    },
    onMessage: (message: any) => {
      console.log("Voice message:", message);
      
      // Handle transcripts
      if (message?.type === "user_transcript" && onTranscript) {
        const transcript = message?.user_transcription_event?.user_transcript;
        if (transcript) {
          onTranscript(transcript, "user");
        }
      }
      
      if (message?.type === "agent_response" && onTranscript) {
        const response = message?.agent_response_event?.agent_response;
        if (response) {
          onTranscript(response, "assistant");
        }
      }
    },
    onError: (error) => {
      console.error("Voice error:", error);
      toast({
        title: "Voice error",
        description: "Connection issue. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Animate audio levels when speaking
  useEffect(() => {
    if (conversation.status === "connected") {
      const updateLevels = () => {
        const input = conversation.getInputVolume();
        const output = conversation.getOutputVolume();
        setAudioLevel(Math.max(input, output));
        animationRef.current = requestAnimationFrame(updateLevels);
      };
      animationRef.current = requestAnimationFrame(updateLevels);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [conversation.status, conversation]);

  const checkMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      return true;
    } catch {
      setHasPermission(false);
      toast({
        title: "Microphone required",
        description: "Please enable microphone access to use voice features.",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    
    try {
      // Check microphone permission
      const permitted = await checkMicrophonePermission();
      if (!permitted) {
        setIsConnecting(false);
        return;
      }

      // Get signed URL from edge function
      const { data, error } = await supabase.functions.invoke("elevenlabs-signed-url");
      
      if (error || !data?.signed_url) {
        throw new Error(error?.message || "Failed to get voice connection");
      }

      // Start the conversation with WebSocket
      await conversation.startSession({
        signedUrl: data.signed_url,
      });
      
    } catch (error) {
      console.error("Failed to start voice conversation:", error);
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Unable to start voice mode",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [conversation, checkMicrophonePermission, toast]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setAudioLevel(0);
  }, [conversation]);

  const isConnected = conversation.status === "connected";
  const isSpeaking = conversation.isSpeaking;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {isConnected ? (
        <>
          {/* Audio visualiser */}
          <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-accent/10 border border-accent/20">
            <div className="flex items-center gap-0.5 h-5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1 rounded-full transition-all duration-75",
                    isSpeaking ? "bg-accent" : "bg-muted-foreground/50"
                  )}
                  style={{
                    height: `${Math.max(4, Math.min(20, audioLevel * 20 * (1 + Math.sin(i * 0.5))))}px`,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              {isSpeaking ? (
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-accent" />
                  Nova speaking
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Mic className="w-3 h-3 text-green-500 animate-pulse" />
                  Listening
                </span>
              )}
            </span>
          </div>
          
          {/* End call button */}
          <Button
            onClick={stopConversation}
            variant="destructive"
            size="sm"
            className="gap-2 rounded-xl"
          >
            <PhoneOff className="w-4 h-4" />
            End
          </Button>
        </>
      ) : (
        <Button
          onClick={startConversation}
          disabled={isConnecting}
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 rounded-xl border-accent/30 hover:border-accent hover:bg-accent/10",
            "transition-all duration-300"
          )}
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Phone className="w-4 h-4" />
              Voice mode
            </>
          )}
        </Button>
      )}
    </div>
  );
}
