import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { GuestChatWidget } from "./GuestChatWidget";
import { useLocation } from "react-router-dom";

export function FloatingNovaButton() {
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();

  // Don't show on Nova app pages
  const isNovaPage = location.pathname.startsWith('/nova') || location.pathname === '/auth';
  if (isNovaPage) return null;

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
