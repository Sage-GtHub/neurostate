import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink, Hotel, Calendar, Sparkles, Shield, Code, CreditCard, CheckCircle2 } from "lucide-react";

interface IntegrationCardProps {
  title: string;
  description: string;
  features: string[];
  setupTime: string;
  badge?: string;
  icon: React.ReactNode;
  codeExample?: string;
}

function IntegrationCard({ title, description, features, setupTime, badge, icon, codeExample }: IntegrationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group bg-pearl rounded-3xl overflow-hidden hover:shadow-soft transition-all">
      <div className="p-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-ivory rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              {icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-carbon mb-2">{title}</h3>
              {badge && (
                <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full">
                  {badge}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-stone hover:text-carbon transition-colors mt-2"
          >
            {isExpanded ? <ChevronUp className="w-7 h-7" /> : <ChevronDown className="w-7 h-7" />}
          </button>
        </div>

        <p className="text-body-large text-stone mb-8">{description}</p>

        {isExpanded && (
          <div className="space-y-8 pt-8 border-t border-mist animate-fade-in">
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 bg-ivory rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {codeExample && (
              <div className="bg-carbon rounded-2xl p-8 overflow-x-auto">
                <pre className="text-sm text-pearl font-mono leading-relaxed">
                  <code>{codeExample}</code>
                </pre>
              </div>
            )}

            <div className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-stone">Setup time:</span>
                <span className="px-4 py-2 bg-accent/10 text-accent text-sm font-bold rounded-full">{setupTime}</span>
              </div>
              <Button variant="default" size="lg" className="gap-2">
                View Documentation <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HospitalityIntegrations() {
  return (
    <>
      <SEO 
        title="Hospitality Integrations | NeuroState"
        description="Seamless integration with hotel PMS, spa booking systems, and guest experience platforms. NeuroState enhances your hospitality wellness offerings."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Hospitality Platform Integration
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto">
                NeuroState integrates with your property management, spa booking, and guest experience systems for seamless wellness offerings.
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
                <div className="text-sm text-mist">Wellness package bookings</div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="space-y-6">
              <IntegrationCard
                title="Property Management Systems"
                description="Connect with Opera, Protel, and leading hotel PMS platforms"
                icon={<Hotel className="w-6 h-6 text-accent" />}
                setupTime="2-4 weeks"
                badge="Available Now"
                features={[
                  "Guest profile sync",
                  "Room service wellness menu",
                  "Pre-arrival wellness questionnaire",
                  "In-stay protocol delivery",
                  "Guest preference tracking"
                ]}
              />

              <IntegrationCard
                title="Spa Booking Integration"
                description="Seamless connection with Book4Time, SpaSoft, and spa management systems"
                icon={<Calendar className="w-6 h-6 text-accent" />}
                setupTime="1-2 weeks"
                badge="Available Now"
                features={[
                  "Treatment booking integration",
                  "Wellness package creation",
                  "Therapist scheduling",
                  "Product retail integration",
                  "Guest wellness journeys"
                ]}
              />

              <IntegrationCard
                title="Guest Experience Platform"
                description="White-label guest wellness app and in-room experience"
                icon={<Sparkles className="w-6 h-6 text-accent" />}
                setupTime="3-4 weeks"
                badge="Premium Feature"
                features={[
                  "Branded guest app",
                  "In-room wellness protocols",
                  "Digital wellness concierge",
                  "Post-stay wellness follow-up",
                  "Loyalty programme integration"
                ]}
              />

              <IntegrationCard
                title="Retail & POS Integration"
                description="In-property wellness product sales and inventory"
                icon={<CreditCard className="w-6 h-6 text-accent" />}
                setupTime="1-2 weeks"
                badge="Available Now"
                features={[
                  "Spa retail integration",
                  "Room charge posting",
                  "Inventory management",
                  "Revenue reporting",
                  "Gift shop integration"
                ]}
              />

              <IntegrationCard
                title="Enterprise Security"
                description="Hospitality-grade security and data protection"
                icon={<Shield className="w-6 h-6 text-accent" />}
                setupTime="Dedicated support"
                badge="Enterprise Only"
                features={[
                  "PCI DSS compliance",
                  "GDPR compliant",
                  "Guest data protection",
                  "Multi-property support",
                  "Role-based access controls"
                ]}
              />

              <IntegrationCard
                title="Custom API Integration"
                description="Full API access for bespoke hospitality platforms"
                icon={<Code className="w-6 h-6 text-accent" />}
                setupTime="Custom implementation"
                badge="Enterprise Feature"
                features={[
                  "REST API with webhooks",
                  "Guest data export",
                  "Custom dashboard embedding",
                  "Dedicated technical support",
                  "SLA guarantees"
                ]}
                codeExample={`// Example API call
POST /api/v1/guests
{
  "guest_id": "GST001",
  "email": "guest@hotel.com",
  "reservation_id": "RES12345"
}`}
              />
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Request API Access
              </Button>
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
              <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">Schedule Partnership Demo</a>
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