import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Trophy, Target, Zap } from "lucide-react";

interface CaseStudyProps {
  club: string;
  sport: string;
  squad: string;
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

function CaseStudyCard({ club, sport, squad, icon, challenge, solution, metrics, quote, author, role }: CaseStudyProps) {
  return (
    <div className="group bg-pearl rounded-3xl overflow-hidden hover:shadow-soft transition-all mb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-carbon to-slate p-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-ivory/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <div>
            <h3 className="text-4xl font-bold text-ivory mb-2">{club}</h3>
            <div className="text-mist text-lg">{sport} • {squad}</div>
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
            Performance Results
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

export default function SportsCaseStudies() {
  const caseStudies: CaseStudyProps[] = [
    {
      club: "Championship Football Club",
      sport: "Football",
      squad: "32 players",
      icon: <Trophy className="w-8 h-8 text-accent" />,
      challenge: "Squad suffering from mid-season fatigue with 6 key injuries. Recovery protocols inconsistent across players. Performance data showing 18% decline in sprint metrics and decision-making accuracy.",
      solution: "Implemented NeuroState Elite tier with Whoop integration for all players. Individualized supplement protocols based on position and training load. Performance team had real-time readiness dashboard.",
      metrics: [
        { value: "41%", label: "reduction in soft tissue injuries" },
        { value: "28%", label: "improvement in recovery time" },
        { value: "22%", label: "increase in high-intensity sprints" },
        { value: "15", label: "points gained in second half of season" }
      ],
      quote: "NeuroState gave us a competitive edge. The players recovered faster, stayed sharper, and our injury rate dropped significantly. It's now non-negotiable in our performance program.",
      author: "David Morrison",
      role: "Head of Performance"
    },
    {
      club: "Elite Rugby Union Team",
      sport: "Rugby Union",
      squad: "45 players",
      icon: <Target className="w-8 h-8 text-accent" />,
      challenge: "Contact sport demands leading to chronic inflammation and poor sleep quality. Medical team managing 12+ players on pain medication. Training load unsustainable with fixture congestion.",
      solution: "Championship tier deployment with training platform integration. Custom anti-inflammatory and sleep protocols. Coaches accessed squad readiness metrics pre-selection.",
      metrics: [
        { value: "52%", label: "faster post-match recovery" },
        { value: "38%", label: "reduction in missed training days" },
        { value: "67%", label: "improvement in sleep quality scores" },
        { value: "8", label: "consecutive wins during peak fixture period" }
      ],
      quote: "The difference in recovery between our squad and opponents was night and day. We finished the season stronger than we started, which is unheard of in rugby.",
      author: "James O'Connor",
      role: "Director of Rugby"
    },
    {
      club: "Professional Cycling Team",
      sport: "Cycling",
      squad: "18 riders",
      icon: <Zap className="w-8 h-8 text-accent" />,
      challenge: "Grand tour preparation requiring peak performance sustained over 3 weeks. Riders experiencing cognitive fatigue affecting tactical decision-making. Recovery between stages insufficient.",
      solution: "Elite tier with Strava and TrainingPeaks integration. Stage-specific cognitive enhancement protocols. Real-time supplement adjustments based on training stress scores and elevation profiles.",
      metrics: [
        { value: "34%", label: "improvement in power-to-weight ratio" },
        { value: "43%", label: "better cognitive performance in final week" },
        { value: "2", label: "stage wins" },
        { value: "Top 5", label: "general classification finish" }
      ],
      quote: "The mental clarity in week three was the difference-maker. When other teams were fading, our riders were still making smart tactical moves and recovering overnight.",
      author: "Marco Bellini",
      role: "Team Performance Director"
    }
  ];

  return (
    <>
      <SEO 
        title="Sports Case Studies | NeuroState"
        description="See how elite sports organizations use NeuroState to enhance athlete performance, accelerate recovery, and reduce injury risk."
      />
      
      <div className="min-h-screen bg-ivory">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-carbon via-slate to-carbon text-ivory pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-hero-display font-bold mb-6">
                Performance Success Stories
              </h1>
              <p className="text-body-large text-pearl max-w-3xl mx-auto">
                See how elite teams and athletes are using NeuroState to gain competitive advantages through optimized recovery and performance.
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