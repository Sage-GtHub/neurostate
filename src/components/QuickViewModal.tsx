import { ShopifyProduct } from "@/lib/shopify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";
import { Star, X } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickViewModalProps {
  product: ShopifyProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickViewModal = ({ product, open, onOpenChange }: QuickViewModalProps) => {
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (!product) return null;

  const { node } = product;
  const selectedVariant = node.variants.edges[selectedVariantIndex]?.node;
  const image = node.images.edges[0]?.node;
  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;

  const rating = 4.5;
  const reviewCount = Math.floor(Math.random() * 100) + 10;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${node.title} has been added to your cart.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Quick View: {node.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary/20">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < fullStars
                      ? "fill-accent text-accent"
                      : i === fullStars && hasHalfStar
                      ? "fill-accent/50 text-accent"
                      : "fill-none text-muted-foreground/30"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">({reviewCount})</span>
            </div>

            <h2 className="text-2xl font-bold">{node.title}</h2>
            <p className="text-2xl font-bold text-primary">£{price.toFixed(2)}</p>

            {node.options.length > 0 && (
              <div className="space-y-3">
                {node.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label className="block text-sm font-medium mb-2">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value, valueIndex) => {
                        const variantIndex = node.variants.edges.findIndex(
                          v => v.node.selectedOptions.some(
                            opt => opt.name === option.name && opt.value === value
                          )
                        );
                        return (
                          <Button
                            key={valueIndex}
                            variant={selectedVariantIndex === variantIndex ? "default" : "outline"}
                            size="sm"
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

            <p className="text-sm text-muted-foreground line-clamp-4">
              {node.description}
            </p>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Link to={`/product/${node.handle}`} className="flex-1">
                <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
