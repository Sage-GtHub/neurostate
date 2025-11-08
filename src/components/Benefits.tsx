import { Shield, Sparkles, Heart, Brain } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Clinically Tested",
      description: "All products backed by scientific research"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Premium Quality",
      description: "Highest quality ingredients and materials"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Holistic Wellness",
      description: "Complete mind and body optimization"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Cognitive Enhancement",
      description: "Boost focus, memory, and mental clarity"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
