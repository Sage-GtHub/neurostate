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
    title: "Science-backed formulas",
    icon: FlaskConical,
    description: "Every product developed using peer-reviewed research and clinical studies.",
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
    title: "Premium ingredient sourcing",
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
    title: "Rigorous third-party testing",
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
    title: "Manufacturing excellence",
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
    <section className="py-24 md:py-32 px-6 sm:px-8 lg:px-20 xl:px-32">
      <div className="w-full">
        <div className="mb-20">
          <p className="ghost-number mb-4">
            QUALITY COMMITMENT
          </p>
          <h2 className="mb-6">
            Our standards
          </h2>
          <p className="text-body-large text-muted-foreground max-w-2xl">
            Every product backed by science, rigorously tested, and made with premium ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {standards.map((standard) => {
            const Icon = standard.icon;
            return (
              <div key={standard.id}>
                <div className="mb-6">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <p className="ghost-number mb-3">{standard.number}</p>
                <h3 className="mb-4">{standard.title}</h3>
                <p className="text-body text-muted-foreground">
                  {standard.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="pt-16 border-t border-border/50">
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 text-center">
            <div>
              <div className="text-h2 mb-2">150+</div>
              <div className="text-ui-label">Pro Teams</div>
            </div>
            <div className="hidden sm:block text-muted-foreground/30">•</div>
            <div>
              <div className="text-h2 mb-2">100%</div>
              <div className="text-ui-label">Third-Party Tested</div>
            </div>
            <div className="hidden sm:block text-muted-foreground/30">•</div>
            <div>
              <div className="text-h2 mb-2">NSF</div>
              <div className="text-ui-label">Certified Sport</div>
            </div>
            <div className="hidden sm:block text-muted-foreground/30">•</div>
            <div>
              <div className="text-h2 mb-2">Zero</div>
              <div className="text-ui-label">Banned Substances</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};