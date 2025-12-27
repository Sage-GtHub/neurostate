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
      <header className="sticky top-0 z-50 w-full bg-background/80 border-b border-border backdrop-blur-xl">
        <div className="container mx-auto flex h-14 lg:h-20 items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logoIcon} alt="NeuroState Neural Waveform" className="h-7 w-7 lg:h-10 lg:w-10 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-ui-label text-foreground/90 tracking-widest text-[0.6rem] lg:text-xs font-medium">NEUROSTATE<sup className="text-[5px] lg:text-[6px]">®</sup></span>
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {/* Shop Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/70 hover:text-white hover:bg-white/5 data-[state=open]:bg-white/5 data-[state=open]:text-white text-ui-label transition-all duration-200">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4 bg-obsidian/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl">
                    {shopCategories.map((category) => (
                      <li key={category.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="flex items-center gap-3 select-none p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 rounded-lg group"
                          >
                            <category.icon className="h-5 w-5 text-emerald-400/70 group-hover:text-emerald-400 transition-colors" />
                            <span className="text-caption font-medium text-white/80 group-hover:text-white transition-colors">
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
                <NavigationMenuTrigger className="bg-transparent text-white/70 hover:text-white hover:bg-white/5 data-[state=open]:bg-white/5 data-[state=open]:text-white text-ui-label transition-all duration-200">
                  For Teams
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4 bg-obsidian/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl">
                    {enterpriseLinks.map((link) => (
                      <li key={link.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="flex items-center gap-3 select-none p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/5 rounded-lg group"
                          >
                            <link.icon className="h-5 w-5 text-emerald-400/70 group-hover:text-emerald-400 transition-colors" />
                            <span className="text-caption font-medium text-white/80 group-hover:text-white transition-colors">
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
                  className="inline-flex h-10 items-center justify-center px-4 py-2 text-ui-label text-white/70 transition-all duration-200 hover:text-emerald-400 hover:bg-white/5 rounded-lg"
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
                  className="w-64 rounded-lg bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500/50"
                  autoFocus
                />
                <Button type="submit" size="icon" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5">
                  <Search className="h-5 w-5" />
                </Button>
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/5"
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
                className="hidden lg:flex text-white/70 hover:text-white hover:bg-white/5"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            {/* User Account Dropdown - Desktop */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden lg:flex relative text-white/70 hover:text-white hover:bg-white/5">
                    <User className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-3 w-3 rounded-full p-0 bg-emerald-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-obsidian/95 backdrop-blur-xl border-white/10 rounded-lg">
                  <DropdownMenuItem disabled className="text-caption text-white/50">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer text-white/80 hover:text-white hover:bg-white/5">
                      My Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer text-white/80 hover:text-white hover:bg-white/5">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/subscriptions" className="cursor-pointer text-white/80 hover:text-white hover:bg-white/5">
                      My Subscriptions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/rewards" className="cursor-pointer flex items-center text-white/80 hover:text-white hover:bg-white/5">
                      <Award className="h-4 w-4 mr-2 text-emerald-400" />
                      Rewards Programme
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-white/5">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="hidden lg:flex text-white/70 hover:text-white hover:bg-white/5">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            <CartDrawer />
            
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 text-white/70 hover:text-white hover:bg-white/5">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] bg-void/95 backdrop-blur-xl border-l border-white/10 p-0 overflow-y-auto">
                <SheetHeader className="p-4 border-b border-white/10">
                  <SheetTitle className="text-left text-white text-base">Menu</SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col">
                  {/* Quick Links */}
                  <div className="p-4 space-y-1">
                    <Link
                      to="/shop"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-emerald-400/70" />
                        <span className="text-white font-medium">Shop All</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/40" />
                    </Link>
                    
                  </div>

                  {/* Accordion Sections */}
                  <Accordion type="single" collapsible className="px-4">
                    {/* Shop Categories */}
                    <AccordionItem value="shop" className="border-b-0 border-white/10">
                      <AccordionTrigger className="py-3 hover:no-underline text-white/80 hover:text-white">
                        <span className="font-medium">Categories</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pb-3">
                          {shopCategories.slice(1).map((category) => (
                            <Link
                              key={category.label}
                              to={category.href}
                              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <category.icon className="h-4 w-4 text-emerald-400/60" />
                              <span className="text-white/70 text-sm">{category.label}</span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>


                    {/* For Teams */}
                    <AccordionItem value="teams" className="border-b-0 border-white/10">
                      <AccordionTrigger className="py-3 hover:no-underline text-white/80 hover:text-white">
                        <span className="font-medium">For Teams</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pb-3">
                          {enterpriseLinks.map((link) => (
                            <Link
                              key={link.label}
                              to={link.href}
                              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <link.icon className="h-4 w-4 text-emerald-400/60" />
                              <span className="text-white/70 text-sm">{link.label}</span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Nova AI Link */}
                  <div className="p-4 border-t border-white/10">
                    <Link
                      to="/nova/overview"
                      className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-emerald-400" />
                        <span className="text-white font-medium">Nova AI</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-emerald-400" />
                    </Link>
                  </div>

                  {/* Account Section */}
                  <div className="p-4 border-t border-white/10 mt-auto">
                    {user ? (
                      <div className="space-y-2">
                        <p className="text-xs text-white/50 px-3 truncate">{user.email}</p>
                        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start h-11 text-white/80 hover:text-white hover:bg-white/5">
                            <User className="h-4 w-4 mr-3" />
                            Dashboard
                          </Button>
                        </Link>
                        <Link to="/rewards" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start h-11 text-white/80 hover:text-white hover:bg-white/5">
                            <Award className="h-4 w-4 mr-3 text-emerald-400" />
                            Rewards
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            handleSignOut();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full justify-start h-11 text-red-400 hover:text-red-300 hover:bg-white/5"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white">
                          <User className="h-4 w-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                    )}
                  </div>
                </nav>
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