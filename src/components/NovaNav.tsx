import { NavLink } from "@/components/NavLink";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/nova/chat", label: "Chat" },
  { to: "/nova", label: "Dashboard", end: true },
  { to: "/nova/goals", label: "Goals" },
  { to: "/nova/protocols", label: "Protocols" },
  { to: "/nova/insights", label: "Insights" },
  { to: "/nova/trends", label: "Trends" },
  { to: "/nova/devices", label: "Devices" },
  { to: "/nova/settings", label: "Settings" },
];

export const NovaNav = () => {
  return (
    <nav className="sticky top-0 z-40 nova-glass border-b border-border/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="flex items-center gap-6 py-3">
          {/* Nova Logo/Brand */}
          <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-border/30">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg nova-gradient flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
            </div>
            <span className="text-sm font-semibold text-foreground">Nova</span>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={cn(
                  "relative text-[11px] sm:text-xs font-medium uppercase tracking-wider",
                  "text-muted-foreground transition-all duration-300",
                  "hover:text-foreground whitespace-nowrap",
                  "px-3 py-2 sm:px-3 sm:py-2",
                  "rounded-full sm:rounded-lg",
                  "min-h-[36px] sm:min-h-[38px] flex items-center justify-center",
                  "hover:bg-muted/50"
                )}
                activeClassName={cn(
                  "text-foreground font-semibold",
                  "bg-foreground/5 sm:bg-accent/10",
                  "sm:text-accent"
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
