import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Clock, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
  subject: z.string().trim().min(1, { message: "Subject is required" }).max(200),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hero = useScrollAnimation();
  const form = useScrollAnimation();

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
    { icon: Mail, title: "Email", content: "contact@neurostate.co.uk", link: "mailto:contact@neurostate.co.uk" },
    { icon: Clock, title: "Hours", content: "Mon - Fri: 9am - 6pm GMT", link: null },
    { icon: MapPin, title: "Location", content: "London, UK", link: null },
  ];

  return (
    <>
      <SEO title="Contact Us | Neurostate" description="Questions about our cognitive performance system? Get in touch with our team." />
      <Header />
      <div className="min-h-screen bg-background mobile-nav-padding relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <section ref={hero.ref} className={`relative pt-32 md:pt-44 pb-16 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">Contact</p>
            <h1 className="text-4xl md:text-5xl font-light text-foreground">Get in touch</h1>
            <p className="text-sm text-foreground/50">Questions? We're here to help.</p>
          </div>
        </section>

        <section ref={form.ref} className={`py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${form.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-16">
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs text-foreground/60">Name</Label>
                      <Input id="name" placeholder="Your name" {...register("name")} className={`rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-sm ${errors.name ? "border-destructive" : ""}`} />
                      {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs text-foreground/60">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" {...register("email")} className={`rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-sm ${errors.email ? "border-destructive" : ""}`} />
                      {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-xs text-foreground/60">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" {...register("subject")} className={`rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-sm ${errors.subject ? "border-destructive" : ""}`} />
                    {errors.subject && <p className="text-[10px] text-destructive">{errors.subject.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs text-foreground/60">Message</Label>
                    <Textarea id="message" placeholder="Tell us more..." rows={5} {...register("message")} className={`rounded-xl bg-foreground/[0.02] border-foreground/10 text-sm ${errors.message ? "border-destructive" : ""}`} />
                    {errors.message && <p className="text-[10px] text-destructive">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" size="sm" disabled={isSubmitting} className="rounded-full h-10 px-6 text-xs bg-foreground text-background hover:bg-foreground/90">
                    <Send className="h-3.5 w-3.5 mr-2" />
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                </form>
              </div>

              <div className="lg:col-span-2 space-y-4">
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
                  <p className="text-[10px] text-foreground/30 mb-3">Quick links</p>
                  <div className="flex gap-3">
                    {[{ name: "FAQ", href: "/faq" }, { name: "Shipping", href: "/shipping" }].map((link) => (
                      <Link key={link.name} to={link.href} className="px-3 py-1.5 rounded-full bg-foreground/[0.03] text-[10px] text-foreground/50 hover:bg-foreground/[0.06] hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
