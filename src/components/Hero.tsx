import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Video Background Placeholder - Replace with actual video */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7877C6]/20 via-transparent to-[#7877C6]/10 animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(120,119,198,0.1),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-32">
        <div className="max-w-6xl mx-auto text-center space-y-10 animate-fade-in">
          <div className="inline-block px-6 py-3 bg-white/[0.03] border border-white/10 backdrop-blur-sm mb-6">
            <p className="text-[#7877C6] text-xs tracking-[0.3em] uppercase font-medium">
              Neuromodulation Technology
            </p>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white/95 leading-[1.05] tracking-tight">
            Engineer your
            <br />
            <span className="font-normal bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
              cognitive peak
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            AI-powered performance optimisation, photobiomodulation devices, 
            and precision supplements for the modern human.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-white/90 text-base px-10 py-7 rounded-full group transition-all duration-300"
            >
              Explore the System
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/10 text-white/90 hover:bg-white/5 text-base px-10 py-7 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
};

export default Hero;
