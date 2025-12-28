import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
import { FAQStructuredData } from "@/components/StructuredData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

const FAQ = () => {
  const hero = useScrollAnimation();
  const content = useScrollAnimation();

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
        { q: "How do I know which products are right for me?", a: "Take our Product Quiz on the homepage—it'll give you personalised recommendations based on your wellness goals." },
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
        { q: "Can I pause my subscription?", a: "Yes, you can pause, change, or cancel your subscription anytime from your account dashboard—no penalties." },
      ],
    },
  ];

  const allFaqs = faqCategories.flatMap(cat => cat.questions.map(q => ({ question: q.q, answer: q.a })));

  return (
    <>
      <SEO title="FAQ | Neurostate" description="Common questions about Neurostate cognitive performance supplements, devices, delivery, and returns." />
      <FAQStructuredData faqs={allFaqs} />
      <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>
        
        <Header />
        
        <main className="flex-1 relative">
          <section ref={hero.ref} className={`pt-32 md:pt-44 pb-16 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">Support</p>
              <h1 className="text-4xl md:text-5xl font-light text-foreground">Frequently asked questions</h1>
              <p className="text-sm text-foreground/50">Common questions about our products and policies.</p>
            </div>
          </section>

          <section ref={content.ref} className={`py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${content.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-3xl mx-auto space-y-12">
              {faqCategories.map((category) => (
                <div key={category.category}>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-4">{category.category}</p>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {category.questions.map((item, idx) => (
                      <AccordionItem key={idx} value={`item-${idx}`} className="border-0 rounded-2xl bg-foreground/[0.02] px-5 data-[state=open]:bg-foreground/[0.04]">
                        <AccordionTrigger className="text-left text-xs font-medium text-foreground hover:text-foreground hover:no-underline py-4">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-xs text-foreground/50 pb-4">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="max-w-xl mx-auto text-center">
              <div className="glass-subtle rounded-3xl p-10 space-y-6">
                <h2 className="text-xl font-light text-foreground">Still have questions?</h2>
                <p className="text-xs text-foreground/50">Our support team typically responds within 24 hours.</p>
                <a href="mailto:contact@neurostate.co.uk">
                  <Button size="sm" className="rounded-full h-10 px-6 text-xs bg-foreground text-background hover:bg-foreground/90">
                    Email support <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FAQ;
