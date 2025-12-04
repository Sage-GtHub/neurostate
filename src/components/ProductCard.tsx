import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { UrgencyIndicator } from "./UrgencyIndicator";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Determine urgency indicator
  const isPopular = node.tags.includes("popular") || node.tags.includes("bestseller");
  const isTrending = node.tags.includes("trending") || node.tags.includes("new");
  const isLowStock = false; // This would come from inventory data in a real scenario

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!firstVariant) {
      toast.error("Product unavailable");
      return;
    }

    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    setIsAdding(false);
    setJustAdded(true);
    
    toast.success("Added to cart", {
      description: `${node.title} has been added to your cart.`,
    });
    
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block h-full touch-manipulation">
      <div className="h-full flex flex-col transition-all duration-500">
        {/* Product Image - Dominates the card */}
        <div className="aspect-[4/5] overflow-hidden bg-ivory relative flex-shrink-0 mb-4 sm:mb-6">
          {/* Urgency Indicator */}
          {(isPopular || isTrending || isLowStock) && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
              {isLowStock && <UrgencyIndicator type="low-stock" count={3} />}
              {!isLowStock && isTrending && <UrgencyIndicator type="trending" />}
              {!isLowStock && !isTrending && isPopular && <UrgencyIndicator type="popular" />}
            </div>
          )}
          
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-contain p-6 sm:p-12 transition-all duration-700 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-caption text-stone">No image</span>
            </div>
          )}
        </div>
        
        {/* Product Info - Minimal and calm */}
        <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col">
          <h3 className="text-sm sm:text-[1.125rem] font-normal text-carbon line-clamp-2 leading-tight tracking-tight">
            {node.title}
          </h3>
          
          {/* Price - Subtle and refined */}
          <p className="text-sm sm:text-[0.9375rem] font-normal text-stone">
            £{price.toFixed(2)}
          </p>
          
          {/* Add to Cart Button - Always visible on mobile, ghost on desktop */}
          <Button 
            onClick={handleAddToCart}
            variant="ghost"
            size="sm"
            className={`mt-3 sm:mt-4 w-full justify-center border text-[0.6875rem] font-medium tracking-wider transition-all duration-300 min-h-[44px] touch-manipulation ${
              justAdded 
                ? "border-signal-green bg-signal-green text-ivory" 
                : "border-mist lg:opacity-0 lg:border-transparent lg:group-hover:opacity-100 lg:group-hover:border-mist hover:border-carbon hover:bg-carbon hover:text-ivory"
            }`}
            disabled={!firstVariant?.availableForSale || isAdding}
          >
            {isAdding ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Adding
              </span>
            ) : justAdded ? (
              <span className="flex items-center gap-2">
                <Check className="h-3 w-3" />
                Added
              </span>
            ) : firstVariant?.availableForSale ? (
              "Add to Cart"
            ) : (
              "Out of Stock"
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
};
