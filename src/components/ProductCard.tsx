import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Check, Loader2, ArrowUpRight } from "lucide-react";
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
    toast.info("Coming Soon", {
      description: "Our shop is launching soon. Stay tuned!",
    });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block h-full">
      <div className="h-full flex flex-col">
        {/* Product Image - Organic shape with hover effect */}
        <div className="aspect-square overflow-hidden bg-gradient-to-b from-stone-50 to-stone-100/50 rounded-3xl relative mb-5 group-hover:shadow-lg transition-all duration-500">
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-accent/5 to-transparent" />
          
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-contain p-8 md:p-12 transition-all duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[10px] text-foreground/30">No image</span>
            </div>
          )}
          
          {/* View indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5 text-foreground" />
            </div>
          </div>
        </div>
        
        {/* Product Info - Minimal */}
        <div className="space-y-2 flex-1 flex flex-col">
          <h3 className="text-sm font-normal text-foreground/80 group-hover:text-foreground transition-colors line-clamp-2 leading-snug">
            {node.title}
          </h3>
          
          <p className="text-xs text-foreground/40">
            £{price.toFixed(2)}
          </p>
          
          {/* Add to Cart - Pill button */}
          <div className="mt-auto pt-4">
            <Button 
              onClick={handleAddToCart}
              variant="ghost"
              size="sm"
              className={`w-full justify-center rounded-full text-[10px] font-medium tracking-wide transition-all duration-300 h-9 ${
                justAdded 
                  ? "bg-emerald-500 text-white border-0" 
                  : "bg-foreground/[0.03] text-foreground/60 hover:bg-foreground hover:text-background border-0"
              }`}
              disabled={!firstVariant?.availableForSale || isAdding}
            >
              {isAdding ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                </span>
              ) : justAdded ? (
                <span className="flex items-center gap-2">
                  <Check className="h-3 w-3" />
                  Added
                </span>
              ) : firstVariant?.availableForSale ? (
                "Add to cart"
              ) : (
                "Out of stock"
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
