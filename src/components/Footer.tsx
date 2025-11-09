import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

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
      toast.success("Thanks for subscribing!", {
        description: "You'll receive 10% off your first order in your inbox.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  const footerLinks = {
    shop: [
      { name: "All Products", href: "#products" },
      { name: "Categories", href: "#categories" },
      { name: "New Arrivals", href: "#products" },
      { name: "Best Sellers", href: "#products" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Resources", href: "/resources" },
      { name: "Subscriptions", href: "/subscriptions" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "FAQ", href: "/faq" },
      { name: "Shipping & Returns", href: "/shipping" },
      { name: "How-to-Use Guides", href: "/guides" },
      { name: "Ambassador Program", href: "/ambassador" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-muted/30 border-t mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Newsletter Signup */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Join Our Community</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Subscribe to get special offers, free giveaways, and 10% off your first order.
            </p>
            <form onSubmit={handleNewsletterSignup} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info & Social */}
        <div className="border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Contact Information */}
            <div>
              <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <a
                  href="mailto:support@example.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Mail className="h-4 w-4" />
                  support@example.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  +1 (234) 567-890
                </a>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>123 Buckingham Palace Rd, London SW1W 9SH</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Your Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
