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
  
  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(Math.random() * 500) + 100;

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
    <>
      <Link to={`/product/${node.handle}`} className="group block h-full">
        <div className="bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-medium h-full flex flex-col border border-mist">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-pearl relative flex-shrink-0">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-caption text-stone">No image</span>
              </div>
            )}
            
            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm text-foreground p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-carbon hover:text-ivory shadow-soft"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
          
          {/* Product Info */}
          <div className="p-6 space-y-4 flex-1 flex flex-col">
            <div className="space-y-3 flex-1">
              <h3 className="text-h3 text-carbon line-clamp-2 leading-tight min-h-[3rem]">
                {node.title}
              </h3>
              
              {/* Star Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= Math.floor(rating)
                          ? "fill-carbon text-carbon"
                          : star - 0.5 <= rating
                          ? "fill-carbon/50 text-carbon"
                          : "fill-none text-mist"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-caption text-stone">
                  ({reviewCount})
                </span>
              </div>
            </div>
            
            {/* Price */}
            <div className="pt-4 border-t border-mist">
              <p className="text-h3 text-carbon">
                £{price.toFixed(2)}
              </p>
            </div>
            
            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart}
              className={`w-full transition-all duration-300 ${
                justAdded ? "bg-green-600 hover:bg-green-600 text-white" : "bg-background text-carbon border border-mist hover:bg-carbon hover:text-ivory"
              } ${isAdding ? "scale-[0.98]" : ""}`}
              disabled={!firstVariant?.availableForSale || isAdding}
            >
              {isAdding ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adding...
                </span>
              ) : justAdded ? (
                <span className="flex items-center gap-2">
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
