import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { MessageCircle, LayoutDashboard, Target, Activity, TrendingUp, Smartphone, Settings, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { to: "/nova/chat", label: "Chat", icon: MessageCircle },
  { to: "/nova", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/nova/protocols", label: "Protocols", icon: Activity }, // Merged: Protocols + Goals
  { to: "/nova/insights", label: "Insights", icon: Zap }, // Merged: Insights + Trends
  { to: "/nova/devices", label: "Devices", icon: Smartphone },
  { to: "/nova/settings", label: "Settings", icon: Settings },
];

const mobileNavItems = [
  { to: "/nova/chat", label: "Chat", icon: MessageCircle },
  { to: "/nova", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/nova/protocols", label: "Protocols", icon: Activity },
  { to: "/nova/devices", label: "Devices", icon: Smartphone },
  { to: "/nova/settings", label: "More", icon: Settings },
];

export const NovaNav = () => {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="px-6 md:px-12 lg:px-20 relative">
          {/* Scroll indicators */}
          {canScrollLeft && (
            <button 
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/90 shadow-sm border border-border/50 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          {canScrollRight && (
            <button 
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/90 shadow-sm border border-border/50 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-none"
          >
            {navItems.map((item) => {
              const active = isActive(item.to, item.end);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className="relative"
                  activeClassName=""
                >
                  <div className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200",
                    active 
                      ? "text-foreground bg-foreground/5" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}>
                    <item.icon className={cn(
                      "w-4 h-4 transition-colors",
                      active ? "text-accent" : ""
                    )} />
                    {item.label}
                  </div>
                  
                  {/* Active indicator bar */}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-3 left-2 right-2 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border pb-safe">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => {
            const active = isActive(item.to, item.end);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="relative flex flex-col items-center gap-1 px-4 py-2 min-w-[60px]"
                activeClassName=""
              >
                <div className="relative">
                  <item.icon 
                    className={cn(
                      "w-5 h-5 transition-all duration-200",
                      active ? "text-accent scale-110" : "text-muted-foreground"
                    )} 
                  />
                  {/* Active dot indicator */}
                  {active && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent"
                    />
                  )}
                </div>
                <span 
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};
