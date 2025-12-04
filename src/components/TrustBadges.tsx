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
      title: "Free Delivery",
      description: "UK orders over £50"
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 py-8 text-[0.75rem] text-stone">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-signal-green rounded-full"></span>
          <span className="font-medium text-carbon tracking-[0.05em] uppercase">{badge.title}</span>
        </div>
      ))}
    </div>
  );
};
