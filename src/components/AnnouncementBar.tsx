import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-dismissed-v2');
    if (dismissed) {
      setIsDismissed(true);
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('announcement-dismissed-v2', 'true');
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="bg-foreground text-background text-center py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <p className="text-[11px] font-medium tracking-wide">
          Introducing Nova 2.0 — Workforce intelligence, reimagined
        </p>
        <Link 
          to="/nova/overview" 
          className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline underline-offset-4 transition-all"
        >
          Learn more
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <button 
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-background/10 rounded transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
