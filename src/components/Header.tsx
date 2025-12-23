import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { GuestChatWidget } from "./GuestChatWidget";
import { Search, User, Menu, X, Award, Sparkles, LogOut, Package, Droplets, Activity, Moon, Brain, Zap, Target, Lightbulb, Building2, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { AnnouncementBar } from "./AnnouncementBar";
import { MobileBottomNav } from "./MobileBottomNav";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import logoIcon from "@/assets/neurostate-icon.svg";

export const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [hasUnreadChat, setHasUnreadChat] = useState(() => {
    return !localStorage.getItem('nova-chat-visited');
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out", { description: error.message });
    } else {
      toast.success("Signed out successfully");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    navigate('/');
  };

  const shopCategories = [
    { label: "All Products", href: "/shop", icon: Package },
    { label: "Supplements", href: "/category/supplements", icon: Droplets },
    { label: "Red Light Therapy", href: "/category/redlight", icon: Lightbulb },
    { label: "Recovery Devices", href: "/category/devices", icon: Activity },
    { label: "Sleep Support", href: "/category/sleep", icon: Moon },
    { label: "Cognitive Enhancement", href: "/category/cognitive", icon: Brain },
    { label: "Performance", href: "/category/performance", icon: Zap },
  ];


  const enterpriseLinks = [
    { label: "Overview", href: "/enterprise/overview", icon: Building2 },
    { label: "Corporate Wellness", href: "/enterprise/corporate/overview", icon: Target },
    { label: "Sports Organisations", href: "/enterprise/sports/overview", icon: Activity },
    { label: "Health Clubs and Studios", href: "/enterprise/health-clubs/overview", icon: Zap },
  ];

  const handleNovaOpen = () => {
    setChatOpen(true);
    setHasUnreadChat(false);
    localStorage.setItem('nova-chat-visited', 'true');
  };

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 w-full bg-background border-b border-mist backdrop-blur-sm bg-background/95">
        <div className="container mx-auto flex h-14 lg:h-20 items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoIcon} alt="NeuroState Neural Waveform" className="h-7 w-7 lg:h-10 lg:w-10" />
            <span className="text-ui-label text-carbon tracking-widest text-[0.6rem] lg:text-xs">NEUROSTATE<sup className="text-[5px] lg:text-[6px]">®</sup></span>
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-2">
              {/* Shop Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-carbon hover:bg-pearl data-[state=open]:bg-pearl text-ui-label">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4 bg-background border border-mist rounded-lg shadow-soft">
                    {shopCategories.map((category) => (
                      <li key={category.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="flex items-center gap-3 select-none p-3 leading-none no-underline outline-none transition-colors hover:bg-pearl rounded-lg"
                          >
                            <category.icon className="h-5 w-5 text-carbon" />
                            <span className="text-caption font-medium text-carbon">
                              {category.label}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>


               {/* For Teams Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-carbon hover:bg-pearl data-[state=open]:bg-pearl text-ui-label">
                  For Teams
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4 bg-background border border-mist rounded-lg shadow-soft">
                    {enterpriseLinks.map((link) => (
                      <li key={link.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="flex items-center gap-3 select-none p-3 leading-none no-underline outline-none transition-colors hover:bg-pearl rounded-lg"
                          >
                            <link.icon className="h-5 w-5 text-carbon" />
                            <span className="text-caption font-medium text-carbon">
                              {link.label}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Nova AI Link */}
              <NavigationMenuItem>
                <Link
                  to="/nova/overview"
                  className="inline-flex h-10 items-center justify-center px-4 py-2 text-ui-label text-carbon transition-colors hover:bg-pearl rounded-lg"
                >
                  Nova AI
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 lg:gap-3">
            {/* Desktop Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 rounded-lg border-mist"
                  autoFocus
                />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-5 w-5" />
                </Button>
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost"
                  onClick={() => {
                    setSearchOpen(false);
                    clearSearch();
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden lg:flex"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            {/* User Account Dropdown - Desktop */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden lg:flex relative">
                    <User className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-3 w-3 rounded-full p-0 bg-green-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border-mist rounded-lg">
                  <DropdownMenuItem disabled className="text-caption text-ash">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer text-carbon hover:bg-pearl">
                      My Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer text-carbon hover:bg-pearl">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/subscriptions" className="cursor-pointer text-carbon hover:bg-pearl">
                      My Subscriptions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/rewards" className="cursor-pointer flex items-center text-carbon hover:bg-pearl">
                      <Award className="h-4 w-4 mr-2" />
                      Rewards Programme
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive hover:bg-pearl">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="hidden lg:flex">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            <CartDrawer />
            
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[350px] bg-background border-l border-mist p-0 overflow-hidden flex flex-col"
              >
                <SheetHeader className="p-4 border-b border-mist shrink-0">
                  <SheetTitle className="text-left text-carbon text-base font-semibold">Menu</SheetTitle>
                </SheetHeader>
                
                <nav className="flex-1 overflow-y-auto">
                  {/* Quick Links */}
                  <div className="p-3 space-y-1">
                    <Link
                      to="/shop"
                      className="flex items-center justify-between p-3 rounded-xl bg-pearl/50 hover:bg-pearl active:scale-[0.98] transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-signal-green/10 flex items-center justify-center">
                          <Package className="h-4 w-4 text-signal-green" />
                        </div>
                        <span className="text-carbon font-medium">Shop All</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-ash" />
                    </Link>
                  </div>

                  {/* Accordion Sections */}
                  <Accordion type="single" collapsible className="px-3">
                    {/* Shop Categories */}
                    <AccordionItem value="shop" className="border-b-0 border-t border-mist/50">
                      <AccordionTrigger className="py-3 hover:no-underline">
                        <span className="text-carbon font-medium text-sm">Categories</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pb-3">
                          {shopCategories.slice(1).map((category) => (
                            <Link
                              key={category.label}
                              to={category.href}
                              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-pearl active:scale-[0.98] transition-all"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <category.icon className="h-4 w-4 text-ash" />
                              <span className="text-ash text-sm">{category.label}</span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* For Teams */}
                    <AccordionItem value="teams" className="border-b-0 border-t border-mist/50">
                      <AccordionTrigger className="py-3 hover:no-underline">
                        <span className="text-carbon font-medium text-sm">For Teams</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pb-3">
                          {enterpriseLinks.map((link) => (
                            <Link
                              key={link.label}
                              to={link.href}
                              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-pearl active:scale-[0.98] transition-all"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <link.icon className="h-4 w-4 text-ash" />
                              <span className="text-ash text-sm">{link.label}</span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Nova AI Link - Featured */}
                  <div className="p-3 border-t border-mist/50">
                    <Link
                      to="/nova/overview"
                      className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-signal-green/10 to-emerald-500/5 border border-signal-green/20 hover:border-signal-green/40 active:scale-[0.98] transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-signal-green flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-carbon" />
                        </div>
                        <div>
                          <span className="text-carbon font-medium block">Nova AI</span>
                          <span className="text-ash text-xs">Your AI health coach</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-signal-green" />
                    </Link>
                  </div>
                </nav>

                {/* Account Section - Fixed at bottom */}
                <div className="p-3 border-t border-mist bg-pearl/30 shrink-0">
                  {user ? (
                    <div className="space-y-2">
                      <p className="text-xs text-ash px-1 truncate">{user.email}</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full h-10 text-xs">
                            <User className="h-3.5 w-3.5 mr-1.5" />
                            Dashboard
                          </Button>
                        </Link>
                        <Link to="/rewards" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full h-10 text-xs">
                            <Award className="h-3.5 w-3.5 mr-1.5" />
                            Rewards
                          </Button>
                        </Link>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full h-10 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="h-3.5 w-3.5 mr-1.5" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block">
                      <Button className="w-full h-11 bg-signal-green text-carbon hover:bg-signal-green/90 font-medium">
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onNovaOpen={handleNovaOpen} />

      <GuestChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
};