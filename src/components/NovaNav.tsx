import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageCircle, LayoutDashboard, Target, Activity, TrendingUp, Smartphone, Settings, Zap, ChevronLeft, ChevronRight, Users, Search, LogOut, Menu, X, Bell, FlaskConical, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { NotificationCenter } from "@/components/nova/NotificationCenter";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logoIcon from "@/assets/neurostate-icon.svg";

const navItems = [
  { to: "/nova/chat", label: "Chat", icon: MessageCircle },
  { to: "/nova", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/nova/dashboard", label: "Dashboard", icon: Gauge },
  { to: "/nova/protocols", label: "Protocols", icon: Activity },
  { to: "/nova/optimisation", label: "Optimise", icon: FlaskConical },
  { to: "/nova/insights", label: "Insights", icon: Zap },
  { to: "/nova/devices", label: "Devices", icon: Smartphone },
  { to: "/nova/settings", label: "Settings", icon: Settings },
];

const mobileNavItems = [
  { to: "/nova/chat", label: "Chat", icon: MessageCircle },
  { to: "/nova", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/nova/dashboard", label: "Dashboard", icon: Gauge },
  { to: "/nova/protocols", label: "Protocols", icon: Activity },
  { to: "/nova/settings", label: "More", icon: Settings },
];

export const NovaNav = () => {
  const location = useLocation();
  const isChatPage = location.pathname === "/nova/chat";
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { profile, signOut, isAuthenticated } = useAuth();
  
  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path;
    // Exact match for /nova/chat to avoid matching /nova
    if (path === "/nova/chat") return location.pathname === "/nova/chat";
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

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="px-6 md:px-12 lg:px-20 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 py-3 pr-4 border-r border-border/50 mr-4"
            >
              <img src={logoIcon} alt="Nova" className="h-6 w-6" />
              <span className="text-sm font-medium text-foreground">Nova</span>
            </button>

            {/* Scroll indicators */}
            {canScrollLeft && (
              <button 
                onClick={() => scroll('left')}
                className="absolute left-32 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/90 shadow-sm border border-border/50 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {canScrollRight && (
              <button 
                onClick={() => scroll('right')}
                className="absolute right-40 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/90 shadow-sm border border-border/50 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            
            {/* Navigation Items */}
            <div 
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex-1 flex items-center gap-1 py-3 overflow-x-auto scrollbar-none"
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

            {/* Right side: Notifications + User Menu */}
            <div className="flex items-center gap-2 pl-4 border-l border-border/50 ml-4">
              {/* Command palette hint */}
              <button
                onClick={() => {
                  const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                  document.dispatchEvent(event);
                }}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-[10px] text-muted-foreground hover:bg-muted transition-colors"
              >
                <Search className="w-3 h-3" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-background/80 text-[9px] font-mono">⌘K</kbd>
              </button>

              {/* Team Dashboard Link */}
              <button
                onClick={() => navigate('/team-dashboard')}
                className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <Users className="w-4 h-4" />
              </button>

              {/* Notifications */}
              <NotificationCenter />

              {/* User Menu */}
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 pl-2">
                      <Avatar className="h-8 w-8 border border-border/50">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="bg-accent/10 text-accent text-xs">
                          {getInitials(profile?.full_name)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-muted-foreground truncate">{profile?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/nova/dashboard')} className="gap-2 cursor-pointer">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/team-dashboard')} className="gap-2 cursor-pointer">
                      <Users className="w-4 h-4" />
                      Team Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="gap-2 cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation — hidden on chat page (chat has its own mobile header) */}
      <nav className={cn("md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border pt-safe", isChatPage && "hidden")}>
        <div className="flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <img src={logoIcon} alt="Nova" className="h-6 w-6" />
            <span className="text-sm font-medium text-foreground">Nova</span>
          </button>

          {/* Nav Items */}
          <div className="flex items-center gap-1">
            {mobileNavItems.slice(0, 4).map((item) => {
              const active = isActive(item.to, item.end);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className="relative p-2"
                  activeClassName=""
                >
                  <item.icon 
                    className={cn(
                      "w-5 h-5 transition-all duration-200",
                      active ? "text-accent" : "text-muted-foreground"
                    )} 
                  />
                </NavLink>
              );
            })}
          </div>

          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-safe">
              <SheetHeader className="text-left pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  {isAuthenticated && (
                    <>
                      <Avatar className="h-10 w-10 border border-border/50">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="bg-accent/10 text-accent text-sm">
                          {getInitials(profile?.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{profile?.full_name || 'User'}</span>
                        <span className="text-xs text-muted-foreground">{profile?.email}</span>
                      </div>
                    </>
                  )}
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 py-4">
                {/* Notifications */}
                <button
                  onClick={() => navigate('/nova/settings')}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  Notifications
                </button>

                {/* Team Dashboard */}
                <button
                  onClick={() => navigate('/team-dashboard')}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Users className="w-5 h-5" />
                  Team Dashboard
                </button>

                {/* Dashboard */}
                <button
                    onClick={() => navigate('/nova/dashboard')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                </button>

                {/* Insights */}
                <button
                  onClick={() => navigate('/nova/insights')}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Zap className="w-5 h-5" />
                  Insights
                </button>

                {/* Settings */}
                <button
                  onClick={() => navigate('/nova/settings')}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </button>

                {/* Account Settings */}
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  Account Settings
                </button>
              </div>

              {/* Sign Out */}
              {isAuthenticated && (
                <div className="absolute bottom-6 left-6 right-6">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Mobile content padding spacer */}
      <div className="md:hidden h-14" />
    </>
  );
};
