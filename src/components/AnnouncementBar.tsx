import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Truck, Zap, Gift, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const announcements = [
  {
    icon: Sparkles,
    text: "Black Friday Sale: 40% Off Everything",
    subtext: "Use code BLACKFRIDAY40",
    color: "bg-gradient-to-r from-charcoal via-primary to-charcoal",
    textColor: "text-primary-foreground",
    link: "/#products",
    highlight: true,
  },
  {
    icon: Gift,
    text: "Cyber Week Extended: Extra 25% Off Bundles",
    subtext: "Limited time only",
    color: "bg-accent",
    textColor: "text-accent-foreground",
    link: "/#products",
    highlight: true,
  },
  {
    icon: Truck,
    text: "Free Express Delivery on Orders £50+",
    subtext: "2-3 business days",
    color: "bg-primary",
    textColor: "text-primary-foreground",
    link: "/shipping",
    highlight: false,
  },
  {
    icon: Zap,
    text: "Subscribe & Save 15% Forever",
    subtext: "Cancel anytime",
    color: "bg-stone",
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
      {/* Animated background shimmer for highlights */}
      {currentAnnouncement.highlight && (
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0 -translate-x-full animate-[slide-in-right_3s_ease-in-out_infinite]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              width: '50%',
            }}
          />
        </div>
      )}
      
      <div className="container mx-auto flex items-center justify-center py-3 px-4 relative">
        <Link 
          to={currentAnnouncement.link} 
          className="flex items-center gap-3 animate-fade-in hover:scale-[1.02] transition-transform duration-300 text-center"
        >
          <Icon className={`h-5 w-5 ${currentAnnouncement.highlight ? 'animate-pulse' : ''}`} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className={`text-sm sm:text-base font-semibold tracking-wide ${currentAnnouncement.highlight ? 'uppercase' : ''}`}>
              {currentAnnouncement.text}
            </span>
            <span className="text-xs sm:text-sm font-light opacity-90">
              {currentAnnouncement.subtext}
            </span>
          </div>
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 h-7 w-7 hover:bg-background/10 rounded-full transition-all duration-300"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Elegant progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-background/10">
        <div
          className="h-full bg-background/40 transition-all"
          style={{
            width: "100%",
            animation: "progress 5s linear infinite",
          }}
        />
      </div>
    </div>
  );
};
