import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-stone/5 via-transparent to-stone/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-32">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          <div className="inline-block px-6 py-3 bg-carbon/5 border border-carbon/10 mb-6">
            <p className="text-carbon text-xs tracking-[0.3em] uppercase font-medium">
              Neuromodulation Technology
            </p>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-carbon leading-[1.05] tracking-tight">
            Engineer your
            <br />
            <span className="font-normal">
              cognitive peak
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-ash max-w-3xl mx-auto font-light leading-relaxed">
            AI-powered performance optimisation, photobiomodulation devices, 
            and precision supplements for the modern human.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
            <Button 
              size="lg"
              className="bg-carbon text-white hover:bg-slate text-base px-10 py-7 rounded-full group transition-all duration-300"
            >
              Explore the System
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-carbon/20 text-carbon hover:bg-carbon/5 text-base px-10 py-7 rounded-full transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-carbon/20 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-carbon/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
