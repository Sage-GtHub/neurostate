import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2, Sparkles, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const quickSuggestions = [
  {
    text: "What products are best for recovery?",
    category: "Products"
  },
  {
    text: "How can I improve my sleep quality?",
    category: "Wellness"
  },
  {
    text: "Which supplements support cognitive function?",
    category: "Products"
  },
  {
    text: "What's the difference between your red light devices?",
    category: "Products"
  },
  {
    text: "How do I use cold therapy for muscle recovery?",
    category: "Usage"
  },
  {
    text: "Tell me about your subscription options",
    category: "Shopping"
  }
];

export const LiveChat = ({ externalOpen, onOpenChange }: { externalOpen?: boolean; onOpenChange?: (open: boolean) => void } = {}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Sync with external control
  useEffect(() => {
    if (externalOpen !== undefined) {
      setIsOpen(externalOpen);
    }
  }, [externalOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI wellness assistant. How can I help you today? Whether you're looking for product recommendations, have questions about our services, or need wellness advice, I'm here to help!",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        // If final result, update the input field
        if (event.results[current].isFinal) {
          setMessage(transcriptText);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        if (event.error === 'not-allowed') {
          toast({
            title: "Microphone access denied",
            description: "Please allow microphone access to use voice input.",
            variant: "destructive",
          });
        } else if (event.error !== 'aborted') {
          toast({
            title: "Voice recognition error",
            description: "Please try again.",
            variant: "destructive",
          });
        }
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        setTranscript("");
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

  useEffect(() => {
    // Load conversation history from localStorage
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save conversation history to localStorage
    if (messages.length > 1) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent, customMessage?: string) => {
    e.preventDefault();
    const messageToSend = customMessage || message;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
        }),
      });

      if (response.status === 429) {
        toast({
          title: "Rate limit exceeded",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (response.status === 402) {
        toast({
          title: "Service unavailable",
          description: "AI service is temporarily unavailable.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error("Failed to start stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      // Add assistant message placeholder
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", timestamp: new Date() },
      ]);

      while (!streamDone) {
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
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === "assistant") {
                  lastMessage.content = assistantContent;
                }
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      // Remove the last message if it failed
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSendMessage(syntheticEvent, suggestion);
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input. Please try Chrome, Edge, or Safari.",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setIsRecording(true);
      toast({
        title: "Listening...",
        description: "Speak your question now.",
      });
    }
  };

  const clearHistory = () => {
    const firstMessage: Message = {
      role: "assistant",
      content: "Hello! I'm your AI wellness assistant. How can I help you today?",
      timestamp: new Date(),
    };
    setMessages([firstMessage]);
    setShowSuggestions(true);
    localStorage.removeItem("chatHistory");
    toast({
      title: "Chat cleared",
      description: "Conversation history has been cleared.",
    });
  };

  // Render quick suggestions
  const renderSuggestions = () => {
    if (!showSuggestions || messages.length > 1) return null;

    return (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-medium">Quick questions to get started:</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {quickSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start text-left h-auto py-3 px-4 hover:bg-primary/5 hover:border-primary/50 transition-all group"
              onClick={() => handleSuggestionClick(suggestion.text)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm">{suggestion.text}</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {suggestion.category}
                </Badge>
              </div>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // Render chat messages (shared between mobile and desktop)
  const renderMessages = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/40 backdrop-blur-[20px]">
      {renderSuggestions()}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/70 backdrop-blur-[12px]"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            <p className="text-xs opacity-70 mt-1">
              {msg.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-muted/70 backdrop-blur-[12px] p-3 rounded-lg">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );

  // Render input form (shared between mobile and desktop)
  const renderInput = () => (
    <form onSubmit={handleSendMessage} className="p-4 border-t border-border/50 bg-background/70 backdrop-blur-[20px]">
      {isRecording && transcript && (
        <div className="mb-2 p-2 bg-primary/10 rounded-lg animate-pulse">
          <p className="text-sm text-primary flex items-center gap-2">
            <Mic className="h-4 w-4 animate-pulse" />
            <span>{transcript}</span>
          </p>
        </div>
      )}
      <div className="flex gap-2">
        <Button
          type="button"
          size="icon"
          variant={isRecording ? "destructive" : "outline"}
          onClick={toggleVoiceInput}
          disabled={isLoading}
          className={isRecording ? "animate-pulse" : ""}
        >
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isRecording ? "Listening..." : "Ask me anything..."}
          className="flex-1"
          disabled={isLoading || isRecording}
        />
        <Button type="submit" size="icon" disabled={isLoading || isRecording}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
        </Button>
      </div>
    </form>
  );

  // Mobile view with Drawer (bottom sheet)
  if (isMobile) {
    return (
      <>
        {/* Floating chat button - only show if not controlled externally */}
        {externalOpen === undefined && (
          <Drawer open={isOpen} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>
              <button
                className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full shadow-2xl hover:shadow-primary/50 transition-all hover:scale-110 active:scale-95"
                aria-label="Open chat"
              >
                <MessageCircle size={28} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh] flex flex-col bg-transparent backdrop-blur-[30px] border-t border-border/50">
              <DrawerHeader className="border-b border-border/50 bg-background/70 backdrop-blur-[20px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <div>
                      <DrawerTitle>Ask AI</DrawerTitle>
                      <p className="text-xs text-muted-foreground">Your wellness assistant</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                </div>
              </DrawerHeader>
              {renderMessages()}
              {renderInput()}
            </DrawerContent>
          </Drawer>
        )}

        {/* Controlled version for external open state */}
        {externalOpen !== undefined && (
          <Drawer open={isOpen} onOpenChange={handleOpenChange}>
            <DrawerContent className="h-[85vh] flex flex-col bg-transparent backdrop-blur-[30px] border-t border-border/50">
              <DrawerHeader className="border-b border-border/50 bg-background/70 backdrop-blur-[20px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <div>
                      <DrawerTitle>Ask AI</DrawerTitle>
                      <p className="text-xs text-muted-foreground">Your wellness assistant</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                </div>
              </DrawerHeader>
              {renderMessages()}
              {renderInput()}
            </DrawerContent>
          </Drawer>
        )}
      </>
    );
  }

  // Desktop view with Sheet (side panel like Ask Helix)
  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[440px] flex flex-col p-0 bg-transparent backdrop-blur-[30px] border-l border-border/50">
        <SheetHeader className="border-b border-border/50 p-6 pb-4 bg-background/70 backdrop-blur-[20px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <SheetTitle>Ask AI</SheetTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Your wellness assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-xs h-8"
            >
              Clear
            </Button>
          </div>
        </SheetHeader>
        {renderMessages()}
        {renderInput()}
      </SheetContent>
    </Sheet>
  );
};
