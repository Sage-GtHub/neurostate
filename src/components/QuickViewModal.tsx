import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
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
      
      scoredProducts.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return Math.random() - 0.5;
      });
      
      const related = scoredProducts
        .slice(0, 3)
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
      description: `${node.title} added`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-mist">
        <DialogHeader>
          <DialogTitle className="sr-only">Quick View: {node.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square overflow-hidden bg-ivory">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-contain p-12"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-stone text-[0.875rem]">No image</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-[1.5rem] font-normal text-carbon">{node.title}</h2>
            <p className="text-[1.125rem] text-carbon">£{price.toFixed(2)}</p>

            {node.options.length > 0 && (
              <div className="space-y-4">
                {node.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label className="block text-[0.875rem] font-normal text-carbon mb-2">
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
                            className="border-mist"
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

            <p className="text-[0.875rem] text-ash line-clamp-4">
              {node.description}
            </p>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                {selectedVariant?.availableForSale ? "Add to cart" : "Out of stock"}
              </Button>
              <Link to={`/product/${node.handle}`} className="flex-1">
                <Button variant="outline" className="w-full border-mist hover:bg-transparent hover:opacity-60" onClick={() => onOpenChange(false)}>
                  View details
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-8 pt-8 border-t border-mist">
            <h3 className="text-[1.125rem] font-normal text-carbon mb-6">You may also like</h3>
            
            <div className="grid grid-cols-3 gap-4">
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
                    <div className="bg-ivory border border-transparent hover:border-mist transition-all">
                      <div className="aspect-square bg-ivory overflow-hidden">
                        {relatedImage ? (
                          <img
                            src={relatedImage.url}
                            alt={relatedImage.altText || relatedProduct.node.title}
                            className="w-full h-full object-contain p-6"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[0.75rem] text-stone">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 space-y-1 border-t border-mist">
                        <h4 className="text-[0.75rem] font-normal text-carbon line-clamp-2">
                          {relatedProduct.node.title}
                        </h4>
                        <p className="text-[0.75rem] text-carbon">
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
      </DialogContent>
    </Dialog>
  );
};
