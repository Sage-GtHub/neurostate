import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";

export const ProductComparison = () => {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(50),
  });

  const [selectedProducts, setSelectedProducts] = useState<number[]>([0, 1, 2]);

  if (!products || products.length < 2) return null;

  const comparisonProducts = selectedProducts.map(index => products[index]).filter(Boolean);

  const features = [
    { name: "Third-Party Tested", key: "tested" },
    { name: "NSF Certified", key: "nsf" },
    { name: "Vegan Friendly", key: "vegan" },
    { name: "Gluten Free", key: "glutenFree" },
    { name: "Money-Back Guarantee", key: "guarantee" },
  ];

  // Mock feature data - in real app, this would come from product metadata
  const getFeatureValue = (productIndex: number, featureKey: string) => {
    const randomValues: Record<string, boolean[]> = {
      tested: [true, true, true],
      nsf: [true, true, false],
      vegan: [true, false, true],
      glutenFree: [true, true, true],
      guarantee: [true, true, true],
    };
    return randomValues[featureKey]?.[productIndex] ?? false;
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Not sure which product is right for you? Compare features side by side
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-4 gap-4">
              {/* Feature Column */}
              <div className="space-y-4">
                <div className="h-48"></div>
                {features.map((feature, index) => (
                  <div key={index} className="h-12 flex items-center font-medium">
                    {feature.name}
                  </div>
                ))}
              </div>

              {/* Product Columns */}
              {comparisonProducts.map((product, productIndex) => {
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                const image = product.node.images.edges[0]?.node;
                
                return (
                  <Card key={product.node.id} className="p-4 space-y-4">
                    <div className="space-y-3">
                      <div className="aspect-square rounded-lg overflow-hidden bg-secondary/20">
                        {image ? (
                          <img
                            src={image.url}
                            alt={product.node.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">No image</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                          {product.node.title}
                        </h3>
                        <p className="text-lg font-bold text-primary">
                          £{price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="h-12 flex items-center justify-center">
                        {getFeatureValue(productIndex, feature.key) ? (
                          <Check className="h-5 w-5 text-primary" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/30" />
                        )}
                      </div>
                    ))}

                    <Link to={`/product/${product.node.handle}`}>
                      <Button className="w-full" size="sm">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
