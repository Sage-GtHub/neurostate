import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle } from "lucide-react";
import { GuestChatWidget } from "./GuestChatWidget";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function FloatingNovaButton() {
  const [chatOpen, setChatOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const location = useLocation();

  // Don't show on Nova app pages
  const isNovaPage = location.pathname.startsWith('/nova') || location.pathname === '/auth';

  // Animate in after delay
  useEffect(() => {
    if (isNovaPage) return;
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [isNovaPage]);

  // Stop pulsing after first interaction or after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsPulsing(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (isNovaPage) return null;

  return (
    <>
      {/* Mobile-optimized floating button */}
      <div 
        className={cn(
          "fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Pulse ring - only on mobile */}
        {isPulsing && (
          <div className="absolute inset-0 sm:hidden">
            <div className="absolute inset-0 rounded-full bg-signal-green/30 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-signal-green/20 animate-pulse" />
          </div>
        )}
        
        {/* Glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-signal-green/40 to-emerald-500/40 rounded-full blur-xl opacity-60" />
        
        <Button
          onClick={() => {
            setChatOpen(true);
            setIsPulsing(false);
          }}
          className={cn(
            "relative h-12 sm:h-14 rounded-full shadow-xl z-10",
            "bg-gradient-to-br from-signal-green via-emerald-500 to-teal-500",
            "hover:from-signal-green hover:via-emerald-400 hover:to-teal-400",
            "border border-white/20",
            "transition-all duration-300 hover:scale-105 active:scale-95",
            "shadow-signal-green/30"
          )}
        >
          {/* Mobile: icon + text */}
          <span className="flex items-center gap-2 px-3 sm:px-4">
            <Sparkles className="h-5 w-5 text-carbon" />
            <span className="text-carbon font-semibold text-sm sm:hidden">Ask Nova</span>
            <span className="text-carbon font-semibold text-sm hidden sm:inline">Chat with Nova</span>
          </span>
        </Button>
        
        {/* Tooltip for desktop */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-carbon/90 backdrop-blur-sm text-ivory text-xs rounded-lg opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
          Chat with Nova AI
        </div>
      </div>

      <GuestChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
}
