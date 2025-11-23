import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import sleepImage from "@/assets/restoresleep-night-new.png";
import recoveryImage from "@/assets/red-light-therapy-blanket-new.png";
import performanceImage from "@/assets/pemf-therapy-mat-new.png";
import cognitiveImage from "@/assets/neurofocus-cognitive-new.png";

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
    description: "Optimize sleep quality and recovery with science-backed tools for deeper, restorative rest.",
    image: sleepImage,
    link: "/category/sleep",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    id: "recovery",
    title: "Recovery",
    description: "Accelerate muscle recovery and reduce inflammation with advanced therapeutic technologies.",
    image: recoveryImage,
    link: "/category/recovery",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "performance",
    title: "Performance",
    description: "Enhance athletic performance and endurance with precision recovery and training tools.",
    image: performanceImage,
    link: "/category/performance",
    color: "from-accent/20 to-yellow-500/20",
  },
  {
    id: "cognitive",
    title: "Cognitive function",
    description: "Support mental clarity, focus, and brain health with nootropics and cognitive enhancers.",
    image: cognitiveImage,
    link: "/category/cognitive",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

export const ShopByGoal = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
      <div className="w-full">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <p className="ghost-number mb-3 sm:mb-4 md:mb-6">
            PERFORMANCE SYSTEMS
          </p>
          <h2 className="mb-4 sm:mb-6">Shop by goal</h2>
          <p className="text-body-large text-muted-foreground max-w-2xl">
            Precision tools designed for how you want to perform
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {goals.map((goal) => {
            return (
              <Link 
                key={goal.id} 
                to={goal.link}
                className="group"
              >
                <div className="overflow-hidden h-full transition-all duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden bg-pearl mb-6 rounded-2xl">
                    <img 
                      src={goal.image} 
                      alt={goal.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-[1.25rem] font-medium group-hover:text-slate transition-colors duration-300">
                      {goal.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-relaxed text-ash">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};