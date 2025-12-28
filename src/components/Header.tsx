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
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border/30 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex h-14 lg:h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logoIcon} 
              alt="Neurostate" 
              className="h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:scale-105" 
            />
            <span className="text-xs lg:text-sm font-medium tracking-tight text-foreground">
              Neurostate
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-foreground/60 hover:text-foreground hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground text-xs font-normal h-9 px-3 rounded-full">
                    Industries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[320px] p-3 bg-card border border-border rounded-2xl shadow-lg">
                      <div className="space-y-0.5">
                        {industries.map((item) => (
                          <NavigationMenuLink key={item.label} asChild>
                            <Link
                              to={item.href}
                              className="block p-3 rounded-xl hover:bg-muted transition-colors group"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                                    {item.label}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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
              className="text-xs font-normal text-foreground/60 hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-muted/50"
            >
              Shop
            </Link>

            <Link
              to="/nova/overview"
              className="text-xs font-normal text-foreground/60 hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-muted/50"
            >
              Nova AI
            </Link>

            <Link
              to="/resources"
              className="text-xs font-normal text-foreground/60 hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-muted/50"
            >
              Resources
            </Link>

            <Link
              to="/about"
              className="text-xs font-normal text-foreground/60 hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-muted/50"
            >
              Company
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 lg:gap-2">
            {/* Desktop Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-1.5">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 h-8 text-xs bg-muted border-transparent focus:border-primary rounded-full"
                  autoFocus
                />
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full"
                  onClick={() => {
                    setSearchOpen(false);
                    clearSearch();
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden lg:flex h-8 w-8 text-foreground/60 hover:text-foreground hover:bg-muted/50 rounded-full"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-3.5 w-3.5" />
              </Button>
            )}
            
            {/* User Account - Desktop */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden lg:flex h-8 w-8 relative text-foreground/60 hover:text-foreground hover:bg-muted/50 rounded-full">
                    <User className="h-3.5 w-3.5" />
                    <Badge className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full p-0 bg-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 bg-card border-border rounded-xl">
                  <DropdownMenuItem disabled className="text-[10px] text-muted-foreground">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer text-foreground text-xs">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer text-foreground text-xs">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/rewards" className="cursor-pointer flex items-center text-foreground text-xs">
                      <Award className="h-3.5 w-3.5 mr-2 text-primary" />
                      Rewards
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive text-xs">
                    <LogOut className="h-3.5 w-3.5 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="hidden lg:flex h-8 w-8 text-foreground/60 hover:text-foreground hover:bg-muted/50 rounded-full">
                  <User className="h-3.5 w-3.5" />
                </Button>
              </Link>
            )}

            {/* Book a Demo - Primary CTA */}
            <Link to="/contact" className="hidden lg:block">
              <Button 
                size="sm"
                className="h-8 px-4 text-[11px] font-medium bg-gray-800 text-white hover:bg-gray-700 rounded-full"
              >
                Book a demo
              </Button>
            </Link>
            
            <CartDrawer />
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 text-foreground/60 hover:text-foreground hover:bg-muted/50 rounded-full">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[320px] bg-background border-l border-border p-0">
                <SheetHeader className="p-5 border-b border-border">
                  <SheetTitle className="text-left text-foreground text-sm font-medium">Menu</SheetTitle>
                </SheetHeader>
                
                <nav className="p-5 space-y-1">
                  {mobileLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  <div className="pt-5 border-t border-border mt-5">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Industries</p>
                    {industries.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block py-2 text-xs text-foreground/70 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Account Section */}
                  <div className="pt-5 border-t border-border mt-5">
                    {user ? (
                      <div className="space-y-2">
                        <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                        <Link
                          to="/dashboard"
                          className="block py-2 text-xs text-foreground hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setMobileMenuOpen(false);
                          }}
                          className="block py-2 text-xs text-destructive hover:text-destructive/80 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/auth"
                        className="block py-2 text-xs text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    )}
                  </div>
                  
                  {/* CTA */}
                  <div className="pt-5">
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full h-10 text-xs font-medium bg-gray-800 text-white hover:bg-gray-700 rounded-full">
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
    </>
  );
};
