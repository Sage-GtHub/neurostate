import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Sparkles, X, MessageSquare, Plus, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
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
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast: showToast } = useToast();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const location = useLocation();

  // Get current conversation
  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const messages = currentConversation?.messages || [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem("guest-nova-conversations");
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed);
        // Set the most recent conversation as current
        if (parsed.length > 0) {
          setCurrentConversationId(parsed[0].id);
          setShowSuggestions(parsed[0].messages.length <= 1);
        } else {
          createNewConversation();
        }
      } catch (error) {
        console.error("Error loading conversations:", error);
        createNewConversation();
      }
    } else {
      createNewConversation();
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("guest-nova-conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New conversation",
      messages: [
        {
          role: "assistant",
          content: "I'm Nova, your NeuroState performance assistant. Ask me anything about our products, stacks, or how to optimise your performance.",
          timestamp: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setShowSuggestions(true);
    setShowHistory(false);
  };

  const generateConversationTitle = (firstUserMessage: string): string => {
    // Generate a short title from the first user message
    const words = firstUserMessage.trim().split(" ");
    return words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : "");
  };

  const updateCurrentConversation = (updater: (conv: Conversation) => Conversation) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === currentConversationId ? updater(conv) : conv
      )
    );
  };

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
    if (!messageToSend.trim() || isLoading || !currentConversationId) return;

    const userMessage: Message = {
      role: "user",
      content: messageToSend,
      timestamp: new Date().toISOString(),
    };

    // Update conversation with user message
    updateCurrentConversation(conv => {
      const updatedConv = {
        ...conv,
        messages: [...conv.messages, userMessage],
        updatedAt: new Date().toISOString(),
      };
      
      // Update title if this is the first user message
      if (conv.messages.length === 1 && conv.title === "New conversation") {
        updatedConv.title = generateConversationTitle(messageToSend);
      }
      
      return updatedConv;
    });

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

      const conversationMessages = currentConversation?.messages || [];
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            contextMessage,
            ...conversationMessages.map(({ role, content }) => ({ role, content })),
            { role: userMessage.role, content: userMessage.content }
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

      // Add empty assistant message to conversation
      updateCurrentConversation(conv => ({
        ...conv,
        messages: [
          ...conv.messages,
          { role: "assistant", content: "", timestamp: new Date().toISOString() },
        ],
      }));

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
              updateCurrentConversation(conv => {
                const messages = [...conv.messages];
                const lastMessage = messages[messages.length - 1];
                if (lastMessage.role === "assistant") {
                  lastMessage.content = assistantContent;
                }
                return { ...conv, messages, updatedAt: new Date().toISOString() };
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
      // Remove the last message (failed assistant message)
      updateCurrentConversation(conv => ({
        ...conv,
        messages: conv.messages.slice(0, -1),
      }));
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSendMessage(syntheticEvent, suggestion);
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== conversationId);
      
      // If deleting current conversation, switch to another or create new
      if (conversationId === currentConversationId) {
        if (filtered.length > 0) {
          setCurrentConversationId(filtered[0].id);
        } else {
          createNewConversation();
          return prev; // Don't update yet, createNewConversation will handle it
        }
      }
      
      return filtered;
    });
    
    showToast({
      title: "Conversation deleted",
      description: "The conversation has been removed.",
    });
  };

  const clearAllHistory = () => {
    setConversations([]);
    localStorage.removeItem("guest-nova-conversations");
    createNewConversation();
    showToast({
      title: "History cleared",
      description: "All conversation history has been cleared.",
    });
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, "HH:mm");
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, "HH:mm")}`;
    } else {
      return format(date, "dd MMM HH:mm");
    }
  };

  const formatConversationDate = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "dd MMM yyyy");
    }
  };

  const groupConversationsByDate = () => {
    const groups: { [key: string]: Conversation[] } = {};
    
    conversations.forEach(conv => {
      const key = formatConversationDate(conv.updatedAt);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(conv);
    });
    
    return groups;
  };

  const cleanText = (text: string): string => {
    return text
      .replace(/\*/g, "") // Remove asterisks
      .replace(/\[.*?\]\(.*?\)/g, "") // Remove markdown links
      .replace(/#{1,6}\s/g, "") // Remove markdown headers
      .replace(/`{1,3}/g, "") // Remove code blocks
      .replace(/^\s*[-*+]\s/gm, "") // Remove list markers
      .replace(/\*\*this is not good\*\*/gi, "") // Remove specific unwanted text
      .replace(/this is not good/gi, ""); // Remove plain version too
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[440px] p-0 flex flex-col h-full">
        <SheetHeader className="border-b bg-carbon p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-ivory/10 backdrop-blur">
                <Sparkles className="h-5 w-5 text-ivory" />
              </div>
              <div className="min-w-0 flex-1">
                <SheetTitle className="text-lg font-semibold text-ivory">Nova</SheetTitle>
                <p className="text-xs text-ivory/80 truncate">
                  {currentConversation?.title || "Your performance assistant"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHistory(!showHistory)}
                className="text-ivory hover:bg-ivory/10 h-8 w-8"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-ivory hover:bg-ivory/10 h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={createNewConversation}>
                    <Plus className="h-4 w-4 mr-2" />
                    New conversation
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearAllHistory} className="text-destructive">
                    <X className="h-4 w-4 mr-2" />
                    Clear all history
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="text-ivory hover:bg-ivory/10 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        {/* History Sidebar or Chat Area */}
        {showHistory ? (
          <div className="flex-1 overflow-hidden bg-ivory">
            <ScrollArea className="h-full">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-carbon mb-4 uppercase tracking-wider">
                  Conversation History
                </h3>
                {Object.entries(groupConversationsByDate()).map(([date, convs]) => (
                  <div key={date} className="mb-6">
                    <p className="text-xs text-ash uppercase tracking-wider mb-2">{date}</p>
                    <div className="space-y-2">
                      {convs.map(conv => (
                        <button
                          key={conv.id}
                          onClick={() => {
                            setCurrentConversationId(conv.id);
                            setShowHistory(false);
                            setShowSuggestions(false);
                          }}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            conv.id === currentConversationId
                              ? "bg-pearl border border-mist"
                              : "hover:bg-pearl/50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-carbon truncate">
                                {conv.title}
                              </p>
                              <p className="text-xs text-ash mt-1">
                                {conv.messages.length} messages · {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteConversation(conv.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <>
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto bg-ivory">
              <div className="px-4 py-6 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex gap-3">
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
                            {cleanText(msg.content)}
                          </p>
                        </div>
                        {msg.timestamp && (
                          <p className={`text-xs text-ash mt-1 flex items-center gap-1 ${msg.role === "user" ? "justify-end" : "ml-11"}`}>
                            <Clock className="h-3 w-3" />
                            {formatMessageTime(msg.timestamp)}
                          </p>
                        )}
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
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
