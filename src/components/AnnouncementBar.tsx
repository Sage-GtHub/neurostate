import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('announcement-dismissed', 'true');
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="announcement-gradient text-white text-center py-2.5 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <p className="text-sm font-medium">
          Introducing Nova 2.0 — Predictive cognitive forecasting
        </p>
        <Link 
          to="/nova/overview" 
          className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 hover:no-underline transition-all"
        >
          Learn more
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <button 
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};