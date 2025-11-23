import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
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
    <section id="bundles" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-20 xl:px-32">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="ghost-number mb-6">BUNDLE & SAVE</p>
          <h2 className="mb-6">Curated stacks</h2>
          <p className="text-body-large text-ash max-w-2xl">
            Complete systems designed for your performance goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {bundles.map((bundle) => {
            const bundleProducts = getBundleProducts(bundle.productKeywords);
            if (bundleProducts.length === 0) return null;
            
            const pricing = calculateBundlePrice(bundleProducts, bundle.discount);

            return (
              <div key={bundle.id} className="flex flex-col transition-all duration-500 group">
                <div className="mb-8">
                  <span className="inline-block text-[0.6875rem] font-medium tracking-wider uppercase text-carbon mb-4 px-3 py-1 border border-mist rounded-full">
                    Save {bundle.discount}%
                  </span>
                  <h3 className="text-[1.25rem] font-medium mb-4">{bundle.name}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ash">
                    {bundle.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {bundle.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-carbon flex-shrink-0 mt-0.5" />
                      <span className="text-[0.9375rem] text-ash">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="text-[0.8125rem] text-stone mb-3">
                    Includes {bundleProducts.length} products
                  </div>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-[1.5rem] font-medium">
                      £{pricing.discounted.toFixed(2)}
                    </span>
                    <span className="text-[0.875rem] text-stone line-through">
                      £{pricing.original.toFixed(2)}
                    </span>
                  </div>

                  <Button 
                    onClick={() => handleAddBundle(bundle)}
                    size="sm"
                    variant="outline"
                    className="w-full group-hover:bg-carbon group-hover:text-ivory transition-all duration-300"
                  >
                    Add Bundle
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
