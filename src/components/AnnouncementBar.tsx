import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Truck, Zap, Gift, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const announcements = [
  {
    icon: Sparkles,
    text: "BLACK FRIDAY SALE: 40% OFF EVERYTHING",
    subtext: "USE CODE BLACKFRIDAY40",
    color: "bg-background",
    textColor: "text-foreground",
    link: "/#products",
    highlight: true,
  },
  {
    icon: Truck,
    text: "FREE EXPRESS DELIVERY ON ORDERS £50+",
    subtext: "2-3 BUSINESS DAYS",
    color: "bg-background",
    textColor: "text-foreground",
    link: "/shipping",
    highlight: false,
  },
  {
    icon: Zap,
    text: "SUBSCRIBE & SAVE 15% FOREVER",
    subtext: "CANCEL ANYTIME",
    color: "bg-background",
    textColor: "text-foreground",
    link: "/subscriptions",
    highlight: false,
  },
];

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem("announcement-bar-dismissed");
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-bar-dismissed", "true");
  };

  if (!isVisible) return null;

  const currentAnnouncement = announcements[currentIndex];
  const Icon = currentAnnouncement.icon;

  return (
    <div
      className={`${currentAnnouncement.color} ${currentAnnouncement.textColor} transition-all duration-700 relative overflow-hidden`}
    >
      <div className="container mx-auto flex items-center justify-center py-2.5 px-4 relative">
        <Link 
          to={currentAnnouncement.link} 
          className="flex items-center gap-2 animate-fade-in hover:opacity-80 transition-opacity duration-300 text-center"
        >
          <Icon className="h-3 w-3" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-[10px] sm:text-[11px] font-light uppercase tracking-widest">
              {currentAnnouncement.text}
            </span>
            <span className="text-[9px] sm:text-[10px] font-light opacity-60 uppercase tracking-wider">
              {currentAnnouncement.subtext}
            </span>
          </div>
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 h-6 w-6 hover:bg-foreground/5 transition-all duration-300"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-background/10">
        <div
          className="h-full bg-background/20 transition-all"
          style={{
            width: "100%",
            animation: "progress 5s linear infinite",
          }}
        />
      </div>
    </div>
  );
};
