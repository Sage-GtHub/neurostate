import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import logoIcon from "@/assets/neurostate-icon.png";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      toast.success("Thanks for signing up!", {
        description: "Your 10% off code is on its way to your inbox.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  const footerLinks = {
    platform: [
      { name: "Nova AI", href: "/nova/overview" },
      { name: "Supplements", href: "/category/supplements" },
      { name: "Devices", href: "/category/devices" },
      { name: "Shop All", href: "/shop" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "Partnerships", href: "/partnerships" },
    ],
    support: [
      { name: "FAQ", href: "/faq" },
      { name: "Shipping", href: "/shipping" },
      { name: "Order Tracking", href: "/track-order" },
      { name: "Rewards", href: "/rewards" },
    ],
    account: [
      { name: "Team Dashboard", href: "/team" },
      { name: "My Dashboard", href: "/dashboard" },
      { name: "Sign In", href: "/auth" },
    ],
  };

  return (
    <footer className="relative overflow-hidden bg-background">
      {/* Clean top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-border/50" />
      
      <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20 pb-16 border-b border-foreground/5">
            {/* Brand */}
            <div className="lg:max-w-xs space-y-5">
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                  <img src={logoIcon} alt="Neurostate" className="h-4 w-4 opacity-60" />
                </div>
                <span className="text-xs font-medium tracking-tight text-foreground/70">Neurostate</span>
              </Link>
              <p className="text-foreground/40 text-[11px] leading-relaxed">
                The AI operating system for human performance. Cognitive forecasting, precision supplements, and neuromodulation.
              </p>
            </div>

            {/* Newsletter */}
            <div className="flex-1 lg:max-w-sm lg:ml-auto space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Newsletter</p>
              <p className="text-foreground/50 text-xs">
                Get 10% off your first order.
              </p>
              <form onSubmit={handleNewsletterSignup} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-10 bg-foreground/[0.03] border-foreground/10 text-foreground text-xs placeholder:text-foreground/30 focus:border-foreground/20 rounded-full px-5"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  size="sm"
                  className="h-10 w-10 p-0 bg-foreground text-background hover:bg-foreground/90 rounded-full"
                >
                  {isLoading ? "..." : <ArrowRight className="w-3.5 h-3.5" />}
                </Button>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 mb-20">
            <div className="space-y-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Platform</p>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="group inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground transition-colors">
                      {link.name}
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Company</p>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="group inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground transition-colors">
                      {link.name}
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Support</p>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="group inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground transition-colors">
                      {link.name}
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Account</p>
              <ul className="space-y-3">
                {footerLinks.account.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="group inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground transition-colors">
                      {link.name}
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:contact@neurostate.co.uk" className="group inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground transition-colors">
                    contact@neurostate.co.uk
                  </a>
                </li>
                <li className="text-xs text-foreground/30">
                  London, United Kingdom
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-foreground/25">
              © {new Date().getFullYear()} Neurostate
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-[10px] text-foreground/25 hover:text-foreground/50 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-[10px] text-foreground/25 hover:text-foreground/50 transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};