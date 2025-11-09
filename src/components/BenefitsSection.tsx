import { Heart, Brain, Zap, Shield } from "lucide-react";

interface BenefitsSectionProps {
  productType?: string;
}

export const BenefitsSection = ({ productType }: BenefitsSectionProps) => {
  // Default benefits - can be customized based on product type
  const benefits = [
    {
      icon: Heart,
      title: "Heart Health",
      description: "Supports cardiovascular function and circulation"
    },
    {
      icon: Brain,
      title: "Cognitive Function",
      description: "Enhances mental clarity and focus"
    },
    {
      icon: Zap,
      title: "Energy & Recovery",
      description: "Promotes faster recovery and sustained energy"
    },
    {
      icon: Shield,
      title: "Immune Support",
      description: "Strengthens natural defense mechanisms"
    }
  ];

  return (
    <div className="py-12 bg-secondary/10 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Key Benefits</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
