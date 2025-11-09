import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const FAQ = () => {
  const faqCategories = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          q: "How long does shipping take?",
          a: "UK orders typically arrive within 2-3 business days. International shipping times vary by location but generally take 5-10 business days.",
        },
        {
          q: "Do you offer free shipping?",
          a: "Yes! We offer free standard shipping on all UK orders over £50. International orders qualify for free shipping over £100.",
        },
        {
          q: "Can I track my order?",
          a: "Absolutely. Once your order ships, you'll receive a tracking number via email. You can use this to monitor your delivery status.",
        },
        {
          q: "What if my order arrives damaged?",
          a: "We're sorry if this happens! Please contact our support team within 48 hours with photos of the damage, and we'll send a replacement immediately.",
        },
      ],
    },
    {
      category: "Products & Usage",
      questions: [
        {
          q: "How do I know which products are right for me?",
          a: "Take our Product Quiz on the homepage to get personalized recommendations based on your wellness goals and lifestyle.",
        },
        {
          q: "Are your products third-party tested?",
          a: "Yes, all our products undergo rigorous third-party testing for purity, potency, and safety. We're committed to transparency and quality.",
        },
        {
          q: "Can I take multiple products together?",
          a: "Most of our products are designed to work synergistically. Check individual product pages for specific stacking recommendations, or contact our support team.",
        },
        {
          q: "How long until I see results?",
          a: "Results vary by product and individual. Most customers notice improvements within 2-4 weeks of consistent use. For best results, follow the recommended dosage.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, return it within 30 days for a full refund.",
        },
        {
          q: "How do I initiate a return?",
          a: "Contact our support team with your order number and reason for return. We'll provide a return shipping label and instructions.",
        },
        {
          q: "When will I receive my refund?",
          a: "Refunds are processed within 5-7 business days of receiving your return. You'll receive an email confirmation once processed.",
        },
        {
          q: "Can I exchange a product?",
          a: "Yes! If you'd like to exchange for a different product, let us know during the return process and we'll help facilitate the exchange.",
        },
      ],
    },
    {
      category: "Ambassador Program",
      questions: [
        {
          q: "How does the Ambassador Program work?",
          a: "Our ambassadors receive exclusive discounts, early access to new products, and earn commission on referral sales. Visit our Ambassador page to learn more and apply.",
        },
        {
          q: "What are the benefits of being an ambassador?",
          a: "Ambassadors enjoy 25% off all products, exclusive content access, commission on sales, and the opportunity to be featured on our platform.",
        },
        {
          q: "How do I apply to become an ambassador?",
          a: "Visit our Ambassador Program page and fill out the application. We look for passionate individuals who align with our wellness mission.",
        },
      ],
    },
    {
      category: "Account & Subscription",
      questions: [
        {
          q: "How do subscriptions work?",
          a: "Subscribe to your favorite products and save 15%. Choose your delivery frequency (monthly, bi-monthly, quarterly) and modify or cancel anytime.",
        },
        {
          q: "Can I pause my subscription?",
          a: "Yes, you can pause, modify, or cancel your subscription anytime from your account dashboard with no penalties.",
        },
        {
          q: "How do I update my account information?",
          a: "Log into your account and navigate to the settings section to update your email, password, shipping address, and payment methods.",
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
                Find answers to common questions about our products, shipping, returns, and more.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {faqCategories.map((category) => (
                <Card key={category.category} className="p-6">
                  <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, idx) => (
                      <AccordionItem key={idx} value={`item-${idx}`}>
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our support team is here to help. Get in touch and we'll respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@example.com"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Email Support
                </a>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
