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
      { name: "Blog", href: "/blog" },
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
    <footer className="bg-carbon text-ivory mt-12 sm:mt-16 md:mt-24 lg:mt-32">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Company Mission */}
        <div className="mb-12 sm:mb-16 md:mb-20 max-w-3xl">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <img src={logoIcon} alt="Neural Waveform" className="h-6 w-6 sm:h-8 sm:w-8 invert" />
            <span className="text-xl sm:text-2xl md:text-h2 font-semibold tracking-tight">NEUROSTATE<sup className="text-[8px] sm:text-[10px]">®</sup></span>
          </Link>
          <p className="text-base text-stone max-w-lg">
            The AI Operating System for Human Performance. Nova AI. Neuromodulation. Precision supplements. One integrated platform.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="pt-3 sm:pt-4 md:pt-6">
          <TrustBadges />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Newsletter Signup */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Join our community</h3>
            <p className="text-stone mb-4 sm:mb-6 text-sm sm:text-base">
              Sign up for exclusive offers and 10% off your first order.
            </p>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-sm bg-ivory border-mist min-h-[48px]"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                variant="default"
                disabled={isLoading} 
                className="font-medium text-sm sm:w-auto w-full min-h-[48px] touch-manipulation"
              >
                {isLoading ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Shop</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-stone hover:text-ivory transition-colors text-caption"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Company</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-stone hover:text-ivory transition-colors text-caption"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Support</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-stone hover:text-ivory transition-colors text-caption"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Legal</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-stone hover:text-ivory transition-colors text-caption"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info & Social */}
        <div className="pt-8 sm:pt-10 md:pt-12 border-t border-slate">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
            {/* Contact Information */}
            <div>
              <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Get in touch</h3>
              <div className="space-y-2 sm:space-y-3">
                <a
                  href="mailto:contact@neurostate.co.uk"
                  className="flex items-center gap-2 text-stone hover:text-ivory transition-colors group"
                >
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  contact@neurostate.co.uk
                </a>
                <p className="text-caption text-stone mt-3">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Follow us</h3>
              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <div
                    key={social.label}
                    className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl bg-slate border border-slate flex items-center justify-center cursor-default hover:bg-ivory hover:text-carbon transition-all touch-manipulation"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </div>
                ))}
              </div>
              <p className="text-caption text-stone mt-4">
                Join our community for tips, product updates, and exclusive offers
              </p>
            </div>
          </div>

          {/* Copyright & Links */}
          <div className="pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className="text-caption text-stone">
                © {new Date().getFullYear()} NeuroState®. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Link to="/terms" className="text-caption text-stone hover:text-ivory transition-colors">
                  Terms
                </Link>
                <Link to="/privacy" className="text-caption text-stone hover:text-ivory transition-colors">
                  Privacy
                </Link>
                <a 
                  href="https://neurostate.co.uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-caption text-stone hover:text-ivory transition-colors"
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
