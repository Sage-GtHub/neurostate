import { Heart, Brain, Zap, Shield } from "lucide-react";

interface BenefitsSectionProps {
  productType?: string;
}

export const BenefitsSection = ({ productType }: BenefitsSectionProps) => {
  const benefits = [
    {
      icon: Heart,
      title: "Heart health",
      description: "Supports your cardiovascular system"
    },
    {
      icon: Brain,
      title: "Cognitive function",
      description: "Helps keep your mind sharp"
    },
    {
      icon: Zap,
      title: "Energy and recovery",
      description: "Bounce back quicker"
    },
    {
      icon: Shield,
      title: "Immune support",
      description: "Strengthens your natural defenses"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
      {benefits.map((benefit, index) => (
        <div key={index} className="text-center">
          <benefit.icon className="h-10 w-10 text-accent mx-auto mb-4" />
          <h3 className="mb-2">{benefit.title}</h3>
          <p className="text-body text-muted-foreground">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};
