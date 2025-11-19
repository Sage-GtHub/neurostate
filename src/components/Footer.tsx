import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Lock, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { TrustBadges } from "./TrustBadges";
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
    
    // Simulate API call - replace with actual implementation
    setTimeout(() => {
      toast.success("Cheers for signing up!", {
        description: "Your 10% off code is on its way to your inbox.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/" },
      { name: "Supplements", href: "/#products" },
      { name: "Recovery & Performance", href: "/#products" },
      { name: "Sleep & Rest", href: "/#products" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Resources", href: "/resources" },
      { name: "Ambassador Program", href: "/ambassador" },
      { name: "Partnerships", href: "/partnerships" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "FAQ", href: "/faq" },
      { name: "How to Use", href: "/guides" },
      { name: "Order Tracking", href: "/track-order" },
      { name: "Shipping & Returns", href: "/shipping" },
      { name: "Subscriptions", href: "/subscriptions" },
      { name: "Rewards Program", href: "/rewards" },
    ],
    legal: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/neurostate", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/neurostate", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/neurostate", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/@neurostate", label: "YouTube" },
  ];


  return (
    <footer className="bg-pearl mt-16 sm:mt-24 border-t border-mist">
      <div className="container mx-auto px-6 sm:px-8 lg:px-20 xl:px-32 py-8 sm:py-12">
        {/* Company Mission */}
        <div className="mb-8 sm:mb-12 max-w-3xl">
          <Link to="/" className="flex items-center gap-2 mb-3 sm:mb-4">
            <img src={logoIcon} alt="Neural Waveform" className="h-6 w-6" />
            <span className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-carbon">NEUROSTATE<sup className="text-[8px]">®</sup></span>
          </Link>
          <p className="text-ash text-xs sm:text-sm leading-relaxed font-normal">
            Making the best recovery tools and supplements accessible to everyone, everywhere. 
            Founded by Sage, a serial entrepreneur with a sports science background, NeuroState 
            was born from personal experience with burnout and discovering transformative recovery tools.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 sm:pt-6">
          <TrustBadges />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Newsletter Signup */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-carbon">Join Our Community</h3>
            <p className="text-ash mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed font-normal">
              Sign up for exclusive offers, the occasional freebie, and 10% off your first order.
            </p>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-sm bg-ivory border-mist"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                variant="default"
                disabled={isLoading} 
                className="font-medium text-sm sm:w-auto w-full min-h-[44px]"
              >
                {isLoading ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-carbon">Shop</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-ash hover:text-carbon transition-colors text-xs sm:text-sm font-normal"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-carbon">Company</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-ash hover:text-carbon transition-colors text-xs sm:text-sm font-normal"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-carbon">Support</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-ash hover:text-carbon transition-colors text-xs sm:text-sm font-normal"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-carbon">Legal</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-ash hover:text-carbon transition-colors text-xs sm:text-sm font-normal"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info & Social */}
        <div className="pt-6 sm:pt-8 border-t border-mist">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-carbon">Get in Touch</h3>
              <div className="space-y-2 sm:space-y-3">
                <a
                  href="mailto:contact@neurostate.co.uk"
                  className="flex items-center gap-2 text-ash hover:text-carbon transition-colors text-xs sm:text-sm group font-normal"
                >
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
                  contact@neurostate.co.uk
                </a>
                <p className="text-[10px] sm:text-xs text-ash font-normal">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-carbon">Follow Us</h3>
              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <div
                    key={social.label}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-ivory border border-mist flex items-center justify-center cursor-default hover:bg-pearl transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                ))}
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-3 sm:mt-4">
                Join our community for tips, product updates, and exclusive offers
              </p>
            </div>
          </div>

          {/* Copyright & Links */}
          <div className="pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                © {new Date().getFullYear()} NeuroState®. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <a 
                  href="https://neurostate.co.uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  neurostate.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
