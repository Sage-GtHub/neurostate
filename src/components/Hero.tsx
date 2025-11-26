import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-supplement.png";

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-ivory overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20 sm:py-24 md:py-32 lg:py-48">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Content */}
          <div className="space-y-10 sm:space-y-12">
            <div className="space-y-6 sm:space-y-8">
              <p className="text-caption text-ash/60 uppercase tracking-[0.2em] font-normal">Precision Performance</p>
              <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-normal text-carbon leading-[1.1] tracking-tight">
                Your optimal state.<br/>On demand.
              </h1>
              <p className="text-body text-ash/80 max-w-xl leading-relaxed">
                Scientifically-backed supplements engineered for peak mental and physical performance.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={scrollToProducts}
                className="bg-carbon text-ivory hover:bg-slate hover:text-ivory rounded-full px-8 py-6 text-ui-label min-h-[56px] transition-all duration-500 hover:scale-[1.02]"
              >
                Shop Now
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                className="text-carbon hover:bg-carbon/5 rounded-full px-8 py-6 text-ui-label min-h-[56px] transition-all duration-500"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative w-full aspect-square flex items-center justify-center max-w-md mx-auto lg:max-w-none">
              <img 
                src={heroImage} 
                alt="NeuroState premium supplements for optimal performance" 
                className="w-full h-full object-contain transition-all duration-1000 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
