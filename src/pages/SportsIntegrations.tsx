import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink, Activity, Watch, Heart, BarChart3, Shield, Code, CheckCircle2 } from "lucide-react";

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

export default function SportsIntegrations() {
  return (
    <>
      <SEO 
        title="Sports Integrations | NeuroState"
        description="Seamless integration with Strava, TrainingPeaks, Whoop, Oura, and sports management platforms. NeuroState fits into your existing performance ecosystem."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Performance Platform Integration
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto">
                NeuroState integrates with leading training apps and wearables, creating a unified performance optimisation ecosystem for athletes and coaches.
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
                <div className="text-sm text-mist">Program adoption</div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="space-y-6">
              <IntegrationCard
                title="Strava Integration"
                description="Sync training load, route data, and performance metrics"
                icon={<Activity className="w-6 h-6 text-accent" />}
                setupTime="3 minutes"
                badge="Available Now"
                features={[
                  "Automatic training load sync",
                  "Recovery protocol adjustments based on activity",
                  "Performance trend analysis",
                  "Supplement timing based on training schedule",
                  "Team challenge integration"
                ]}
              />

              <IntegrationCard
                title="TrainingPeaks"
                description="Unified view of periodization and recovery protocols"
                icon={<BarChart3 className="w-6 h-6 text-accent" />}
                setupTime="5 minutes"
                badge="Available Now"
                features={[
                  "Training stress score (TSS) integration",
                  "Periodization-aware supplement protocols",
                  "Coach dashboard with wellness metrics",
                  "Automated taper protocols",
                  "Performance benchmark tracking"
                ]}
              />

              <IntegrationCard
                title="Whoop & Oura"
                description="Real-time recovery and readiness data integration"
                icon={<Watch className="w-6 h-6 text-accent" />}
                setupTime="2 minutes"
                badge="Available Now"
                features={[
                  "HRV and recovery score sync",
                  "Sleep quality tracking",
                  "Strain and readiness metrics",
                  "Personalised supplement timing",
                  "Daily protocol adjustments"
                ]}
              />

              <IntegrationCard
                title="Sports Management Systems"
                description="Integration with team management and player tracking platforms"
                icon={<Heart className="w-6 h-6 text-accent" />}
                setupTime="Custom implementation"
                badge="Enterprise Feature"
                features={[
                  "Player wellness dashboard",
                  "Injury prevention tracking",
                  "Squad readiness overview",
                  "Medical staff collaboration tools",
                  "Performance reporting integration"
                ]}
              />

              <IntegrationCard
                title="SSO & Security"
                description="Enterprise-grade security for elite sports organisations"
                icon={<Shield className="w-6 h-6 text-accent" />}
                setupTime="Dedicated support"
                badge="Enterprise Only"
                features={[
                  "Single Sign-On (SAML, OAuth)",
                  "Team-level access controls",
                  "Data privacy compliance",
                  "Secure athlete data handling",
                  "Audit logging and reporting"
                ]}
              />

              <IntegrationCard
                title="Custom API Integration"
                description="Full API access for performance systems and analytics platforms"
                icon={<Code className="w-6 h-6 text-accent" />}
                setupTime="Custom implementation"
                badge="Enterprise Feature"
                features={[
                  "REST API with webhook support",
                  "Athlete metrics export",
                  "Custom dashboard embedding",
                  "Technical support and SLA",
                  "Performance analytics integration"
                ]}
                codeExample={`// Example API call
POST /api/v1/athletes
{
  "athlete_id": "ATH001",
  "email": "player@club.com"
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