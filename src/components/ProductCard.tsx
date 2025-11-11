import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Star, Check, Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import { QuickViewModal } from "@/components/QuickViewModal";

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
  const [showQuickView, setShowQuickView] = useState(false);
  
  // Mock review data (4.5-5 star range for premium products)
  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(Math.random() * 500) + 100;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!firstVariant) {
      toast.error("Product unavailable");
      return;
    }

    setIsAdding(true);
    
    // Simulate brief delay for animation
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
    
    // Reset after animation
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <>
      <Link to={`/product/${node.handle}`} className="group block h-full">
        <div className="bg-card rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[var(--shadow-medium)] h-full flex flex-col border border-border/40">
          <div className="aspect-square overflow-hidden bg-muted/30 relative flex-shrink-0">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm font-light">No image</span>
              </div>
            )}
            
            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm text-foreground p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        <div className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 flex-1 flex flex-col">
          <div className="space-y-2 sm:space-y-3 flex-1">
            <h3 className="font-medium text-foreground line-clamp-2 leading-snug min-h-[2.5rem] text-sm sm:text-base">
              {node.title}
            </h3>
            
            {/* Star Rating */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                      star <= Math.floor(rating)
                        ? "fill-accent text-accent"
                        : star - 0.5 <= rating
                        ? "fill-accent/50 text-accent"
                        : "fill-none text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground font-light">
                ({reviewCount})
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <div>
              <p className="text-base sm:text-lg font-light text-foreground tracking-tight">
                £{price.toFixed(2)}
              </p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-1 sm:mt-1.5 font-light leading-tight">
                or £{(price * 0.85).toFixed(2)} with Subscribe & Save
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className={`w-full bg-background text-foreground border border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 font-medium rounded-full min-h-[44px] sm:min-h-[48px] text-sm sm:text-base shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] ${
              justAdded ? "bg-green-600 hover:bg-green-600 text-white border-green-600" : ""
            } ${isAdding ? "scale-[0.98]" : ""}`}
            disabled={!firstVariant?.availableForSale || isAdding}
          >
            {isAdding ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding...
              </span>
            ) : justAdded ? (
              <span className="flex items-center gap-2 animate-scale-in">
                <Check className="h-4 w-4" />
                Added!
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

    <QuickViewModal
      product={product}
      open={showQuickView}
      onOpenChange={setShowQuickView}
    />
  </>
  );
};
