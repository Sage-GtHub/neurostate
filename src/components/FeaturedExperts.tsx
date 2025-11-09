import { Quote } from "lucide-react";

const experts = [
  {
    name: "Dr. Sarah Mitchell",
    title: "Sports Nutritionist",
    credentials: "PhD, RD, CSSD",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    quote: "The quality and purity of these supplements meet the highest professional standards I recommend to elite athletes."
  },
  {
    name: "Dr. James Chen",
    title: "Exercise Physiologist",
    credentials: "PhD, CSCS",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    quote: "Science-backed formulations that deliver real results. I trust these products for optimum performance and recovery."
  },
  {
    name: "Dr. Emma Thompson",
    title: "Clinical Nutritionist",
    credentials: "MD, MSc",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    quote: "Exceptional bioavailability and third-party testing give me confidence in recommending these to my patients."
  },
  {
    name: "Prof. Michael Davies",
    title: "Sports Medicine Consultant",
    credentials: "MD, PhD, FACSM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    quote: "These supplements represent the gold standard in sports nutrition and recovery science."
  }
];

export const FeaturedExperts = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            Professional Standards
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Leading Experts
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your achievement is our mission. Recommended by top professionals in sports science, nutrition, and medicine.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {experts.map((expert, index) => (
            <div 
              key={index} 
              className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-all animate-fade-in border border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-4 mb-4">
                <div className="flex-shrink-0">
                  <img 
                    src={expert.image} 
                    alt={expert.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{expert.name}</h3>
                  <p className="text-sm text-muted-foreground">{expert.title}</p>
                  <p className="text-xs text-primary font-medium">{expert.credentials}</p>
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary/20" />
                <p className="text-muted-foreground italic pl-6">
                  "{expert.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-background rounded-lg border border-border">
            <span className="text-sm font-medium">
              Third-Party Tested • NSF Certified • Informed Sport Approved
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
