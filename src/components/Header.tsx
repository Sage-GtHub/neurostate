import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Search, User, Menu, RefreshCw, ChevronDown, Package, Droplets, Activity, Moon, Brain, BookOpen, Zap, Target, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { AnnouncementBar } from "./AnnouncementBar";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: "Sleep Optimization", href: "/guides#sleep", icon: Moon },
    { label: "Performance Tips", href: "/guides#performance", icon: Target },
  ];

  const otherLinks = [
    { label: "Resources", href: "/resources" },
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
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {/* Shop Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 bg-background">
                    {shopCategories.map((category) => (
                      <li key={category.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="flex items-center gap-3 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <category.icon className="h-5 w-5 text-primary" />
                            <div className="text-sm font-medium leading-none">
                              {category.label}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Guides Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  Guides
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 bg-background">
                    {guideTopics.map((topic) => (
                      <li key={topic.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={topic.href}
                            className="flex items-center gap-3 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <topic.icon className="h-5 w-5 text-primary" />
                            <div className="text-sm font-medium leading-none">
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
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

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
