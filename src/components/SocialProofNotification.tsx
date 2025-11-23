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
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom duration-300">
      <Card className="p-4 shadow-elegant bg-background border-mist max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-caption text-carbon font-medium">
              {currentNotification.name} from {currentNotification.location}
            </p>
            <p className="text-caption text-ash">
              just purchased {currentNotification.product}
            </p>
            <p className="text-[0.625rem] text-stone mt-1">
              {currentNotification.timeAgo}
            </p>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="text-stone hover:text-carbon transition-colors text-xs"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      </Card>
    </div>
  );
};
