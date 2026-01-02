import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { CheckCircle2 } from "lucide-react";

interface TierFeature {
  name: string;
  features: string[];
  price: number;
  commitment: string;
}

const tiers: TierFeature[] = [
  {
    name: "Boutique",
    price: 8,
    commitment: "Per room/month",
    features: [
      "Guest wellness portal",
      "Basic spa integration",
      "Email support"
    ]
  },
  {
    name: "Resort",
    price: 15,
    commitment: "Per room/month",
    features: [
      "Everything in Boutique",
      "Full PMS integration",
      "Guest wellness app",
      "Priority support"
    ]
  },
  {
    name: "Collection",
    price: 25,
    commitment: "Per room/month",
    features: [
      "Everything in Resort",
      "Multi-property dashboard",
      "White-label app",
      "Dedicated success manager",
      "Custom API access"
    ]
  }
];

export default function HospitalityPricing() {
  const [roomCount, setRoomCount] = useState([150]);
  const [selectedTier, setSelectedTier] = useState(1);
  const [isAnnual, setIsAnnual] = useState(false);

  const currentTier = tiers[selectedTier];
  const pricePerRoom = currentTier.price;
  
  const getVolumeDiscount = (count: number) => {
    if (count >= 500) return 0.30;
    if (count >= 300) return 0.25;
    if (count >= 200) return 0.20;
    if (count >= 100) return 0.15;
    if (count >= 50) return 0.10;
    return 0;
  };

  const volumeDiscount = getVolumeDiscount(roomCount[0]);
  const discountedPrice = pricePerRoom * (1 - volumeDiscount);
  const monthlyTotal = discountedPrice * roomCount[0];
  const annualTotal = monthlyTotal * 12 * 0.85;
  const annualSavings = monthlyTotal * 12 - annualTotal;

  return (
    <>
      <SEO 
        title="Hospitality Pricing Calculator | NeuroState"
        description="Property-focused pricing with resort bundles and volume discounts. Calculate your custom hospitality wellness programme pricing."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Hospitality Pricing
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto font-light">
                Transparent, scalable pricing for hospitality properties. Built for boutique hotels, resorts, and spa destinations.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">£85</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Revenue per Guest</div>
                <div className="text-sm text-mist">Additional spend</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">42%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Spa Utilisation</div>
                <div className="text-sm text-mist">Increased bookings</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">94%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Guest Satisfaction</div>
                <div className="text-sm text-mist">NPS score</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">67%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Return Guests</div>
                <div className="text-sm text-mist">Wellness bookings</div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20 bg-ivory">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column - Controls */}
              <div className="space-y-8">
                {/* Room Count Slider */}
                <div className="bg-pearl rounded-3xl p-10">
                  <div className="mb-8">
                    <label className="text-xs font-bold text-accent uppercase tracking-wider mb-3 block">
                      Number of Rooms
                    </label>
                    <div className="text-6xl font-bold text-carbon mb-2">{roomCount[0]}</div>
                  </div>
                  
                  <Slider
                    value={roomCount}
                    onValueChange={setRoomCount}
                    min={20}
                    max={1000}
                    step={10}
                    className="mb-6"
                  />
                  
                  <div className="flex justify-between text-sm text-stone font-medium">
                    <span>20</span>
                    <span>1,000+</span>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-gradient-to-br from-carbon to-slate rounded-3xl p-10 text-ivory">
                  <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-8">
                    Pricing Summary
                  </h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center pb-6 border-b border-ivory/20">
                      <span className="text-mist">Price per room</span>
                      <span className="text-3xl font-bold">£{discountedPrice.toFixed(2)}/mo</span>
                    </div>
                    
                    {volumeDiscount > 0 && (
                      <div className="flex justify-between items-center pb-6 border-b border-ivory/20">
                        <span className="text-mist">Property discount</span>
                        <span className="text-2xl font-bold text-accent">-{(volumeDiscount * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-mist">Monthly total</span>
                      <span className="text-4xl font-bold">£{monthlyTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  {/* Annual Toggle */}
                  <div className="bg-ivory/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-bold text-ivory mb-1">Annual Commitment</div>
                        <div className="text-sm text-mist">Save 15% with annual billing</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isAnnual}
                        onChange={(e) => setIsAnnual(e.target.checked)}
                        className="w-6 h-6"
                      />
                    </label>
                  </div>

                  {isAnnual && (
                    <div className="bg-accent/20 backdrop-blur-sm rounded-2xl p-6 mb-6 animate-fade-in">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-ivory">Annual total</span>
                        <span className="text-3xl font-bold text-ivory">£{annualTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="text-sm text-accent font-bold">
                        Save £{annualSavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} annually
                      </div>
                    </div>
                  )}

                  <Button size="lg" variant="secondary" className="w-full">
                    Request Custom Quote
                  </Button>
                </div>
              </div>

              {/* Right Column - Tier Selection */}
              <div>
                <h3 className="text-sm font-semibold text-stone uppercase tracking-wide mb-6">
                  Select Property Tier
                </h3>
                
                <div className="space-y-4">
                  {tiers.map((tier, index) => (
                    <button
                      key={tier.name}
                      onClick={() => setSelectedTier(index)}
                      className={`w-full text-left rounded-3xl p-8 transition-all ${
                        selectedTier === index
                          ? 'bg-accent text-ivory shadow-soft scale-[1.02]'
                          : 'bg-pearl hover:bg-ivory hover:shadow-soft'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h4 className={`text-2xl font-bold mb-2 ${selectedTier === index ? 'text-ivory' : 'text-carbon'}`}>
                            {tier.name}
                          </h4>
                          <div className={`text-sm ${selectedTier === index ? 'text-ivory/80' : 'text-stone'}`}>
                            {tier.commitment}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${selectedTier === index ? 'text-ivory' : 'text-carbon'}`}>
                            £{tier.price}
                          </div>
                          <div className={`text-sm ${selectedTier === index ? 'text-ivory/80' : 'text-stone'}`}>
                            /room/mo
                          </div>
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {tier.features.map((feature, i) => (
                          <li key={i} className={`flex items-start gap-3 text-sm ${selectedTier === index ? 'text-ivory/90' : 'text-stone'}`}>
                            <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${selectedTier === index ? 'text-ivory' : 'text-accent'}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                <div className="mt-8 bg-pearl rounded-3xl p-8">
                  <h4 className="font-bold text-carbon mb-6 text-lg">Property Benefits Include</h4>
                  <ul className="space-y-4 text-sm text-stone">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Guest wellness portal for all guests</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">20-35% margin on retail products</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Property wellness dashboard</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Spa integration & booking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Dedicated hospitality success manager</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-pearl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-large-display font-bold mb-6 text-carbon">
              Ready to Partner?
            </h2>
            <p className="text-body-large text-stone mb-8 max-w-2xl mx-auto">
              Schedule a demo with our partnerships team to discuss your property's needs.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>

            <div className="mt-12 pt-8 border-t border-mist">
              <div className="text-sm text-stone mb-4">Prefer to speak with us directly?</div>
              <div className="text-carbon font-medium">
                Email: <a href="mailto:partnerships@neurostate.co.uk" className="text-accent hover:underline">partnerships@neurostate.co.uk</a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}