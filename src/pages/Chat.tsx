import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Sparkles, Mic, MicOff, ArrowLeft, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { fetchProducts } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const quickSuggestions = [
  {
    icon: "🎯",
    text: "What products are best for recovery?",
    category: "Products"
  },
  {
    icon: "💤",
    text: "How can I improve my sleep quality?",
    category: "Wellness"
  },
  {
    icon: "🧠",
    text: "Which supplements support cognitive function?",
    category: "Products"
  },
  {
    icon: "⚡",
    text: "What's the difference between your red light devices?",
    category: "Products"
  },
  {
    icon: "🏋️",
    text: "How do I use cold therapy for muscle recovery?",
    category: "Usage"
  },
  {
    icon: "📦",
    text: "Tell me about your subscription options",
    category: "Shopping"
  }
];

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Hera, your AI wellness assistant. How can I help you today? Whether you're looking for product recommendations, have questions about our services, or need wellness advice, I'm here to help!",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast: showToast } = useToast();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Fetch products on mount
    fetchProducts(50).then((data) => {
      setProducts(data);
    }).catch((error) => {
      console.error('Error fetching products:', error);
    });
  }, []);

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
        
        if (event.results[current].isFinal) {
          setMessage(transcriptText);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        if (event.error === 'not-allowed') {
          showToast({
            title: "Microphone access denied",
            description: "Please allow microphone access to use voice input.",
            variant: "destructive",
          });
        } else if (event.error !== 'aborted') {
          showToast({
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
  }, [showToast]);

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

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      showToast({
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
      showToast({
        title: "Listening...",
        description: "Speak your question now.",
      });
    }
  };

  const clearHistory = () => {
    const firstMessage: Message = {
      role: "assistant",
      content: "Hello! I'm Hera, your AI wellness assistant. How can I help you today?",
      timestamp: new Date(),
    };
    setMessages([firstMessage]);
    setShowSuggestions(true);
    localStorage.removeItem("chatHistory");
    showToast({
      title: "Chat cleared",
      description: "Conversation history has been cleared.",
    });
  };

  const handleAddToCart = (product: any, variantId: string) => {
    const variant = product.node.variants.edges.find((v: any) => v.node.id === variantId)?.node;
    
    if (!variant) return;

    addItem({
      product: product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: {
        amount: variant.price.amount,
        currencyCode: variant.price.currencyCode,
      },
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });

    toast.success("Added to cart", {
      description: `${product.node.title} has been added to your cart.`,
    });
  };

  // Render message content with product cards
  const renderMessageContent = (content: string) => {
    // Parse markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(\/product\/([^\)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    const productHandles = new Set<string>();

    while ((match = linkRegex.exec(content)) !== null) {
      const handle = match[2];
      productHandles.add(handle);
      
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {content.substring(lastIndex, match.index)}
          </span>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {content.substring(lastIndex)}
        </span>
      );
    }

    const textContent = parts.length > 0 ? <div>{parts}</div> : content;

    // Find and render product cards
    const productCards = Array.from(productHandles).map((handle) => {
      const product = products.find((p) => p.node.handle === handle);
      if (!product) return null;

      const firstVariant = product.node.variants.edges[0]?.node;
      const imageUrl = product.node.images.edges[0]?.node.url;
      const price = parseFloat(product.node.priceRange.minVariantPrice.amount);

      return (
        <div
          key={handle}
          className="mt-3 border border-border rounded-xl overflow-hidden bg-background hover:shadow-accent transition-shadow"
        >
          <div className="flex gap-4 p-4">
            <Link to={`/product/${handle}`} className="flex-shrink-0">
              <img
                src={imageUrl}
                alt={product.node.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/product/${handle}`}>
                <h4 className="font-semibold text-sm mb-1 hover:text-accent transition-colors">
                  {product.node.title}
                </h4>
              </Link>
              <p className="text-lg font-bold text-accent mb-2">
                £{price.toFixed(2)}
              </p>
              <Button
                size="sm"
                onClick={() => handleAddToCart(product, firstVariant.id)}
                className="bg-gradient-primary hover:opacity-90 shadow-accent h-8"
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <>
        {textContent}
        {productCards.length > 0 && <div className="space-y-2">{productCards}</div>}
      </>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-primary sticky top-0 z-10 shadow-accent">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Hera</h1>
                <p className="text-xs text-white/80">Your wellness assistant</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-white hover:bg-white/20"
          >
            Clear Chat
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-accent/5 via-background to-background">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          {/* Quick Suggestions */}
          {showSuggestions && messages.length === 1 && (
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="font-medium">Quick questions to get started:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left h-auto py-4 px-4 hover:bg-accent/5 hover:border-accent/50 hover:shadow-accent transition-all group"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <span className="text-xl mr-3 group-hover:scale-110 transition-transform">
                      {suggestion.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{suggestion.text}</p>
                      <Badge variant="secondary" className="text-xs mt-1.5 bg-accent/10 text-accent-foreground">
                        {suggestion.category}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-gradient-primary text-white rounded-2xl rounded-tr-sm shadow-accent"
                      : "bg-card border border-border rounded-2xl rounded-tl-sm shadow-sm"
                  } p-4`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {renderMessageContent(msg.content)}
                  </div>
                  <p className="text-xs opacity-60 mt-2">
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
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 shadow-sm">
                  <Loader2 className="h-5 w-5 animate-spin text-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky bottom-0 shadow-lg">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          {isRecording && transcript && (
            <div className="mb-3 p-3 bg-accent/10 border border-accent/20 rounded-lg animate-pulse">
              <p className="text-sm text-accent flex items-center gap-2 font-medium">
                <Mic className="h-4 w-4 animate-pulse" />
                <span>{transcript}</span>
              </p>
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button
              type="button"
              size="icon"
              variant={isRecording ? "destructive" : "outline"}
              onClick={toggleVoiceInput}
              disabled={isLoading}
              className={isRecording ? "animate-pulse" : "hover:border-accent/50"}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isRecording ? "Listening..." : "Ask me anything..."}
              className="flex-1 h-11 focus-visible:ring-accent"
              disabled={isLoading || isRecording}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || isRecording}
              className="h-11 w-11 bg-gradient-primary hover:opacity-90 shadow-accent"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send size={18} />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
