import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Sparkles, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const quickSuggestions = [
  "What products help with sleep?",
  "Tell me about your bundles",
  "How does red light therapy work?",
  "Which supplements support recovery?",
];

interface GuestChatWidgetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GuestChatWidget({ open, onOpenChange }: GuestChatWidgetProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast: showToast } = useToast();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const location = useLocation();

  // Load conversation history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("guest-nova-chat-history");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
        setShowSuggestions(parsed.length <= 1);
      } catch (error) {
        console.error("Error loading chat history:", error);
        // Initialize with welcome message if loading fails
        const welcomeMessage: Message = {
          role: "assistant",
          content: "I'm Nova, your NeuroState performance assistant. Ask me anything about our products, stacks, or how to optimise your performance.",
        };
        setMessages([welcomeMessage]);
      }
    } else {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        role: "assistant",
        content: "I'm Nova, your NeuroState performance assistant. Ask me anything about our products, stacks, or how to optimise your performance.",
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save conversation history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("guest-nova-chat-history", JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get context from current page
  const getPageContext = () => {
    const path = location.pathname;
    if (path.startsWith('/product/')) {
      return `The user is currently viewing a product page: ${path}`;
    } else if (path === '/' || path.includes('products')) {
      return 'The user is browsing the product catalog';
    } else if (path.includes('bundles')) {
      return 'The user is viewing product bundles';
    } else if (path.includes('guides')) {
      return 'The user is browsing wellness guides';
    }
    return 'The user is on the NeuroState website';
  };

  const handleSendMessage = async (e: React.FormEvent, customMessage?: string) => {
    e.preventDefault();
    const messageToSend = customMessage || message;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: messageToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
      
      // Add page context to the first message
      const contextMessage = {
        role: "system" as const,
        content: `Context: ${getPageContext()}. The user is not logged in. If they ask for personalized protocols, device tracking, or account features, encourage them to create a free Nova account.`
      };
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            contextMessage,
            ...messages.map(({ role, content }) => ({ role, content })),
            userMessage
          ],
        }),
      });

      if (response.status === 429) {
        showToast({
          title: "Rate limit exceeded",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (response.status === 402) {
        showToast({
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

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" },
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
      showToast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSendMessage(syntheticEvent, suggestion);
  };

  const clearHistory = () => {
    const welcomeMessage: Message = {
      role: "assistant",
      content: "I'm Nova, your NeuroState performance assistant. Ask me anything about our products, stacks, or how to optimise your performance.",
    };
    setMessages([welcomeMessage]);
    setShowSuggestions(true);
    localStorage.removeItem("guest-nova-chat-history");
    showToast({
      title: "Chat cleared",
      description: "Conversation history has been cleared.",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[440px] p-0 flex flex-col">
        <SheetHeader className="border-b bg-carbon p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-ivory/10 backdrop-blur">
                <Sparkles className="h-5 w-5 text-ivory" />
              </div>
              <div>
                <SheetTitle className="text-lg font-semibold text-ivory">Nova</SheetTitle>
                <p className="text-xs text-ivory/80">Your performance assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-ivory hover:bg-ivory/10 text-xs"
              >
                Clear
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="text-ivory hover:bg-ivory/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto bg-ivory">
          <div className="px-4 py-6 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="flex gap-3">
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-carbon flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-ivory" />
                    </div>
                  </div>
                )}
                <div className={`flex-1 ${msg.role === "user" ? "ml-auto max-w-[85%]" : ""}`}>
                  <div className={`${msg.role === "user" ? "bg-pearl p-3 rounded-lg" : ""}`}>
                    <p className="text-sm text-carbon leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-carbon flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-ivory animate-spin" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-ash">Nova is typing...</p>
                </div>
              </div>
            )}

            {showSuggestions && messages.length === 1 && (
              <div className="pt-2">
                <p className="text-xs text-ash mb-3 uppercase tracking-wider">Quick Questions</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="justify-start text-left h-auto py-2 px-3 text-sm"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="border-t border-mist bg-pearl p-3">
          <div className="text-xs text-ash mb-2">
            Want personalized protocols based on your data?
          </div>
          <Link to="/nova" onClick={() => onOpenChange(false)}>
            <Button variant="default" size="sm" className="w-full">
              Create Nova Account
            </Button>
          </Link>
        </div>

        {/* Input Area */}
        <div className="border-t border-mist bg-ivory p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about products, bundles, or advice..."
              disabled={isLoading}
              className="flex-1 rounded-lg border-mist"
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={isLoading || !message.trim()}
              className="flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-ash mt-2 text-center">
            Nova helps with product questions, not medical advice
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
