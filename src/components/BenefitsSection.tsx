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
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
      {benefits.map((benefit, index) => (
        <div key={index}>
          <h4 className="text-[1.125rem] font-medium mb-3 text-carbon">{benefit.title}</h4>
          <p className="text-[0.9375rem] text-ash leading-relaxed">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};
