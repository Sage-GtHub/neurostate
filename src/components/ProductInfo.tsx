import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Package, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface Variant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

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
  const [purchaseType, setPurchaseType] = useState<"onetime" | "subscription">("subscription");
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
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
        <p className="text-lg text-muted-foreground">{product.description}</p>
      </div>

      {/* Purchase Type */}
      <div className="border rounded-lg p-4 bg-secondary/10">
        <RadioGroup value={purchaseType} onValueChange={(value) => setPurchaseType(value as "onetime" | "subscription")}>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/20 transition-colors">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="subscription" id="subscription" />
                <Label htmlFor="subscription" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">Subscribe & Save 15%</div>
                      <div className="text-xs text-muted-foreground">Cancel anytime, free shipping</div>
                    </div>
                  </div>
                </Label>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">£{subscriptionPrice.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground line-through">£{price.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/20 transition-colors">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="onetime" id="onetime" />
                <Label htmlFor="onetime" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span className="font-semibold">One-time purchase</span>
                  </div>
                </Label>
              </div>
              <div className="text-xl font-bold">£{price.toFixed(2)}</div>
            </div>
          </div>
        </RadioGroup>
        
        {purchaseType === "subscription" && (
          <div className="mt-4 pt-4 border-t">
            <Label className="text-sm font-medium mb-2 block">Delivery Frequency</Label>
            <RadioGroup value={subscriptionFrequency} onValueChange={(value) => setSubscriptionFrequency(value as any)}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="freq-monthly" />
                  <Label htmlFor="freq-monthly" className="cursor-pointer text-sm">Every 30 days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bi-monthly" id="freq-bimonthly" />
                  <Label htmlFor="freq-bimonthly" className="cursor-pointer text-sm">Every 60 days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quarterly" id="freq-quarterly" />
                  <Label htmlFor="freq-quarterly" className="cursor-pointer text-sm">Every 90 days</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      {/* Variants */}
      {product.options.length > 0 && product.options[0].values.length > 1 && (
        <div>
          <label className="block text-sm font-medium mb-2">{product.options[0].name}</label>
          <div className="flex flex-wrap gap-2">
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
      <div>
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Add to Cart */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleAddToCart}
        disabled={!selectedVariant?.availableForSale}
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
      </Button>

      {/* Free Shipping Badge */}
      <div className="text-center text-sm text-muted-foreground">
        Free shipping on orders over £50
      </div>
    </div>
  );
};
