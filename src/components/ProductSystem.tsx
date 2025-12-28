import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

interface Product {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  href: string;
  features: string[];
}

const products: Product[] = [
  {
    name: "Nova",
    tagline: "Cognitive AI Engine",
    description: "Your personal performance analyst. Nova learns your patterns and predicts when you'll be at your best — and when you won't.",
    icon: "N",
    href: "/nova/overview",
    features: ["72-hour forecasting", "Wearable sync", "Daily briefings"]
  },
  {
    name: "Axon",
    tagline: "Precision Supplements",
    description: "Research-backed formulations designed for measurable impact. No fillers, no fluff — just ingredients that actually work.",
    icon: "A",
    href: "/category/supplements",
    features: ["Third-party tested", "Clinically dosed", "Synergistic stacks"]
  },
  {
    name: "Pulse",
    tagline: "Light Therapy Devices",
    description: "Clinical-grade photobiomodulation for your brain and body. Red and near-infrared wavelengths that prime you for performance.",
    icon: "P",
    href: "/category/devices",
    features: ["660nm & 850nm", "Portable design", "App-controlled"]
  }
];

export const ProductSystem = () => {
  const section = useScrollAnimation();

  return (
    <section 
      ref={section.ref}
      className={`py-24 md:py-32 px-6 md:px-8 bg-muted/30 transition-all duration-700 ${section.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Neurostate System</span>
          <h2 className="text-large-display text-foreground">
            Three products. One mission.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Everything works together. Nova tells you what you need. Axon gives your brain the fuel. Pulse helps you recover and reset.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <Link 
              key={i}
              to={product.href}
              className="group relative bg-background rounded-3xl p-8 border border-border/50 hover:border-primary/20 transition-all duration-500 overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <span className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">{product.icon}</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">{product.name}</h3>
                  <p className="text-xs text-primary">{product.tagline}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, j) => (
                    <span key={j} className="px-2.5 py-1 text-[10px] text-muted-foreground bg-muted rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-xs text-foreground font-medium group-hover:text-primary transition-colors">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button 
              variant="outline" 
              className="h-11 px-6 text-xs font-medium rounded-full border-border/50 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
            >
              Explore all products
              <ArrowRight className="ml-2 w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
