import { useState, useEffect } from "react";
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
    name: "Essential",
    price: 45,
    commitment: "Monthly",
    features: [
      "Nova AI assistant",
      "Basic analytics",
      "Email support"
    ]
  },
  {
    name: "Professional",
    price: 78,
    commitment: "Monthly",
    features: [
      "Everything in Essential",
      "Slack/Teams integration",
      "Priority support",
      "Team dashboard"
    ]
  },
  {
    name: "Enterprise",
    price: 125,
    commitment: "Custom",
    features: [
      "Everything in Professional",
      "API access",
      "SSO integration",
      "Dedicated CSM",
      "Custom contracts"
    ]
  }
];

export default function EnterprisePricing() {
  const [employeeCount, setEmployeeCount] = useState([250]);
  const [selectedTier, setSelectedTier] = useState(1); // Professional by default
  const [isAnnual, setIsAnnual] = useState(false);

  const currentTier = tiers[selectedTier];
  const pricePerEmployee = currentTier.price;
  
  // Calculate volume discount
  const getVolumeDiscount = (count: number) => {
    if (count >= 1000) return 0.25; // 25% off
    if (count >= 500) return 0.20;  // 20% off
    if (count >= 250) return 0.15;  // 15% off
    if (count >= 100) return 0.10;  // 10% off
    if (count >= 50) return 0.05;   // 5% off
    return 0;
  };

  const volumeDiscount = getVolumeDiscount(employeeCount[0]);
  const discountedPrice = pricePerEmployee * (1 - volumeDiscount);
  const monthlyTotal = discountedPrice * employeeCount[0];
  const annualTotal = monthlyTotal * 12 * 0.85; // 15% discount for annual
  const annualSavings = monthlyTotal * 12 - annualTotal;

  return (
    <>
      <SEO 
        title="Enterprise Pricing Calculator | NeuroState"
        description="Transparent, scalable pricing based on your team size. Calculate your custom enterprise pricing with volume discounts."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Enterprise Pricing Calculator
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto">
                Transparent, scalable pricing based on your team size. No hidden fees, flexible contracts, and volume discounts that grow with you.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">47%</div>
                <div className="text-lg font-semibold mb-1">Increase in Focus</div>
                <div className="text-sm text-mist">Measured via cognitive tests</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">63%</div>
                <div className="text-lg font-semibold mb-1">Reduction in Burnout</div>
                <div className="text-sm text-mist">Employee wellness surveys</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">31%</div>
                <div className="text-lg font-semibold mb-1">Productivity Gain</div>
                <div className="text-sm text-mist">Output per employee</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">89%</div>
                <div className="text-lg font-semibold mb-1">Employee Satisfaction</div>
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
                {/* Employee Count Slider */}
                <div className="border border-mist rounded-2xl p-8 bg-pearl">
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-stone uppercase tracking-wide mb-2 block">
                      Number of Employees
                    </label>
                    <div className="text-4xl font-bold text-carbon">{employeeCount[0]}</div>
                  </div>
                  
                  <Slider
                    value={employeeCount}
                    onValueChange={setEmployeeCount}
                    min={10}
                    max={5000}
                    step={10}
                    className="mb-4"
                  />
                  
                  <div className="flex justify-between text-xs text-stone">
                    <span>10</span>
                    <span>5,000+</span>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="border border-mist rounded-2xl p-8 bg-ivory">
                  <h3 className="text-sm font-semibold text-stone uppercase tracking-wide mb-6">
                    Pricing Summary
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-4 border-b border-mist">
                      <span className="text-stone">Price per employee</span>
                      <span className="text-2xl font-bold text-carbon">£{discountedPrice.toFixed(2)}/mo</span>
                    </div>
                    
                    {volumeDiscount > 0 && (
                      <div className="flex justify-between items-center pb-4 border-b border-mist">
                        <span className="text-stone">Volume discount</span>
                        <span className="text-lg font-semibold text-accent">-{(volumeDiscount * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-stone">Monthly total</span>
                      <span className="text-3xl font-bold text-carbon">£{monthlyTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  {/* Annual Toggle */}
                  <div className="bg-pearl rounded-xl p-4 mb-6">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-semibold text-carbon">Annual Commitment</div>
                        <div className="text-sm text-stone">Save 15% with annual billing</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isAnnual}
                        onChange={(e) => setIsAnnual(e.target.checked)}
                        className="w-5 h-5"
                      />
                    </label>
                  </div>

                  {isAnnual && (
                    <div className="bg-accent/10 rounded-xl p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-stone">Annual total</span>
                        <span className="text-2xl font-bold text-accent">£{annualTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="text-sm text-accent font-medium">
                        Save £{annualSavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} annually
                      </div>
                    </div>
                  )}

                  <Button size="lg" className="w-full">
                    Request Custom Quote
                  </Button>
                </div>
              </div>

              {/* Right Column - Tier Selection */}
              <div>
                <h3 className="text-sm font-semibold text-stone uppercase tracking-wide mb-6">
                  Select Tier
                </h3>
                
                <div className="space-y-4">
                  {tiers.map((tier, index) => (
                    <button
                      key={tier.name}
                      onClick={() => setSelectedTier(index)}
                      className={`w-full text-left border-2 rounded-2xl p-6 transition-all ${
                        selectedTier === index
                          ? 'border-accent bg-accent/5'
                          : 'border-mist bg-ivory hover:border-stone'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-carbon mb-1">{tier.name}</h4>
                          <div className="text-sm text-stone">{tier.commitment}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-carbon">£{tier.price}</div>
                          <div className="text-sm text-stone">/employee/mo</div>
                        </div>
                      </div>
                      
                      <ul className="space-y-2">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-stone">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                <div className="mt-8 border border-mist rounded-2xl p-6 bg-pearl">
                  <h4 className="font-semibold text-carbon mb-4">What's Included</h4>
                  <ul className="space-y-2 text-sm text-stone">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      Nova AI assistant for all employees
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      20-40% discount on all products
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      Admin dashboard with analytics
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      Flexible billing and contracts
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      Dedicated account support
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
              Schedule a demo with our partnerships team to discuss your organization's needs.
            </p>
            <Button size="lg" asChild>
              <Link to="/enterprise/overview">Schedule Partnership Demo</Link>
            </Button>

            <div className="mt-12 pt-8 border-t border-mist">
              <div className="text-sm text-stone mb-4">Prefer to speak with us directly?</div>
              <div className="space-y-2">
                <div className="text-carbon font-medium">
                  Email: <a href="mailto:partnerships@neurostate.co.uk" className="text-accent hover:underline">partnerships@neurostate.co.uk</a>
                </div>
                <div className="text-carbon font-medium">
                  Phone: <span className="text-stone">+44 20 7123 4567</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Links */}
        <section className="py-12 bg-carbon text-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-wider">
              <Link to="/enterprise/overview" className="hover:text-accent transition-colors">Program Overview</Link>
              <Link to="/enterprise/integrations" className="hover:text-accent transition-colors">Integrations</Link>
              <Link to="/enterprise/pricing" className="hover:text-accent transition-colors">Pricing Calculator</Link>
              <Link to="/enterprise/cases" className="hover:text-accent transition-colors">Case Studies</Link>
              <button className="hover:text-accent transition-colors">Download Overview</button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
