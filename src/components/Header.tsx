import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Search, User, Menu, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { AnnouncementBar } from "./AnnouncementBar";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Shop", href: "/" },
    { label: "Products", href: "#products" },
    { label: "Resources", href: "/resources" },
    { label: "Guides", href: "/guides" },
    { label: "Ambassador", href: "/ambassador" },
  ];

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 w-full bg-background border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="font-bold text-2xl tracking-tight">
            NeuroState®
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                to={link.href} 
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/subscriptions">
              <Button variant="ghost" size="icon" className="hidden md:flex" title="Manage Subscriptions">
                <RefreshCw className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
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
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-lg font-medium hover:text-accent transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t pt-6 mt-4">
                    <Button variant="ghost" className="w-full justify-start" size="lg">
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </Button>
                    <Link
                      to="/subscriptions"
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="ghost" className="w-full justify-start" size="lg">
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Subscriptions
                      </Button>
                    </Link>
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
    </>
  );
};
