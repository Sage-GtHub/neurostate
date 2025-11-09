import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Star, Check, Eye } from "lucide-react";
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
        <div className="bg-card border border-border rounded-lg overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
          <div className="aspect-square overflow-hidden bg-secondary/10 relative flex-shrink-0">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No image</span>
              </div>
            )}
            
            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-lg"
              aria-label="Quick view"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <div className="space-y-2 flex-1">
            <h3 className="font-medium text-foreground line-clamp-2 leading-snug min-h-[2.5rem]">
              {node.title}
            </h3>
            
            {/* Star Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(rating)
                        ? "fill-primary text-primary"
                        : star - 0.5 <= rating
                        ? "fill-primary/50 text-primary"
                        : "fill-none text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({reviewCount})
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
              {node.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <p className="text-xl font-semibold text-foreground">
              £{price.toFixed(2)}
            </p>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className={`w-full hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-medium rounded-full ${
              justAdded ? "bg-green-500 text-white hover:bg-green-500" : ""
            } ${isAdding ? "scale-95" : ""}`}
            disabled={!firstVariant?.availableForSale || isAdding}
          >
            {isAdding ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
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
