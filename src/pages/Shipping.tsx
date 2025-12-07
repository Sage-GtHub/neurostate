import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Package, Truck, RefreshCcw, Shield, Clock, MapPin, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { LiveChat } from "@/components/LiveChat";
import { SEO } from "@/components/SEO";

const Shipping = () => {
  const [chatOpen, setChatOpen] = useState(false);
  
  return (
    <>
      <SEO 
        title="Delivery & Returns – Shipping Information | NeuroState"
        description="Fast UK delivery, international shipping, and 30-day money-back guarantee. Free standard delivery on orders over £50. Learn about our returns policy."
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Delivery & Returns
              </h1>
              <p className="text-lg text-muted-foreground">
                Fast, reliable delivery and hassle-free returns. Your satisfaction is our priority.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Quick Overview Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div className="text-center">
                  <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-1">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">1-2 working days</p>
                </div>
                <div className="text-center">
                  <Package className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-1">Free UK Delivery</h3>
                  <p className="text-sm text-muted-foreground">Orders over £50</p>
                </div>
                <div className="text-center">
                  <RefreshCcw className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-1">30-Day Returns</h3>
                  <p className="text-sm text-muted-foreground">Money-back guarantee</p>
                </div>
                <div className="text-center">
                  <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-1">Secure Packaging</h3>
                  <p className="text-sm text-muted-foreground">Safe & discreet</p>
                </div>
              </div>

              {/* Detailed Shipping Options */}
              <h2 className="text-3xl font-bold mb-6">Shipping Options</h2>
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">UK Delivery</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Delivered via Royal Mail and DPD with full tracking
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <div>
                        <p className="font-semibold">Standard Delivery</p>
                        <p className="text-sm text-muted-foreground">2-3 working days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">£4.95</p>
                        <p className="text-xs text-muted-foreground">Free over £50</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <div>
                        <p className="font-semibold">Express Delivery</p>
                        <p className="text-sm text-muted-foreground">1-2 working days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">£8.95</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Next Day Delivery</p>
                        <p className="text-sm text-muted-foreground">Order before 2pm</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">£12.95</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Truck className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">International Delivery</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Tracked & insured worldwide shipping
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <div>
                        <p className="font-semibold">Europe</p>
                        <p className="text-sm text-muted-foreground">5-7 working days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">£9.95</p>
                        <p className="text-xs text-muted-foreground">Free over £100</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <div>
                        <p className="font-semibold">USA & Canada</p>
                        <p className="text-sm text-muted-foreground">7-10 working days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">£14.95</p>
                        <p className="text-xs text-muted-foreground">Free over £150</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Rest of World</p>
                        <p className="text-sm text-muted-foreground">10-14 working days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">£19.95</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping FAQ */}
              <div className="mb-12 pb-12 border-b">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="processing">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>How long does order processing take?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      All orders are processed within 1-2 working days (Monday to Friday, excluding bank holidays). Orders placed after 2pm on Friday will be processed the following Monday. You'll receive an email confirmation once your order has been dispatched with tracking information.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tracking">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        <span>How do I track my order?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Once dispatched, you'll receive a tracking number via email. You can use this to monitor your parcel's journey on the courier's website. You can also track your order through your account on our website under "Order History."
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="customs">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>What about customs fees for international orders?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      International customers are responsible for any customs duties, import taxes, or handling fees imposed by their country. These vary by location and are not included in our shipping costs. We recommend checking your country's customs regulations before ordering.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="subscription">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <RefreshCcw className="h-5 w-5 text-primary" />
                        <span>How does shipping work for subscriptions?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Subscribe & Save orders ship automatically on your chosen frequency (every 30, 60, or 90 days). Shipping is always free on subscription orders over £40. You'll receive an email notification before each shipment, and you can pause, skip, or cancel anytime through your account.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="delays">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-primary" />
                        <span>What if my delivery is delayed?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      While rare, delays can occur due to courier issues, extreme weather, or high demand periods. If your order hasn't arrived within the estimated timeframe, first check the tracking information. If there's still an issue, contact our support team at contact@neurostate.co.uk and we'll investigate immediately.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="packaging">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <span>How are products packaged?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      All orders are carefully packed in secure, recyclable packaging to ensure products arrive in perfect condition. Temperature-sensitive items (if applicable) are shipped with appropriate cooling packs. Packaging is discreet with no external branding indicating contents.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Returns & Refunds Section */}
              <h2 className="text-3xl font-bold mb-6">Returns & Refunds</h2>
              <div className="p-8 bg-gradient-to-br from-primary/5 to-transparent border-l-4 border-primary mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <RefreshCcw className="h-12 w-12 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">30-Day Money-Back Guarantee</h3>
                    <p className="text-muted-foreground">
                      Not satisfied? Return your purchase within 30 days for a full refund - no questions asked.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Easy Process</p>
                      <p className="text-xs text-muted-foreground">Simple online returns</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Free UK Returns</p>
                      <p className="text-xs text-muted-foreground">Prepaid label included</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Fast Refunds</p>
                      <p className="text-xs text-muted-foreground">5-7 working days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Process */}
              <div className="mb-8 pb-8 border-b">
                <h3 className="text-xl font-bold mb-6">How to Return an Item</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">1</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Contact Us</h4>
                      <p className="text-sm text-muted-foreground">
                        Email contact@neurostate.co.uk with your order number and reason for return. We'll respond within 24 hours with a return authorization (RA) number.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">2</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Pack Your Items</h4>
                      <p className="text-sm text-muted-foreground">
                        Securely pack the items in their original packaging with all accessories, manuals, and documentation. Include your RA number in the package.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">3</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Ship Your Return</h4>
                      <p className="text-sm text-muted-foreground">
                        Use the prepaid return label we email you (UK only). International customers should use a tracked service and keep proof of postage.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">4</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Receive Your Refund</h4>
                      <p className="text-sm text-muted-foreground">
                        Once we receive and inspect your return, we'll process your refund within 5-7 working days to your original payment method.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Returns FAQ */}
              <div className="mb-8 pb-8 border-b">
                <h3 className="text-xl font-bold mb-6">Return Policy Details</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="eligible">
                    <AccordionTrigger className="text-left">What items are eligible for return?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-2">
                      <p><strong>✓ Eligible for Return:</strong></p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Unopened supplements in original sealed packaging</li>
                        <li>Opened supplements if less than 50% used (satisfaction guarantee)</li>
                        <li>Unopened devices in original packaging with all accessories</li>
                        <li>Faulty or damaged items regardless of condition</li>
                      </ul>
                      <p className="mt-3"><strong>✗ Not Eligible for Return:</strong></p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Supplements more than 50% used</li>
                        <li>Items without original packaging or missing components</li>
                        <li>Products clearly used beyond trial purposes</li>
                        <li>Gift cards or digital products</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cost">
                    <AccordionTrigger className="text-left">Who pays for return shipping?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-2"><strong>UK Returns:</strong> Free! We provide a prepaid Royal Mail return label.</p>
                      <p className="mb-2"><strong>International Returns:</strong> Customer pays return shipping unless the return is due to our error (wrong item sent, faulty product, etc.).</p>
                      <p><strong>Faulty/Damaged Items:</strong> We cover all return costs worldwide and will arrange collection if needed.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="refund">
                    <AccordionTrigger className="text-left">When will I receive my refund?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Refunds are processed within 5-7 working days of receiving your return. The refund will go back to your original payment method. Please allow an additional 3-5 business days for your bank to process the refund. You'll receive an email confirmation once the refund has been issued.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="exchange">
                    <AccordionTrigger className="text-left">Can I exchange an item instead of returning it?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes! Mention in your return request that you'd like an exchange. We'll send the replacement item as soon as we receive your return (UK customers get free exchange shipping). For faster service, you can also order the new item separately and return the unwanted one.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="damaged">
                    <AccordionTrigger className="text-left">What if my item arrives damaged or faulty?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      We're sorry to hear that! Please contact us immediately at contact@neurostate.co.uk with photos of the damage. We'll either send a replacement right away or arrange a full refund - whichever you prefer. You won't need to return the damaged item unless requested. We take full responsibility for items damaged in transit.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="subscription-returns">
                    <AccordionTrigger className="text-left">Can I return subscription orders?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes! Subscription orders follow the same 30-day return policy as one-time purchases. If you're not satisfied with a subscription delivery, you can return it for a full refund. You can also pause, skip, or cancel your subscription at any time through your account with no penalties.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="partial">
                    <AccordionTrigger className="text-left">Can I return part of my order?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Absolutely! You can return individual items from a multi-item order. Just specify which items you're returning in your return request. You'll be refunded for the returned items only. If the return brings your order total below the free shipping threshold, a shipping fee may be deducted from your refund.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Satisfaction Guarantee */}
              <div className="p-8 text-center">
                <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-3">Our Satisfaction Guarantee</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  We stand behind the quality of every product we sell. If you're not completely satisfied with your purchase, we'll make it right. Your wellness journey is our priority, and we want you to feel confident in every order.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">Hassle-Free Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">Full Refunds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Questions about your order?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our support team is here to help with any delivery or return enquiries.
              </p>
              <a
                href="mailto:contact@neurostate.co.uk"
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      </div>
    </>
  );
};

export default Shipping;
