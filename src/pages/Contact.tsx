import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Clock, MapPin, Send, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string().trim().min(1, { message: "Subject is required" }).max(200, { message: "Subject must be less than 200 characters" }),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(2000, { message: "Message must be less than 2000 characters" }),
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
      const { data: responseData, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      });

      if (error) throw error;

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });
      reset();
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message", {
        description: "Please try again or email us directly at contact@neurostate.co.uk",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contact@neurostate.co.uk",
      link: "mailto:contact@neurostate.co.uk",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Friday: 9am - 6pm GMT",
      link: null,
    },
    {
      icon: MapPin,
      title: "Location",
      content: "London, United Kingdom",
      link: null,
    },
  ];

  const faqs = [
    { question: "Order & Delivery", link: "/shipping" },
    { question: "Returns & Refunds", link: "/shipping#returns" },
    { question: "Product Information", link: "/faq" },
    { question: "Account & Subscriptions", link: "/faq" },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
          <div className="container mx-auto px-4 py-16 lg:py-20">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground">
                Have a question? We're here to help. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            {...register("name")}
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            {...register("email")}
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">
                          Subject <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          {...register("subject")}
                          className={errors.subject ? "border-destructive" : ""}
                        />
                        {errors.subject && (
                          <p className="text-sm text-destructive">{errors.subject.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your enquiry..."
                          rows={6}
                          {...register("message")}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive">{errors.message.message}</p>
                        )}
                      </div>

                      <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                        <Send className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Contact Details */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <Card key={index}>
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm mb-1">{info.title}</p>
                              {info.link ? (
                                <a
                                  href={info.link}
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {info.content}
                                </a>
                              ) : (
                                <p className="text-sm text-muted-foreground">{info.content}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Quick Links to FAQs */}
                <Card>
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Quick Help</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Find answers to common questions:
                    </p>
                    <div className="space-y-2">
                      {faqs.map((faq, index) => (
                        <Link key={index} to={faq.link}>
                          <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                            {faq.question}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Response Time */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Average response time:</strong> We typically respond within 24 hours during business days.
                    </p>
                  </CardContent>
                </Card>
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
