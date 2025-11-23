import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Truck, Zap, Gift, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const announcements = [
  {
    icon: Sparkles,
    text: "CHRISTMAS SALE: 40% OFF EVERYTHING",
    subtext: "USE CODE CHRISTMAS40",
    color: "bg-carbon",
    textColor: "text-ivory",
    link: "/#products",
    highlight: true,
  },
  {
    icon: Truck,
    text: "FREE EXPRESS DELIVERY ON ORDERS £50+",
    subtext: "2-3 BUSINESS DAYS",
    color: "bg-carbon",
    textColor: "text-ivory",
    link: "/shipping",
    highlight: false,
  },
  {
    icon: Zap,
    text: "SUBSCRIBE & SAVE 15% FOREVER",
    subtext: "CANCEL ANYTIME",
    color: "bg-carbon",
    textColor: "text-ivory",
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
    <div className={`${currentAnnouncement.color} ${currentAnnouncement.textColor} border-b border-mist transition-all duration-700`}>
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center py-3 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 relative">
        <Link 
          to={currentAnnouncement.link} 
          className="flex items-center gap-3 hover:opacity-60 transition-opacity duration-300 text-center"
        >
          <span className="text-[0.6875rem] font-medium tracking-[0.05em] uppercase">
            {currentAnnouncement.text}
          </span>
          <span className="text-[0.6875rem] font-normal text-stone tracking-[0.05em] uppercase hidden sm:inline">
            {currentAnnouncement.subtext}
          </span>
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 sm:right-6 md:right-8 lg:right-20 xl:right-32 h-8 w-8 hover:bg-transparent hover:opacity-60"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
