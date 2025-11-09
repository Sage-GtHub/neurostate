import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewsList } from "@/components/ReviewsList";
import { ArrowLeft, Loader2, Star, RefreshCw, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { supabase } from "@/integrations/supabase/client";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(state => state.addItem);
  const { addRecentlyViewed } = useRecentlyViewed();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [purchaseType, setPurchaseType] = useState<"onetime" | "subscription">("onetime");
  const [subscriptionFrequency, setSubscriptionFrequency] = useState<"monthly" | "bi-monthly" | "quarterly">("monthly");

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => fetchProductByHandle(handle!),
    enabled: !!handle,
  });

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ['reviews', handle],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_handle', handle)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!handle,
  });

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  useEffect(() => {
    if (product) {
      addRecentlyViewed({ node: product });
    }
  }, [product, addRecentlyViewed]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <p className="text-destructive">Product not found</p>
        </div>
      </>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;
  const subscriptionPrice = price * 0.85; // 15% discount for subscription

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
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
      isSubscription,
      subscriptionFrequency: isSubscription ? subscriptionFrequency : undefined
    };
    
    addItem(cartItem);
    
    const message = isSubscription
      ? `${product.title} subscription added to cart (15% off, delivered ${subscriptionFrequency}!)`
      : `${product.title} has been added to your cart.`;
    
    toast.success("Added to cart", {
      description: message,
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            {product.images.edges[0]?.node ? (
              <div className="aspect-square rounded-lg overflow-hidden bg-secondary/20">
                <img
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-lg bg-secondary/20 flex items-center justify-center">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}
            
            {product.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.edges.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden bg-secondary/20">
                    <img
                      src={image.node.url}
                      alt={image.node.altText || `${product.title} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(averageRating) ? "fill-accent text-accent" : "fill-none text-muted-foreground/30"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {averageRating > 0 ? `${averageRating.toFixed(1)} out of 5` : "No reviews yet"} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              </div>
            </div>

            {/* Purchase Type Selection */}
            <div className="border rounded-lg p-4 bg-secondary/20">
              <RadioGroup value={purchaseType} onValueChange={(value) => setPurchaseType(value as "onetime" | "subscription")}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onetime" id="onetime" />
                      <Label htmlFor="onetime" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span className="font-medium">One-time purchase</span>
                        </div>
                      </Label>
                    </div>
                    <span className="text-lg font-bold">£{price.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="subscription" id="subscription" />
                      <Label htmlFor="subscription" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4" />
                          <div>
                            <span className="font-medium">Subscribe & Save 15%</span>
                            <p className="text-xs text-muted-foreground">Choose delivery frequency, cancel anytime</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">£{subscriptionPrice.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground line-through">£{price.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </RadioGroup>
              
              {/* Subscription Frequency Options */}
              {purchaseType === "subscription" && (
                <div className="mt-4 pt-4 border-t">
                  <Label className="text-sm font-medium mb-2 block">Delivery Frequency</Label>
                  <RadioGroup value={subscriptionFrequency} onValueChange={(value) => setSubscriptionFrequency(value as "monthly" | "bi-monthly" | "quarterly")}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="cursor-pointer text-sm">Every month</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bi-monthly" id="bi-monthly" />
                        <Label htmlFor="bi-monthly" className="cursor-pointer text-sm">Every 2 months</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="quarterly" id="quarterly" />
                        <Label htmlFor="quarterly" className="cursor-pointer text-sm">Every 3 months (quarterly)</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>

            {product.options.length > 0 && (
              <div className="space-y-4">
                {product.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label className="block text-sm font-medium mb-2">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value, valueIndex) => {
                        const variantIndex = product.variants.edges.findIndex(
                          v => v.node.selectedOptions.some(
                            opt => opt.name === option.name && opt.value === value
                          )
                        );
                        return (
                          <Button
                            key={valueIndex}
                            variant={selectedVariantIndex === variantIndex ? "default" : "outline"}
                            onClick={() => setSelectedVariantIndex(variantIndex)}
                          >
                            {value}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
            </Button>

            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="border-t pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(averageRating) ? "fill-accent text-accent" : "fill-none text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {averageRating > 0 ? `${averageRating.toFixed(1)} out of 5` : "No ratings yet"}
                  </span>
                </div>
              </div>
              
              <ReviewsList reviews={reviews} />
              
              <ReviewForm 
                productId={product.id} 
                productHandle={product.handle}
                onReviewSubmitted={refetchReviews}
              />
            </div>
          </div>
        </div>
        
        <RecentlyViewed />
      </div>
      
      <Footer />
    </>
  );
};

export default ProductDetail;
