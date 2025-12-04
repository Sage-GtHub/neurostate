import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { GuestChatWidget } from "./GuestChatWidget";
import { Search, User, Menu, X, Award, Sparkles, LogOut, Package, Droplets, Activity, Moon, Brain, BookOpen, Zap, Target, Lightbulb, Building2, ChevronRight } from "lucide-react";
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

  const guideTopics = [
    { label: "All Guides", href: "/guides", icon: BookOpen },
    { label: "Supplement Usage", href: "/guides#supplements", icon: Droplets },
    { label: "Recovery Protocols", href: "/guides#recovery", icon: Zap },
    { label: "Sleep Optimisation", href: "/guides#sleep", icon: Moon },
    { label: "Performance Tips", href: "/guides#performance", icon: Target },
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

              {/* Bundles Link */}
              <NavigationMenuItem>
                <Link
                  to="/bundles"
                  className="inline-flex h-10 items-center justify-center px-4 py-2 text-ui-label text-carbon transition-colors hover:bg-pearl rounded-lg"
                >
                  Bundles
                </Link>
              </NavigationMenuItem>

              {/* Guides Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-carbon hover:bg-pearl data-[state=open]:bg-pearl text-ui-label">
                  Guides
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4 bg-background border border-mist rounded-lg shadow-soft">
                    {guideTopics.map((topic) => (
                      <li key={topic.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={topic.href}
                            className="flex items-center gap-3 select-none p-3 leading-none no-underline outline-none transition-colors hover:bg-pearl rounded-lg"
                          >
                            <topic.icon className="h-5 w-5 text-carbon" />
                            <span className="text-caption font-medium text-carbon">
                              {topic.label}
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
              <SheetContent side="right" className="w-full sm:w-[350px] bg-background p-0 overflow-y-auto">
                <SheetHeader className="p-4 border-b border-mist">
                  <SheetTitle className="text-left text-carbon text-base">Menu</SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col">
                  {/* Quick Links */}
                  <div className="p-4 space-y-1">
                    <Link
                      to="/shop"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-pearl transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-ash" />
                        <span className="text-carbon font-medium">Shop All</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-ash" />
                    </Link>
                    
                    <Link
                      to="/bundles"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-pearl transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-ash" />
                        <span className="text-carbon font-medium">Bundles</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-ash" />
                    </Link>
                  </div>

                  {/* Accordion Sections */}
                  <Accordion type="single" collapsible className="px-4">
                    {/* Shop Categories */}
                    <AccordionItem value="shop" className="border-b-0">
                      <AccordionTrigger className="py-3 hover:no-underline">
                        <span className="text-carbon font-medium">Categories</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pb-3">
                          {shopCategories.slice(1).map((category) => (
                            <Link
                              key={category.label}
                              to={category.href}
                              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-pearl transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <category.icon className="h-4 w-4 text-ash" />
                              <span className="text-ash text-sm">{category.label}</span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Guides */}
                    <AccordionItem value="guides" className="border-b-0">
                      <AccordionTrigger className="py-3 hover:no-underline">
                        <span className="text-carbon font-medium">Guides</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pb-3">
                          {guideTopics.map((topic) => (
                            <Link
                              key={topic.label}
                              to={topic.href}
                              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-pearl transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <topic.icon className="h-4 w-4 text-ash" />
                              <span className="text-ash text-sm">{topic.label}</span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* For Teams */}
                    <AccordionItem value="teams" className="border-b-0">
                      <AccordionTrigger className="py-3 hover:no-underline">
                        <span className="text-carbon font-medium">For Teams</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pb-3">
                          {enterpriseLinks.map((link) => (
                            <Link
                              key={link.label}
                              to={link.href}
                              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-pearl transition-colors"
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

                  {/* Nova AI Link */}
                  <div className="p-4 border-t border-mist">
                    <Link
                      to="/nova/overview"
                      className="flex items-center justify-between p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-accent" />
                        <span className="text-carbon font-medium">Nova AI</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-accent" />
                    </Link>
                  </div>

                  {/* Account Section */}
                  <div className="p-4 border-t border-mist mt-auto">
                    {user ? (
                      <div className="space-y-2">
                        <p className="text-xs text-ash px-3 truncate">{user.email}</p>
                        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start h-11">
                            <User className="h-4 w-4 mr-3" />
                            Dashboard
                          </Button>
                        </Link>
                        <Link to="/rewards" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start h-11">
                            <Award className="h-4 w-4 mr-3" />
                            Rewards
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            handleSignOut();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full justify-start h-11 text-destructive"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full h-11">
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