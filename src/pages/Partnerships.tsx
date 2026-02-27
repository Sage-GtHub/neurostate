import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  CheckCircle2,
  Building2,
  Globe,
  Zap,
  Heart,
  ArrowRight,
  Mail
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


interface Partner {
  name: string;
  logo: string;
  description: string;
  category: string;
}

const partners: Partner[] = [
  {
    name: "Elite Performance Academy",
    logo: "🏆",
    description: "Professional sports training facility providing cutting-edge recovery technology to athletes.",
    category: "Sports"
  },
  {
    name: "Wellness Corp",
    logo: "💚",
    description: "Corporate wellness programs helping companies improve employee health and productivity.",
    category: "Corporate"
  },
  {
    name: "Premier Fitness Network",
    logo: "💪",
    description: "Chain of premium fitness centres offering integrated health and recovery services.",
    category: "Fitness"
  },
  {
    name: "University Research Lab",
    logo: "🔬",
    description: "Leading research institution studying performance optimisation and recovery protocols.",
    category: "Research"
  },
  {
    name: "HealthTech Solutions",
    logo: "🏥",
    description: "Healthcare technology provider integrating recovery tools into patient care programmes.",
    category: "Healthcare"
  },
  {
    name: "Pro Athletes Union",
    logo: "⚡",
    description: "Professional sports organisation ensuring athletes have access to the best recovery tools.",
    category: "Sports"
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Exclusive Pricing",
    description: "Get wholesale pricing and bulk discounts tailored to your organisation's needs."
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "You'll have a personal account manager and priority support whenever you need help."
  },
  {
    icon: Target,
    title: "Custom Solutions",
    description: "We'll create bespoke product bundles and protocols designed specifically for your requirements."
  },
  {
    icon: Award,
    title: "Co-Marketing",
    description: "Work with us on joint marketing initiatives and get featured placement on our platforms."
  },
  {
    icon: Zap,
    title: "Early Access",
    description: "Be the first to try new products, read our latest research, and access exclusive content."
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "Let's work together on wellness initiatives that genuinely make a difference."
  },
];

const Partnerships = () => {
  
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    organizationType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.organizationName || !formData.contactName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Application submitted!", {
        description: "We'll review your application and get back to you within 2-3 business days.",
      });
      setFormData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        organizationType: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <SEO 
        title="Partnership Programme | B2B Wellness Solutions | NeuroState"
        description="Partner with NeuroState for wholesale pricing, dedicated support, custom solutions, and co-marketing opportunities. Join our network of performance-focused organisations."
        keywords="NeuroState partnership, B2B wellness, wholesale cognitive products, corporate wellness partnership, reseller programme, co-marketing wellness"
      />
      <div className="min-h-screen bg-background mobile-nav-padding">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 border-b border-mist">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-[2.25rem] md:text-[3rem] font-normal text-carbon mb-6" style={{ lineHeight: '1.2' }}>
                Partner with NeuroState
              </h1>
              <p className="text-[0.9375rem] text-ash mb-8">
                Join our network of leading organisations advancing human performance, 
                recovery, and wellbeing through science-backed solutions
              </p>
            </div>
          </div>
        </section>

        <div className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-[1.5rem] font-normal text-carbon mb-4">Partnership benefits</h2>
              <p className="text-[0.9375rem] text-ash max-w-2xl mx-auto">
                We believe in building partnerships that genuinely benefit both sides
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {benefits.map((benefit, index) => {
                return (
                  <div key={index}>
                    <h3 className="text-[1.125rem] font-normal text-carbon mb-3">{benefit.title}</h3>
                    <p className="text-[0.875rem] text-ash">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ideal Partners Section */}
        <div className="mb-16 border-t border-b border-border/40 py-12 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">Who We Partner With</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏋️</span>
                </div>
                <h3 className="font-semibold mb-2">Fitness Centres</h3>
                <p className="text-sm text-muted-foreground font-light">Gyms, studios, and training facilities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="font-semibold mb-2">Corporate Wellness</h3>
                <p className="text-sm text-muted-foreground font-light">Companies prioritising employee health</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-semibold mb-2">Sports Teams</h3>
                <p className="text-sm text-muted-foreground font-light">Professional and collegiate athletics</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="font-semibold mb-2">Healthcare</h3>
                <p className="text-sm text-muted-foreground font-light">Clinics, wellness centers, and practitioners</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trusted by leading organisations across multiple industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="p-6 border-t border-border/30 hover:translate-y-[-4px] transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center text-3xl">
                    {partner.logo}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {partner.name}
                    </h3>
                    <Badge variant="secondary" className="mt-1 text-xs">{partner.category}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-light">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-8 shadow-[var(--shadow-soft)]">
            <div className="text-center pb-6 mb-6 border-b border-border/30">
              <h2 className="text-3xl font-semibold mb-2">Apply for Partnership</h2>
              <p className="text-muted-foreground font-light">
                Tell us about your organisation and how we might work together
              </p>
            </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Organisation Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      name="organizationName"
                      placeholder="Your Company Ltd"
                      value={formData.organizationName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Contact Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      name="contactName"
                      placeholder="John Smith"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="+44 20 1234 5678"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Organisation Type
                  </label>
                  <Input
                    name="organizationType"
                    placeholder="e.g., Fitness Centre, Corporate, Sports Team, Healthcare"
                    value={formData.organizationType}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Tell Us About Your Organisation
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Share details about your organisation, your goals, and how you envision working with us..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p>We review all applications within 2-3 business days</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground font-light">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p>Our team will reach out to discuss partnership opportunities</p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-muted/30 border-t border-b border-border/40 py-12 mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-4">Questions About Partnerships?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
              Our partnership team is here to help you explore what's possible
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="outline" className="gap-2">
              <Mail className="h-5 w-5" />
              contact@neurostate.co.uk
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      
    </div>
    </>
  );
};

export default Partnerships;