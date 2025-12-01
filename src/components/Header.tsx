import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { GuestChatWidget } from "./GuestChatWidget";
import { Search, User, Menu, X, Award, Sparkles, LogOut, Package, Droplets, Activity, Moon, Brain, BookOpen, Zap, Target, Lightbulb } from "lucide-react";
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
import { AnnouncementBar } from "./AnnouncementBar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import logoIcon from "@/assets/neurostate-icon.svg";
import logoWordmark from "@/assets/neurostate-wordmark.png";

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
    { label: "Overview", href: "/enterprise/overview", icon: Target },
    { label: "Corporate Wellness", href: "/enterprise/corporate/overview", icon: Target },
    { label: "Sports Organisations", href: "/enterprise/sports/overview", icon: Activity },
    { label: "Health Clubs and Studios", href: "/enterprise/health-clubs/overview", icon: Zap },
  ];

  const otherLinks: { label: string; href: string }[] = [];

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 w-full bg-background border-b border-mist backdrop-blur-sm bg-background/95">
        <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src={logoIcon} alt="NeuroState Neural Waveform" className="h-8 w-8 sm:h-10 sm:w-10" />
            <span className="text-ui-label text-carbon tracking-widest text-[0.625rem] sm:text-xs">NEUROSTATE<sup className="text-[5px] sm:text-[6px]">®</sup></span>
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

          <div className="flex items-center gap-3">
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
            
            {/* User Account Dropdown */}
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
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background rounded-l-lg">
                <SheetHeader>
                  <SheetTitle className="text-left text-carbon">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-8">
                  {/* Shop Section */}
                  <div>
                    <h3 className="text-h3 mb-3 text-carbon">Shop</h3>
                    <div className="flex flex-col gap-2 pl-4">
                      {shopCategories.map((category) => (
                        <Link
                          key={category.label}
                          to={category.href}
                          className="flex items-center gap-2 text-caption text-ash hover:text-carbon transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <category.icon className="h-4 w-4" />
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Bundles */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        const bundlesSection = document.getElementById('bundles');
                        if (bundlesSection) {
                          bundlesSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          navigate('/#bundles');
                        }
                      }, 100);
                    }}
                    className="text-h3 hover:text-slate transition-colors text-left cursor-pointer text-carbon"
                  >
                    Bundles
                  </button>

                  {/* Guides Section */}
                  <div>
                    <h3 className="text-h3 mb-3 text-carbon">Guides</h3>
                    <div className="flex flex-col gap-2 pl-4">
                      {guideTopics.map((topic) => (
                        <Link
                          key={topic.label}
                          to={topic.href}
                          className="flex items-center gap-2 text-caption text-ash hover:text-carbon transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <topic.icon className="h-4 w-4" />
                          {topic.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* For Teams Section */}
                  <div>
                    <h3 className="text-h3 mb-3 text-carbon">For Teams</h3>
                    <div className="flex flex-col gap-2 pl-4">
                      {enterpriseLinks.map((link) => (
                        <Link
                          key={link.label}
                          to={link.href}
                          className="flex items-center gap-2 text-caption text-ash hover:text-carbon transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <link.icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Nova AI */}
                  <Link
                    to="/nova/overview"
                    className="text-h3 hover:text-slate transition-colors text-carbon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Nova AI
                  </Link>

                  {/* Other Links */}
                  {otherLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-h3 hover:text-slate transition-colors text-carbon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="pt-6 mt-4 space-y-4">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="flex flex-col gap-2">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg"
                      />
                      <Button type="submit" className="w-full">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </form>

                    {/* Mobile Account Links */}
                    {user ? (
                      <div className="flex flex-col gap-2 pt-4 border-t border-mist">
                        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start">
                            <User className="h-4 w-4 mr-2" />
                            My Dashboard
                          </Button>
                        </Link>
                        <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start">
                            <User className="h-4 w-4 mr-2" />
                            My Profile
                          </Button>
                        </Link>
                        <Link to="/subscriptions" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start">
                            My Subscriptions
                          </Button>
                        </Link>
                        <Link to="/rewards" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start">
                            <Award className="h-4 w-4 mr-2" />
                            Rewards Programme
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            handleSignOut();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full justify-start text-destructive"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
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

      <GuestChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
};
