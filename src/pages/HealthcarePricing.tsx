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
    name: "Clinic",
    price: 19,
    commitment: "Monthly",
    features: [
      "Patient wellness portal",
      "Basic recovery protocols",
      "Email support"
    ]
  },
  {
    name: "Practice",
    price: 29,
    commitment: "Monthly",
    features: [
      "Everything in Clinic",
      "EHR integration ready",
      "Provider dashboard",
      "Priority support"
    ]
  },
  {
    name: "Enterprise",
    price: 49,
    commitment: "Custom",
    features: [
      "Everything in Practice",
      "Full EHR integration",
      "Clinical decision support",
      "Dedicated success manager",
      "Custom API access"
    ]
  }
];

export default function HealthcarePricing() {
  const [patientCount, setPatientCount] = useState([500]);
  const [selectedTier, setSelectedTier] = useState(1);
  const [isAnnual, setIsAnnual] = useState(false);

  const currentTier = tiers[selectedTier];
  const pricePerPatient = currentTier.price;
  
  const getVolumeDiscount = (count: number) => {
    if (count >= 5000) return 0.35;
    if (count >= 2000) return 0.30;
    if (count >= 1000) return 0.25;
    if (count >= 500) return 0.20;
    if (count >= 200) return 0.15;
    return 0;
  };

  const volumeDiscount = getVolumeDiscount(patientCount[0]);
  const discountedPrice = pricePerPatient * (1 - volumeDiscount);
  const monthlyTotal = discountedPrice * patientCount[0];
  const annualTotal = monthlyTotal * 12 * 0.85;
  const annualSavings = monthlyTotal * 12 - annualTotal;

  return (
    <>
      <SEO 
        title="Healthcare Pricing | Clinical Wellness Plans | NeuroState"
        description="Patient-focused pricing with clinical bundles and EHR integration. Calculate custom pricing for hospitals, clinics, and rehabilitation centres."
        keywords="healthcare wellness pricing, hospital wellness platform, clinical decision support cost, patient wellness programme, EHR wellness integration"
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Healthcare Pricing
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto font-light">
                Transparent, scalable pricing for healthcare organisations. Built for clinics, practices, and health systems.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">34%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Faster Recovery</div>
                <div className="text-sm text-mist">Post-procedure</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">28%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Reduced Readmissions</div>
                <div className="text-sm text-mist">30-day rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">91%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Patient Satisfaction</div>
                <div className="text-sm text-mist">NPS score</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">100%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">HIPAA Compliant</div>
                <div className="text-sm text-mist">Fully certified</div>
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
                {/* Patient Count Slider */}
                <div className="bg-pearl rounded-3xl p-10">
                  <div className="mb-8">
                    <label className="text-xs font-bold text-accent uppercase tracking-wider mb-3 block">
                      Number of Patients
                    </label>
                    <div className="text-6xl font-bold text-carbon mb-2">{patientCount[0]}</div>
                  </div>
                  
                  <Slider
                    value={patientCount}
                    onValueChange={setPatientCount}
                    min={100}
                    max={10000}
                    step={100}
                    className="mb-6"
                  />
                  
                  <div className="flex justify-between text-sm text-stone font-medium">
                    <span>100</span>
                    <span>10,000+</span>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-gradient-to-br from-carbon to-slate rounded-3xl p-10 text-ivory">
                  <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-8">
                    Pricing Summary
                  </h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center pb-6 border-b border-ivory/20">
                      <span className="text-mist">Price per patient</span>
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
                  Select Service Tier
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
                            /patient/mo
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
                  <h4 className="font-bold text-carbon mb-6 text-lg">Healthcare Benefits Include</h4>
                  <ul className="space-y-4 text-sm text-stone">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Patient wellness portal access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Evidence-based recovery protocols</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Provider dashboard with outcomes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">HIPAA/NHS compliant infrastructure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Dedicated clinical success manager</span>
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
              Schedule a demo with our partnerships team to discuss your healthcare organisation's needs.
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