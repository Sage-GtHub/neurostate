import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Package, Truck, RefreshCcw, Shield } from "lucide-react";
import { LiveChat } from "@/components/LiveChat";

const Shipping = () => {
  const [chatOpen, setChatOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onAskAIClick={() => setChatOpen(true)} />
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
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                <Card className="p-6">
                  <Package className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">UK Delivery</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Standard: 2-3 working days</li>
                    <li>• Express: 1-2 working days</li>
                    <li>• Free on orders over £50</li>
                    <li>• Royal Mail & DPD delivery</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <Truck className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">International Delivery</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Europe: 5-7 working days</li>
                    <li>• USA/Canada: 7-10 working days</li>
                    <li>• Free on orders over £100</li>
                    <li>• Tracked & insured</li>
                  </ul>
                </Card>
              </div>

              <Card className="p-8 mb-16">
                <h2 className="text-2xl font-bold mb-6">Delivery Policy Details</h2>
                <div className="space-y-6 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Processing Time</h3>
                    <p>
                      All orders are processed within 1-2 working days. Orders placed at weekends 
                      or on bank holidays will be processed the next working day.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Tracking Information</h3>
                    <p>
                      Once your order's dispatched, you'll get a confirmation email with tracking details. 
                      You can check your parcel's status anytime using the tracking number we send you.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Delivery Delays</h3>
                    <p>
                      Whilst we aim for on-time delivery, delays can happen due to courier issues or 
                      bad weather. If your order's significantly delayed, just get in touch with our support team.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">International Customs</h3>
                    <p>
                      International customers are responsible for any customs duties or import taxes. 
                      These fees vary by country and aren't included in our delivery costs.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Returns Section */}
              <Card className="p-8 bg-muted/30">
                <div className="flex items-start gap-4 mb-6">
                  <RefreshCcw className="h-12 w-12 text-primary flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">30-Day Return Policy</h2>
                    <p className="text-muted-foreground">
                      Not satisfied? Return your purchase within 30 days for a full refund.
                    </p>
                  </div>
                </div>

                <div className="space-y-6 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Return Eligibility</h3>
                    <ul className="space-y-1">
                      <li>• Products must be unopened and in original packaging</li>
                      <li>• Returns must be started within 30 days of delivery</li>
                      <li>• Proof of purchase required</li>
                      <li>• Opened supplements can be returned if less than 50% used</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How to Return</h3>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li>Contact our support team with your order number</li>
                      <li>Receive your return authorisation and postage label</li>
                      <li>Pack items securely with original packaging</li>
                      <li>Post using the label we provide</li>
                      <li>Get your refund within 5-7 working days</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Return Postage Costs</h3>
                    <p>
                      UK returns are free using our prepaid label. International customers are responsible 
                      for return postage costs unless the return is due to our error.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Exchanges</h3>
                    <p>
                      Want a different product? Let us know during the return process and we'll help 
                      sort an exchange. Exchange delivery is free for UK customers.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Guarantee Section */}
              <Card className="p-8 mt-8 text-center">
                <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-3">Our Satisfaction Guarantee</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We stand behind the quality of our products. If you're not completely satisfied 
                  with your purchase, we'll make it right. Your wellness journey is our priority.
                </p>
              </Card>
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
                href="mailto:support@neurostate.fit"
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
  );
};

export default Shipping;
