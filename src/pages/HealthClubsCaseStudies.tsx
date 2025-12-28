import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Dumbbell, Heart, Sparkles } from "lucide-react";

interface CaseStudyProps {
  facility: string;
  type: string;
  members: string;
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

function CaseStudyCard({ facility, type, members, icon, challenge, solution, metrics, quote, author, role }: CaseStudyProps) {
  return (
    <div className="group bg-pearl rounded-3xl overflow-hidden hover:shadow-soft transition-all mb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-carbon to-slate p-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-ivory/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <div>
            <h3 className="text-4xl font-bold text-ivory mb-2">{facility}</h3>
            <div className="text-mist text-lg">{type} • {members}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-12 space-y-10">
        {/* Challenge & Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-ivory rounded-2xl p-8">
            <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-4">
              The Challenge
            </h4>
            <p className="text-body text-carbon leading-relaxed">{challenge}</p>
          </div>

          <div className="bg-ivory rounded-2xl p-8">
            <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-4">
              The Solution
            </h4>
            <p className="text-body text-carbon leading-relaxed">{solution}</p>
          </div>
        </div>

        {/* Metrics */}
        <div>
          <h4 className="text-xs font-bold text-stone uppercase tracking-wider mb-8 text-center">
            Business Impact
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-ivory rounded-2xl p-6 text-center hover:shadow-soft transition-shadow">
                <div className="text-5xl font-bold text-accent mb-3">{metric.value}</div>
                <div className="text-sm text-stone font-medium leading-tight">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-10">
          <blockquote className="text-xl text-carbon mb-6 leading-relaxed">
            "{quote}"
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-full"></div>
            <div>
              <div className="font-bold text-carbon text-lg">{author}</div>
              <div className="text-stone">{role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HealthClubsCaseStudies() {
  const caseStudies: CaseStudyProps[] = [
    {
      facility: "The Forge Premium Gym",
      type: "Premium Gym",
      members: "850 members",
      icon: <Dumbbell className="w-8 h-8 text-accent" />,
      challenge: "Struggling with 28% annual member churn rate typical of UK gyms. Members citing lack of visible results and generic wellness advice. Premium positioning threatened by commoditization.",
      solution: "Implemented NeuroState Premium tier with Mindbody integration. Branded member wellness portal with personalised supplement protocols. Retail corner established with 35% member discount on products.",
      metrics: [
        { value: "34%", label: "increase in member retention" },
        { value: "£38K", label: "monthly retail revenue added" },
        { value: "42%", label: "improvement in member satisfaction (NPS)" },
        { value: "91%", label: "program adoption rate" }
      ],
      quote: "NeuroState transformed us from just another gym to a premium wellness destination. Members see us as partners in their performance, not just a place with equipment. Retention is up, revenue is up, and our brand positioning is stronger than ever.",
      author: "Rebecca Thompson",
      role: "Founder & Managing Director"
    },
    {
      facility: "Flow Yoga & Wellness Studio",
      type: "Boutique Studio",
      members: "320 members",
      icon: <Heart className="w-8 h-8 text-accent" />,
      challenge: "Class attendance declining post-pandemic with members seeking more holistic wellness solutions beyond just classes. Revenue per member stagnant at £78/month.",
      solution: "Signature tier with white-label member portal integrated into studio website. Recovery-focused supplement protocols aligned with class schedules. Monthly wellness workshops featuring Nova AI guidance.",
      metrics: [
        { value: "28%", label: "increase in class attendance" },
        { value: "£42", label: "additional revenue per member/month" },
        { value: "67%", label: "improvement in member engagement scores" },
        { value: "52%", label: "increase in member referrals" }
      ],
      quote: "Our members don't just come to class anymore. They're part of a complete wellness ecosystem. NeuroState helped us evolve from a studio to a lifestyle brand, and the business results speak for themselves.",
      author: "Sophie Chen",
      role: "Studio Owner"
    },
    {
      facility: "Kinetic Private Members Club",
      type: "Private Members Club",
      members: "450 members",
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      challenge: "Ultra-premium positioning (£250/month membership) required constant innovation to justify pricing. Members expecting cutting-edge wellness technology and personalised service.",
      solution: "Signature tier with fully white-labeled portal matching club branding. Dedicated wellness concierge using Nova AI for member protocol design. VIP supplement protocols with same-day delivery.",
      metrics: [
        { value: "98%", label: "member retention rate" },
        { value: "£125", label: "average additional member spend/month" },
        { value: "3.2x", label: "increase in member waiting list" },
        { value: "95", label: "member NPS score" }
      ],
      quote: "NeuroState elevated our offering to match our premium positioning. It's become a signature part of the Kinetic experience. Members view it as a key differentiator and value driver for their membership.",
      author: "Alexander Hunt",
      role: "General Manager"
    }
  ];

  return (
    <>
      <SEO 
        title="Health Club Case Studies | NeuroState"
        description="See how premium gyms, studios, and private clubs use NeuroState to boost retention, increase revenue, and enhance member experience."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Facility Success Stories
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto">
                See how leading gyms, studios, and clubs are using NeuroState to enhance member experience, drive retention, and create new revenue streams.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">34%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Member Retention</div>
                <div className="text-sm text-mist">Increase year-over-year</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">£42</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Revenue per Member</div>
                <div className="text-sm text-mist">Additional monthly revenue</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">28%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Class Attendance</div>
                <div className="text-sm text-mist">Improvement rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-3 text-accent">91%</div>
                <div className="text-lg font-semibold mb-1 text-ivory">Member Satisfaction</div>
                <div className="text-sm text-mist">NPS score</div>
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
              Schedule a demo with our partnerships team to discuss your facility's needs.
            </p>
            <Button size="lg" asChild>
              <Link to="/enterprise/health-clubs/overview">Schedule Partnership Demo</Link>
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