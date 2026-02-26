import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink, MessageSquare, Calendar, Shield, Code, Users, CheckCircle2 } from "lucide-react";

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

export default function EnterpriseIntegrations() {
  return (
    <>
      <SEO 
        title="Enterprise Integrations | Slack, Teams, SSO & API | NeuroState"
        description="Seamless integration with Slack, Teams, Calendar, SSO, and custom APIs. NeuroState fits into your existing workplace tools with invisible infrastructure."
        keywords="enterprise integration, Slack wellness integration, Microsoft Teams wellness, SSO authentication, API integration, workplace tool integration, HRIS integration"
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium mb-4">Human Performance OS</p>
              <h1 className="text-hero-display font-bold mb-6">
                Invisible Integration
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto">
                NeuroState operates silently within your existing tools. Invisible infrastructure that enhances human performance without friction.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">47%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Increase in Focus</div>
                <div className="text-sm text-mist">Measured via cognitive tests</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">63%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Reduction in Burnout</div>
                <div className="text-sm text-mist">Employee wellness surveys</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">31%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Productivity Gain</div>
                <div className="text-sm text-mist">Output per employee</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">89%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Employee Satisfaction</div>
                <div className="text-sm text-mist">Program NPS score</div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="space-y-6">
              <IntegrationCard
                title="Slack Integration"
                description="Nova AI responds directly in Slack channels and DMs"
                icon={<MessageSquare className="w-6 h-6 text-accent" />}
                setupTime="5 minutes"
                badge="Available Now"
                features={[
                  "Ask Nova questions via direct message",
                  "Get daily wellness tips in team channels",
                  "Quick protocol updates without leaving Slack",
                  "Reminder notifications for supplement timing",
                  "Team leaderboards and challenges (opt-in)"
                ]}
              />

              <IntegrationCard
                title="Microsoft Teams"
                description="Native Teams bot for enterprise organisations"
                icon={<Users className="w-6 h-6 text-accent" />}
                setupTime="10 minutes"
                badge="Available Now"
                features={[
                  "Nova AI assistant as Teams bot",
                  "Calendar integration for supplement reminders",
                  "Meeting fatigue detection & recovery suggestions",
                  "Team wellness dashboard in Teams tabs",
                  "SSO integration with Azure AD"
                ]}
              />

              <IntegrationCard
                title="Calendar Integration"
                description="Sync with Google Calendar, Outlook, Apple Calendar"
                icon={<Calendar className="w-6 h-6 text-accent" />}
                setupTime="2 minutes"
                badge="Available Now"
                features={[
                  "Automatic supplement reminders based on schedule",
                  "Pre-meeting focus protocol suggestions",
                  "Post-workout recovery timing",
                  "Sleep schedule optimisation",
                  "Travel timezone adjustments"
                ]}
              />

              <IntegrationCard
                title="SSO & Security"
                description="Enterprise-grade security and access management"
                icon={<Shield className="w-6 h-6 text-accent" />}
                setupTime="Dedicated support"
                badge="Enterprise Only"
                features={[
                  "Single Sign-On (SAML, OAuth, OIDC)",
                  "SCIM user provisioning",
                  "SOC 2 Type II certified",
                  "GDPR compliant data handling",
                  "Role-based access control (RBAC)"
                ]}
              />

              <IntegrationCard
                title="Custom API Integration"
                description="Full REST API access with webhooks for custom integrations"
                icon={<Code className="w-6 h-6 text-accent" />}
                setupTime="Custom implementation"
                badge="Enterprise Feature"
                features={[
                  "Full REST API access with webhooks",
                  "Employee wellness data export",
                  "Custom dashboard embedding",
                  "Dedicated technical support",
                  "SLA guarantees"
                ]}
                codeExample={`// Example API call
POST /api/v1/employees
{
  "employee_id": "EMP001",
  "email": "sarah@company.com"
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
              <Link to="/contact">Contact Us</Link>
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
              <Link to="/enterprise/corporate/overview" className="hover:text-accent transition-colors">Program Overview</Link>
              <Link to="/enterprise/corporate/integrations" className="hover:text-accent transition-colors">Integrations</Link>
              <Link to="/enterprise/corporate/pricing" className="hover:text-accent transition-colors">Pricing Calculator</Link>
              <Link to="/enterprise/corporate/cases" className="hover:text-accent transition-colors">Case Studies</Link>
              <button className="hover:text-accent transition-colors">Download Overview</button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
