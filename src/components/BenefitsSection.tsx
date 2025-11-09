import { Heart, Brain, Zap, Shield } from "lucide-react";

interface BenefitsSectionProps {
  productType?: string;
}

export const BenefitsSection = ({ productType }: BenefitsSectionProps) => {
  const benefits = [
    {
      icon: Heart,
      title: "Heart Health",
      description: "Supports your cardiovascular system"
    },
    {
      icon: Brain,
      title: "Cognitive Function",
      description: "Helps keep your mind sharp"
    },
    {
      icon: Zap,
      title: "Energy & Recovery",
      description: "Bounce back quicker"
    },
    {
      icon: Shield,
      title: "Immune Support",
      description: "Strengthens your natural defences"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {benefits.map((benefit, index) => (
        <div key={index} className="text-center">
          <benefit.icon className="h-8 w-8 text-accent mx-auto mb-3" />
          <h3 className="font-semibold mb-1">{benefit.title}</h3>
          <p className="text-sm text-muted-foreground">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};
