import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ArrowRight, Check } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";

const bundles = [
  {
    id: "sleep-stack",
    name: "Sleep Optimisation Stack",
    description: "Complete sleep support bundle for deep, restorative rest",
    discount: 20,
    productKeywords: ["sleep", "rest", "night"],
    benefits: ["Better sleep quality", "Faster sleep onset", "Wake refreshed"]
  },
  {
    id: "recovery-bundle",
    name: "Recovery & Performance Bundle",
    description: "Everything you need for optimal recovery and muscle repair",
    discount: 25,
    productKeywords: ["recovery", "red", "restore", "collagen"],
    benefits: ["Faster recovery", "Reduced inflammation", "Enhanced repair"]
  },
  {
    id: "cognitive-kit",
    name: "Cognitive Performance Kit",
    description: "Boost focus, clarity, and mental performance",
    discount: 15,
    productKeywords: ["cognitive", "focus", "brain", "neuro"],
    benefits: ["Enhanced focus", "Mental clarity", "Peak performance"]
  }
];

export const ProductBundles = () => {
  const addItem = useCartStore(state => state.addItem);
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(50),
  });

  if (!products || products.length < 3) return null;

  const getBundleProducts = (keywords: string[]) => {
    return products
      .filter(product => {
        const text = (product.node.title + ' ' + product.node.description).toLowerCase();
        return keywords.some(keyword => text.includes(keyword));
      })
      .slice(0, 3);
  };

  const calculateBundlePrice = (bundleProducts: any[], discount: number) => {
    const total = bundleProducts.reduce((sum, p) => 
      sum + parseFloat(p.node.priceRange.minVariantPrice.amount), 0
    );
    const discountedPrice = total * (1 - discount / 100);
    return { original: total, discounted: discountedPrice, savings: total - discountedPrice };
  };

  const handleAddBundle = (bundle: typeof bundles[0]) => {
    const bundleProducts = getBundleProducts(bundle.productKeywords);
    
    if (bundleProducts.length === 0) {
      toast.error("Bundle products not available");
      return;
    }

    bundleProducts.forEach(product => {
      const firstVariant = product.node.variants.edges[0]?.node;
      if (firstVariant) {
        addItem({
          product,
          variantId: firstVariant.id,
          variantTitle: firstVariant.title,
          price: firstVariant.price,
          quantity: 1,
          selectedOptions: firstVariant.selectedOptions || []
        });
      }
    });

    toast.success("Bundle added to cart", {
      description: `${bundle.name} has been added to your cart with ${bundle.discount}% off!`,
    });
  };

  return (
    <section id="bundles" className="py-12 sm:py-16 px-6 sm:px-8 lg:px-20 xl:px-32 bg-secondary/20">
      <div className="w-full">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <Badge variant="secondary" className="text-xs sm:text-sm">Best Value</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Curated Bundles</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Save more with our expertly designed supplement stacks
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bundles.map((bundle) => {
            const bundleProducts = getBundleProducts(bundle.productKeywords);
            if (bundleProducts.length === 0) return null;
            
            const pricing = calculateBundlePrice(bundleProducts, bundle.discount);

            return (
              <div key={bundle.id} className="p-6 sm:p-8 border-t border-border/30 hover:translate-y-[-4px] transition-all duration-300">
                <div className="mb-5 sm:mb-6">
                  <Badge className="mb-2 sm:mb-3 bg-accent text-accent-foreground text-xs sm:text-sm">
                    Save {bundle.discount}%
                  </Badge>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{bundle.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light mb-3 sm:mb-4">
                    {bundle.description}
                  </p>
                </div>

                <div className="space-y-2 mb-5 sm:mb-6">
                  {bundle.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                      <span className="font-light">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 sm:pt-4 mb-4">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1">
                    Includes {bundleProducts.length} products
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-bold">
                      £{pricing.discounted.toFixed(2)}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      £{pricing.original.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-primary font-medium">
                    Save £{pricing.savings.toFixed(2)}
                  </div>
                </div>

                <Button 
                  onClick={() => handleAddBundle(bundle)}
                  variant="outline"
                  className="w-full rounded-full bg-background text-foreground border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-[0_0_20px_rgba(255,138,0,0.6)] transition-all duration-300 font-medium min-h-[44px] sm:min-h-[48px] text-sm sm:text-base"
                >
                  Add Bundle
                  <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
