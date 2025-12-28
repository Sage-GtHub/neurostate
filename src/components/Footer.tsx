import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-20 md:py-24">
        {/* Top Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 mb-16 pb-16 border-b border-background/10">
            {/* Brand */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-3 group">
                <img src={logoIcon} alt="Neurostate" className="h-8 w-8 invert opacity-90" />
                <span className="text-xl font-medium tracking-tight">NEUROSTATE</span>
              </Link>
              <p className="text-background/60 text-sm leading-relaxed max-w-sm">
                The AI operating system for human performance. Cognitive forecasting, precision supplements, and neuromodulation technology.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Join the newsletter</h3>
              <p className="text-background/60 text-sm">
                Get 10% off your first order and exclusive insights.
              </p>
              <form onSubmit={handleNewsletterSignup} className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? "..." : <ArrowRight className="w-4 h-4" />}
                </Button>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-background/40 mb-4 font-medium">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-background/40 mb-4 font-medium">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-background/40 mb-4 font-medium">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-background/40 mb-4 font-medium">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:contact@neurostate.co.uk" className="text-sm text-background/60 hover:text-background transition-colors">
                    contact@neurostate.co.uk
                  </a>
                </li>
                <li className="text-sm text-background/40">
                  London, United Kingdom
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-background/10">
            <p className="text-xs text-background/40">
              © {new Date().getFullYear()} Neurostate. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-xs text-background/40 hover:text-background transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-xs text-background/40 hover:text-background transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
