import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, ArrowRight } from "lucide-react";
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
    <footer className="relative bg-void text-white mt-0 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Company Mission */}
        <div className="mb-16 sm:mb-20 md:mb-24 max-w-3xl">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 mb-6 group">
            <img src={logoIcon} alt="Neural Waveform" className="h-8 w-8 sm:h-10 sm:w-10 invert opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">NEUROSTATE<sup className="text-[8px] sm:text-[10px]">®</sup></span>
          </Link>
          <p className="text-lg text-white/60 max-w-lg leading-relaxed">
            The AI Operating System for Human Performance. Nova AI. Neuromodulation. Precision supplements. One integrated platform.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="pt-3 sm:pt-4 md:pt-6 mb-16">
          <TrustBadges />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 mb-8 sm:mb-10">
          {/* Newsletter Signup */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="mb-4 sm:mb-5 text-base sm:text-lg text-white font-medium">Join our community</h3>
            <p className="text-white/50 mb-6 text-sm sm:text-base leading-relaxed">
              Sign up for exclusive offers and 10% off your first order.
            </p>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-sm bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[48px] focus:border-emerald-500/50 focus:ring-emerald-500/20"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="font-medium text-sm sm:w-auto w-full min-h-[48px] touch-manipulation bg-emerald-500 hover:bg-emerald-600 text-white group"
              >
                {isLoading ? "..." : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="mb-4 sm:mb-5 text-base sm:text-lg text-white font-medium">Shop</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 sm:mb-5 text-base sm:text-lg text-white font-medium">Company</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 sm:mb-5 text-base sm:text-lg text-white font-medium">Support</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 sm:mb-5 text-base sm:text-lg text-white font-medium">Legal</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info & Social */}
        <div className="pt-10 sm:pt-12 md:pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 md:gap-16 mb-10 sm:mb-12 md:mb-16">
            {/* Contact Information */}
            <div>
              <h3 className="mb-4 sm:mb-5 text-base sm:text-lg text-white font-medium">Get in touch</h3>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="mailto:contact@neurostate.co.uk"
                  className="flex items-center gap-3 text-white/50 hover:text-emerald-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  contact@neurostate.co.uk
                </a>
                <p className="text-sm text-white/40 mt-4">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="mb-4 sm:mb-5 text-base sm:text-lg text-white font-medium">Follow us</h3>
              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <div
                    key={social.label}
                    className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all touch-manipulation text-white/60"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40 mt-5">
                Join our community for tips, product updates, and exclusive offers
              </p>
            </div>
          </div>

          {/* Copyright & Links */}
          <div className="pt-8 sm:pt-10 border-t border-white/5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
              <p className="text-sm text-white/40">
                © {new Date().getFullYear()} NeuroState®. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-8 justify-center">
                <Link to="/terms" className="text-sm text-white/40 hover:text-emerald-400 transition-colors">
                  Terms
                </Link>
                <Link to="/privacy" className="text-sm text-white/40 hover:text-emerald-400 transition-colors">
                  Privacy
                </Link>
                <a 
                  href="https://neurostate.co.uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-emerald-400 transition-colors"
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