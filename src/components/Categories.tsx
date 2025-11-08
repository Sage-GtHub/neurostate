import { Zap, Moon, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export const Categories = () => {
  const categories = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Recovery",
      description: "Advanced devices for optimal recovery and muscle repair.",
      slug: "recovery"
    },
    {
      icon: <Moon className="h-6 w-6" />,
      title: "Sleep",
      description: "Sleep aid technologies for enhanced sleep quality.",
      slug: "sleep"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Cognitive Performance",
      description: "Science-backed supplements for focus and mental clarity.",
      slug: "cognitive"
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
            <Link 
              key={index} 
              to={`/category/${category.slug}`}
              className="bg-background rounded-lg p-6 hover:shadow-md transition-all border border-border hover:border-accent group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-accent group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">{category.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
