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
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">
            Our Commitment
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Standard of Excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We hold ourselves to the same rigorous standards used by Olympic athletes and professional sports teams. Every product is tested, verified, and backed by science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {standards.map((standard) => {
            const Icon = standard.icon;
            return (
              <Card 
                key={standard.id}
                className="overflow-hidden group transition-all duration-300 hover:shadow-accent-glow"
              >
                <div className={`h-2 bg-gradient-to-r ${standard.color}`} />
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(255,138,0,0.6)]">
                        <Icon className="h-7 w-7 text-accent group-hover:text-accent-foreground transition-colors" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-accent/30">{standard.number}</span>
                        <h3 className="text-2xl font-bold">{standard.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {standard.description}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {standard.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1 flex-shrink-0">✓</span>
                        <span className="text-foreground/80">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-secondary to-muted rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Trusted by 100,000+ Athletes & Health Enthusiasts
            </h3>
            <p className="text-muted-foreground mb-6">
              Our products are used by professional sports teams, Olympic athletes, and individuals committed to optimal performance. We're honored to support your journey to peak health and performance.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">150+</div>
                <div className="text-sm text-muted-foreground">Pro Teams</div>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Third-Party Tested</div>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">NSF</div>
                <div className="text-sm text-muted-foreground">Certified Sport</div>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">Zero</div>
                <div className="text-sm text-muted-foreground">Banned Substances</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resources">
                <Button size="lg" className="group/btn">
                  Learn More About Our Process
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
              <Link to="/faq">
                <Button size="lg" variant="outline">
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