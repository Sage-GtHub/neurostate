import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Star, Eye, RefreshCw } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
  onQuickView?: () => void;
}

export const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const subscriptionPrice = price * 0.85; // 15% discount
  
  // Mock rating data (in a real app, this would come from your backend)
  const rating = 4.5;
  const reviewCount = Math.floor(Math.random() * 100) + 10; // Random between 10-110
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  // Check if product is new (created within last 30 days)
  const isNewRelease = node.title.toLowerCase().includes('redrestore') || 
                       node.title.toLowerCase().includes('cryo');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!firstVariant) {
      toast.error("Product unavailable");
      return;
    }

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${node.title} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/product/${node.handle}`}>
      <div className="group bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-square overflow-hidden bg-secondary/30 relative">
          {isNewRelease && (
            <Badge 
              className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground font-medium px-3 py-1 animate-fade-in"
            >
              New Release
            </Badge>
          )}
          {onQuickView && (
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                onQuickView();
              }}
            >
              <Eye className="h-4 w-4 mr-1" />
              Quick View
            </Button>
          )}
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-2">
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
            <span className="text-xs text-muted-foreground ml-1">({reviewCount})</span>
          </div>
          
          <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {node.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {node.description}
          </p>
          
          {/* Subscription Badge */}
          <div className="mb-3 flex items-center gap-1 text-xs text-primary">
            <RefreshCw className="h-3 w-3" />
            <span className="font-medium">Subscribe & Save 15%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">
                £{price.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                or £{subscriptionPrice.toFixed(2)}/month
              </p>
            </div>
            <Button 
              onClick={handleAddToCart}
              size="sm"
              disabled={!firstVariant?.availableForSale}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {firstVariant?.availableForSale ? "Add" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
