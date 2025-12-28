import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, Sparkles } from "lucide-react";

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
    <div className="bg-foreground text-background py-2.5 px-4 relative overflow-hidden">
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/5 to-transparent animate-shimmer" />
      
      <div className="container mx-auto flex items-center justify-center gap-3 relative">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-background/60" />
          <p className="text-xs font-medium">
            Nova 2.0 is here — Meet your cognitive co-pilot
          </p>
        </div>
        <Link 
          to="/nova/overview" 
          className="inline-flex items-center gap-1 text-xs font-medium text-background/80 hover:text-background transition-colors group"
        >
          See what's new
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <button 
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-background/10 rounded transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5 text-background/60" />
      </button>
    </div>
  );
};
