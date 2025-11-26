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
    <Link to={`/product/${node.handle}`} className="group block h-full">
      <div className="h-full flex flex-col transition-all duration-700 ease-out">
        {/* Product Image - Seamless, no container */}
        <div className="aspect-[4/5] overflow-hidden relative flex-shrink-0 mb-8">
          {/* Urgency Indicator - Minimal badge */}
          {(isPopular || isTrending || isLowStock) && (
            <div className="absolute top-4 left-4 z-10">
              {isLowStock && <UrgencyIndicator type="low-stock" count={3} />}
              {!isLowStock && isTrending && <UrgencyIndicator type="trending" />}
              {!isLowStock && !isTrending && isPopular && <UrgencyIndicator type="popular" />}
            </div>
          )}
          
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-contain p-12 transition-all duration-1000 ease-out group-hover:scale-105 group-hover:p-8"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-caption text-stone/50">No image</span>
            </div>
          )}
        </div>
        
        {/* Product Info - Ultra minimal */}
        <div className="space-y-4 flex-1 flex flex-col">
          <h3 className="text-[1rem] font-normal text-carbon/90 line-clamp-2 leading-tight tracking-tight group-hover:text-carbon transition-colors duration-300">
            {node.title}
          </h3>
          
          <p className="text-[0.875rem] font-normal text-ash">
            £{price.toFixed(2)}
          </p>
          
          {/* Add to Cart - Minimal line that becomes button */}
          <Button 
            onClick={handleAddToCart}
            variant="ghost"
            size="sm"
            className={`mt-auto w-full justify-center text-[0.6875rem] font-medium tracking-[0.15em] uppercase transition-all duration-500 ease-out rounded-none border-t ${
              justAdded 
                ? "bg-carbon text-ivory border-carbon" 
                : "bg-transparent text-carbon/60 border-transparent group-hover:border-carbon/20 group-hover:text-carbon hover:bg-carbon/5"
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
