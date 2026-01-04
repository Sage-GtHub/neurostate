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
    name: "Essentials",
    price: 28,
    commitment: "Monthly",
    features: [
      "Member wellness portal",
      "Basic product discounts",
      "Email support"
    ]
  },
  {
    name: "Premium",
    price: 52,
    commitment: "Monthly",
    features: [
      "Everything in Essentials",
      "Branded member portal",
      "Class booking integration",
      "Priority support"
    ]
  },
  {
    name: "Signature",
    price: 85,
    commitment: "Custom",
    features: [
      "Everything in Premium",
      "White-label portal",
      "Retail POS integration",
      "Dedicated account manager",
      "Custom member challenges"
    ]
  }
];

export default function HealthClubsPricing() {
  const [memberCount, setMemberCount] = useState([150]);
  const [selectedTier, setSelectedTier] = useState(1); // Premium by default
  const [isAnnual, setIsAnnual] = useState(false);

  const currentTier = tiers[selectedTier];
  const pricePerMember = currentTier.price;
  
  // Calculate volume discount
  const getVolumeDiscount = (count: number) => {
    if (count >= 1000) return 0.30; // 30% off for large facilities
    if (count >= 500) return 0.25;  // 25% off
    if (count >= 250) return 0.20;  // 20% off
    if (count >= 100) return 0.15;  // 15% off
    if (count >= 50) return 0.10;   // 10% off
    return 0;
  };

  const volumeDiscount = getVolumeDiscount(memberCount[0]);
  const discountedPrice = pricePerMember * (1 - volumeDiscount);
  const monthlyTotal = discountedPrice * memberCount[0];
  const annualTotal = monthlyTotal * 12 * 0.85; // 15% discount for annual
  const annualSavings = monthlyTotal * 12 - annualTotal;

  return (
    <>
      <SEO 
        title="Health Club Pricing | Gym & Fitness Facility Plans | NeuroState"
        description="Member-focused pricing with facility bundles and volume discounts. Calculate custom pricing for gyms, studios, and private health clubs."
        keywords="gym pricing platform, fitness facility wellness, health club member retention, gym technology pricing, fitness centre cognitive tools"
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Facility Pricing
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto font-light">
                Transparent, scalable pricing based on member count. Built for gyms, studios, and private clubs with retention-focused perks.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">34%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Member Retention</div>
                <div className="text-sm text-mist">Increase year-over-year</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">£42</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Revenue per Member</div>
                <div className="text-sm text-mist">Additional monthly revenue</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">28%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Class Attendance</div>
                <div className="text-sm text-mist">Improvement rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">91%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Member Satisfaction</div>
                <div className="text-sm text-mist">NPS score</div>
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
                {/* Member Count Slider */}
                <div className="bg-pearl rounded-3xl p-10">
                  <div className="mb-8">
                    <label className="text-xs font-bold text-accent uppercase tracking-wider mb-3 block">
                      Number of Members
                    </label>
                    <div className="text-6xl font-bold text-carbon mb-2">{memberCount[0]}</div>
                  </div>
                  
                  <Slider
                    value={memberCount}
                    onValueChange={setMemberCount}
                    min={25}
                    max={2000}
                    step={25}
                    className="mb-6"
                  />
                  
                  <div className="flex justify-between text-sm text-stone font-medium">
                    <span>25</span>
                    <span>2,000+</span>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-gradient-to-br from-carbon to-slate rounded-3xl p-10 text-ivory">
                  <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-8">
                    Pricing Summary
                  </h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center pb-6 border-b border-ivory/20">
                      <span className="text-mist">Price per member</span>
                      <span className="text-3xl font-bold">£{discountedPrice.toFixed(2)}/mo</span>
                    </div>
                    
                    {volumeDiscount > 0 && (
                      <div className="flex justify-between items-center pb-6 border-b border-ivory/20">
                        <span className="text-mist">Volume discount</span>
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
                  Select Member Experience Tier
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
                            /member/mo
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
                  <h4 className="font-bold text-carbon mb-6 text-lg">Member Benefits Include</h4>
                  <ul className="space-y-4 text-sm text-stone">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Member wellness portal access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">20-35% discount on all products</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Facility dashboard with engagement metrics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Retail POS integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Dedicated account support</span>
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
              Schedule a demo with our partnerships team to discuss your facility's needs.
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