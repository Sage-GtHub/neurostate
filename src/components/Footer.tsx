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
    <footer className="bg-gray-800 text-white">
      <div className="px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12 pb-12 border-b border-white/10">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2.5 group">
                <img src={logoIcon} alt="Neurostate" className="h-6 w-6 invert opacity-90" />
                <span className="text-sm font-medium tracking-tight">Neurostate</span>
              </Link>
              <p className="text-white/50 text-xs leading-relaxed max-w-xs">
                The AI operating system for human performance. Cognitive forecasting, precision supplements, and neuromodulation technology.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h3 className="text-xs font-medium">Join the newsletter</h3>
              <p className="text-white/50 text-xs">
                Get 10% off your first order.
              </p>
              <form onSubmit={handleNewsletterSignup} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-9 bg-white/10 border-white/10 text-white text-xs placeholder:text-white/30 focus:border-primary rounded-full"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  size="sm"
                  className="h-9 px-4 bg-primary hover:bg-primary/90 rounded-full"
                >
                  {isLoading ? "..." : <ArrowRight className="w-3.5 h-3.5" />}
                </Button>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-[10px] uppercase tracking-wider text-white/30 mb-4 font-medium">Platform</h3>
              <ul className="space-y-2.5">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-xs text-white/50 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-wider text-white/30 mb-4 font-medium">Company</h3>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-xs text-white/50 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-wider text-white/30 mb-4 font-medium">Support</h3>
              <ul className="space-y-2.5">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-xs text-white/50 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-wider text-white/30 mb-4 font-medium">Contact</h3>
              <ul className="space-y-2.5">
                <li>
                  <a href="mailto:contact@neurostate.co.uk" className="text-xs text-white/50 hover:text-white transition-colors">
                    contact@neurostate.co.uk
                  </a>
                </li>
                <li className="text-xs text-white/30">
                  London, United Kingdom
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
            <p className="text-[10px] text-white/30">
              © {new Date().getFullYear()} Neurostate. All rights reserved.
            </p>
            <div className="flex gap-5">
              <Link to="/terms" className="text-[10px] text-white/30 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-[10px] text-white/30 hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
