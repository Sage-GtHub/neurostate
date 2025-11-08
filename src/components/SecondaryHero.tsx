import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import lifestyleImage from "@/assets/cryoplunge-ice-bath.jpg";

export const SecondaryHero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src={lifestyleImage} 
              alt="Performance For Life - Athletes training and recovering"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2 max-w-xl">
            <p className="text-sm font-medium text-muted-foreground mb-3 tracking-wide">
              Trusted by 100,000+
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]">
              Performance For Life™
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-8">
              Science-backed supplements to <strong>power your goals.</strong>
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              onClick={scrollToProducts}
            >
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
