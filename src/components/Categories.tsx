import { Card, CardContent } from "@/components/ui/card";
import { Zap, Moon, Brain } from "lucide-react";

export const Categories = () => {
  const categories = [
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Recovery",
      description: "Advanced red light therapy and recovery devices for optimal muscle repair and wellness."
    },
    {
      icon: <Moon className="h-8 w-8 text-accent" />,
      title: "Sleep",
      description: "Sleep aid technologies and products designed to enhance sleep quality and restoration."
    },
    {
      icon: <Brain className="h-8 w-8 text-accent" />,
      title: "Cognitive Performance",
      description: "Science-backed supplements and nootropics for enhanced focus, memory, and mental clarity."
    }
  ];

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Product Categories
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
