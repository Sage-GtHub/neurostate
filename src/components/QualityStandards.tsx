import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Leaf, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Standard {
  id: string;
  number: string;
  title: string;
  icon: React.ElementType;
  description: string;
  details: string[];
  color: string;
}

const standards: Standard[] = [
  {
    id: "science",
    number: "01",
    title: "Science-Backed Formulas",
    icon: FlaskConical,
    description: "Every product is developed using the latest peer-reviewed research and clinical studies.",
    details: [
      "Formulated with evidence-based ingredients at clinically effective doses",
      "Partnerships with leading research institutions and universities",
      "Regular updates based on emerging science and new research",
      "Transparent ingredient profiles with published research references"
    ],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "sourcing",
    number: "02",
    title: "Premium Ingredient Sourcing",
    icon: Leaf,
    description: "We source only the highest quality, bioavailable forms of each ingredient from trusted suppliers.",
    details: [
      "Partnership with industry-leading ingredient suppliers",
      "Preference for patented, branded ingredients with quality guarantees",
      "No artificial colors, flavors, or unnecessary fillers",
      "Sustainable and ethical sourcing practices"
    ],
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "testing",
    number: "03",
    title: "Rigorous Third-Party Testing",
    icon: ShieldCheck,
    description: "Every batch undergoes comprehensive testing to ensure purity, potency, and safety.",
    details: [
      "NSF Certified for Sport® - the gold standard used by professional athletes",
      "Third-party lab testing for banned substances and contaminants",
      "Verified label claim accuracy for every ingredient",
      "Heavy metal, microbiological, and pesticide testing"
    ],
    color: "from-accent/20 to-yellow-500/20",
  },
  {
    id: "quality",
    number: "04",
    title: "Manufacturing Excellence",
    icon: Award,
    description: "Manufactured in certified facilities that meet the highest industry standards.",
    details: [
      "GMP (Good Manufacturing Practice) certified facilities",
      "FDA-registered manufacturing partners",
      "Strict quality control at every stage of production",
      "Complete batch traceability and documentation"
    ],
    color: "from-purple-500/20 to-pink-500/20",
  },
];

export const QualityStandards = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">
            Our Commitment
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            The Standard of Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {standards.map((standard, index) => {
            const Icon = standard.icon;
            return (
              <Card 
                key={standard.id}
                className="overflow-hidden group transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0 bg-gradient-to-br from-background to-secondary/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-1 bg-gradient-to-r ${standard.color} transition-all duration-300 group-hover:h-2`} />
                <div className="p-6 relative">
                  {/* Large Background Number */}
                  <span className="absolute top-4 right-4 text-6xl font-bold text-accent/5 pointer-events-none">
                    {standard.number}
                  </span>
                  
                  {/* Icon */}
                  <div className="mb-6 relative z-10">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${standard.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                      <Icon className="h-10 w-10 text-accent transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 relative z-10">{standard.title}</h3>
                  
                  {/* Condensed Key Points */}
                  <div className="space-y-2 relative z-10">
                    {standard.details.slice(0, 2).map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-accent mt-1 text-lg flex-shrink-0">✓</span>
                        <span className="text-sm text-muted-foreground line-clamp-2">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-accent/10 via-secondary to-primary/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-accent/20 shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              Trusted by 100,000+ Athletes
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-accent to-accent/60 bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">
                  150+
                </div>
                <div className="text-sm font-medium text-muted-foreground">Pro Teams</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-accent to-accent/60 bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">
                  100%
                </div>
                <div className="text-sm font-medium text-muted-foreground">Third-Party Tested</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-accent to-accent/60 bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">
                  NSF
                </div>
                <div className="text-sm font-medium text-muted-foreground">Certified Sport</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-accent to-accent/60 bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">
                  Zero
                </div>
                <div className="text-sm font-medium text-muted-foreground">Banned Substances</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resources">
                <Button size="lg" className="group/btn shadow-lg">
                  Learn More About Our Process
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
              <Link to="/faq">
                <Button size="lg" variant="outline" className="shadow-lg">
                  View Testing Certificates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};