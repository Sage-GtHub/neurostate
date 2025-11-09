import { Shield, Users, Package, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Customers"
  },
  {
    icon: Package,
    value: "100,000+",
    label: "Orders Delivered"
  },
  {
    icon: Shield,
    value: "100%",
    label: "Third-Party Tested"
  },
  {
    icon: Award,
    value: "4.8/5",
    label: "Average Rating"
  }
];

export const SocialProof = () => {
  return (
    <section className="py-16 px-4 bg-secondary/20">
      <div className="container mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="px-4 py-2 bg-background rounded-lg border border-border text-sm font-medium">
            NSF Certified
          </div>
          <div className="px-4 py-2 bg-background rounded-lg border border-border text-sm font-medium">
            Informed Sport Approved
          </div>
          <div className="px-4 py-2 bg-background rounded-lg border border-border text-sm font-medium">
            GMP Certified
          </div>
          <div className="px-4 py-2 bg-background rounded-lg border border-border text-sm font-medium">
            Non-GMO Verified
          </div>
        </div>
      </div>
    </section>
  );
};
