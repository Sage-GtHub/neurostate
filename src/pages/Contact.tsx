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

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
  subject: z.string().trim().min(1, { message: "Subject is required" }).max(200),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) throw error;

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });
      reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to send message", {
        description: "Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, title: "Email", content: "contact@neurostate.co.uk", link: "mailto:contact@neurostate.co.uk" },
    { icon: Clock, title: "Business Hours", content: "Monday - Friday: 9am - 6pm GMT", link: null },
    { icon: MapPin, title: "Location", content: "London, United Kingdom", link: null },
  ];

  return (
    <>
      <SEO 
        title="Contact Us | Neurostate"
        description="Questions about our cognitive performance system? Get in touch with our team."
      />
      <Header />
      <div className="min-h-screen bg-background mobile-nav-padding">
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 lg:px-20 xl:px-32 border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium mb-4">Contact</p>
            <h1 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight mb-4">
              Get in touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Questions? We're here to help.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-16">
              {/* Form */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        {...register("name")}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      {...register("subject")}
                      className={errors.subject ? "border-destructive" : ""}
                    />
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more..."
                      rows={6}
                      {...register("message")}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="p-6 bg-muted/30 border border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm mb-1">{info.title}</p>
                        {info.link ? (
                          <a href={info.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{info.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-6 bg-muted/30 border border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Response time:</strong> We typically respond within 24 hours.
                  </p>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">Quick links:</p>
                  <div className="space-y-2">
                    {[
                      { name: "FAQ", href: "/faq" },
                      { name: "Shipping", href: "/shipping" },
                    ].map((link) => (
                      <Link key={link.name} to={link.href} className="block text-sm text-foreground hover:text-primary transition-colors">
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
