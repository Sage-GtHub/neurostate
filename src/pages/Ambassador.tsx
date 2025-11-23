import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-muted-foreground">
                  Simple, straightforward, and rewarding.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-semibold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Apply</h3>
                  <p className="text-sm text-muted-foreground font-light">
                    Fill out the application form and tell us about yourself and your wellness journey.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-semibold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Get Approved</h3>
                  <p className="text-sm text-muted-foreground font-light">
                    We'll review your application and notify you within 5 business days.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-semibold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Start Earning</h3>
                  <p className="text-sm text-muted-foreground font-light">
                    Get your unique code, receive your welcome kit, and start sharing!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="py-8">
                <h2 className="text-2xl font-semibold mb-8 text-center">Who We're Looking For</h2>
                <ul className="space-y-4">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Gift className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-muted-foreground font-light">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Apply to Become an Ambassador
                </h2>
                <p className="text-lg text-muted-foreground">
                  Tell us about yourself and why you'd be a great fit for our program.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Handle</Label>
                    <Input
                      id="instagram"
                      placeholder="@yourusername"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audience">Tell us about your audience</Label>
                    <Input
                      id="audience"
                      placeholder="e.g., Health enthusiasts, fitness community, wellness seekers"
                      value={formData.audience}
                      onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="why">Why do you want to be an ambassador? *</Label>
                    <Textarea
                      id="why"
                      rows={5}
                      placeholder="Tell us about your passion for wellness and why you'd be a great fit..."
                      value={formData.why}
                      onChange={(e) => setFormData({ ...formData, why: e.target.value })}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We'll review your application and get back to you within 5 business days.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default Ambassador;
