import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { ShoppingBag } from "lucide-react";

export const Header = () => {
  return (
    <>
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm">
        Free Shipping on US Orders $75+
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="font-bold text-xl tracking-tight">
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
            <CartDrawer />
          </div>
        </div>
      </header>
    </>
  );
};
