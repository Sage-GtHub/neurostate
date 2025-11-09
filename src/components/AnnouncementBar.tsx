import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Truck, Zap, Gift } from "lucide-react";
import { Button } from "./ui/button";

const announcements = [
  {
    icon: Truck,
    text: "Free Shipping on UK Orders £50+",
    color: "bg-primary text-primary-foreground",
    link: "/shipping",
  },
  {
    icon: Zap,
    text: "Subscribe & Save 15% on Every Order",
    color: "bg-accent text-accent-foreground",
    link: "/subscriptions",
  },
  {
    icon: Gift,
    text: "New Customer? Get 10% Off Your First Order",
    color: "bg-secondary text-secondary-foreground",
    link: "/#products",
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
      className={`${currentAnnouncement.color} transition-colors duration-500 relative overflow-hidden`}
    >
      <div className="container mx-auto flex items-center justify-center py-2.5 px-4 relative">
        <Link 
          to={currentAnnouncement.link} 
          className="flex items-center gap-2 animate-fade-in hover:opacity-80 transition-opacity"
        >
          <Icon className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-medium">{currentAnnouncement.text}</span>
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 h-6 w-6 hover:bg-background/10"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-background/20">
        <div
          className="h-full bg-background/40 animate-[progress_5s_linear_infinite]"
          style={{
            width: "100%",
            animation: "progress 5s linear infinite",
          }}
        />
      </div>
    </div>
  );
};
