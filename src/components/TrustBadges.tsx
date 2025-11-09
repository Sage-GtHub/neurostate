import { Shield, Award, Leaf, Truck } from "lucide-react";

export const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "Third-Party Tested",
      description: "NSF Certified for Sport"
    },
    {
      icon: Award,
      title: "Science-Backed",
      description: "Research-driven formulas"
    },
    {
      icon: Leaf,
      title: "Clean Ingredients",
      description: "No artificial additives"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over £50"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y">
      {badges.map((badge, index) => (
        <div key={index} className="text-center">
          <badge.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold text-sm mb-1">{badge.title}</h3>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};
