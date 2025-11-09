import { Shield, Users, Package, Award } from "lucide-react";

const publications = [
  { name: "Men's Health", logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=80&fit=crop" },
  { name: "Runner's World", logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=80&fit=crop" },
  { name: "GQ", logo: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=80&fit=crop" },
  { name: "Forbes", logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=80&fit=crop" },
];

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
        {/* As Featured In */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wide">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale">
            {publications.map((pub, index) => (
              <div key={index} className="h-12 w-32 bg-muted rounded flex items-center justify-center">
                <span className="text-sm font-semibold">{pub.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
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
