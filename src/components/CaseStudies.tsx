import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface CaseStudy {
  company: string;
  result: string;
  metric: string;
  description: string;
  category: string;
}

const caseStudies: CaseStudy[] = [
  {
    company: "Global Investment Bank",
    result: "+34%",
    metric: "decision accuracy",
    description: "Reduced cognitive fatigue incidents during high-stakes trading hours",
    category: "Finance"
  },
  {
    company: "Elite Sports Team",
    result: "2.3x",
    metric: "faster recovery",
    description: "Optimised training loads with real-time readiness monitoring",
    category: "Sports"
  },
  {
    company: "Tech Startup",
    result: "-45%",
    metric: "burnout risk",
    description: "Early intervention protocols prevented executive burnout",
    category: "Technology"
  }
];

export const CaseStudies = () => {
  const section = useScrollAnimation();

  return (
    <section 
      ref={section.ref}
      className={`py-24 md:py-32 px-6 md:px-8 bg-background transition-all duration-700 ${section.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-lg">
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Case Studies</span>
            <h2 className="text-large-display text-foreground">
              Real results from real teams
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              How leading organisations use Neurostate to unlock human potential.
            </p>
          </div>
          <Link 
            to="/enterprise/case-studies" 
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors group"
          >
            View all case studies
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Case Study Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <div 
              key={i}
              className="group relative bg-background border border-border/50 rounded-3xl p-8 hover:border-primary/20 transition-all duration-500 cursor-pointer overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-6">
                {/* Category tag */}
                <span className="inline-block px-3 py-1 text-[10px] font-medium text-muted-foreground bg-muted rounded-full">
                  {study.category}
                </span>

                {/* Big result number */}
                <div>
                  <p className="text-4xl md:text-5xl font-light text-foreground mb-1">{study.result}</p>
                  <p className="text-sm text-primary font-medium">{study.metric}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                  {study.description}
                </p>

                {/* Company */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-foreground/60">{study.company}</p>
                </div>
              </div>

              {/* Arrow indicator */}
              <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
