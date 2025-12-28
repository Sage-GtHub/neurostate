import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
import { FAQStructuredData } from "@/components/StructuredData";

const FAQ = () => {
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
      ],
    },
    {
      category: "Products & Usage",
      questions: [
        {
          q: "How do I know which products are right for me?",
          a: "Take our Product Quiz on the homepage—it'll give you personalised recommendations based on your wellness goals.",
        },
        {
          q: "Are your products third-party tested?",
          a: "Yes, everything goes through rigorous third-party testing for purity, potency, and safety.",
        },
        {
          q: "How long until I see results?",
          a: "It varies depending on the product and the person. Most customers notice improvements within 2-4 weeks of consistent use.",
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
      ],
    },
    {
      category: "Account & Subscription",
      questions: [
        {
          q: "How do subscriptions work?",
          a: "Subscribe to your favourite products and save 15%. Pick your delivery frequency and change or cancel anytime.",
        },
        {
          q: "Can I pause my subscription?",
          a: "Yes, you can pause, change, or cancel your subscription anytime from your account dashboard—no penalties.",
        },
      ],
    },
  ];

  const allFaqs = faqCategories.flatMap(cat => 
    cat.questions.map(q => ({ question: q.q, answer: q.a }))
  );

  return (
    <>
      <SEO 
        title="FAQ | Neurostate"
        description="Common questions about Neurostate cognitive performance supplements, devices, delivery, and returns."
      />
      <FAQStructuredData faqs={allFaqs} />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 lg:px-20 xl:px-32 border-b border-border">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium mb-4">Support</p>
              <h1 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight mb-4">
                Frequently asked questions
              </h1>
              <p className="text-lg text-muted-foreground">
                Common questions about our products, delivery, and policies.
              </p>
            </div>
          </section>

          {/* FAQ Content */}
          <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="max-w-3xl mx-auto space-y-12">
              {faqCategories.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">
                      {category.category}
                    </h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, idx) => (
                      <AccordionItem key={idx} value={`item-${idx}`} className="border-border">
                        <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors hover:no-underline py-4">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pb-4">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 bg-muted/30 border-t border-border">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our support team typically responds within 24 hours.
              </p>
              <a href="mailto:contact@neurostate.co.uk">
                <Button size="lg">
                  Email support
                </Button>
              </a>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FAQ;
