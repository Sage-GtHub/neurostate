import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Star, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickViewModalProps {
  product: ShopifyProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickViewModal = ({ product, open, onOpenChange }: QuickViewModalProps) => {
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);

  useEffect(() => {
    if (open && product) {
      loadRelatedProducts();
    }
  }, [open, product]);

  const loadRelatedProducts = async () => {
    if (!product) return;
    
    setIsLoadingRelated(true);
    try {
      const allProducts = await fetchProducts(50);
      const currentTags = product.node.tags || [];
      
      // Score products based on tag similarity
      const scoredProducts = allProducts
        .filter(p => p.node.id !== product.node.id)
        .map(p => {
          const productTags = p.node.tags || [];
          const matchingTags = productTags.filter(tag => currentTags.includes(tag));
          return {
            product: p,
            score: matchingTags.length,
            matchingTags
          };
        });
      
      // Sort by score (most matching tags first), then randomize within same score
      scoredProducts.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return Math.random() - 0.5;
      });
      
      // Take top 4 products
      const related = scoredProducts
        .slice(0, 4)
        .map(item => item.product);
      
      setRelatedProducts(related);
    } catch (error) {
      console.error('Failed to load related products:', error);
    } finally {
      setIsLoadingRelated(false);
    }
  };

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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
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
                className="flex-1 bg-background text-foreground border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-[0_0_20px_rgba(255,138,0,0.6)] transition-all duration-300"
                variant="outline"
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

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">You May Also Like</h3>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => {
                const relatedImage = relatedProduct.node.images.edges[0]?.node;
                const relatedPrice = parseFloat(relatedProduct.node.priceRange.minVariantPrice.amount);
                
                return (
                  <Link
                    key={relatedProduct.node.id}
                    to={`/product/${relatedProduct.node.handle}`}
                    onClick={() => onOpenChange(false)}
                    className="group block"
                  >
                    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all">
                      <div className="aspect-square bg-secondary/10 overflow-hidden">
                        {relatedImage ? (
                          <img
                            src={relatedImage.url}
                            alt={relatedImage.altText || relatedProduct.node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 space-y-1">
                        <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedProduct.node.title}
                        </h4>
                        <p className="text-sm font-semibold">
                          £{relatedPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {isLoadingRelated && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">Loading related products...</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
