import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { MessageCircle, LayoutDashboard, Target, Activity, Smartphone, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/nova/chat", label: "Chat", icon: MessageCircle },
  { to: "/nova", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/nova/goals", label: "Goals & Trends", icon: Target },
  { to: "/nova/protocols", label: "Protocols", icon: Activity },
  { to: "/nova/insights", label: "Insights", icon: Zap },
  { to: "/nova/devices", label: "Devices", icon: Smartphone },
  { to: "/nova/settings", label: "Settings", icon: Settings },
];

// Mobile bottom nav shows only key items
const mobileNavItems = [
  { to: "/nova/chat", label: "Chat", icon: MessageCircle },
  { to: "/nova", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/nova/protocols", label: "Protocols", icon: Activity },
  { to: "/nova/devices", label: "Devices", icon: Smartphone },
  { to: "/nova/settings", label: "More", icon: Settings },
];

export const NovaNav = () => {
  const location = useLocation();
  
  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <nav className="hidden md:block sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-border/20">
        <div className="px-6">
          <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={cn(
                  "text-xs font-medium uppercase tracking-wider",
                  "text-muted-foreground transition-all duration-200",
                  "hover:text-foreground whitespace-nowrap",
                  "px-4 py-2.5 rounded-full",
                  "hover:bg-white/5"
                )}
                activeClassName="text-primary bg-primary/10"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Tab Bar (Whoop Style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-border/20 pb-safe">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => {
            const active = isActive(item.to, item.end);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="flex flex-col items-center gap-1 px-4 py-2 min-w-[60px]"
                activeClassName=""
              >
                <item.icon 
                  className={cn(
                    "w-5 h-5 transition-colors",
                    active ? "text-primary" : "text-muted-foreground"
                  )} 
                />
                <span 
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    active ? "text-primary" : "text-muted-foreground"
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
