import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowUp, Loader2, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import neurostateIcon from "@/assets/neurostate-icon.svg";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "What industries do you serve?",
  "How does the platform work?",
  "What ROI can we expect?",
  "Tell me about Nova AI",
];

export function FloatingNovaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check auth status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Don't show on the full chat page or Nova app pages
  if (location.pathname.startsWith("/nova")) {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (prompt?: string) => {
    const messageContent = prompt || input.trim();
    if (!messageContent) return;

    const userMessage: Message = { role: "user", content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/website-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({ title: "Too many requests", description: "Please wait a moment and try again.", variant: "destructive" });
        } else {
          throw new Error('Failed to get response');
        }
        setIsLoading(false);
        return;
      }
      
      const data = await response.json();
      const assistantMessage: Message = { role: "assistant", content: data.message };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({ title: "Error", description: "Failed to get response. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-foreground text-background shadow-lg hover:scale-105 transition-transform flex items-center justify-center group"
          aria-label="Open chat"
        >
          <img src={neurostateIcon} alt="Neurostate" className="w-7 h-7 invert group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
        </button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-full sm:w-[400px] p-0 flex flex-col bg-background border-l border-border/50"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
              <img src={neurostateIcon} alt="Neurostate" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-foreground">Neurostate</h2>
              <p className="text-[10px] text-muted-foreground">Ask us anything</p>
            </div>
          </div>
          {!isLoggedIn && (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/auth');
              }}
              className="flex items-center gap-1.5 text-[10px] text-accent hover:underline"
            >
              <LogIn className="w-3 h-3" />
              Sign in
            </button>
          )}
        </div>


        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
                <img src={neurostateIcon} alt="Neurostate" className="w-7 h-7 opacity-40" />
              </div>
              <p className="text-sm text-foreground mb-1">Hi! How can I help?</p>
              <p className="text-[11px] text-muted-foreground mb-6">
                Ask about our solutions, industries, or how NeuroState works
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="px-3 py-1.5 rounded-full bg-foreground/5 text-[11px] text-foreground/70 hover:bg-foreground/10 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5",
                      msg.role === "user"
                        ? "bg-foreground text-background"
                        : "bg-foreground/5 text-foreground"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <div className="text-xs prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-xs">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-foreground/5 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin text-accent" />
                      <span className="text-[11px] text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="flex-1 h-10 px-4 rounded-full bg-foreground/5 border-0 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center disabled:opacity-50 hover:bg-foreground/90 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
