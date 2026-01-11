import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { User, Menu, X, Award, LogOut, ArrowUpRight, ChevronDown } from "lucide-react";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { AnnouncementBar } from "./AnnouncementBar";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import logoIcon from "@/assets/neurostate-icon.svg";
import { cn } from "@/lib/utils";

export const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  // Handle scroll for glass effect
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
    { label: "SaaS – High Growth", href: "/industries/saas-high-growth", desc: "Hypergrowth team performance" },
    { label: "SaaS – Enterprise", href: "/industries/saas-enterprise", desc: "Scaled software organisations" },
    { label: "Financial Services", href: "/industries/financial-services", desc: "Trading & investment teams" },
    { label: "Professional Services", href: "/industries/professional-services", desc: "Consulting & advisory firms" },
    { label: "Healthcare", href: "/industries/healthcare", desc: "Clinical & care organisations" },
    { label: "Research & Life Sciences", href: "/industries/research-life-sciences", desc: "R&D & biotech teams" },
    { label: "Government / Defence", href: "/industries/government-defence", desc: "Public sector & security" },
    { label: "Advanced Technology", href: "/industries/advanced-technology", desc: "Hardware & deep tech" },
  ];

  const solutions = [
    { label: "Data Integration", href: "/solutions/data-layer", desc: "Unified signal ingestion from wearables & tools" },
    { label: "Cognitive Monitoring", href: "/solutions/state-engine", desc: "Real-time cognitive state interpretation" },
    { label: "Predictive Intelligence", href: "/solutions/prediction", desc: "Forecast capacity & model scenarios" },
    { label: "AI Coaching", href: "/solutions/action-layer", desc: "Personalised nudges & interventions" },
    { label: "Team Analytics", href: "/solutions/command-surfaces", desc: "Role-based dashboards & insights" },
    { label: "Performance ROI", href: "/solutions/roi-layer", desc: "Quantify cognitive value in pounds" },
  ];

  const mobileLinks = [
    { label: "Nova AI", href: "/nova/overview" },
    { label: "For Teams", href: "/enterprise/overview" },
    { label: "About", href: "/about" },
  ];

  const mobileSolutions = [
    { label: "Platform Overview", href: "/solutions" },
    { label: "Data Integration", href: "/solutions/data-layer" },
    { label: "Cognitive Monitoring", href: "/solutions/state-engine" },
    { label: "Predictive Intelligence", href: "/solutions/prediction" },
    { label: "AI Coaching", href: "/solutions/action-layer" },
    { label: "Team Analytics", href: "/solutions/command-surfaces" },
    { label: "Performance ROI", href: "/solutions/roi-layer" },
  ];

  return (
    <>
      <AnnouncementBar />
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        isScrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm" 
          : "bg-background/80 backdrop-blur-md border-b border-transparent"
      )}>
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex h-14 lg:h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={logoIcon} 
              alt="Neurostate" 
              className="h-5 w-5 lg:h-6 lg:w-6 transition-all duration-300 group-hover:scale-110 relative" 
            />
            <span className="text-xs lg:text-sm font-medium tracking-tight text-foreground relative">
              Neurostate
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Solutions Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-foreground/60 hover:text-foreground hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground text-xs font-normal h-9 px-3 rounded-full transition-all duration-300 [&>svg]:text-primary normal-case">
                    Platform
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[360px] p-4 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl">
                      <div className="mb-3 pb-3 border-b border-border/30">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/solutions"
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/80 transition-all duration-300 group"
                          >
                            <div>
                              <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                Platform Overview
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                How it all works together
                              </p>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="space-y-1">
                        {solutions.map((item, index) => (
                          <NavigationMenuLink key={item.label} asChild>
                            <Link
                              to={item.href}
                              className="block p-3 rounded-xl hover:bg-muted/80 transition-all duration-300 group"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                    {item.label}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5 group-hover:text-muted-foreground/80 transition-colors">
                                    {item.desc}
                                  </p>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Industries Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-foreground/60 hover:text-foreground hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground text-xs font-normal h-9 px-3 rounded-full transition-all duration-300 [&>svg]:text-primary normal-case">
                    Industries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[340px] p-4 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl">
                      <div className="mb-3 pb-3 border-b border-border/30">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/industries"
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/80 transition-all duration-300 group"
                          >
                            <div>
                              <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                Industries Overview
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                ROI calculator & industry benchmarks
                              </p>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="space-y-1">
                        {industries.map((item, index) => (
                          <NavigationMenuLink key={item.label} asChild>
                            <Link
                              to={item.href}
                              className="block p-3 rounded-xl hover:bg-muted/80 transition-all duration-300 group"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                    {item.label}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5 group-hover:text-muted-foreground/80 transition-colors">
                                    {item.desc}
                                  </p>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
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
              to="/nova/overview"
              className="text-xs font-normal text-foreground/60 hover:text-foreground transition-all duration-300 px-3 py-2 rounded-full hover:bg-muted/50 animated-underline"
            >
              Nova AI
            </Link>

            <Link
              to={user ? "/team-dashboard" : "/auth?mode=signup&type=company"}
              className="text-xs font-normal text-foreground/60 hover:text-foreground transition-all duration-300 px-3 py-2 rounded-full hover:bg-muted/50 animated-underline"
            >
              Team
            </Link>

            <Link
              to="/about"
              className="text-xs font-normal text-foreground/60 hover:text-foreground transition-all duration-300 px-3 py-2 rounded-full hover:bg-muted/50 animated-underline"
            >
              Company
            </Link>
          </nav>

          {/* Right Actions - Auth, Book Demo */}
          <div className="hidden lg:flex items-center gap-2">
            
            {/* User Menu (only when logged in) */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 px-3 text-[11px] font-medium text-foreground/60 hover:text-foreground hover:bg-muted/50 rounded-full gap-1.5"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="max-w-[80px] truncate">{user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/team-dashboard" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Team Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Get In Touch - Coral CTA */}
            <Link
              to="/contact"
              className="h-8 px-5 text-[11px] font-medium bg-primary text-primary-foreground rounded-full flex items-center hover:bg-primary/90 transition-colors"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Get In Touch
              </span>
            </Link>
          </div>

          {/* Mobile Menu Only */}
          <div className="flex items-center lg:hidden">
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 text-foreground/60 hover:text-foreground hover:bg-muted/50 rounded-full">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[320px] bg-background border-l border-border p-0 flex flex-col h-full">
                <SheetHeader className="p-5 border-b border-border flex-shrink-0">
                  <SheetTitle className="text-left text-foreground text-sm font-medium">Menu</SheetTitle>
                </SheetHeader>
                
                <nav className="p-5 space-y-1 overflow-y-auto flex-1">
                  {/* Solutions Collapsible */}
                  <Collapsible open={solutionsOpen} onOpenChange={setSolutionsOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
                      <span>Platform</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", solutionsOpen && "rotate-180")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1">
                      <Link
                        to="/solutions"
                        className="block py-2 text-xs text-foreground/70 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Solutions Overview
                      </Link>
                      {solutions.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block py-2 text-xs text-foreground/70 hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {/* Industries Collapsible */}
                  <Collapsible open={industriesOpen} onOpenChange={setIndustriesOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
                      <span>Industries</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", industriesOpen && "rotate-180")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1">
                      <Link
                        to="/industries"
                        className="block py-2 text-xs text-foreground/70 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Industries Overview
                      </Link>
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
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {/* Direct Links */}
                  <Link
                    to="/nova/overview"
                    className="block py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Nova AI
                  </Link>

                  <Link
                    to={user ? "/team-dashboard" : "/auth?mode=signup&type=company"}
                    className="block py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Team
                  </Link>
                  
                  <Link
                    to="/about"
                    className="block py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Company
                  </Link>
                  
                  {/* Account Section */}
                  <div className="pt-5 border-t border-border mt-5">
                    {user ? (
                      <div className="space-y-2">
                        <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                        <Link
                          to="/dashboard"
                          className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/team-dashboard"
                          className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Team Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setMobileMenuOpen(false);
                          }}
                          className="block py-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : null}
                  </div>
                  
                  {/* CTA */}
                  <div className="pt-5 pb-5">
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full h-10 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full">
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
