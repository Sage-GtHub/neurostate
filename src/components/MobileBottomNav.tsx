import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Search, User, Sparkles } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface MobileBottomNavProps {
  onSearchOpen?: () => void;
  onNovaOpen?: () => void;
}

export const MobileBottomNav = ({ onSearchOpen, onNovaOpen }: MobileBottomNavProps) => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navItems = [
    { icon: Home, label: "Home", href: "/", exact: true },
    { icon: ShoppingBag, label: "Shop", href: "/shop", exact: false },
    { icon: Search, label: "Search", href: "#search", exact: false, action: () => setSearchOpen(true) },
    { icon: Sparkles, label: "Nova", href: "#nova", exact: false, action: onNovaOpen },
    { icon: User, label: "Account", href: user ? "/dashboard" : "/auth", exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (href.startsWith("#")) return false;
    if (exact) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-mist safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            
            if (item.action) {
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[56px] touch-manipulation"
                >
                  <item.icon 
                    className={`w-5 h-5 transition-colors ${
                      active ? 'text-accent' : 'text-ash'
                    }`} 
                  />
                  <span className={`text-[10px] font-medium transition-colors ${
                    active ? 'text-accent' : 'text-ash'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            }
            
            return (
              <Link
                key={item.label}
                to={item.href}
                className="flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[56px] touch-manipulation"
              >
                <item.icon 
                  className={`w-5 h-5 transition-colors ${
                    active ? 'text-accent' : 'text-ash'
                  }`} 
                />
                <span className={`text-[10px] font-medium transition-colors ${
                  active ? 'text-accent' : 'text-ash'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Search Sheet */}
      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[50vh] rounded-t-2xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-carbon">Search</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSearch} className="space-y-4">
            <Input
              type="search"
              placeholder="Search products, guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-base min-h-[48px]"
              autoFocus
            />
            <Button type="submit" className="w-full min-h-[48px]">
              Search
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};
