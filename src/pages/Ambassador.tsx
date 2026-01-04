import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Gift, 
  TrendingUp, 
  Users, 
  Sparkles, 
  BadgePercent, 
  Package,
  Heart,
  Share2 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LiveChat } from "@/components/LiveChat";

const Ambassador = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    audience: "",
    why: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.why) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call - replace with actual implementation
    setTimeout(() => {
      toast.success("Application submitted!", {
        description: "We'll review your application and get back to you within 5 business days.",
      });
      setFormData({
        name: "",
        email: "",
        instagram: "",
        audience: "",
        why: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const benefits = [
    {
      icon: BadgePercent,
      title: "25% Ambassador Discount",
      description: "Get 25% off all products for your personal use, plus exclusive early access to new launches.",
    },
    {
      icon: TrendingUp,
      title: "Earn Commission",
      description: "Earn 15% commission on every sale made through your unique referral link. No cap on earnings.",
    },
    {
      icon: Package,
      title: "Free Product Samples",
      description: "Receive complimentary products to try and share with your community. Stay stocked up.",
    },
    {
      icon: Sparkles,
      title: "Exclusive Content Access",
      description: "Get insider wellness content, research updates, and professional resources before anyone else.",
    },
    {
      icon: Users,
      title: "Join Our Community",
      description: "Connect with other wellness enthusiasts and ambassadors in our private community.",
    },
    {
      icon: Share2,
      title: "Featured Opportunities",
      description: "Be featured on our social media, website, and marketing materials. Grow your platform.",
    },
  ];

  const requirements = [
    "Passionate about health, wellness, and living your best life",
    "Active social media presence (Instagram, TikTok, YouTube, blog, etc.)",
    "Genuine engagement with your audience",
    "Alignment with our brand values and mission",
    "Willingness to share honest reviews and experiences",
    "18 years or older",
  ];

  return (
    <>
      <SEO 
        title="Ambassador Programme | Join the NeuroState Community"
        description="Become a NeuroState ambassador. Share cognitive performance products, earn rewards, and help others optimise their health with our ambassador programme."
        keywords="NeuroState ambassador, wellness influencer, health advocate programme, brand ambassador, affiliate programme, cognitive performance advocate"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 border-b border-mist">
            <div className="w-full max-w-7xl mx-auto">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-[2.25rem] md:text-[3rem] font-normal text-carbon mb-6" style={{ lineHeight: '1.2' }}>
                  Become a NeuroState ambassador
                </h1>
                <p className="text-[0.9375rem] text-ash mb-8">
                  Join our community of wellness advocates. Share what you love, earn rewards, 
                  and help others optimise their health
                </p>
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Apply now
                </Button>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-[1.5rem] font-normal text-carbon mb-4">
                  Ambassador benefits
                </h2>
                <p className="text-[0.9375rem] text-ash max-w-2xl mx-auto">
                  We value our ambassadors and provide incredible perks
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                {benefits.map((benefit) => (
                  <div key={benefit.title}>
                    <h3 className="text-[1.125rem] font-normal text-carbon mb-3">{benefit.title}</h3>
                    <p className="text-[0.875rem] text-ash leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 bg-muted/20">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-[1.5rem] font-normal text-carbon mb-4">
                  What we look for
                </h2>
              </div>

              <div className="max-w-2xl mx-auto">
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-[0.9375rem] text-carbon">
                      <span className="w-1.5 h-1.5 rounded-full bg-carbon mt-2 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="application" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
            <div className="w-full max-w-7xl mx-auto">
              <div className="max-w-xl mx-auto">
                <h2 className="text-[1.5rem] font-normal text-carbon mb-8 text-center">Apply to become an ambassador</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram handle</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                      placeholder="@yourusername"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audience">Audience size</Label>
                    <Input
                      id="audience"
                      value={formData.audience}
                      onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
                      placeholder="e.g. 5,000 followers"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="why">Why do you want to be an ambassador? *</Label>
                    <Textarea
                      id="why"
                      value={formData.why}
                      onChange={(e) => setFormData(prev => ({ ...prev, why: e.target.value }))}
                      placeholder="Tell us about yourself and why you'd be a great fit..."
                      className="min-h-[120px] rounded-lg"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit application"}
                  </Button>

                  <p className="text-xs text-ash text-center">
                    We'll review your application and get back to you within 5 business days.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      </div>
    </>
  );
};

export default Ambassador;
