import { Heart, Brain, Zap, Shield } from "lucide-react";

interface BenefitsSectionProps {
  productType?: string;
}

export const BenefitsSection = ({ productType }: BenefitsSectionProps) => {
  const benefits = [
    {
      icon: Heart,
      title: "Heart Health",
      description: "Supports cardiovascular function"
    },
    {
      icon: Brain,
      title: "Cognitive Function",
      description: "Enhances mental clarity"
    },
    {
      icon: Zap,
      title: "Energy & Recovery",
      description: "Faster recovery times"
    },
    {
      icon: Shield,
      title: "Immune Support",
      description: "Strengthens defenses"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {benefits.map((benefit, index) => (
        <div key={index} className="text-center p-6 rounded-lg border bg-secondary/5 hover:bg-secondary/10 transition-colors">
          <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
            <benefit.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-1">{benefit.title}</h3>
          <p className="text-sm text-muted-foreground">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};
