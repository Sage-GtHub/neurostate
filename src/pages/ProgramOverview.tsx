import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Download, CheckCircle2, TrendingUp, Users, Shield, Target, FileText, Layers, Calculator, Award } from "lucide-react";
import { CorporateROICalculator } from "@/components/CorporateROICalculator";
import { CorporateComparisonTable } from "@/components/CorporateComparisonTable";
import { CustomerSuccessMetrics } from "@/components/CustomerSuccessMetrics";

export default function ProgramOverview() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    employees: "",
    goals: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partnership demo request:", formData);
  };

  return (
    <>
      <SEO 
        title="Enterprise Partnership Program | NeuroState"
        description="Partner with NeuroState to deliver premium cognitive enhancement and wellness optimization to your team. Reduce burnout, boost productivity."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section with Dynamic Gradient */}
        <section className="relative overflow-hidden bg-gradient-to-br from-carbon via-slate/95 to-carbon text-ivory pt-32 pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_50%)]" />
          
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-block mb-6 px-4 py-2 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">Enterprise Wellness</span>
              </div>
              <h1 className="text-hero-display font-bold mb-6 bg-gradient-to-r from-ivory via-pearl to-ivory bg-clip-text text-transparent">
                Elevate Your Workforce Performance
              </h1>
              <p className="text-body-large text-pearl/90 max-w-3xl mx-auto leading-relaxed">
                Partner with NeuroState to deliver premium cognitive enhancement, recovery protocols, and AI-powered wellness optimization directly to your team.
              </p>
            </div>

            {/* Metrics Grid - Seamless */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-accent">47%</div>
                <div className="text-sm font-semibold text-ivory">Increase in Focus</div>
                <div className="text-xs text-mist/60 mt-1">Measured via cognitive tests</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-accent">63%</div>
                <div className="text-sm font-semibold text-ivory">Reduction in Burnout</div>
                <div className="text-xs text-mist/60 mt-1">Employee wellness surveys</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-accent">31%</div>
                <div className="text-sm font-semibold text-ivory">Productivity Gain</div>
                <div className="text-xs text-mist/60 mt-1">Output per employee</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-accent">89%</div>
                <div className="text-sm font-semibold text-ivory">Employee Satisfaction</div>
                <div className="text-xs text-mist/60 mt-1">Programme NPS score</div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="gap-2 bg-carbon hover:bg-slate text-ivory shadow-lg hover:shadow-xl transition-all">
                <Download className="w-5 h-5" />
                Download Partnership Overview PDF
              </Button>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-large-display font-bold mb-4 text-carbon">
                Calculate Your ROI
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                See the financial impact NeuroState can have on your organisation. Choose your industry and adjust inputs to match your company profile.
              </p>
            </div>

            <CorporateROICalculator />
          </div>
        </section>

        {/* Customer Success Metrics Dashboard */}
        <section className="py-20 bg-gradient-to-b from-pearl to-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-large-display font-bold mb-4 text-carbon">
                Live Customer Success Metrics
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                Real-time adoption rates, satisfaction scores, and team performance insights from our enterprise partners.
              </p>
            </div>

            <CustomerSuccessMetrics />
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-large-display font-bold mb-4 text-carbon">
                See NeuroState in Action
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                Watch how leading organisations integrate NeuroState into their wellness programmes and transform team performance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative bg-pearl rounded-3xl overflow-hidden shadow-soft hover:shadow-lg transition-all">
                <div className="relative aspect-video bg-gradient-to-br from-slate to-carbon flex items-center justify-center cursor-pointer">
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-carbon/80 backdrop-blur-sm rounded-full border border-ivory/20">
                    <span className="text-xs font-bold text-ivory uppercase tracking-wider">Coming Soon</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-carbon/80 to-slate/80 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-ivory/10 rounded-full blur-2xl" />
                      <div className="relative w-20 h-20 rounded-full bg-ivory flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-carbon ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-carbon mb-3">Platform Overview</h3>
                  <p className="text-body text-stone">Complete walkthrough of the NeuroState enterprise dashboard, Nova AI integration, and team analytics.</p>
                </div>
              </div>

              <div className="group relative bg-pearl rounded-3xl overflow-hidden shadow-soft hover:shadow-lg transition-all">
                <div className="relative aspect-video bg-gradient-to-br from-slate to-carbon flex items-center justify-center cursor-pointer">
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-carbon/80 backdrop-blur-sm rounded-full border border-ivory/20">
                    <span className="text-xs font-bold text-ivory uppercase tracking-wider">Coming Soon</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-carbon/80 to-slate/80 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-ivory/10 rounded-full blur-2xl" />
                      <div className="relative w-20 h-20 rounded-full bg-ivory flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-carbon ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-carbon mb-3">Implementation Guide</h3>
                  <p className="text-body text-stone">Step-by-step guide to rolling out NeuroState across your organization in under 4 weeks.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-large-display font-bold mb-4 text-carbon">
                NeuroState vs Traditional Wellness Programmes
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                See how NeuroState delivers measurable performance gains compared to generic wellness benefits.
              </p>
            </div>

            <CorporateComparisonTable />
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-gradient-to-b from-ivory to-pearl">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-large-display font-bold mb-4 text-carbon">
                What's Included
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                Comprehensive wellness platform built for enterprise teams
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-carbon/5 flex items-center justify-center">
                  <Target className="w-8 h-8 text-carbon" />
                </div>
                <h3 className="text-xl font-semibold text-carbon">Nova AI Assistant</h3>
                <p className="text-sm text-stone leading-relaxed">
                  Personalised wellness protocols for every team member via chat, mobile app, or web dashboard.
                </p>
                <div className="text-xs text-ash">24/7 AI health coach</div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-carbon/5 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-carbon" />
                </div>
                <h3 className="text-xl font-semibold text-carbon">Team Dashboard</h3>
                <p className="text-sm text-stone leading-relaxed">
                  Aggregated wellness insights and engagement metrics for HR and leadership.
                </p>
                <div className="space-y-1 text-xs text-ash">
                  <div>Employee productivity trends</div>
                  <div>Burnout reduction metrics</div>
                  <div>Focus & cognitive performance</div>
                  <div>Team wellness engagement</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-carbon/5 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-carbon" />
                </div>
                <h3 className="text-xl font-semibold text-carbon">Premium Product Access</h3>
                <p className="text-sm text-stone leading-relaxed">
                  Discounted supplements, red light devices, and recovery products for your team.
                </p>
                <div className="text-xs text-ash">20-40% corporate discount</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-large-display font-bold mb-4 text-carbon">
                Benefits for Your Organisation
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Productivity & Performance */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-8 text-carbon uppercase tracking-wide">
                  Productivity & Performance
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-carbon flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Reduced Brain Fog</div>
                      <div className="text-sm text-stone"><span className="text-accent font-semibold">47%</span> improvement in focus metrics</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-carbon flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Enhanced Cognitive Function</div>
                      <div className="text-sm text-stone"><span className="text-accent font-semibold">31%</span> increase in output per employee</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-carbon flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Better Decision Making</div>
                      <div className="text-sm text-stone"><span className="text-accent font-semibold">23%</span> faster problem-solving</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-carbon flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Sustained Energy</div>
                      <div className="text-sm text-stone"><span className="text-accent font-semibold">41%</span> reduction in afternoon slumps</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retention & Culture */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-8 text-carbon uppercase tracking-wide">
                  Retention & Culture
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-carbon flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Lower Burnout Rates</div>
                      <div className="text-sm text-stone"><span className="text-accent font-semibold">63%</span> reduction in stress-related leave</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-carbon flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Improved Job Satisfaction</div>
                      <div className="text-sm text-stone"><span className="text-accent font-semibold">89%</span> employee programme approval</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-carbon flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Stronger Employer Brand</div>
                      <div className="text-sm text-stone">Top-tier wellness benefit</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-carbon flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Reduced Turnover</div>
                      <div className="text-sm text-stone"><span className="text-accent font-semibold">18%</span> improvement in retention</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="py-20 bg-gradient-to-b from-pearl to-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-large-display font-bold mb-4 text-carbon">
                Implementation Timeline
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                Go from contract to full deployment in under 4 weeks
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-12">
              <div className="space-y-4">
                <div className="text-carbon font-bold mb-3">Week <span className="text-accent">1</span></div>
                <div className="font-semibold text-carbon mb-3">Onboarding</div>
                <ul className="space-y-2 text-sm text-stone">
                  <li>• Contract signing</li>
                  <li>• Team setup</li>
                  <li>• Dashboard access</li>
                  <li>• Admin training</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="text-carbon font-bold mb-3">Week <span className="text-accent">2</span></div>
                <div className="font-semibold text-carbon mb-3">Launch</div>
                <ul className="space-y-2 text-sm text-stone">
                  <li>• Employee invitations</li>
                  <li>• Kickoff webinar</li>
                  <li>• Nova onboarding</li>
                  <li>• First orders</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="text-carbon font-bold mb-3">Week <span className="text-accent">3-4</span></div>
                <div className="font-semibold text-carbon mb-3">Adoption</div>
                <ul className="space-y-2 text-sm text-stone">
                  <li>• Usage monitoring</li>
                  <li>• Support tickets</li>
                  <li>• Feedback collection</li>
                  <li>• Engagement boost</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="text-carbon font-bold mb-3">Month <span className="text-accent">2+</span></div>
                <div className="font-semibold text-carbon mb-3">Optimisation</div>
                <ul className="space-y-2 text-sm text-stone">
                  <li>• Performance review</li>
                  <li>• ROI analysis</li>
                  <li>• Programme refinement</li>
                  <li>• Scale planning</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-large-display font-bold mb-4 text-carbon">
                Ready to Partner?
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                Schedule a demo with our partnerships team to discuss your organisation's needs.
              </p>
            </div>

            <div className="bg-pearl rounded-3xl p-10 shadow-soft">
              <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Number of Employees"
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    required
                  />
                </div>

                <Textarea
                  placeholder="Tell us about your wellness goals..."
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  rows={4}
                  required
                />

                <Button type="submit" size="lg" className="w-full">
                  Schedule Partnership Demo
                </Button>
              </form>

              <div className="text-center border-t border-mist pt-8">
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
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="py-20 bg-carbon">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-ivory mb-3">Explore Partnership Resources</h3>
              <p className="text-mist text-sm">Everything you need to evaluate NeuroState for your organization</p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              <Link 
                to="/enterprise/corporate/overview" 
                className="group bg-slate rounded-2xl p-6 hover:bg-slate/80 transition-all hover:scale-105"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div className="text-sm font-bold text-ivory mb-1">Programme Overview</div>
                <div className="text-xs text-mist">Core benefits and metrics</div>
              </Link>

              <Link 
                to="/enterprise/corporate/integrations" 
                className="group bg-slate rounded-2xl p-6 hover:bg-slate/80 transition-all hover:scale-105"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <Layers className="w-6 h-6 text-accent" />
                </div>
                <div className="text-sm font-bold text-ivory mb-1">Integrations</div>
                <div className="text-xs text-mist">Connect your tools</div>
              </Link>

              <Link 
                to="/enterprise/corporate/pricing" 
                className="group bg-slate rounded-2xl p-6 hover:bg-slate/80 transition-all hover:scale-105"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <Calculator className="w-6 h-6 text-accent" />
                </div>
                <div className="text-sm font-bold text-ivory mb-1">Pricing Calculator</div>
                <div className="text-xs text-mist">Calculate your investment</div>
              </Link>

              <Link 
                to="/enterprise/corporate/cases" 
                className="group bg-slate rounded-2xl p-6 hover:bg-slate/80 transition-all hover:scale-105"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div className="text-sm font-bold text-ivory mb-1">Case Studies</div>
                <div className="text-xs text-mist">Client success stories</div>
              </Link>

              <button 
                className="group bg-slate rounded-2xl p-6 hover:bg-slate/80 transition-all hover:scale-105"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <Download className="w-6 h-6 text-accent" />
                </div>
                <div className="text-sm font-bold text-ivory mb-1">Download Overview</div>
                <div className="text-xs text-mist">Save for later</div>
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
