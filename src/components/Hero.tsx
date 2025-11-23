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
      {/* Subtle Snow Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-mist rounded-full opacity-40 animate-snowfall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16 md:py-24 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <p className="ghost-number">Precision Performance</p>
              <h1 className="text-hero-display text-carbon">
                Your optimal state. On demand.
              </h1>
              <p className="text-body-large text-ash max-w-xl">
                Scientifically-backed supplements engineered for peak mental and physical performance.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                onClick={scrollToProducts}
                className="bg-carbon text-ivory hover:bg-slate hover:text-ivory rounded-lg px-6 sm:px-8 py-4 sm:py-6 text-ui-label min-h-[48px] touch-manipulation"
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-carbon text-carbon hover:bg-carbon hover:text-ivory rounded-lg px-6 sm:px-8 py-4 sm:py-6 text-ui-label min-h-[48px] touch-manipulation"
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
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient Accent Line */}
      <div className="gradient-line" />
    </section>
  );
};

export default Hero;
