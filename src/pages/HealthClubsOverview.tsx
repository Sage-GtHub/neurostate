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
import { CustomerSuccessMetrics } from "@/components/CustomerSuccessMetrics";

export default function HealthClubsOverview() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facility: "",
    members: "",
    goals: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partnership demo request:", formData);
  };

  return (
    <>
      <SEO 
        title="Health Clubs & Studios Partnership | NeuroState"
        description="Partner with NeuroState to deliver premium wellness optimization to your members. Enhance retention, increase revenue, elevate member satisfaction."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-carbon via-slate/95 to-carbon text-ivory pt-32 pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_50%)]" />
          
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-block mb-6 px-4 py-2 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">Member Wellness</span>
              </div>
              <h1 className="text-hero-display font-bold mb-6 bg-gradient-to-r from-ivory via-pearl to-ivory bg-clip-text text-transparent">
                Elevate Member Experience
              </h1>
              <p className="text-body-large text-pearl/90 max-w-3xl mx-auto leading-relaxed">
                Partner with NeuroState to deliver premium cognitive enhancement, recovery protocols, and AI-powered wellness optimization directly to your members.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-accent">47%</div>
                <div className="text-sm font-semibold text-ivory">Increase in Focus</div>
                <div className="text-xs text-mist/60 mt-1">Measured via cognitive tests</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-accent">63%</div>
                <div className="text-sm font-semibold text-ivory">Reduction in Burnout</div>
                <div className="text-xs text-mist/60 mt-1">Member wellness surveys</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-accent">31%</div>
                <div className="text-sm font-semibold text-ivory">Engagement Gain</div>
                <div className="text-xs text-mist/60 mt-1">Member activity rates</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-accent">89%</div>
                <div className="text-sm font-semibold text-ivory">Member Satisfaction</div>
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
                See the impact NeuroState can have on member retention and revenue. Adjust inputs to match your facility profile.
              </p>
            </div>

            <ROICalculator />
          </div>
        </section>

        {/* Customer Success Metrics Dashboard */}
        <section className="py-20 bg-gradient-to-b from-pearl to-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-large-display font-bold mb-4 text-carbon">
                Live Success Metrics
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                Real-time adoption rates, satisfaction scores, and member engagement insights from our health club partners.
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
                Watch how leading health clubs and studios integrate NeuroState into their member programmes and transform retention.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative bg-pearl rounded-3xl overflow-hidden shadow-soft hover:shadow-lg transition-all">
                <div className="relative aspect-video bg-gradient-to-br from-slate to-carbon flex items-center justify-center cursor-pointer">
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
                  <p className="text-body text-stone">Complete walkthrough of the NeuroState member dashboard, Nova AI integration, and facility analytics.</p>
                </div>
              </div>

              <div className="group relative bg-pearl rounded-3xl overflow-hidden shadow-soft hover:shadow-lg transition-all">
                <div className="relative aspect-video bg-gradient-to-br from-slate to-carbon flex items-center justify-center cursor-pointer">
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
                  <p className="text-body text-stone">Step-by-step guide to rolling out NeuroState across your facility in under 4 weeks.</p>
                </div>
              </div>
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
                Comprehensive wellness platform built for health clubs and studios
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-carbon/5 flex items-center justify-center">
                  <Target className="w-8 h-8 text-carbon" />
                </div>
                <h3 className="text-xl font-semibold text-carbon">Nova AI Assistant</h3>
                <p className="text-sm text-stone leading-relaxed">
                  Personalised wellness protocols for every member via chat, mobile app, or web dashboard.
                </p>
                <div className="text-xs text-ash">24/7 AI wellness coach</div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-carbon/5 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-carbon" />
                </div>
                <h3 className="text-xl font-semibold text-carbon">Facility Dashboard</h3>
                <p className="text-sm text-stone leading-relaxed">
                  Aggregated wellness insights and engagement metrics for facility management.
                </p>
                <div className="space-y-1 text-xs text-ash">
                  <div>Member health trends</div>
                  <div>Engagement analytics</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-carbon/5 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-carbon" />
                </div>
                <h3 className="text-xl font-semibold text-carbon">Premium Product Access</h3>
                <p className="text-sm text-stone leading-relaxed">
                  Discounted supplements, red light devices, and recovery products for your members.
                </p>
                <div className="text-xs text-ash">20-40% member discount</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gradient-to-b from-pearl via-ivory to-pearl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-large-display font-bold mb-6 text-carbon">
                Schedule Partnership Demo
              </h2>
              <p className="text-body text-stone max-w-2xl mx-auto">
                Fill out the form below and our partnerships team will reach out within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-pearl rounded-3xl p-12 shadow-soft space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-stone uppercase tracking-wider mb-3 block">Name</label>
                  <Input 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="bg-ivory"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-stone uppercase tracking-wider mb-3 block">Email</label>
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="bg-ivory"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-stone uppercase tracking-wider mb-3 block">Facility Name</label>
                  <Input 
                    placeholder="Your club or studio"
                    value={formData.facility}
                    onChange={(e) => setFormData({...formData, facility: e.target.value})}
                    required
                    className="bg-ivory"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-stone uppercase tracking-wider mb-3 block">Number of Members</label>
                  <Input 
                    placeholder="e.g., 500"
                    value={formData.members}
                    onChange={(e) => setFormData({...formData, members: e.target.value})}
                    required
                    className="bg-ivory"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-stone uppercase tracking-wider mb-3 block">Wellness Goals</label>
                <Textarea 
                  placeholder="What are your facility's wellness objectives?"
                  value={formData.goals}
                  onChange={(e) => setFormData({...formData, goals: e.target.value})}
                  rows={4}
                  className="bg-ivory"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Request Demo
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-mist text-center">
              <div className="text-sm text-stone mb-4">Prefer to speak with us directly?</div>
              <div className="space-y-2">
                <div className="text-carbon font-medium">
                  Email: <a href="mailto:partnerships@neurostate.co.uk" className="text-accent hover:underline">partnerships@neurostate.co.uk</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Links */}
        <section className="py-12 bg-carbon text-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-wider">
              <Link to="/enterprise/health-clubs/overview" className="hover:text-accent transition-colors">Program Overview</Link>
              <Link to="/enterprise/health-clubs/integrations" className="hover:text-accent transition-colors">Integrations</Link>
              <Link to="/enterprise/health-clubs/pricing" className="hover:text-accent transition-colors">Pricing Calculator</Link>
              <Link to="/enterprise/health-clubs/cases" className="hover:text-accent transition-colors">Case Studies</Link>
              <button className="hover:text-accent transition-colors">Download Overview</button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}