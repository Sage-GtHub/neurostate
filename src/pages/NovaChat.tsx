import { useState, useEffect, useRef, useCallback } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Loader2, Copy, Check, RotateCcw, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { VoiceInterface } from "@/components/nova/VoiceInterface";
import { SEO } from "@/components/SEO";
import ReactMarkdown from "react-markdown";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const SUGGESTED_PROMPTS = [
  "How can I improve my HRV?",
  "Create a morning supplement stack",
  "Why am I tired in the afternoon?",
  "Optimise my sleep protocol",
];

export default function NovaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history
  useEffect(() => {
    const loadHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoadingHistory(false);
        return;
      }

      const { data: history } = await supabase
        .from('nova_chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(50);

      if (history && history.length > 0) {
        setMessages(history.map(h => ({
          id: h.id,
          role: h.role as "user" | "assistant",
          content: h.content,
          timestamp: new Date(h.created_at)
        })));
      } else {
        setMessages([{
          role: "assistant",
          content: "I am Nova, your AI performance coach. I analyse your biometrics, identify patterns, and provide precise recommendations to optimise your performance.\n\nWhat would you like to work on today?",
          timestamp: new Date()
        }]);
      }
      setIsLoadingHistory(false);
    };

    loadHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const streamChat = useCallback(async (userMessage: Message) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nova-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantContent = "";
    let textBuffer = "";

    // Add empty assistant message
    setMessages(prev => [...prev, { role: "assistant", content: "", timestamp: new Date() }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      // Process line by line
      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                role: "assistant",
                content: assistantContent,
                timestamp: new Date()
              };
              return newMessages;
            });
          }
        } catch {
          // Re-buffer incomplete JSON
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
          }
        } catch { /* ignore */ }
      }
    }

    return assistantContent;
  }, [messages]);

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || input.trim();
    if (!content || isLoading) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to chat with Nova",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { role: "user", content, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Save user message
      await supabase.from('nova_chat_messages').insert({
        user_id: user.id,
        role: 'user',
        content
      });

      // Stream response
      const assistantContent = await streamChat(userMessage);

      // Save assistant response
      if (assistantContent) {
        await supabase.from('nova_chat_messages').insert({
          user_id: user.id,
          role: 'assistant',
          content: assistantContent
        });
      }

    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      // Remove the empty assistant message on error
      setMessages(prev => prev.filter(m => m.content !== ""));
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('nova_chat_messages').delete().eq('user_id', user.id);
    setMessages([{
      role: "assistant",
      content: "I am Nova, your AI performance coach. I analyse your biometrics, identify patterns, and provide precise recommendations to optimise your performance.\n\nWhat would you like to work on today?",
      timestamp: new Date()
    }]);
    toast({ title: "Chat history cleared" });
  };

  const regenerateLastResponse = async () => {
    if (messages.length < 2) return;
    
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(m => m.role === "user");
    if (lastUserMessageIndex === -1) return;

    const actualIndex = messages.length - 1 - lastUserMessageIndex;
    const lastUserMessage = messages[actualIndex];
    
    // Remove messages from that point
    setMessages(prev => prev.slice(0, actualIndex));
    
    // Resend
    setTimeout(() => handleSendMessage(lastUserMessage.content), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoadingHistory) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Chat with Nova – AI Performance Coach | NeuroState"
        description="Have a conversation with Nova, your elite AI performance coach. Get personalised advice on protocols, recovery, and optimisation."
      />
      <div className="min-h-screen bg-background flex flex-col">
        <NovaNav />
      
        {/* Header */}
        <div className="border-b border-border/50 bg-background">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">Nova</h1>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-accent animate-pulse' : 'bg-accent'}`} />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 h-full">
            <div className="max-w-3xl mx-auto h-full flex flex-col py-4">
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-6 pb-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-accent" />
                        </div>
                      </div>
                    )}
                    <div className={`group relative max-w-[85%] ${
                      message.role === "user" 
                        ? "bg-foreground text-background px-4 py-3 rounded-2xl rounded-br-md" 
                        : "bg-muted/30 px-4 py-3 rounded-2xl rounded-bl-md"
                    }`}>
                      {message.role === "assistant" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({ children }) => <ul className="mb-2 list-disc pl-4">{children}</ul>,
                              ol: ({ children }) => <ol className="mb-2 list-decimal pl-4">{children}</ol>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                              h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-sm font-semibold mb-1">{children}</h3>,
                              code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>,
                            }}
                          >
                            {message.content || "..."}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      )}
                      
                      {/* Action buttons */}
                      {message.role === "assistant" && message.content && (
                        <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => copyToClipboard(message.content, `msg-${index}`)}
                          >
                            {copiedId === `msg-${index}` ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <Copy className="w-3 h-3 mr-1" />
                            )}
                            Copy
                          </Button>
                          {index === messages.length - 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                              onClick={regenerateLastResponse}
                              disabled={isLoading}
                            >
                              <RotateCcw className="w-3 h-3 mr-1" />
                              Regenerate
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && messages[messages.length - 1]?.content === "" && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-accent animate-spin" />
                    </div>
                    <div className="bg-muted/30 px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested prompts */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pb-4">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-xs border-border/50 hover:bg-muted/50"
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isLoading}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              )}
              
              {/* Input */}
              <div className="border-t border-border/50 pt-4 bg-background">
                <div className="flex gap-2 items-end">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Nova anything about performance, recovery, protocols..."
                    disabled={isLoading}
                    className="flex-1 resize-none min-h-[48px] max-h-[200px] border-border/50 bg-muted/30 focus:bg-background"
                    rows={1}
                  />
                  <div className="flex flex-col gap-2">
                    <Button 
                      onClick={() => handleSendMessage()} 
                      disabled={isLoading || !input.trim()}
                      size="icon"
                      className="h-[48px] w-[48px] bg-foreground hover:bg-foreground/90"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center mt-3">
                  <VoiceInterface onSpeakingChange={setIsSpeaking} />
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  Nova may make mistakes. Consider verifying important information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
