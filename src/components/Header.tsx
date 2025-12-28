import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Search, User, Menu, X, Award, LogOut, ArrowUpRight } from "lucide-react";
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

  const industries = [
    { label: "Corporate Wellness", href: "/enterprise/corporate/overview", desc: "Enterprise cognitive programmes" },
    { label: "Sports Organisations", href: "/enterprise/sports/overview", desc: "Athletic performance systems" },
    { label: "Health Clubs", href: "/enterprise/health-clubs/overview", desc: "Facility integration" },
  ];

  const mobileLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Nova AI", href: "/nova/overview" },
    { label: "For Teams", href: "/enterprise/overview" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img 
              src={logoIcon} 
              alt="Neurostate" 
              className="h-7 w-7 lg:h-8 lg:w-8 transition-transform duration-300 group-hover:scale-105" 
            />
            <span className="text-sm lg:text-base font-medium tracking-tight text-foreground">
              Neurostate
            </span>
          </Link>
          
          {/* Desktop Navigation - Clean like Invisible */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Industries Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-foreground/70 hover:text-foreground hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground text-sm font-normal h-10 px-4">
                    Industries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-card border border-border rounded-lg shadow-lg">
                      <div className="space-y-1">
                        {industries.map((item) => (
                          <NavigationMenuLink key={item.label} asChild>
                            <Link
                              to={item.href}
                              className="block p-3 rounded-md hover:bg-muted transition-colors group"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                    {item.label}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/shop"
              className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors px-4 py-2"
            >
              Shop
            </Link>

            <Link
              to="/nova/overview"
              className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors px-4 py-2"
            >
              Nova AI
            </Link>

            <Link
              to="/resources"
              className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors px-4 py-2"
            >
              Resources
            </Link>

            <Link
              to="/about"
              className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors px-4 py-2"
            >
              Company
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Desktop Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 h-9 text-sm bg-muted border-transparent focus:border-primary"
                  autoFocus
                />
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost"
                  className="h-9 w-9 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setSearchOpen(false);
                    clearSearch();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden lg:flex h-9 w-9 text-foreground/70 hover:text-foreground hover:bg-muted"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
            
            {/* User Account - Desktop */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden lg:flex h-9 w-9 relative text-foreground/70 hover:text-foreground hover:bg-muted">
                    <User className="h-4 w-4" />
                    <Badge className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full p-0 bg-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                  <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer text-foreground">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer text-foreground">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/rewards" className="cursor-pointer flex items-center text-foreground">
                      <Award className="h-4 w-4 mr-2 text-primary" />
                      Rewards
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="hidden lg:flex h-9 w-9 text-foreground/70 hover:text-foreground hover:bg-muted">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Book a Demo - Primary CTA */}
            <Link to="/contact" className="hidden lg:block">
              <Button 
                className="h-9 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-md"
              >
                Book a demo
              </Button>
            </Link>
            
            <CartDrawer />
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 text-foreground/70 hover:text-foreground hover:bg-muted">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] bg-background border-l border-border p-0">
                <SheetHeader className="p-6 border-b border-border">
                  <SheetTitle className="text-left text-foreground text-base font-medium">Menu</SheetTitle>
                </SheetHeader>
                
                <nav className="p-6 space-y-1">
                  {mobileLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block py-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  <div className="pt-6 border-t border-border mt-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Industries</p>
                    {industries.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block py-2.5 text-foreground/80 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Account Section */}
                  <div className="pt-6 border-t border-border mt-6">
                    {user ? (
                      <div className="space-y-3">
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        <Link
                          to="/dashboard"
                          className="block py-2.5 text-foreground hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setMobileMenuOpen(false);
                          }}
                          className="block py-2.5 text-destructive hover:text-destructive/80 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/auth"
                        className="block py-2.5 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    )}
                  </div>
                  
                  {/* CTA */}
                  <div className="pt-6">
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full h-12 text-base font-medium bg-foreground text-background hover:bg-foreground/90">
                        Book a demo
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <MobileBottomNav />
    </>
  );
};