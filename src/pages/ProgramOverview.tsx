import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Download, CheckCircle2, TrendingUp, Users, Shield, Target } from "lucide-react";
import { ROICalculator } from "@/components/ROICalculator";

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

            {/* Metrics Grid with Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-ivory/5 backdrop-blur-sm border border-ivory/10 rounded-2xl p-6 text-center hover:bg-ivory/10 transition-all">
                  <div className="text-5xl sm:text-6xl font-bold mb-3 bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent">47%</div>
                  <div className="text-base font-semibold mb-1 text-ivory">Increase in Focus</div>
                  <div className="text-xs text-mist/80">Measured via cognitive tests</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-ivory/5 backdrop-blur-sm border border-ivory/10 rounded-2xl p-6 text-center hover:bg-ivory/10 transition-all">
                  <div className="text-5xl sm:text-6xl font-bold mb-3 bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent">63%</div>
                  <div className="text-base font-semibold mb-1 text-ivory">Reduction in Burnout</div>
                  <div className="text-xs text-mist/80">Employee wellness surveys</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-ivory/5 backdrop-blur-sm border border-ivory/10 rounded-2xl p-6 text-center hover:bg-ivory/10 transition-all">
                  <div className="text-5xl sm:text-6xl font-bold mb-3 bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent">31%</div>
                  <div className="text-base font-semibold mb-1 text-ivory">Productivity Gain</div>
                  <div className="text-xs text-mist/80">Output per employee</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-ivory/5 backdrop-blur-sm border border-ivory/10 rounded-2xl p-6 text-center hover:bg-ivory/10 transition-all">
                  <div className="text-5xl sm:text-6xl font-bold mb-3 bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent">89%</div>
                  <div className="text-base font-semibold mb-1 text-ivory">Employee Satisfaction</div>
                  <div className="text-xs text-mist/80">Program NPS score</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-carbon shadow-lg hover:shadow-xl transition-all">
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
                See the financial impact NeuroState can have on your organization. Choose your industry and adjust inputs to match your company profile.
              </p>
            </div>

            <ROICalculator />
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-20 bg-gradient-to-b from-pearl to-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-large-display font-bold mb-4 text-carbon">
                See NeuroState in Action
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                Watch how leading organizations integrate NeuroState into their wellness programs and transform team performance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative bg-ivory rounded-3xl overflow-hidden shadow-soft hover:shadow-lg transition-all">
                <div className="aspect-video bg-gradient-to-br from-slate to-carbon flex items-center justify-center relative cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-carbon/80 to-slate/80 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl" />
                      <div className="relative w-20 h-20 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-ivory ml-1" fill="currentColor" viewBox="0 0 24 24">
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

              <div className="group relative bg-ivory rounded-3xl overflow-hidden shadow-soft hover:shadow-lg transition-all">
                <div className="aspect-video bg-gradient-to-br from-slate to-carbon flex items-center justify-center relative cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-carbon/80 to-slate/80 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl" />
                      <div className="relative w-20 h-20 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-ivory ml-1" fill="currentColor" viewBox="0 0 24 24">
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
                NeuroState vs Traditional Wellness Programs
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                See how NeuroState delivers measurable performance gains compared to generic wellness benefits.
              </p>
            </div>

            <div className="bg-pearl rounded-3xl p-8 overflow-x-auto shadow-soft">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-carbon">
                    <th className="text-left py-6 px-6 font-bold text-carbon uppercase tracking-wide">Feature</th>
                    <th className="text-center py-6 px-6 font-bold text-accent uppercase tracking-wide">NeuroState</th>
                    <th className="text-center py-6 px-6 font-bold text-stone uppercase tracking-wide">Traditional Programs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-mist">
                    <td className="py-6 px-6 font-semibold text-carbon">AI-Powered Personalization</td>
                    <td className="py-6 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center text-stone">—</td>
                  </tr>
                  <tr className="border-b border-mist bg-ivory/50">
                    <td className="py-6 px-6 font-semibold text-carbon">Cognitive Performance Focus</td>
                    <td className="py-6 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center text-stone">—</td>
                  </tr>
                  <tr className="border-b border-mist">
                    <td className="py-6 px-6 font-semibold text-carbon">Real-Time Analytics</td>
                    <td className="py-6 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center text-sm text-stone">Annual surveys only</td>
                  </tr>
                  <tr className="border-b border-mist bg-ivory/50">
                    <td className="py-6 px-6 font-semibold text-carbon">Premium Products Included</td>
                    <td className="py-6 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center text-sm text-stone">Gym membership only</td>
                  </tr>
                  <tr className="border-b border-mist">
                    <td className="py-6 px-6 font-semibold text-carbon">Measurable ROI</td>
                    <td className="py-6 px-6 text-center text-accent font-bold">47% focus increase</td>
                    <td className="py-6 px-6 text-center text-sm text-stone">No clear metrics</td>
                  </tr>
                  <tr className="border-b border-mist bg-ivory/50">
                    <td className="py-6 px-6 font-semibold text-carbon">Slack/Teams Integration</td>
                    <td className="py-6 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center text-stone">—</td>
                  </tr>
                  <tr className="border-b border-mist">
                    <td className="py-6 px-6 font-semibold text-carbon">Implementation Time</td>
                    <td className="py-6 px-6 text-center text-accent font-bold">2-4 weeks</td>
                    <td className="py-6 px-6 text-center text-sm text-stone">3-6 months</td>
                  </tr>
                  <tr className="bg-ivory/50">
                    <td className="py-6 px-6 font-semibold text-carbon">24/7 Support Access</td>
                    <td className="py-6 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center text-sm text-stone">Business hours only</td>
                  </tr>
                </tbody>
              </table>
            </div>
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

            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl" />
                <div className="relative bg-ivory rounded-3xl p-8 text-center hover:shadow-soft transition-all">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl animate-pulse" />
                    <div className="relative w-full h-full bg-pearl rounded-2xl flex items-center justify-center">
                      <Target className="w-10 h-10 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-carbon">Nova AI Assistant</h3>
                  <p className="text-body text-stone mb-4">
                    Personalised wellness protocols for every team member via chat, mobile app, or web dashboard.
                  </p>
                  <div className="text-sm text-ash">24/7 AI health coach</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl" />
                <div className="relative bg-ivory rounded-3xl p-8 text-center hover:shadow-soft transition-all">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="relative w-full h-full bg-pearl rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-10 h-10 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-carbon">Team Dashboard</h3>
                  <p className="text-body text-stone mb-4">
                    Aggregated wellness insights and engagement metrics for HR and leadership.
                  </p>
                  <div className="space-y-1 text-sm text-ash">
                    <div>Anonymized team health trends</div>
                    <div>Engagement analytics</div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl" />
                <div className="relative bg-ivory rounded-3xl p-8 text-center hover:shadow-soft transition-all">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <div className="relative w-full h-full bg-pearl rounded-2xl flex items-center justify-center">
                      <Shield className="w-10 h-10 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-carbon">Premium Product Access</h3>
                  <p className="text-body text-stone mb-4">
                    Discounted supplements, red light devices, and recovery products for your team.
                  </p>
                  <div className="text-sm text-ash">20-40% corporate discount</div>
                </div>
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

            <div className="grid md:grid-cols-2 gap-12">
              {/* Productivity & Performance */}
              <div className="bg-pearl rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-8 text-carbon uppercase tracking-wide">
                  Productivity & Performance
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Reduced Brain Fog</div>
                      <div className="text-sm text-stone">47% improvement in focus metrics</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Enhanced Cognitive Function</div>
                      <div className="text-sm text-stone">31% increase in output per employee</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Better Decision Making</div>
                      <div className="text-sm text-stone">23% faster problem-solving</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Sustained Energy</div>
                      <div className="text-sm text-stone">41% reduction in afternoon slumps</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retention & Culture */}
              <div className="bg-pearl rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-8 text-carbon uppercase tracking-wide">
                  Retention & Culture
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Lower Burnout Rates</div>
                      <div className="text-sm text-stone">63% reduction in stress-related leave</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Improved Job Satisfaction</div>
                      <div className="text-sm text-stone">89% employee programme approval</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Stronger Employer Brand</div>
                      <div className="text-sm text-stone">Top-tier wellness benefit</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-carbon mb-1">Reduced Turnover</div>
                      <div className="text-sm text-stone">18% improvement in retention</div>
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

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-ivory rounded-3xl p-8 shadow-soft">
                <div className="text-accent font-bold text-lg mb-4">Week 1</div>
                <div className="font-semibold text-carbon mb-4">Onboarding</div>
                <ul className="space-y-2 text-sm text-stone">
                  <li>• Contract signing</li>
                  <li>• Team setup</li>
                  <li>• Dashboard access</li>
                  <li>• Admin training</li>
                </ul>
              </div>

              <div className="bg-ivory rounded-3xl p-8 shadow-soft">
                <div className="text-accent font-bold text-lg mb-4">Week 2</div>
                <div className="font-semibold text-carbon mb-4">Launch</div>
                <ul className="space-y-2 text-sm text-stone">
                  <li>• Employee invitations</li>
                  <li>• Kickoff webinar</li>
                  <li>• Nova onboarding</li>
                  <li>• First orders</li>
                </ul>
              </div>

              <div className="bg-ivory rounded-3xl p-8 shadow-soft">
                <div className="text-accent font-bold text-lg mb-4">Week 3-4</div>
                <div className="font-semibold text-carbon mb-4">Adoption</div>
                <ul className="space-y-2 text-sm text-stone">
                  <li>• Usage monitoring</li>
                  <li>• Support tickets</li>
                  <li>• Feedback collection</li>
                  <li>• Engagement boost</li>
                </ul>
              </div>

              <div className="bg-ivory rounded-3xl p-8 shadow-soft">
                <div className="text-accent font-bold text-lg mb-4">Month 2+</div>
                <div className="font-semibold text-carbon mb-4">Optimization</div>
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
                Schedule a demo with our partnerships team to discuss your organization's needs.
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
