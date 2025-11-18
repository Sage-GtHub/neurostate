import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import Chat from "@/pages/Chat";
import { Search, User, Menu, RefreshCw, Package, Droplets, Activity, Moon, Brain, BookOpen, Zap, Target, LogOut, X, Award, Sparkles } from "lucide-react";
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
import logo from "@/assets/neurostate-logo.jpg";

export const Header = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [hasUnreadChat, setHasUnreadChat] = useState(() => {
    // Check if user has opened chat before
    return !localStorage.getItem('nova-chat-visited');
  });

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // THEN check for existing session
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
    { label: "All Products", href: "/", icon: Package },
    { label: "Supplements", href: "/#products", icon: Droplets },
    { label: "Recovery & Performance", href: "/#products", icon: Activity },
    { label: "Sleep & Rest", href: "/#products", icon: Moon },
    { label: "Cognitive Performance", href: "/#products", icon: Brain },
  ];

  const guideTopics = [
    { label: "All Guides", href: "/guides", icon: BookOpen },
    { label: "Supplement Usage", href: "/guides#supplements", icon: Droplets },
    { label: "Recovery Protocols", href: "/guides#recovery", icon: Zap },
    { label: "Sleep Optimisation", href: "/guides#sleep", icon: Moon },
    { label: "Performance Tips", href: "/guides#performance", icon: Target },
  ];

  const otherLinks = [
    { label: "Resources", href: "/resources" },
  ];

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 w-full bg-background border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 sm:px-8 lg:px-20 xl:px-32">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="NEUROSTATE" className="h-8 w-auto" style={{ mixBlendMode: 'lighten' }} />
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {/* Shop Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 bg-background">
                    {shopCategories.map((category) => (
                      <li key={category.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="flex items-center gap-3 select-none p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary uppercase text-sm tracking-wider font-light"
                          >
                            <category.icon className="h-5 w-5 text-accent" />
                            <div className="text-sm font-light leading-none uppercase tracking-wider">
                              {category.label}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Bundles Link */}
              <NavigationMenuItem>
                <button
                  onClick={() => {
                    const bundlesSection = document.getElementById('bundles');
                    if (bundlesSection) {
                      bundlesSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/#bundles');
                    }
                  }}
                  className="group inline-flex h-10 w-max items-center justify-center bg-background px-4 py-2 text-sm font-light uppercase tracking-wider transition-colors hover:bg-transparent hover:border-b-2 hover:border-accent focus:bg-transparent focus:outline-none cursor-pointer rounded-none"
                >
                  Bundles
                </button>
              </NavigationMenuItem>

              {/* Guides Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Guides
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 bg-background">
                    {guideTopics.map((topic) => (
                      <li key={topic.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={topic.href}
                            className="flex items-center gap-3 select-none p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary uppercase text-sm tracking-wider font-light"
                          >
                            <topic.icon className="h-5 w-5 text-accent" />
                            <div className="text-sm font-light leading-none uppercase tracking-wider">
                              {topic.label}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Other Links */}
              {otherLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <Link
                    to={link.href}
                    className="group inline-flex h-10 w-max items-center justify-center bg-background px-4 py-2 text-sm font-light uppercase tracking-wider transition-colors hover:bg-transparent hover:border-b-2 hover:border-accent focus:bg-transparent focus:outline-none rounded-none"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
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
                className="hidden md:flex"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            {/* Mobile Chat Button */}
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => {
                setChatOpen(true);
                setHasUnreadChat(false);
                localStorage.setItem('nova-chat-visited', 'true');
              }}
              className="md:hidden relative"
            >
              <Sparkles className="h-5 w-5" />
              {hasUnreadChat && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 bg-red-500 hover:bg-red-500 flex items-center justify-center animate-pulse">
                  <span className="text-[10px] text-white">1</span>
                </Badge>
              )}
            </Button>
            
            {/* Desktop Chat Button */}
            <Button 
              variant="default"
              onClick={() => {
                setChatOpen(true);
                setHasUnreadChat(false);
                localStorage.setItem('nova-chat-visited', 'true');
              }}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md relative"
            >
              <Sparkles className="h-4 w-4" />
              Ask Nova
              {hasUnreadChat && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 bg-red-500 hover:bg-red-500 flex items-center justify-center animate-pulse">
                  <span className="text-xs text-white">1</span>
                </Badge>
              )}
            </Button>
            
            {/* User Account Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex relative">
                    <User className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-3 w-3 rounded-full p-0 bg-green-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background">
                  <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/subscriptions" className="cursor-pointer">
                      My Subscriptions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/rewards" className="cursor-pointer flex items-center">
                      <Award className="h-4 w-4 mr-2 text-accent" />
                      Rewards Program
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            <CartDrawer />
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-8">
                  {/* Shop Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Shop</h3>
                    <div className="flex flex-col gap-2 pl-4">
                      {shopCategories.map((category) => (
                        <Link
                          key={category.label}
                          to={category.href}
                          className="flex items-center gap-2 text-md text-muted-foreground hover:text-accent transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <category.icon className="h-4 w-4" />
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Bundles Section */}
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
                    className="text-lg font-medium hover:text-accent transition-colors text-left cursor-pointer"
                  >
                    Bundles
                  </button>

                  {/* Guides Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Guides</h3>
                    <div className="flex flex-col gap-2 pl-4">
                      {guideTopics.map((topic) => (
                        <Link
                          key={topic.label}
                          to={topic.href}
                          className="flex items-center gap-2 text-md text-muted-foreground hover:text-accent transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <topic.icon className="h-4 w-4" />
                          {topic.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Other Links */}
                  {otherLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-lg font-medium hover:text-accent transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="border-t pt-6 mt-4 space-y-4">
                    {/* Ask Hera Button */}
                    <Button 
                      variant="default"
                      onClick={() => {
                        setChatOpen(true);
                        setHasUnreadChat(false);
                        localStorage.setItem('nova-chat-visited', 'true');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md relative"
                      size="lg"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Ask Nova
                      {hasUnreadChat && (
                        <Badge className="absolute top-2 right-2 h-5 w-5 rounded-full p-0 bg-red-500 hover:bg-red-500 flex items-center justify-center animate-pulse">
                          <span className="text-xs text-white">1</span>
                        </Badge>
                      )}
                    </Button>

                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon">
                        <Search className="h-5 w-5" />
                      </Button>
                    </form>
                    <Button variant="ghost" className="w-full justify-start" size="lg">
                      <User className="h-5 w-5 mr-2" />
                      Account
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <Chat open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
};
