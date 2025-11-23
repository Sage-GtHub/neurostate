import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductInfoProps {
  product: any;
  selectedVariantIndex: number;
  setSelectedVariantIndex: (index: number) => void;
}

export const ProductInfo = ({
  product,
  selectedVariantIndex,
  setSelectedVariantIndex,
}: ProductInfoProps) => {
  const addItem = useCartStore(state => state.addItem);
  
  const isSupplement = product.productType?.toLowerCase().includes('supplement') || 
    product.tags?.some((tag: string) => tag.toLowerCase().includes('supplement'));
  
  const [purchaseType, setPurchaseType] = useState<"onetime" | "subscription">(isSupplement ? "subscription" : "onetime");
  const [subscriptionFrequency, setSubscriptionFrequency] = useState<"monthly" | "bi-monthly" | "quarterly">("monthly");
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;
  const subscriptionPrice = price * 0.85;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const isSubscription = purchaseType === "subscription";
    const effectivePrice = isSubscription ? subscriptionPrice.toString() : selectedVariant.price.amount;

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: {
        amount: effectivePrice,
        currencyCode: selectedVariant.price.currencyCode
      },
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
      isSubscription,
      subscriptionFrequency: isSubscription ? subscriptionFrequency : undefined
    };
    
    addItem(cartItem);
    
    const message = isSubscription
      ? `${product.title} subscription added (15% off, ${subscriptionFrequency})`
      : `${product.title} added to cart`;
    
    toast.success("Added to cart", { description: message });
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-4">{product.title}</h1>
        
        {isSupplement && (
          <div className="flex items-center gap-4 mb-6 text-[0.8125rem] text-stone">
            <span className="font-medium">30 Servings</span>
            <span>•</span>
            <span className="font-medium">£{(price / 30).toFixed(2)}/Serving</span>
          </div>
        )}

        <p className="text-body-large mb-8 text-ash">
          {product.description && product.description.length > 180 
            ? `${product.description.substring(0, 180)}...` 
            : product.description}
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-carbon mt-1">✓</span>
            <p className="text-[0.9375rem] text-ash">
              Third-party tested and NSF Certified for quality and purity
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-carbon mt-1">✓</span>
            <p className="text-[0.9375rem] text-ash">
              Supports optimal cellular function and recovery
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-carbon mt-1">✓</span>
            <p className="text-[0.9375rem] text-ash">
              Science-backed formulation with clean, bioavailable ingredients
            </p>
          </div>
        </div>
      </div>

      {/* Purchase Type */}
      <div className="border-t border-mist pt-10">
        {isSupplement ? (
          <>
            <RadioGroup value={purchaseType} onValueChange={(value) => setPurchaseType(value as "onetime" | "subscription")}>
              <div className="space-y-4">
                <div 
                  className={`flex items-center justify-between py-4 transition-all ${
                    purchaseType === "subscription" 
                      ? "border-b-2 border-carbon" 
                      : "border-b border-mist"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="subscription" id="subscription" />
                    <Label htmlFor="subscription" className="cursor-pointer">
                      <div>
                        <div className="text-[0.9375rem] font-medium text-carbon mb-1">
                          Subscribe & Save 15%
                        </div>
                        <div className="text-[0.8125rem] text-stone">Cancel anytime, free delivery</div>
                      </div>
                    </Label>
                  </div>
                  <div className="text-right">
                    <div className="text-[1.25rem] font-medium text-carbon">£{subscriptionPrice.toFixed(2)}</div>
                    <div className="text-[0.8125rem] text-stone line-through">£{price.toFixed(2)}</div>
                  </div>
                </div>

                <div 
                  className={`flex items-center justify-between py-4 transition-all ${
                    purchaseType === "onetime" 
                      ? "border-b-2 border-carbon" 
                      : "border-b border-mist"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="onetime" id="onetime" />
                    <Label htmlFor="onetime" className="cursor-pointer">
                      <span className="text-[0.9375rem] font-medium text-carbon">One-time purchase</span>
                    </Label>
                  </div>
                  <div className="text-[1.25rem] font-medium text-carbon">£{price.toFixed(2)}</div>
                </div>
              </div>
            </RadioGroup>
            
            {purchaseType === "subscription" && (
              <div className="mt-8 pt-8 border-t border-mist">
                <Label className="text-[0.875rem] font-medium mb-4 block text-carbon">Delivery Frequency</Label>
                <RadioGroup value={subscriptionFrequency} onValueChange={(value) => setSubscriptionFrequency(value as any)}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="monthly" id="freq-monthly" />
                      <Label htmlFor="freq-monthly" className="cursor-pointer text-[0.875rem] text-ash">Every 30 days</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="bi-monthly" id="freq-bimonthly" />
                      <Label htmlFor="freq-bimonthly" className="cursor-pointer text-[0.875rem] text-ash">Every 60 days</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="quarterly" id="freq-quarterly" />
                      <Label htmlFor="freq-quarterly" className="cursor-pointer text-[0.875rem] text-ash">Every 90 days</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-between py-6 border-b-2 border-carbon">
            <span className="text-[0.9375rem] font-medium text-carbon">One-time purchase</span>
            <div className="text-[1.25rem] font-medium text-carbon">£{price.toFixed(2)}</div>
          </div>
        )}
      </div>

      {/* Variants */}
      {product.options.length > 0 && product.options[0].values.length > 1 && (
        <div className="border-t border-mist pt-10">
          <label className="block text-[0.875rem] font-medium mb-4 text-carbon">{product.options[0].name}</label>
          <div className="flex flex-wrap gap-3">
            {product.options[0].values.map((value: string, valueIndex: number) => {
              const variantIndex = product.variants.edges.findIndex(
                (v: any) => v.node.selectedOptions.some(
                  (opt: any) => opt.name === product.options[0].name && opt.value === value
                )
              );
              return (
                <Button
                  key={valueIndex}
                  variant={selectedVariantIndex === variantIndex ? "default" : "outline"}
                  onClick={() => setSelectedVariantIndex(variantIndex)}
                  size="sm"
                  className="min-w-[80px]"
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="border-t border-mist pt-10">
        <label className="block text-[0.875rem] font-medium mb-4 text-carbon">Quantity</label>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-medium text-[1.125rem] w-12 text-center text-carbon">{quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Add to Cart */}
      <Button
        size="lg"
        variant="outline"
        className="w-full border-carbon text-carbon hover:bg-carbon hover:text-ivory transition-all duration-300"
        onClick={handleAddToCart}
        disabled={!selectedVariant?.availableForSale}
      >
        {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
      </Button>

      <p className="text-center text-[0.8125rem] text-stone">
        Free delivery on orders over £50
      </p>
    </div>
  );
};
