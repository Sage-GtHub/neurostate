import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Download, ArrowRight, CheckCircle2, TrendingUp, Users, Shield, Target } from "lucide-react";

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
    // Handle form submission
  };

  return (
    <>
      <SEO 
        title="Enterprise Partnership Program | NeuroState"
        description="Partner with NeuroState to deliver premium cognitive enhancement and wellness optimization to your team. Reduce burnout, boost productivity."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section with Dark Gradient */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Elevate Your Workforce Performance
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto">
                Partner with NeuroState to deliver premium cognitive enhancement, recovery protocols, and AI-powered wellness optimization directly to your team. Reduce burnout, boost productivity, and show you invest in peak performance.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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

            <div className="text-center">
              <Button size="lg" variant="secondary" className="gap-2">
                <Download className="w-5 h-5" />
                Download Partnership Overview PDF
              </Button>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-large-display font-bold text-center mb-16 text-carbon">
              What's Included
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pearl rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-carbon">Nova AI Assistant</h3>
                <p className="text-body text-stone mb-4">
                  Personalised wellness protocols for every team member via chat, mobile app, or web dashboard.
                </p>
                <div className="text-sm text-ash">24/7 AI health coach</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pearl rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-accent" />
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

              <div className="text-center">
                <div className="w-16 h-16 bg-pearl rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-carbon">Premium Product Access</h3>
                <p className="text-body text-stone mb-4">
                  Discounted supplements, red light devices, and recovery products for your team.
                </p>
                <div className="text-sm text-ash">20-40% corporate discount</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-pearl">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-large-display font-bold text-center mb-16 text-carbon">
              Benefits for Your Organisation
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Productivity & Performance */}
              <div>
                <h3 className="text-2xl font-bold mb-8 text-carbon uppercase tracking-wide">
                  Productivity &amp; Performance
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
              <div>
                <h3 className="text-2xl font-bold mb-8 text-carbon uppercase tracking-wide">
                  Retention &amp; Culture
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
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-large-display font-bold text-center mb-16 text-carbon">
              Implementation Timeline
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-carbon">
                    <th className="text-left py-4 px-6 font-bold text-carbon uppercase tracking-wide">Week 1</th>
                    <th className="text-left py-4 px-6 font-bold text-carbon uppercase tracking-wide">Week 2</th>
                    <th className="text-left py-4 px-6 font-bold text-carbon uppercase tracking-wide">Week 3-4</th>
                    <th className="text-left py-4 px-6 font-bold text-carbon uppercase tracking-wide">Month 2+</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-mist">
                    <td className="py-6 px-6">
                      <div className="font-semibold text-carbon mb-3">Onboarding</div>
                      <ul className="space-y-2 text-sm text-stone">
                        <li>Contract signing</li>
                        <li>Team setup</li>
                        <li>Dashboard access</li>
                        <li>Admin training</li>
                      </ul>
                    </td>
                    <td className="py-6 px-6">
                      <div className="font-semibold text-carbon mb-3">Launch</div>
                      <ul className="space-y-2 text-sm text-stone">
                        <li>Employee invitations</li>
                        <li>Kickoff webinar</li>
                        <li>Nova onboarding</li>
                        <li>First orders</li>
                      </ul>
                    </td>
                    <td className="py-6 px-6">
                      <div className="font-semibold text-carbon mb-3">Adoption</div>
                      <ul className="space-y-2 text-sm text-stone">
                        <li>Usage monitoring</li>
                        <li>Support tickets</li>
                        <li>Feedback collection</li>
                        <li>Engagement boost</li>
                      </ul>
                    </td>
                    <td className="py-6 px-6">
                      <div className="font-semibold text-carbon mb-3">Optimization</div>
                      <ul className="space-y-2 text-sm text-stone">
                        <li>Performance review</li>
                        <li>ROI analysis</li>
                        <li>Programme refinement</li>
                        <li>Scale planning</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-pearl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-large-display font-bold text-center mb-6 text-carbon">
              Ready to Partner?
            </h2>
            <p className="text-body-large text-center text-stone mb-12 max-w-2xl mx-auto">
              Schedule a demo with our partnerships team to discuss your organization's needs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 mb-12">
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
