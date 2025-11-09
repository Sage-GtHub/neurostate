import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import sleepImage from "@/assets/restoresleep-night.jpg";
import recoveryImage from "@/assets/red-light-therapy-blanket.jpg";
import performanceImage from "@/assets/pemf-therapy-mat.jpg";
import cognitiveImage from "@/assets/neurofocus-cognitive.jpg";

interface Goal {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  color: string;
}

const goals: Goal[] = [
  {
    id: "sleep",
    title: "Sleep",
    description: "Optimise sleep quality and recovery with science-backed tools for deeper, more restorative rest.",
    image: sleepImage,
    link: "/category/supplements?tag=sleep",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    id: "recovery",
    title: "Recovery",
    description: "Accelerate muscle recovery and reduce inflammation with advanced therapeutic technologies.",
    image: recoveryImage,
    link: "/category/recovery-devices",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "performance",
    title: "Performance",
    description: "Enhance athletic performance and endurance with cutting-edge recovery and training tools.",
    image: performanceImage,
    link: "/category/recovery-devices?tag=performance",
    color: "from-accent/20 to-yellow-500/20",
  },
  {
    id: "cognitive",
    title: "Cognitive Function",
    description: "Support mental clarity, focus, and brain health with nootropics and cognitive enhancers.",
    image: cognitiveImage,
    link: "/category/supplements?tag=cognitive",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

export const ShopByGoal = () => {
  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Shop by Goal</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Choose your path to optimal performance. Each category is curated with science-backed products designed for specific outcomes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {goals.map((goal) => {
            return (
              <Link 
                key={goal.id} 
                to={goal.link}
                className="group"
              >
                <Card className="overflow-hidden h-full transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-accent-glow border-border">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={goal.image} 
                      alt={goal.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${goal.color} to-transparent`} />
                  </div>
                  
                  <div className="p-6 bg-card">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {goal.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-accent text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Explore {goal.title}</span>
                      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};