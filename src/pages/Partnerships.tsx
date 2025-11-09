import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  Mail,
  Phone
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LiveChat } from "@/components/LiveChat";

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
    description: "Chain of premium fitness centers offering integrated health and recovery services.",
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
  const [chatOpen, setChatOpen] = useState(false);
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
    <div className="min-h-screen bg-background">
      <Header onAskAIClick={() => setChatOpen(true)} />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Handshake className="h-4 w-4" />
            <span>Partnership Program</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Partner With NeuroState®
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join our network of leading organisations working to advance human performance, 
            recovery, and wellbeing through science-backed solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span>50+ Partner Organisations</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span>Operating in 12 Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>100,000+ Users Served</span>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partnership Benefits</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We believe in building partnerships that genuinely benefit both sides and make a real impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 group border-border/50 hover:border-primary/30"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Ideal Partners Section */}
        <Card className="mb-16 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Who We Partner With</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏋️</span>
                </div>
                <h3 className="font-semibold mb-2">Fitness Centres</h3>
                <p className="text-sm text-muted-foreground">Gyms, studios, and training facilities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="font-semibold mb-2">Corporate Wellness</h3>
                <p className="text-sm text-muted-foreground">Companies prioritising employee health</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-semibold mb-2">Sports Teams</h3>
                <p className="text-sm text-muted-foreground">Professional and collegiate athletics</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="font-semibold mb-2">Healthcare</h3>
                <p className="text-sm text-muted-foreground">Clinics, wellness centers, and practitioners</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trusted by leading organisations across multiple industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <Card 
                key={index}
                className="hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl">
                      {partner.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {partner.name}
                      </h3>
                      <Badge variant="secondary" className="mt-1">{partner.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto mb-20">
          <Card className="border-primary/20">
            <CardHeader className="text-center pb-6">
              <h2 className="text-3xl font-bold mb-2">Apply for Partnership</h2>
              <p className="text-muted-foreground">
                Tell us about your organisation and how we might work together
              </p>
            </CardHeader>
            <CardContent className="p-8">
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
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p>We review all applications within 2-3 business days</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
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
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Questions About Partnerships?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our partnership team is here to help you explore what's possible
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="outline" className="gap-2">
                <Mail className="h-5 w-5" />
                partnerships@neurostate.fit
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Phone className="h-5 w-5" />
                +44 20 1234 5678
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default Partnerships;