import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FlaskConical, 
  Microscope, 
  ShieldCheck, 
  Award, 
  PackageCheck, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";

interface TimelineStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  color: string;
  bgGradient: string;
  details: string[];
}

const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Research & Formulation",
    subtitle: "Science-First Approach",
    description: "Every product begins with comprehensive research and evidence-based formulation design.",
    icon: FlaskConical,
    duration: "2-3 months",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    details: [
      "Review peer-reviewed research",
      "Select clinically-effective doses",
      "Partner with research institutions",
      "Design optimal formulation"
    ]
  },
  {
    id: 2,
    title: "Ingredient Sourcing",
    subtitle: "Premium Quality Only",
    description: "We source the highest quality, most bioavailable forms of each ingredient from trusted suppliers.",
    icon: Sparkles,
    duration: "1-2 months",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    details: [
      "Verify supplier certifications",
      "Test ingredient purity",
      "Confirm bioavailability",
      "Ensure sustainable sourcing"
    ]
  },
  {
    id: 3,
    title: "Laboratory Testing",
    subtitle: "Comprehensive Analysis",
    description: "Third-party labs test for purity, potency, and safety before production begins.",
    icon: Microscope,
    duration: "2-4 weeks",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    details: [
      "Heavy metal testing",
      "Microbiological analysis",
      "Pesticide screening",
      "Potency verification"
    ]
  },
  {
    id: 4,
    title: "Manufacturing",
    subtitle: "GMP Certified Facilities",
    description: "Products are manufactured in FDA-registered, GMP-certified facilities with strict quality controls.",
    icon: PackageCheck,
    duration: "3-4 weeks",
    color: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    details: [
      "FDA-registered facilities",
      "GMP certification verified",
      "Batch documentation",
      "Quality control checkpoints"
    ]
  },
  {
    id: 5,
    title: "NSF Certification",
    subtitle: "Banned Substance Testing",
    description: "Every batch undergoes NSF Certified for Sport® testing - the gold standard for athletes.",
    icon: ShieldCheck,
    duration: "1-2 weeks",
    color: "from-yellow-500 to-amber-500",
    bgGradient: "from-yellow-500/10 to-amber-500/10",
    details: [
      "Test for 270+ banned substances",
      "Verify label accuracy",
      "Contaminant screening",
      "Certificate of analysis issued"
    ]
  },
  {
    id: 6,
    title: "Final Approval",
    subtitle: "Ready to Ship",
    description: "Once all testing is complete and certified, products are approved for distribution.",
    icon: Award,
    duration: "1 week",
    color: "from-accent to-accent/60",
    bgGradient: "from-accent/10 to-accent/20",
    details: [
      "Final quality review",
      "Documentation complete",
      "Certificates published",
      "Ready for customers"
    ]
  }
];

export const ProductTestingTimeline = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-secondary/30 via-background to-secondary/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">
            Our Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From Lab to Your Performance
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every product undergoes a rigorous 6-step testing and certification process that takes 4-6 months to complete
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute left-0 right-0 top-24 h-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <div className="grid grid-cols-6 gap-4">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              
              return (
                <div key={step.id} className="relative">
                  {/* Connector Dot */}
                  <div className="absolute left-1/2 top-24 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${step.color} shadow-lg transition-all duration-300 ${isActive ? 'scale-150' : 'scale-100'} border-4 border-background`} />
                  </div>

                  {/* Card */}
                  <Card
                    className={`mt-32 p-6 cursor-pointer transition-all duration-500 hover:scale-105 ${
                      isActive ? 'shadow-2xl ring-2 ring-accent' : 'hover:shadow-xl'
                    } bg-gradient-to-br ${step.bgGradient} backdrop-blur-sm`}
                    onMouseEnter={() => setActiveStep(step.id)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 transition-transform duration-500 ${isActive ? 'rotate-12 scale-110' : ''} shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Step Number */}
                    <Badge variant="outline" className="mb-3 mx-auto block w-fit">
                      Step {step.id}
                    </Badge>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-1 text-center">{step.title}</h3>
                    <p className="text-xs font-medium text-accent mb-2 text-center">{step.subtitle}</p>
                    <p className="text-xs text-muted-foreground mb-3 text-center">{step.description}</p>
                    
                    {/* Duration */}
                    <div className="text-center mb-3">
                      <span className="text-xs font-semibold text-foreground/70">⏱️ {step.duration}</span>
                    </div>

                    {/* Details */}
                    <div className={`space-y-1 transition-all duration-300 ${isActive ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-foreground/80">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-8">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            
            return (
              <div key={step.id} className="relative">
                {/* Vertical Line */}
                {index !== timelineSteps.length - 1 && (
                  <div className={`absolute left-8 top-20 w-1 h-full bg-gradient-to-b ${step.color}`} />
                )}

                <div className="flex gap-4">
                  {/* Icon Column */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg transition-transform duration-300 ${isActive ? 'scale-110' : ''} relative z-10`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content Column */}
                  <Card
                    className={`flex-1 p-6 cursor-pointer transition-all duration-300 ${
                      isActive ? 'shadow-xl ring-2 ring-accent' : ''
                    } bg-gradient-to-br ${step.bgGradient}`}
                    onClick={() => setActiveStep(isActive ? null : step.id)}
                  >
                    <Badge variant="outline" className="mb-2">Step {step.id}</Badge>
                    <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                    <p className="text-sm font-medium text-accent mb-2">{step.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <div className="mb-3">
                      <span className="text-sm font-semibold text-foreground/70">⏱️ {step.duration}</span>
                    </div>
                    
                    {/* Expandable Details */}
                    <div className={`space-y-2 transition-all duration-300 ${isActive ? 'opacity-100 max-h-96 mt-4' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 p-6 rounded-2xl bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 backdrop-blur-sm border border-accent/20">
            <div>
              <div className="text-3xl font-bold text-accent mb-1">6</div>
              <div className="text-sm text-muted-foreground">Quality Checkpoints</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="text-3xl font-bold text-accent mb-1">4-6</div>
              <div className="text-sm text-muted-foreground">Months Process</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="text-3xl font-bold text-accent mb-1">270+</div>
              <div className="text-sm text-muted-foreground">Substances Tested</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
