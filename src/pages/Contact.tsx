import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Clock, MapPin, Send, Calendar, Building2, Users, Briefcase } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Please enter a valid work email" }).max(255),
  company: z.string().trim().min(1, { message: "Company name is required" }).max(200),
  jobTitle: z.string().trim().min(1, { message: "Job title is required" }).max(100),
  teamSize: z.string().trim().min(1, { message: "Please select team size" }),
  inquiryType: z.string().trim().min(1, { message: "Please select inquiry type" }),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'message'>('schedule');
  const hero = useScrollAnimation();
  const form = useScrollAnimation();

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', { body: data });
      if (error) throw error;
      toast.success("Message sent successfully!", { description: "We'll get back to you as soon as possible." });
      reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to send message", { description: "Please try again or email us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, title: "Sales", content: "sales@neurostate.co.uk", link: "mailto:sales@neurostate.co.uk" },
    { icon: Clock, title: "Response Time", content: "Within 24 business hours", link: null },
    { icon: MapPin, title: "Headquarters", content: "London, United Kingdom", link: null },
  ];

  const teamSizeOptions = [
    "1-50 employees",
    "51-200 employees",
    "201-1,000 employees",
    "1,001-5,000 employees",
    "5,000+ employees",
  ];

  const inquiryTypeOptions = [
    "Request a Demo",
    "Pricing & Plans",
    "Enterprise Partnership",
    "Technical Integration",
    "Pilot Programme",
  ];

  return (
    <>
      <SEO title="Request a Demo | Enterprise Sales | NeuroState" description="Schedule a personalised demo with our enterprise team. Learn how NeuroState's AI-powered cognitive analytics platform drives measurable workforce performance outcomes." keywords="enterprise demo, B2B sales, cognitive analytics demo, workforce performance platform, enterprise software demo" />
      <Header />
      <div className="min-h-screen bg-background mobile-nav-padding relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <section ref={hero.ref} className={`relative pt-32 md:pt-44 pb-16 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">Enterprise Sales</p>
            <h1 className="text-4xl md:text-5xl font-light text-foreground">Let's talk</h1>
            <p className="text-sm text-foreground/50 max-w-lg mx-auto">Schedule a personalised demo to see how NeuroState can drive measurable performance outcomes for your organisation.</p>
          </div>
        </section>

        <section ref={form.ref} className={`py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${form.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            {/* Tab Switcher */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex p-1 rounded-full bg-foreground/[0.03] border border-foreground/5">
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`px-6 py-2.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'schedule'
                      ? 'bg-foreground text-background'
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Schedule a Demo
                </button>
                <button
                  onClick={() => setActiveTab('message')}
                  className={`px-6 py-2.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'message'
                      ? 'bg-foreground text-background'
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Send a Message
                </button>
              </div>
            </div>

            {/* Calendly Embed */}
            {activeTab === 'schedule' && (
              <div className="max-w-5xl mx-auto">
                <div 
                  className="calendly-inline-widget rounded-2xl overflow-hidden border border-foreground/10 shadow-lg shadow-foreground/5" 
                  data-url="https://calendly.com/neurostate/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1a1a&primary_color=1a1a1a"
                  style={{ minWidth: '320px', height: '800px' }}
                />
              </div>
            )}

            {/* Sales Inquiry Form */}
            {activeTab === 'message' && (
              <div className="grid lg:grid-cols-5 gap-16">
                <div className="lg:col-span-3">
                  <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">Sales Inquiry</h2>
                    <p className="text-xs text-foreground/50">Complete the form below and our enterprise team will be in touch within 24 hours.</p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs text-foreground/60">Full Name</Label>
                        <Input id="name" placeholder="Your full name" {...register("name")} className={`rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-sm ${errors.name ? "border-destructive" : ""}`} />
                        {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs text-foreground/60">Work Email</Label>
                        <Input id="email" type="email" placeholder="you@company.com" {...register("email")} className={`rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-sm ${errors.email ? "border-destructive" : ""}`} />
                        {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-xs text-foreground/60">Company</Label>
                        <Input id="company" placeholder="Company name" {...register("company")} className={`rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-sm ${errors.company ? "border-destructive" : ""}`} />
                        {errors.company && <p className="text-[10px] text-destructive">{errors.company.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle" className="text-xs text-foreground/60">Job Title</Label>
                        <Input id="jobTitle" placeholder="Your role" {...register("jobTitle")} className={`rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-sm ${errors.jobTitle ? "border-destructive" : ""}`} />
                        {errors.jobTitle && <p className="text-[10px] text-destructive">{errors.jobTitle.message}</p>}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-xs text-foreground/60">Team Size</Label>
                        <Select onValueChange={(value) => {
                          const event = { target: { name: 'teamSize', value } };
                          register("teamSize").onChange(event);
                        }}>
                          <SelectTrigger className={`rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-sm ${errors.teamSize ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamSizeOptions.map((size) => (
                              <SelectItem key={size} value={size}>{size}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.teamSize && <p className="text-[10px] text-destructive">{errors.teamSize.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-foreground/60">Inquiry Type</Label>
                        <Select onValueChange={(value) => {
                          const event = { target: { name: 'inquiryType', value } };
                          register("inquiryType").onChange(event);
                        }}>
                          <SelectTrigger className={`rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-sm ${errors.inquiryType ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="What brings you here?" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypeOptions.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.inquiryType && <p className="text-[10px] text-destructive">{errors.inquiryType.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs text-foreground/60">How can we help?</Label>
                      <Textarea id="message" placeholder="Tell us about your organisation's performance goals and challenges..." rows={4} {...register("message")} className={`rounded-xl bg-foreground/[0.02] border-foreground/10 text-sm ${errors.message ? "border-destructive" : ""}`} />
                      {errors.message && <p className="text-[10px] text-destructive">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" size="sm" disabled={isSubmitting} className="rounded-full h-10 px-6 text-xs bg-foreground text-background hover:bg-foreground/90">
                      <Send className="h-3.5 w-3.5 mr-2" />
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
                    <h3 className="text-sm font-medium mb-4">Why NeuroState?</h3>
                    <ul className="space-y-3">
                      {[
                        "40+ wearable integrations",
                        "AI-powered predictive analytics",
                        "Enterprise-grade security & compliance",
                        "Dedicated customer success team",
                        "Flexible deployment options",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-foreground/60">
                          <div className="w-1 h-1 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {contactInfo.map((info, index) => (
                    <div key={index} className="p-5 rounded-2xl bg-foreground/[0.02]">
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-1">{info.title}</p>
                          {info.link ? (
                            <a href={info.link} className="text-xs text-foreground/50 hover:text-foreground transition-colors">{info.content}</a>
                          ) : (
                            <p className="text-xs text-foreground/50">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <p className="text-[10px] text-foreground/30 mb-3">Resources</p>
                    <div className="flex flex-wrap gap-2">
                      {[{ name: "Case Studies", href: "/enterprise/case-studies" }, { name: "Industries", href: "/industries" }, { name: "FAQ", href: "/faq" }].map((link) => (
                        <Link key={link.name} to={link.href} className="px-3 py-1.5 rounded-full bg-foreground/[0.03] text-[10px] text-foreground/50 hover:bg-foreground/[0.06] hover:text-foreground transition-colors">
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
