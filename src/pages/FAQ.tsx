import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LiveChat } from "@/components/LiveChat";

const FAQ = () => {
  const [chatOpen, setChatOpen] = useState(false);
  
  const faqCategories = [
    {
      category: "Orders & Delivery",
      questions: [
        {
          q: "How long does delivery take?",
          a: "UK orders usually arrive within 2-3 working days. International delivery times vary depending on where you are, but typically take 5-10 working days.",
        },
        {
          q: "Do you offer free delivery?",
          a: "Yes! Free standard delivery on all UK orders over £50. International orders get free delivery over £100.",
        },
        {
          q: "Can I track my order?",
          a: "Of course. Once your order's dispatched, you'll get a tracking number via email so you can keep an eye on it.",
        },
        {
          q: "What if my order arrives damaged?",
          a: "Really sorry if that happens! Just get in touch with our support team within 48 hours with photos of the damage, and we'll send a replacement straight away.",
        },
      ],
    },
    {
      category: "Products & Usage",
      questions: [
        {
          q: "How do I know which products are right for me?",
          a: "Take our Product Quiz on the homepage—it'll give you personalised recommendations based on your wellness goals and lifestyle.",
        },
        {
          q: "Are your products third-party tested?",
          a: "Yes, everything goes through rigorous third-party testing for purity, potency, and safety. Transparency and quality are non-negotiable for us.",
        },
        {
          q: "Can I take multiple products together?",
          a: "Most of our products are designed to work well together. Check individual product pages for specific combinations, or drop our support team a message.",
        },
        {
          q: "How long until I see results?",
          a: "It varies depending on the product and the person. Most customers notice improvements within 2-4 weeks of consistent use. Stick to the recommended dose for best results.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "We've got a 30-day money-back guarantee. If you're not happy with your purchase, return it within 30 days for a full refund.",
        },
        {
          q: "How do I start a return?",
          a: "Get in touch with our support team with your order number and reason for return. We'll send you a return postage label and instructions.",
        },
        {
          q: "When will I get my refund?",
          a: "Refunds are processed within 5-7 working days of us receiving your return. You'll get an email confirmation once it's sorted.",
        },
        {
          q: "Can I exchange a product?",
          a: "Yes! If you'd like to swap for something else, just let us know during the return process and we'll sort the exchange.",
        },
      ],
    },
    {
      category: "Ambassador Program",
      questions: [
        {
          q: "How does the Ambassador Programme work?",
          a: "Our ambassadors get exclusive discounts, early access to new products, and earn commission on referral sales. Head to our Ambassador page to learn more and apply.",
        },
        {
          q: "What are the benefits of being an ambassador?",
          a: "Ambassadors enjoy 25% off all products, access to exclusive content, commission on sales, and the chance to be featured on our platform.",
        },
        {
          q: "How do I apply to become an ambassador?",
          a: "Visit our Ambassador Programme page and fill out the application. We're looking for passionate people who align with our wellness mission.",
        },
      ],
    },
    {
      category: "Account & Subscription",
      questions: [
        {
          q: "How do subscriptions work?",
          a: "Subscribe to your favourite products and save 15%. Pick your delivery frequency (monthly, bi-monthly, quarterly) and change or cancel anytime.",
        },
        {
          q: "Can I pause my subscription?",
          a: "Yes, you can pause, change, or cancel your subscription anytime from your account dashboard—no penalties.",
        },
        {
          q: "How do I update my account details?",
          a: "Log into your account and head to the settings section to update your email, password, delivery address, and payment methods.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our products, delivery, returns, and more.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {faqCategories.map((category) => (
                <div key={category.category} className="py-8">
                  <h2 className="text-2xl font-semibold mb-6">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, idx) => (
                      <AccordionItem key={idx} value={`item-${idx}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground font-light">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Still got questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our support team is here to help. Get in touch and we'll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:contact@neurostate.co.uk"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Email Support
                </a>
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

export default FAQ;
