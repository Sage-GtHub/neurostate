import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ArrowUp, 
  Loader2, 
  Mic, 
  Globe, 
  Sparkles,
  Image,
  Paperclip,
  Zap
} from "lucide-react";

interface PerplexityInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onVoice?: () => void;
  isLoading?: boolean;
  isListening?: boolean;
  placeholder?: string;
  className?: string;
}

const QUICK_MODES = [
  { icon: Globe, label: "Focus", active: false },
  { icon: Image, label: "Attach", active: false },
];

export function PerplexityInput({
  value,
  onChange,
  onSubmit,
  onVoice,
  isLoading,
  isListening,
  placeholder = "Ask anything...",
  className,
}: PerplexityInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      {/* Main input container - Perplexity style */}
      <div 
        className={cn(
          "relative rounded-2xl transition-all duration-300",
          "bg-muted/30 border",
          isFocused 
            ? "border-accent/50 shadow-lg shadow-accent/10" 
            : "border-border/50 hover:border-border",
        )}
      >
        {/* Input area */}
        <div className="relative flex items-end p-3 gap-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className={cn(
              "flex-1 resize-none bg-transparent border-0",
              "py-2 px-1 text-base placeholder:text-muted-foreground/50",
              "focus:outline-none focus:ring-0",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "min-h-[44px] max-h-[200px]"
            )}
          />
          
          {/* Action buttons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Voice button */}
            {onVoice && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onVoice}
                className={cn(
                  "h-9 w-9 rounded-xl transition-all",
                  isListening 
                    ? "bg-accent/20 text-accent animate-pulse" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Mic className="w-4 h-4" />
              </Button>
            )}
            
            {/* Submit button - Perplexity cyan/teal */}
            <Button
              type="button"
              size="icon"
              onClick={onSubmit}
              disabled={!value.trim() || isLoading}
              className={cn(
                "h-9 w-9 rounded-xl transition-all",
                "bg-accent text-accent-foreground hover:bg-accent/90",
                "disabled:opacity-30 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Bottom toolbar - Perplexity style mode buttons */}
        <div className="flex items-center justify-between px-3 pb-3 pt-0">
          <div className="flex items-center gap-2">
            {QUICK_MODES.map((mode, i) => (
              <button
                key={i}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
                  "bg-muted/50 text-muted-foreground",
                  "hover:bg-muted hover:text-foreground",
                  "transition-colors"
                )}
              >
                <mode.icon className="w-3.5 h-3.5" />
                {mode.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <span className="hidden sm:inline">⌘ + Enter to send</span>
          </div>
        </div>
      </div>
    </div>
  );
}