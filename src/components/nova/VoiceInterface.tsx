import { useState, useEffect } from "react";
import { useConversation } from "@11labs/react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VoiceInterfaceProps {
  onSpeakingChange?: (speaking: boolean) => void;
}

export function VoiceInterface({ onSpeakingChange }: VoiceInterfaceProps) {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      setIsConnected(true);
      setIsLoading(false);
      toast({
        title: "Voice activated",
        description: "Nova is listening. Speak naturally.",
      });
    },
    onDisconnect: () => {
      setIsConnected(false);
      onSpeakingChange?.(false);
    },
    onError: (error) => {
      console.error("Voice error:", error);
      toast({
        title: "Voice error",
        description: "Failed to connect voice interface",
        variant: "destructive",
      });
      setIsLoading(false);
    },
    onMessage: (message) => {
      if (message.type === "agent_response") {
        onSpeakingChange?.(true);
      } else if (message.type === "agent_response_end") {
        onSpeakingChange?.(false);
      }
    },
  });

  const startConversation = async () => {
    setIsLoading(true);
    
    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get signed URL from edge function
      const { data, error } = await supabase.functions.invoke("elevenlabs-signed-url");
      
      if (error) throw error;
      
      if (!data?.signed_url) {
        throw new Error("No signed URL received");
      }

      await conversation.startSession({ 
        url: data.signed_url 
      });
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Failed to start voice conversation",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
    setIsConnected(false);
    onSpeakingChange?.(false);
  };

  return (
    <div className="flex items-center justify-center">
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
              <span className="ml-2">Start Voice Chat</span>
            </>
          )}
        </Button>
      ) : (
        <Button 
          onClick={endConversation}
          variant="secondary"
          size="lg"
          className="group relative overflow-hidden"
        >
          <MicOff className="w-5 h-5" />
          <span className="ml-2">End Voice Chat</span>
        </Button>
      )}
    </div>
  );
}
