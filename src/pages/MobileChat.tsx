import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { GuestChatWidget } from "@/components/GuestChatWidget";
import logoIcon from "@/assets/neurostate-icon.svg";
import { SEO } from "@/components/SEO";

export default function MobileChat() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      {/* Header */}
      <header className="border-b border-mist bg-ivory p-4">
        <div className="flex items-center justify-center gap-2">
          <img src={logoIcon} alt="NeuroState" className="h-8 w-8" />
          <span className="text-ui-label text-carbon tracking-widest text-xs">
            NEUROSTATE<sup className="text-[6px]">®</sup>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md text-center space-y-6">
          {/* Nova Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-carbon flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-ivory" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-h2 font-semibold text-carbon">
              Ask Nova
            </h1>
            <p className="text-body text-ash">
              Your NeuroState performance assistant
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-ash leading-relaxed">
            Get instant answers about our products, supplement stacks, and performance optimisation. Nova is here to help you make the right choices for your goals.
          </p>

          {/* CTA */}
          <Button
            size="lg"
            onClick={() => setChatOpen(true)}
            className="w-full"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Start Chatting
          </Button>

          {/* Desktop Note */}
          <p className="text-xs text-ash pt-4">
            For the full NeuroState experience with protocols, insights, and device tracking, visit us on desktop at{" "}
            <span className="text-carbon font-medium">neurostate.co.uk</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-mist bg-ivory p-4">
        <p className="text-xs text-ash text-center">
          © 2025 NeuroState. Peak performance, by design.
        </p>
      </footer>

      <GuestChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
