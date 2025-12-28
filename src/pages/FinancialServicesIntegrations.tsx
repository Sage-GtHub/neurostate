import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink, TrendingUp, Building2, Clock, Shield, Code, Database, CheckCircle2 } from "lucide-react";

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

export default function FinancialServicesIntegrations() {
  return (
    <>
      <SEO 
        title="Financial Services Integrations | NeuroState"
        description="Seamless integration with trading platforms, Bloomberg terminals, HR systems, and compliance tools. NeuroState fits into your financial services ecosystem."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Financial Platform Integration
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto">
                NeuroState integrates with your existing trading platforms, HR systems, and compliance infrastructure for seamless deployment.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">23%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Decision Quality</div>
                <div className="text-sm text-mist">Improved accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">41%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Stress Reduction</div>
                <div className="text-sm text-mist">Peak trading hours</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">67%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Faster Recovery</div>
                <div className="text-sm text-mist">After volatile periods</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">94%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Compliance Rate</div>
                <div className="text-sm text-mist">Regulatory adherence</div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="space-y-6">
              <IntegrationCard
                title="Trading Floor Integration"
                description="Real-time wellness monitoring for high-stress trading environments"
                icon={<TrendingUp className="w-6 h-6 text-accent" />}
                setupTime="Custom setup"
                badge="Enterprise Feature"
                features={[
                  "Market volatility stress protocols",
                  "Trading session recovery timing",
                  "Decision fatigue monitoring",
                  "Performance correlation analytics",
                  "Pre-market preparation protocols"
                ]}
              />

              <IntegrationCard
                title="HR System Integration"
                description="Connect with Workday, SAP SuccessFactors, and enterprise HR platforms"
                icon={<Building2 className="w-6 h-6 text-accent" />}
                setupTime="2-4 weeks"
                badge="Available Now"
                features={[
                  "Employee onboarding automation",
                  "Benefits integration",
                  "Wellness programme reporting",
                  "Team structure sync",
                  "Leave and recovery tracking"
                ]}
              />

              <IntegrationCard
                title="Time & Scheduling"
                description="Integration with enterprise calendar and scheduling systems"
                icon={<Clock className="w-6 h-6 text-accent" />}
                setupTime="1 week"
                badge="Available Now"
                features={[
                  "Meeting load analysis",
                  "Recovery time scheduling",
                  "Market hours awareness",
                  "Timezone management",
                  "Deep work block protection"
                ]}
              />

              <IntegrationCard
                title="Compliance & Reporting"
                description="Regulatory-compliant wellness data handling and reporting"
                icon={<Shield className="w-6 h-6 text-accent" />}
                setupTime="Dedicated support"
                badge="Enterprise Only"
                features={[
                  "FCA wellness reporting",
                  "MiFID II compliance",
                  "Audit trail logging",
                  "Data sovereignty options",
                  "Regulatory export formats"
                ]}
              />

              <IntegrationCard
                title="Data Warehouse Integration"
                description="Connect wellness data to your enterprise analytics infrastructure"
                icon={<Database className="w-6 h-6 text-accent" />}
                setupTime="Custom implementation"
                badge="Enterprise Feature"
                features={[
                  "Snowflake integration",
                  "Azure Synapse support",
                  "Real-time data streaming",
                  "Custom dashboard embedding",
                  "BI tool compatibility"
                ]}
              />

              <IntegrationCard
                title="Custom API Integration"
                description="Full API access for bespoke financial services platforms"
                icon={<Code className="w-6 h-6 text-accent" />}
                setupTime="Custom implementation"
                badge="Enterprise Feature"
                features={[
                  "REST API with webhooks",
                  "Financial-grade security",
                  "Custom metrics export",
                  "Dedicated technical support",
                  "SLA guarantees"
                ]}
                codeExample={`// Example API call
POST /api/v1/professionals
{
  "employee_id": "FIN001",
  "email": "trader@firm.com",
  "desk": "equity-derivatives"
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
              Schedule a demo with our partnerships team to discuss your organisation's needs.
            </p>
            <Button size="lg" asChild>
              <Link to="/enterprise/financial-services/overview">Schedule Partnership Demo</Link>
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