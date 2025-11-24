import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { TrendingUp, Users, Sparkles } from "lucide-react";

interface CaseStudyProps {
  company: string;
  industry: string;
  employees: string;
  icon: React.ReactNode;
  challenge: string;
  solution: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  quote: string;
  author: string;
  role: string;
}

function CaseStudyCard({ company, industry, employees, icon, challenge, solution, metrics, quote, author, role }: CaseStudyProps) {
  return (
    <div className="border border-mist rounded-2xl overflow-hidden bg-ivory mb-12">
      {/* Header */}
      <div className="bg-pearl p-8 border-b border-mist">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-ivory rounded-2xl flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-3xl font-bold text-carbon">{company}</h3>
            <div className="text-stone">{industry} • {employees}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Challenge */}
        <div>
          <h4 className="text-sm font-semibold text-stone uppercase tracking-wide mb-3">
            The Challenge
          </h4>
          <p className="text-body text-carbon">{challenge}</p>
        </div>

        {/* Solution */}
        <div>
          <h4 className="text-sm font-semibold text-stone uppercase tracking-wide mb-3">
            The Solution
          </h4>
          <p className="text-body text-carbon">{solution}</p>
        </div>

        {/* Metrics */}
        <div>
          <h4 className="text-sm font-semibold text-stone uppercase tracking-wide mb-6">
            Measurable Results
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">{metric.value}</div>
                <div className="text-sm text-stone">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="bg-pearl rounded-2xl p-8">
          <blockquote className="text-lg text-carbon italic mb-4">
            "{quote}"
          </blockquote>
          <div className="text-sm">
            <div className="font-semibold text-carbon">— {author}</div>
            <div className="text-stone">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EnterpriseCaseStudies() {
  const caseStudies: CaseStudyProps[] = [
    {
      company: "TechCorp",
      industry: "Technology • SaaS",
      employees: "450 employees",
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      challenge: "Engineering team experiencing chronic burnout, declining code quality, and 22% annual turnover. Leadership needed a solution beyond traditional wellness perks.",
      solution: "Rolled out NeuroState Professional tier with Slack integration. Nova AI provided personalized cognitive enhancement protocols, and 73% of engineers adopted within first month.",
      metrics: [
        { value: "63%", label: "reduction in reported burnout" },
        { value: "31%", label: "increase in sprint velocity" },
        { value: "18%", label: "improvement in engineer retention" },
        { value: "89%", label: "employee NPS score" }
      ],
      quote: "NeuroState transformed our engineering culture. The team is sharper, more focused, and we've seen measurable improvements in code quality and delivery speed.",
      author: "Sarah Chen",
      role: "VP Engineering"
    },
    {
      company: "GlobalFinance",
      industry: "Financial Services",
      employees: "1,200 employees",
      icon: <Users className="w-8 h-8 text-accent" />,
      challenge: "Trading desk and investment teams working 60+ hour weeks with high-stress decision-making. Healthcare costs rising 15% YoY due to stress-related conditions.",
      solution: "Enterprise deployment with SSO integration, custom protocols for shift workers, and dedicated CSM for compliance review. API integration with internal wellness dashboard.",
      metrics: [
        { value: "47%", label: "improvement in cognitive performance tests" },
        { value: "£1.2M", label: "reduction in healthcare costs annually" },
        { value: "41%", label: "decrease in stress-related leave" },
        { value: "12%", label: "increase in decision accuracy" }
      ],
      quote: "The ROI is undeniable. Better decisions, healthier team, lower costs. NeuroState is now a core part of our competitive advantage.",
      author: "Marcus Thompson",
      role: "Chief People Officer"
    },
    {
      company: "CreativeStudio",
      industry: "Marketing & Design",
      employees: "180 employees",
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      challenge: "Creative team facing 'idea fatigue' and missing client deadlines. Pitch win rate declining from 45% to 28% over 18 months.",
      solution: "Professional tier with focus on creative cognitive protocols. Custom supplement stacks for ideation vs execution phases. Team challenges and leaderboards in Slack.",
      metrics: [
        { value: "53%", label: "increase in creative output" },
        { value: "38%", label: "improvement in pitch win rate" },
        { value: "2.5x", label: "faster project completion" },
        { value: "92%", label: "team satisfaction score" }
      ],
      quote: "Our team went from burned out to firing on all cylinders. The creative work is sharper, deadlines are met, and the energy in the studio is electric.",
      author: "James Martinez",
      role: "Creative Director"
    }
  ];

  return (
    <>
      <SEO 
        title="Enterprise Case Studies | NeuroState"
        description="See how leading organizations use NeuroState to elevate workforce performance, reduce burnout, and create competitive advantages."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Partnership Success Stories
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto">
                See how leading organizations are using NeuroState to elevate workforce performance, reduce burnout, and create competitive advantages.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-ivory">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} {...study} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-pearl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-large-display font-bold mb-6 text-carbon">
              Ready to Partner?
            </h2>
            <p className="text-body-large text-stone mb-8 max-w-2xl mx-auto">
              Schedule a demo with our partnerships team to discuss your organization's needs.
            </p>
            <Button size="lg" asChild>
              <Link to="/enterprise/overview">Schedule Partnership Demo</Link>
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
