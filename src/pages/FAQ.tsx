import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
import { FAQStructuredData } from "@/components/StructuredData";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqCategories = [
    {
      category: "Orders & Delivery",
      questions: [
        { q: "How long does delivery take?", a: "UK orders usually arrive within 2-3 working days. International delivery times vary depending on where you are, but typically take 5-10 working days." },
        { q: "Do you offer free delivery?", a: "Yes! Free standard delivery on all UK orders over £50. International orders get free delivery over £100." },
        { q: "Can I track my order?", a: "Of course. Once your order's dispatched, you'll get a tracking number via email so you can keep an eye on it." },
      ],
    },
    {
      category: "Products & Usage",
      questions: [
        { q: "How do I know which products are right for me?", a: "Take our Product Quiz on the homepage. It will give you personalised recommendations based on your wellness goals." },
        { q: "Are your products third-party tested?", a: "Yes, everything goes through rigorous third-party testing for purity, potency, and safety." },
        { q: "How long until I see results?", a: "It varies depending on the product and the person. Most customers notice improvements within 2-4 weeks of consistent use." },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        { q: "What is your return policy?", a: "We've got a 30-day money-back guarantee. If you're not happy with your purchase, return it within 30 days for a full refund." },
        { q: "How do I start a return?", a: "Get in touch with our support team with your order number and reason for return. We'll send you a return postage label and instructions." },
      ],
    },
    {
      category: "Account & Subscription",
      questions: [
        { q: "How do subscriptions work?", a: "Subscribe to your favourite products and save 15%. Pick your delivery frequency and change or cancel anytime." },
        { q: "Can I pause my subscription?", a: "Yes, you can pause, change, or cancel your subscription anytime from your account dashboard. No penalties." },
      ],
    },
  ];

  const allFaqs = faqCategories.flatMap(cat => cat.questions.map(q => ({ question: q.q, answer: q.a })));

  return (
    <>
      <SEO title="Frequently Asked Questions | NeuroState Support" description="Find answers to common questions about NeuroState cognitive performance products, delivery, returns, subscriptions, and account management." keywords="NeuroState FAQ, cognitive supplements questions, delivery information, return policy, subscription help, customer support" />
      <FAQStructuredData faqs={allFaqs} />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="max-w-3xl">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Support</span>
                <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-medium text-foreground mt-4 tracking-tight leading-[1.08]">
                  Frequently asked{" "}
                  <span className="text-muted-foreground">questions</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mt-6 leading-relaxed">
                  Common questions about our products and policies.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* FAQ Content */}
          <section className="pb-16 md:pb-28 px-5 md:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
              {faqCategories.map((category) => (
                <ScrollReveal key={category.category}>
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">{category.category}</span>
                  <Accordion type="single" collapsible className="w-full mt-4">
                    {category.questions.map((item, idx) => (
                      <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border/30 py-1">
                        <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:text-foreground hover:no-underline py-4">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 md:py-32 px-5 md:px-8 bg-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Still have questions?</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-background leading-[1.1]">
                  Our team typically responds within 24 hours.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <a href="mailto:contact@neurostate.co.uk">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                      Email support
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                  <Link to="/contact">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium rounded-full bg-transparent border border-background/30 text-background hover:bg-background/10">
                      Book a demo
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FAQ;
