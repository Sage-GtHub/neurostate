import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { CheckCircle } from "lucide-react";

interface Notification {
  id: string;
  name: string;
  location: string;
  product: string;
  timeAgo: string;
}

const mockNotifications: Notification[] = [
  { id: "1", name: "James", location: "London", product: "Omega3 Elite", timeAgo: "2 minutes ago" },
  { id: "2", name: "Sarah", location: "Manchester", product: "RestoreSleep Night", timeAgo: "5 minutes ago" },
  { id: "3", name: "Alex", location: "Birmingham", product: "NeuroFocus Cognitive", timeAgo: "8 minutes ago" },
  { id: "4", name: "Emma", location: "Glasgow", product: "AdaptBalance Stress", timeAgo: "12 minutes ago" },
  { id: "5", name: "David", location: "Edinburgh", product: "Marine Collagen", timeAgo: "15 minutes ago" },
];

export const SocialProofNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const showNotification = () => {
      const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
      setCurrentNotification(randomNotification);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    };

    // Show first notification after 10 seconds
    const initialTimer = setTimeout(showNotification, 10000);

    // Show subsequent notifications every 30 seconds
    const interval = setInterval(showNotification, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (!currentNotification || !isVisible) return null;

  return (
    <div className="fixed top-24 right-6 z-50 animate-in slide-in-from-right duration-500">
      <div className="backdrop-blur-xl bg-carbon/80 rounded-2xl p-3 shadow-2xl max-w-xs border border-ivory/10">
        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/40 flex items-center justify-center ring-1 ring-[#10b981]/30">
              <CheckCircle className="h-3.5 w-3.5 text-[#10b981]" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-[0.75rem] text-ivory/90 font-medium leading-tight">
              {currentNotification.name} · {currentNotification.location}
            </p>
            <p className="text-[0.6875rem] text-ivory/60 leading-tight mt-0.5">
              {currentNotification.product}
            </p>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="text-ivory/40 hover:text-ivory/80 transition-colors text-sm ml-1"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
