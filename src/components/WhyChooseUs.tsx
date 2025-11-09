import { Award, Shield, Leaf, Zap, Heart, Users } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Third-party tested and certified for purity and potency"
  },
  {
    icon: Shield,
    title: "Science-Backed",
    description: "Formulated by leading nutritionists and sports scientists"
  },
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description: "No artificial colors, flavors, or unnecessary additives"
  },
  {
    icon: Zap,
    title: "Fast Results",
    description: "Optimized bioavailability for maximum absorption"
  },
  {
    icon: Heart,
    title: "Trusted by Athletes",
    description: "Used by professional athletes and fitness enthusiasts worldwide"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Free nutritionist consultations with every purchase"
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to providing the highest quality supplements to help you achieve your health and fitness goals
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex gap-4 p-6 rounded-lg bg-card hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
