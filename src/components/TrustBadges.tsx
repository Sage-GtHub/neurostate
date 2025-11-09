import { Shield, Award, Leaf, Truck } from "lucide-react";

export const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "Third-Party Tested",
      description: "NSF Certified"
    },
    {
      icon: Award,
      title: "Science-Backed",
      description: "Research-driven"
    },
    {
      icon: Leaf,
      title: "Clean Ingredients",
      description: "No additives"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Orders over £50"
    }
  ];

  return (
    <div className="flex items-center justify-between gap-4 py-6 text-xs text-muted-foreground">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          <badge.icon className="h-4 w-4" />
          <div>
            <div className="font-medium text-foreground">{badge.title}</div>
            <div>{badge.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
