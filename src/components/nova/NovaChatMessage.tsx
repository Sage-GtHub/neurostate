import { cn } from "@/lib/utils";
import { Sparkles, Copy, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

interface NovaChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  isStreaming?: boolean;
  onCopy?: () => void;
  onRegenerate?: () => void;
  className?: string;
  animationDelay?: number;
}

export function NovaChatMessage({
  role,
  content,
  timestamp,
  isStreaming,
  onCopy,
  onRegenerate,
  className,
  animationDelay = 0,
}: NovaChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  if (role === "user") {
    return (
      <div 
        className={cn(
          "flex justify-end nova-message-animate",
          className
        )}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div className="max-w-[85%] sm:max-w-[75%]">
          <div className="nova-bubble-user px-4 py-3">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
          {timestamp && (
            <p className="text-[10px] text-muted-foreground mt-1.5 text-right mr-1">
              {formatTime(timestamp)}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "group flex gap-3 nova-message-animate",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Nova Avatar */}
      <div className="flex-shrink-0 pt-1">
        <div className="w-9 h-9 rounded-xl nova-gradient flex items-center justify-center nova-glow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>
      
      {/* Message Content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Content */}
        <div className={cn(
          "relative rounded-2xl px-4 py-3",
          "bg-muted/10 border border-border/20",
          "hover:bg-muted/20 transition-colors duration-200"
        )}>
          {content ? (
            <div className="prose prose-sm prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0 text-sm leading-relaxed text-foreground">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-2 text-sm">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2 text-sm">{children}</ol>,
                  li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
                  code: ({ children }) => (
                    <code className="px-1.5 py-0.5 rounded bg-muted/50 text-accent text-xs font-mono">
                      {children}
                    </code>
                  ),
                  h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-foreground">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-semibold mb-2 text-foreground">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 text-foreground">{children}</h3>,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : isStreaming ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent nova-typing-dot" />
              <div className="w-2 h-2 rounded-full bg-accent nova-typing-dot" />
              <div className="w-2 h-2 rounded-full bg-accent nova-typing-dot" />
            </div>
          ) : null}
          
          {/* Streaming cursor */}
          {isStreaming && content && (
            <span className="inline-block w-0.5 h-4 bg-accent ml-0.5 cursor-blink" />
          )}
        </div>
        
        {/* Actions & Timestamp */}
        <div className="flex items-center justify-between px-1">
          <div className={cn(
            "flex items-center gap-1 transition-opacity duration-200",
            showActions || content ? "opacity-100" : "opacity-0"
          )}>
            {content && !isStreaming && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
                {onRegenerate && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onRegenerate}
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                )}
              </>
            )}
          </div>
          
          {timestamp && !isStreaming && (
            <p className="text-[10px] text-muted-foreground">
              {formatTime(timestamp)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}