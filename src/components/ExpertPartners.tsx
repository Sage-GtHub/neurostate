import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Expert {
  id: string;
  name: string;
  credentials: string;
  title: string;
  bio: string;
  collectionLink: string;
  specialization: string;
}

const experts: Expert[] = [
  {
    id: "dr-james-mitchell",
    name: "Dr. James Mitchell",
    credentials: "MD, PhD",
    title: "Sleep & Recovery Specialist",
    bio: "Leading expert in sleep optimization and circadian biology with 20+ years of research in performance recovery.",
    collectionLink: "/category/supplements?tag=sleep",
    specialization: "Sleep Science",
  },
  {
    id: "dr-sarah-williams",
    name: "Dr. Sarah Williams",
    credentials: "PhD, CSCS",
    title: "Sports Nutrition Scientist",
    bio: "Performance nutritionist working with Olympic athletes and professional sports teams worldwide.",
    collectionLink: "/category/supplements",
    specialization: "Nutrition",
  },
  {
    id: "dr-marcus-thompson",
    name: "Dr. Marcus Thompson",
    credentials: "DPT, CSCS",
    title: "Recovery & Performance Coach",
    bio: "Physical therapist and performance coach specializing in recovery technology and athletic optimization.",
    collectionLink: "/category/recovery-devices",
    specialization: "Recovery",
  },
  {
    id: "dr-emily-chen",
    name: "Dr. Emily Chen",
    credentials: "PhD",
    title: "Cognitive Performance Researcher",
    bio: "Neuroscientist focused on cognitive enhancement, mental clarity, and brain health optimization.",
    collectionLink: "/category/supplements?tag=cognitive",
    specialization: "Cognitive Health",
  },
];

export const ExpertPartners = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">
            Trusted by Experts
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Achievement Is Our Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We've brought together the best minds in science, performance, and wellness. Our expert partners rigorously test and curate every product to help you pursue your potential.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {experts.map((expert) => (
            <Link 
              key={expert.id}
              to={expert.collectionLink}
              className="block"
            >
              <Card 
                className="overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-accent-glow group cursor-pointer"
              >
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full mb-2">
                      {expert.specialization}
                    </span>
                    <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      {expert.credentials}
                    </p>
                    <p className="text-sm text-foreground/80 font-medium">
                      {expert.title}
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {expert.bio}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group/btn"
                    asChild
                  >
                    <span>
                      View Collection
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Our products are backed by leading researchers, athletes, and health professionals
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="text-sm font-medium">150+ Pro Teams</div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm font-medium">Olympic Athletes</div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm font-medium">Research Partners</div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm font-medium">Third-Party Tested</div>
          </div>
        </div>
      </div>
    </section>
  );
};