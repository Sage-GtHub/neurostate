import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

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
      <div className="h-full flex flex-col transition-all duration-500">
        {/* Product Image - Dominates the card */}
        <div className="aspect-[4/5] overflow-hidden bg-ivory relative flex-shrink-0 mb-6">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-contain p-12 transition-all duration-700 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-caption text-stone">No image</span>
            </div>
          )}
        </div>
        
        {/* Product Info - Minimal and calm */}
        <div className="space-y-3 flex-1 flex flex-col">
          <h3 className="text-[1.125rem] font-normal text-carbon line-clamp-2 leading-tight tracking-tight">
            {node.title}
          </h3>
          
          {/* Price - Subtle and refined */}
          <p className="text-[0.9375rem] font-normal text-stone">
            £{price.toFixed(2)}
          </p>
          
          {/* Add to Cart Button - Ghost style, appears on hover */}
          <Button 
            onClick={handleAddToCart}
            variant="ghost"
            size="sm"
            className={`mt-4 w-full justify-center border border-transparent text-[0.6875rem] font-medium tracking-wider transition-all duration-300 ${
              justAdded 
                ? "border-carbon bg-carbon text-ivory" 
                : "opacity-0 group-hover:opacity-100 group-hover:border-mist hover:border-carbon hover:bg-carbon hover:text-ivory"
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
