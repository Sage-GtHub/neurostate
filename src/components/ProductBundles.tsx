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
    <section id="bundles" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-20 xl:px-32 bg-secondary/20">
      <div className="w-full">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <Package className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-ui-label">Best Value</Badge>
          </div>
          <h2 className="mb-6">Curated bundles</h2>
          <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
            Save more with our expertly designed supplement stacks
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => {
            const bundleProducts = getBundleProducts(bundle.productKeywords);
            if (bundleProducts.length === 0) return null;
            
            const pricing = calculateBundlePrice(bundleProducts, bundle.discount);

            return (
              <div key={bundle.id} className="p-8 sm:p-10 rounded-xl bg-card hover:shadow-large hover:translate-y-[-4px] transition-all duration-300">
                <div className="mb-8">
                  <Badge className="mb-4 bg-accent text-accent-foreground text-ui-label">
                    Save {bundle.discount}%
                  </Badge>
                  <h3 className="mb-3">{bundle.name}</h3>
                  <p className="text-body text-muted-foreground">
                    {bundle.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {bundle.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-body">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 mb-6">
                  <div className="text-caption text-muted-foreground mb-2">
                    Includes {bundleProducts.length} products
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-h2">
                      £{pricing.discounted.toFixed(2)}
                    </span>
                    <span className="text-body text-muted-foreground line-through">
                      £{pricing.original.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-caption text-primary font-medium">
                    Save £{pricing.savings.toFixed(2)}
                  </div>
                </div>

                <Button 
                  onClick={() => handleAddBundle(bundle)}
                  size="lg"
                  className="w-full"
                >
                  Add Bundle
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
