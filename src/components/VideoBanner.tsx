import { Button } from "@/components/ui/button";
import { Play, Sparkles, TrendingUp, Heart } from "lucide-react";
import { useState } from "react";

export const VideoBanner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    {
      icon: Heart,
      title: "Enhanced Recovery",
      description: "Accelerate muscle repair and reduce inflammation"
    },
    {
      icon: Sparkles,
      title: "Better Sleep",
      description: "Optimize sleep quality for peak performance"
    },
    {
      icon: TrendingUp,
      title: "Peak Performance",
      description: "Maximize physical and mental capabilities"
    }
  ];

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-accent/10">
        {/* Placeholder for video - replace with actual video URL */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 animate-pulse" />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-accent tracking-wide uppercase">
              Science-Backed Solutions
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Recovery Journey
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover cutting-edge recovery devices and supplements designed by experts, 
              backed by science, and trusted by athletes worldwide
            </p>
          </div>

          {/* Video Play Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="group relative w-20 h-20 rounded-full bg-accent/20 backdrop-blur-sm border-2 border-accent hover:bg-accent/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,138,0,0.5)]"
              aria-label="Play video demonstration"
            >
              <Play className="w-8 h-8 text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-1 group-hover:scale-110 transition-transform" fill="currentColor" />
              <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-20" />
            </button>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-accent-glow hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_25px_rgba(255,138,0,0.7)] font-medium rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,138,0,0.4)] px-8"
            >
              Shop Products
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-border hover:border-accent hover:text-accent rounded-full transition-all duration-300 px-8"
            >
              Learn More
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 border-2 border-background"
                  />
                ))}
              </div>
              <span>10,000+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">★★★★★</span>
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
