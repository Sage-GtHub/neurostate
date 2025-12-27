import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface NovaTypingIndicatorProps {
  className?: string;
  variant?: "dots" | "wave" | "pulse";
}

export function NovaTypingIndicator({ 
  className,
  variant = "wave" 
}: NovaTypingIndicatorProps) {
  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="w-8 h-8 rounded-xl nova-gradient flex items-center justify-center nova-glow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-muted/30 border border-border/30">
          <div className="w-2 h-2 rounded-full bg-accent nova-typing-dot" />
          <div className="w-2 h-2 rounded-full bg-accent nova-typing-dot" />
          <div className="w-2 h-2 rounded-full bg-accent nova-typing-dot" />
        </div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="relative">
          <div className="absolute inset-0 rounded-xl nova-gradient blur-lg opacity-40 animate-pulse" />
          <div className="relative w-8 h-8 rounded-xl nova-gradient flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-8 rounded-full bg-accent/30 overflow-hidden">
            <div className="h-full w-full bg-accent animate-[nova-skeleton_1s_ease-in-out_infinite]" />
          </div>
          <span className="text-xs text-muted-foreground">Nova is thinking...</span>
        </div>
      </div>
    );
  }

  // Wave variant - ChatGPT inspired
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="w-9 h-9 rounded-xl nova-gradient flex items-center justify-center nova-glow-sm flex-shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 pt-2">
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-muted-foreground/50"
              style={{
                animation: `nova-wave 1.4s ease-in-out ${i * 0.16}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}