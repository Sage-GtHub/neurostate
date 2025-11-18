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
    <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-20 xl:px-32">
      <div className="w-full">
        <div className="mb-12">
          <p className="text-[10px] sm:text-xs font-light text-muted-foreground mb-3 tracking-[0.3em] uppercase">
            QUALITY COMMITMENT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tight mb-6">
            OUR STANDARDS
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl font-light">
            Every product is backed by science, rigorously tested, and made with premium ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {standards.map((standard) => {
            const Icon = standard.icon;
            return (
              <div key={standard.id}>
                <div className="mb-4">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-light">{standard.number}</p>
                <h3 className="text-base font-light uppercase tracking-wide mb-3">{standard.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {standard.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-center">
            <div>
              <div className="text-xl font-semibold mb-0.5">150+</div>
              <div className="text-xs text-muted-foreground">Pro Teams</div>
            </div>
            <div className="hidden sm:block text-muted-foreground/30">•</div>
            <div>
              <div className="text-xl font-semibold mb-0.5">100%</div>
              <div className="text-xs text-muted-foreground">Third-Party Tested</div>
            </div>
            <div className="hidden sm:block text-muted-foreground/30">•</div>
            <div>
              <div className="text-xl font-semibold mb-0.5">NSF</div>
              <div className="text-xs text-muted-foreground">Certified Sport</div>
            </div>
            <div className="hidden sm:block text-muted-foreground/30">•</div>
            <div>
              <div className="text-xl font-semibold mb-0.5">Zero</div>
              <div className="text-xs text-muted-foreground">Banned Substances</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};