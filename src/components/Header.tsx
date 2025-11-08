import { useState } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { SearchOverlay } from "./SearchOverlay";
import { Search, User } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm font-medium">
        Free Shipping on US Orders $75+
      </div>
      <header className="sticky top-0 z-50 w-full bg-background border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="font-bold text-2xl tracking-tight">
            NeuroState®
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
              Shop
            </Link>
            <a href="#products" className="text-sm font-medium hover:text-accent transition-colors">
              Products
            </a>
            <a href="#learn" className="text-sm font-medium hover:text-accent transition-colors">
              Learn
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <CartDrawer />
          </div>
        </div>
      </header>
      
      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};
