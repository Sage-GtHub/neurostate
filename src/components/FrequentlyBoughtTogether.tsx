import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface FrequentlyBoughtTogetherProps {
  currentProduct: ShopifyProduct["node"];
}

export const FrequentlyBoughtTogether = ({ currentProduct }: FrequentlyBoughtTogetherProps) => {
  const addItem = useCartStore(state => state.addItem);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set([currentProduct.id]));

  const { data: allProducts } = useQuery({
    queryKey: ['all-products'],
    queryFn: () => fetchProducts(20),
  });

  // Get 2 related products (simple logic - in real app, use product tags or collections)
  const relatedProducts = allProducts
    ?.filter(p => p.node.id !== currentProduct.id)
    .slice(0, 2) || [];

  const displayProducts = [
    { node: currentProduct },
    ...relatedProducts
  ];

  const toggleProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      if (newSelected.size > 1) { // Keep at least one selected
        newSelected.delete(productId);
      }
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const calculateTotal = () => {
    return displayProducts
      .filter(p => selectedProducts.has(p.node.id))
      .reduce((sum, p) => sum + parseFloat(p.node.priceRange.minVariantPrice.amount), 0);
  };

  const calculateBundlePrice = () => {
    const total = calculateTotal();
    return selectedProducts.size > 1 ? total * 0.95 : total; // 5% discount for bundles
  };

  const handleAddBundle = () => {
    const selectedItems = displayProducts.filter(p => selectedProducts.has(p.node.id));
    
    selectedItems.forEach(item => {
      const firstVariant = item.node.variants.edges[0]?.node;
      if (firstVariant) {
        const cartItem = {
          product: item,
          variantId: firstVariant.id,
          variantTitle: firstVariant.title,
          price: firstVariant.price,
          quantity: 1,
          selectedOptions: firstVariant.selectedOptions || []
        };
        addItem(cartItem);
      }
    });

    toast.success("Bundle added to cart", {
      description: `${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} added to your cart.`,
    });
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  const bundleDiscount = calculateTotal() - calculateBundlePrice();

  return (
    <div className="border rounded-lg p-6 bg-secondary/20">
      <h2 className="text-xl font-semibold mb-4">Frequently Bought Together</h2>
      
      <div className="space-y-4">
        {displayProducts.map((product, index) => {
          const firstVariant = product.node.variants.edges[0]?.node;
          const image = product.node.images.edges[0]?.node;
          const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
          
          return (
            <div key={product.node.id}>
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedProducts.has(product.node.id)}
                  onCheckedChange={() => toggleProduct(product.node.id)}
                  disabled={product.node.id === currentProduct.id}
                />
                
                <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                  {image && (
                    <img
                      src={image.url}
                      alt={image.altText || product.node.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{product.node.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {product.node.description}
                  </p>
                </div>
                
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold">£{price.toFixed(2)}</p>
                </div>
              </div>
              
              {index < displayProducts.length - 1 && (
                <div className="flex items-center justify-center my-3">
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t mt-6 pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Total for {selectedProducts.size} item{selectedProducts.size > 1 ? 's' : ''}
          </span>
          <div className="text-right">
            {bundleDiscount > 0 && (
              <div className="text-xs text-muted-foreground line-through">
                £{calculateTotal().toFixed(2)}
              </div>
            )}
            <div className="text-lg font-bold">
              £{calculateBundlePrice().toFixed(2)}
            </div>
          </div>
        </div>
        
        {bundleDiscount > 0 && (
          <div className="text-sm text-primary font-medium">
            Save £{bundleDiscount.toFixed(2)} (5% bundle discount)
          </div>
        )}
        
        <Button 
          onClick={handleAddBundle}
          className="w-full"
          size="lg"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add Selected to Cart
        </Button>
      </div>
    </div>
  );
};
