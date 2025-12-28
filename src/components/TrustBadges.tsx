export const TrustBadges = () => {
  const badges = [
    "Third-Party Tested",
    "Science-Backed", 
    "Clean Ingredients",
    "Free UK Delivery"
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-6 text-xs text-muted-foreground">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="w-1 h-1 bg-primary rounded-full" />
          <span className="font-medium uppercase tracking-wider">{badge}</span>
        </div>
      ))}
    </div>
  );
};
