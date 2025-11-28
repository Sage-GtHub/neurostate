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
    name: "Foundation",
    price: 85,
    commitment: "Monthly",
    features: [
      "Nova AI performance assistant",
      "Basic recovery protocols",
      "Email support"
    ]
  },
  {
    name: "Elite",
    price: 145,
    commitment: "Monthly",
    features: [
      "Everything in Foundation",
      "Training platform integration",
      "Priority support",
      "Coach dashboard access"
    ]
  },
  {
    name: "Championship",
    price: 225,
    commitment: "Custom",
    features: [
      "Everything in Elite",
      "Wearable device integration",
      "Performance analytics API",
      "Dedicated performance consultant",
      "Custom supplement protocols"
    ]
  }
];

export default function SportsPricing() {
  const [athleteCount, setAthleteCount] = useState([30]);
  const [selectedTier, setSelectedTier] = useState(1); // Elite by default
  const [isAnnual, setIsAnnual] = useState(false);

  const currentTier = tiers[selectedTier];
  const pricePerAthlete = currentTier.price;
  
  // Calculate volume discount
  const getVolumeDiscount = (count: number) => {
    if (count >= 100) return 0.30; // 30% off for large squads
    if (count >= 50) return 0.25;  // 25% off
    if (count >= 30) return 0.20;  // 20% off
    if (count >= 20) return 0.15;  // 15% off
    if (count >= 10) return 0.10;  // 10% off
    return 0;
  };

  const volumeDiscount = getVolumeDiscount(athleteCount[0]);
  const discountedPrice = pricePerAthlete * (1 - volumeDiscount);
  const monthlyTotal = discountedPrice * athleteCount[0];
  const annualTotal = monthlyTotal * 12 * 0.85; // 15% discount for annual
  const annualSavings = monthlyTotal * 12 - annualTotal;

  return (
    <>
      <SEO 
        title="Sports Pricing Calculator | NeuroState"
        description="Athlete-focused pricing with performance bundles and team discounts. Calculate your custom sports organization pricing."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Performance Pricing
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto font-light">
                Transparent, scalable pricing based on squad size. Built for elite athletes with performance-focused bundles and team discounts.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">38%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Performance Gain</div>
                <div className="text-sm text-mist">Measurable improvement</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">52%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Faster Recovery</div>
                <div className="text-sm text-mist">Time to readiness</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">41%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Injury Reduction</div>
                <div className="text-sm text-mist">Season-long tracking</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">92%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Athlete Satisfaction</div>
                <div className="text-sm text-mist">Program NPS score</div>
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
                {/* Athlete Count Slider */}
                <div className="bg-pearl rounded-3xl p-10">
                  <div className="mb-8">
                    <label className="text-xs font-bold text-accent uppercase tracking-wider mb-3 block">
                      Number of Athletes
                    </label>
                    <div className="text-6xl font-bold text-carbon mb-2">{athleteCount[0]}</div>
                  </div>
                  
                  <Slider
                    value={athleteCount}
                    onValueChange={setAthleteCount}
                    min={5}
                    max={200}
                    step={5}
                    className="mb-6"
                  />
                  
                  <div className="flex justify-between text-sm text-stone font-medium">
                    <span>5</span>
                    <span>200+</span>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-gradient-to-br from-carbon to-slate rounded-3xl p-10 text-ivory">
                  <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-8">
                    Pricing Summary
                  </h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center pb-6 border-b border-ivory/20">
                      <span className="text-mist">Price per athlete</span>
                      <span className="text-3xl font-bold">£{discountedPrice.toFixed(2)}/mo</span>
                    </div>
                    
                    {volumeDiscount > 0 && (
                      <div className="flex justify-between items-center pb-6 border-b border-ivory/20">
                        <span className="text-mist">Team discount</span>
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
                        <div className="font-bold text-ivory mb-1">Season Commitment</div>
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
                  Select Performance Tier
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
                            /athlete/mo
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
                  <h4 className="font-bold text-carbon mb-6 text-lg">Performance Bundle Includes</h4>
                  <ul className="space-y-4 text-sm text-stone">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Nova AI for all athletes and coaches</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">30-50% discount on performance products</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Squad dashboard with readiness metrics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Injury prevention tracking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Dedicated performance consultant</span>
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
              Schedule a demo with our partnerships team to discuss your team's needs.
            </p>
            <Button size="lg" asChild>
              <Link to="/enterprise/sports/overview">Schedule Partnership Demo</Link>
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