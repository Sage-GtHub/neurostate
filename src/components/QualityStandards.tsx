import { FlaskConical, Leaf, ShieldCheck, Award } from "lucide-react";

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
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Our Quality Commitment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every product is backed by science, rigorously tested, and made with premium ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {standards.map((standard) => {
            const Icon = standard.icon;
            return (
              <div key={standard.id} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="h-8 w-8 text-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{standard.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {standard.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center border-t pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-1">150+</div>
              <div className="text-sm text-muted-foreground">Pro Teams</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Third-Party Tested</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">NSF</div>
              <div className="text-sm text-muted-foreground">Certified Sport</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">Zero</div>
              <div className="text-sm text-muted-foreground">Banned Substances</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};