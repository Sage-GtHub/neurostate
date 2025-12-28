import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight, Monitor, Cpu, Shield, Brain, Zap, LineChart, CheckCircle2 } from "lucide-react";

export default function InformationTechnologyOverview() {
  const stats = [
    { value: "47%", label: "Reduced Burnout", desc: "Developer wellness improvement" },
    { value: "31%", label: "Code Quality", desc: "Fewer production incidents" },
    { value: "2.4x", label: "Sprint Velocity", desc: "Sustainable performance gains" },
    { value: "89%", label: "Team Retention", desc: "Annual retention rate" },
  ];

  const solutions = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Developer Wellness",
      description: "Combat burnout with personalised recovery protocols designed for high-cognitive workloads and long coding sessions.",
      features: ["Cognitive load monitoring", "Screen fatigue protocols", "Focus enhancement stacks"]
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Cognitive Performance",
      description: "Optimise mental clarity and problem-solving capabilities with science-backed nootropic protocols.",
      features: ["Deep work optimisation", "Memory enhancement", "Decision fatigue reduction"]
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Remote Team Wellness",
      description: "Support distributed teams with comprehensive wellness programmes that adapt to individual schedules and time zones.",
      features: ["Timezone-aware protocols", "Async wellness check-ins", "Virtual team challenges"]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "On-Call Recovery",
      description: "Specialised protocols for engineers handling on-call rotations and incident response stress.",
      features: ["Post-incident recovery", "Sleep debt management", "Stress response protocols"]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Hackathon & Sprint Support",
      description: "Peak performance protocols for intense development periods and product launches.",
      features: ["Energy optimisation", "Sustained focus stacks", "Rapid recovery protocols"]
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Engineering Analytics",
      description: "Team-level insights into wellness metrics correlated with productivity and code quality.",
      features: ["Burnout risk indicators", "Team wellness dashboards", "Performance correlation data"]
    }
  ];

  const benefits = [
    "Reduced developer burnout and turnover",
    "Improved code quality and fewer bugs",
    "Higher sprint velocity sustainably",
    "Better on-call and incident recovery",
    "Enhanced remote team cohesion",
    "Data-driven wellness decisions"
  ];

  return (
    <>
      <SEO 
        title="Information Technology Solutions | NeuroState"
        description="Optimise developer performance and reduce burnout with NeuroState's cognitive wellness platform. Science-backed protocols for IT teams and engineering organisations."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.08),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-8">
                <Cpu className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">Information Technology</span>
              </div>
              <h1 className="text-hero-display font-bold mb-6">
                Optimise Developer<br />Performance & Wellness
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto font-light">
                Combat burnout, enhance cognitive performance, and build sustainable engineering cultures with science-backed wellness protocols.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button size="lg" asChild className="group">
                  <Link to="/contact">
                    Schedule Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-ivory border-ivory/30 hover:bg-ivory/10">
                  <Link to="/enterprise/information-technology/integrations">View Integrations</Link>
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">{stat.value}</div>
                  <div className="text-lg font-semibold mb-1 text-ivory">{stat.label}</div>
                  <div className="text-sm text-mist">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-24 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-large-display font-bold text-carbon mb-4">
                IT Wellness Solutions
              </h2>
              <p className="text-body-large text-stone max-w-2xl mx-auto">
                Comprehensive wellness programmes designed for the unique challenges of technology teams.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <div 
                  key={solution.title}
                  className="group bg-pearl rounded-3xl p-8 hover:shadow-soft transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-carbon mb-3">{solution.title}</h3>
                  <p className="text-stone mb-6">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-stone">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-pearl">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-large-display font-bold text-carbon mb-6">
                  Build Sustainable<br />Engineering Teams
                </h2>
                <p className="text-body-large text-stone mb-8">
                  Technology companies face unique wellness challenges—from cognitive fatigue to on-call stress. NeuroState provides the tools to build high-performing, resilient teams.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-stone font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-carbon to-slate rounded-3xl p-10 text-ivory">
                <h3 className="text-2xl font-bold mb-6">Platform Integration</h3>
                <p className="text-pearl mb-8">
                  NeuroState integrates with your existing development tools and workflows—Slack, Jira, GitHub, and more.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span>Slack wellness check-ins</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span>Calendar-aware protocol scheduling</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span>PagerDuty integration for on-call recovery</span>
                  </div>
                </div>
                <Button variant="secondary" size="lg" asChild className="w-full">
                  <Link to="/enterprise/information-technology/integrations">Explore Integrations</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-carbon to-slate text-ivory">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-large-display font-bold mb-6">
              Ready to Optimise Your<br />Engineering Team?
            </h2>
            <p className="text-body-large text-pearl mb-10 max-w-2xl mx-auto">
              Join leading technology companies using NeuroState to build sustainable, high-performing engineering cultures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Schedule Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-ivory border-ivory/30 hover:bg-ivory/10">
                <Link to="/enterprise/information-technology/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}