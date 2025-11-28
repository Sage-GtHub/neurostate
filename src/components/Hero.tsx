import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-carbon via-slate to-carbon">
      {/* Video Background Placeholder - Replace with actual video */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10 animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.05),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-4">
            <p className="text-accent text-xs tracking-[0.2em] uppercase font-medium">
              Neuromodulation Technology
            </p>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-ivory leading-[1.1] tracking-tight">
            Engineer your
            <br />
            <span className="font-normal bg-gradient-to-r from-ivory via-pearl to-ivory bg-clip-text text-transparent">
              cognitive peak
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-stone max-w-2xl mx-auto font-light leading-relaxed">
            AI-powered performance optimization, photobiomodulation devices, 
            and precision supplements for the modern human.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg"
              className="bg-ivory text-carbon hover:bg-pearl text-base px-8 py-6 rounded-full group transition-all duration-300 hover:scale-105"
            >
              Explore the System
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-ivory/20 text-ivory hover:bg-ivory/10 text-base px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-ivory/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-ivory/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-carbon to-transparent" />
    </section>
  );
};

export default Hero;
