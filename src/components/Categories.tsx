import { Zap, Moon, Brain } from "lucide-react";

export const Categories = () => {
  const categories = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Recovery",
      description: "Advanced devices for optimal recovery and muscle repair."
    },
    {
      icon: <Moon className="h-6 w-6" />,
      title: "Sleep",
      description: "Sleep aid technologies for enhanced sleep quality."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Cognitive Performance",
      description: "Science-backed supplements for focus and mental clarity."
    }
  ];

  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Shop By Category
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <div key={index} className="bg-background rounded-lg p-6 hover:shadow-md transition-shadow border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-accent">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
