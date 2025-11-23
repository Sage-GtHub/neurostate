import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { GuestChatWidget } from "./GuestChatWidget";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function FloatingNovaButton() {
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Don't show on Nova app pages or on mobile
  const isNovaPage = location.pathname.startsWith('/nova') || location.pathname === '/auth';
  if (isNovaPage || isMobile) return null;

  return (
    <>
      <Button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 bg-carbon hover:bg-slate"
        size="icon"
      >
        <Sparkles className="h-6 w-6 text-ivory" />
      </Button>

      <GuestChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
}
