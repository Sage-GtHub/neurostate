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
  suggestions?: string[];
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

  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const messages = currentConversation?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const savedConversations = localStorage.getItem("guest-nova-conversations");
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed);
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

  const getPageContext = () => {
    const path = location.pathname;
    if (path.startsWith('/product/')) {
      return `The user is currently viewing a product page: ${path}`;
    } else if (path === '/' || path.includes('products')) {
      return 'The user is browsing the product catalogue';
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

    updateCurrentConversation(conv => {
      const updatedConv = {
        ...conv,
        messages: [...conv.messages, userMessage],
        updatedAt: new Date().toISOString(),
      };
      
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
      
      const contextMessage = {
        role: "system" as const,
        content: `Context: ${getPageContext()}. The user is not logged in. If they ask for personalised protocols, device tracking, or account features, encourage them to create a free Nova account.`
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

      updateCurrentConversation(conv => ({
        ...conv,
        messages: [
          ...conv.messages,
          { role: "assistant", content: "", timestamp: new Date().toISOString(), suggestions: [] },
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
                  if (assistantContent.length > 50 && !lastMessage.suggestions?.length) {
                    lastMessage.suggestions = generateContextualSuggestions(assistantContent);
                  }
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
      
      if (conversationId === currentConversationId) {
        if (filtered.length > 0) {
          setCurrentConversationId(filtered[0].id);
        } else {
          createNewConversation();
          return prev;
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

  const generateContextualSuggestions = (assistantMessage: string): string[] => {
    const lower = assistantMessage.toLowerCase();
    
    if (lower.includes('sleep') || lower.includes('melatonin') || lower.includes('rest')) {
      return [
        "What's the best time to take sleep supplements?",
        "Can you recommend a complete sleep stack?",
        "How does red light therapy help with sleep?"
      ];
    }
    
    if (lower.includes('recovery') || lower.includes('muscle') || lower.includes('inflammation')) {
      return [
        "What supplements support faster recovery?",
        "Tell me about cold therapy for recovery",
        "How do I optimise my recovery protocol?"
      ];
    }
    
    if (lower.includes('focus') || lower.includes('cognitive') || lower.includes('brain') || lower.includes('nootropic')) {
      return [
        "What's in the NeuroFocus supplement?",
        "How can I improve my mental clarity?",
        "Tell me about cognitive enhancement stacks"
      ];
    }
    
    if (lower.includes('bundle') || lower.includes('stack')) {
      return [
        "What bundles do you recommend for beginners?",
        "Can I customise a bundle?",
        "Do bundles save money compared to individual products?"
      ];
    }
    
    if (lower.includes('device') || lower.includes('therapy') || lower.includes('red light') || lower.includes('cold')) {
      return [
        "How do I use red light therapy effectively?",
        "What's the difference between your therapy devices?",
        "Can devices be combined with supplements?"
      ];
    }
    
    return [
      "What products would you recommend for my goals?",
      "Tell me about your most popular products",
      "How do I know which supplements I need?"
    ];
  };

  const cleanText = (text: string): string => {
    return text
      .replace(/\*/g, "")
      .replace(/\[.*?\]\(.*?\)/g, "")
      .replace(/#{1,6}\s/g, "")
      .replace(/`{1,3}/g, "")
      .replace(/^\s*[-*+]\s/gm, "")
      .replace(/\*\*this is not good\*\*/gi, "")
      .replace(/this is not good/gi, "");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[440px] p-0 flex flex-col h-full bg-ivory">
        <SheetHeader className="bg-gradient-to-b from-carbon to-slate p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-ivory/10 backdrop-blur">
                <Sparkles className="h-5 w-5 text-ivory" />
              </div>
              <div className="min-w-0 flex-1">
                <SheetTitle className="text-[1.125rem] font-semibold text-ivory">Nova</SheetTitle>
                <p className="text-[0.8125rem] text-ivory/70 truncate">
                  {currentConversation?.title || "Your performance assistant"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHistory(!showHistory)}
                className="text-ivory hover:bg-ivory/10 h-9 w-9 rounded-full"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-ivory hover:bg-ivory/10 h-9 w-9 rounded-full"
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
                className="text-ivory hover:bg-ivory/10 h-9 w-9 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        {showHistory ? (
          <div className="flex-1 overflow-hidden bg-gradient-to-b from-pearl/30 to-ivory">
            <ScrollArea className="h-full">
              <div className="p-6">
                <h3 className="text-[0.6875rem] font-semibold text-carbon mb-6 uppercase tracking-[0.15em]">
                  Conversation History
                </h3>
                {Object.entries(groupConversationsByDate()).map(([date, convs]) => (
                  <div key={date} className="mb-8">
                    <p className="text-[0.6875rem] text-ash uppercase tracking-[0.15em] mb-4">{date}</p>
                    <div className="space-y-3">
                      {convs.map(conv => (
                        <button
                          key={conv.id}
                          onClick={() => {
                            setCurrentConversationId(conv.id);
                            setShowHistory(false);
                            setShowSuggestions(false);
                          }}
                          className={`w-full text-left p-4 rounded-2xl transition-all ${
                            conv.id === currentConversationId
                              ? "bg-pearl/60"
                              : "hover:bg-pearl/30"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-[0.9375rem] font-medium text-carbon truncate">
                                {conv.title}
                              </p>
                              <p className="text-[0.8125rem] text-ash mt-1">
                                {conv.messages.length} messages · {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 flex-shrink-0 rounded-full hover:bg-carbon/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteConversation(conv.id);
                              }}
                            >
                              <X className="h-3.5 w-3.5" />
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
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-pearl/20 to-ivory">
              <div className="px-6 py-8 space-y-6">
                {messages.map((msg, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-4">
                      {msg.role === "assistant" && (
                        <div className="flex-shrink-0">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-carbon to-slate flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-ivory" />
                          </div>
                        </div>
                      )}
                      <div className={`flex-1 ${msg.role === "user" ? "ml-auto max-w-[85%]" : ""}`}>
                        <div className={`${msg.role === "user" ? "bg-pearl/60 p-4 rounded-2xl" : ""}`}>
                          <p className="text-[0.9375rem] text-carbon leading-relaxed whitespace-pre-wrap">
                            {cleanText(msg.content)}
                          </p>
                        </div>
                        {msg.timestamp && (
                          <p className={`text-[0.75rem] text-ash mt-2 flex items-center gap-1.5 ${msg.role === "user" ? "justify-end" : "ml-13"}`}>
                            <Clock className="h-3 w-3" />
                            {formatMessageTime(msg.timestamp)}
                          </p>
                        )}
                        {msg.role === "assistant" && msg.suggestions && msg.suggestions.length > 0 && index === messages.length - 1 && !isLoading && (
                          <div className="mt-4 ml-13 space-y-3">
                            <p className="text-[0.6875rem] text-ash uppercase tracking-[0.15em]">Continue the conversation</p>
                            <div className="grid grid-cols-1 gap-2">
                              {msg.suggestions.map((suggestion, i) => (
                                <Button
                                  key={i}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="justify-start text-left h-auto py-3 px-4 text-[0.8125rem] hover:bg-pearl/40 rounded-xl"
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-carbon to-slate flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-ivory animate-spin" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[0.9375rem] text-ash">Nova is typing...</p>
                </div>
              </div>
            )}

            {showSuggestions && messages.length === 1 && (
              <div className="pt-4">
                <p className="text-[0.6875rem] text-ash mb-4 uppercase tracking-[0.15em]">Quick Questions</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="justify-start text-left h-auto py-3 px-4 text-[0.9375rem] hover:bg-pearl/40 rounded-xl"
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

            <div className="bg-gradient-to-t from-pearl/40 to-transparent p-4">
              <div className="text-[0.8125rem] text-ash mb-3 text-center">
                Want personalised protocols based on your data?
              </div>
              <a href="https://neurostate.co.uk/nova" target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="sm" className="w-full rounded-full mb-4">
                  Create Nova Account
                </Button>
              </a>
            </div>

            <div className="bg-ivory p-6 pt-3">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about products, bundles, or advice..."
                  disabled={isLoading}
                  className="flex-1 rounded-full bg-pearl/50 border-0 focus-visible:ring-1 focus-visible:ring-carbon/20"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isLoading || !message.trim()}
                  className="flex-shrink-0 rounded-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-[0.75rem] text-ash mt-3 text-center">
                Nova helps with product questions, not medical advice
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
