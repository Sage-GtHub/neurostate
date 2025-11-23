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
      if (newSelected.size > 1) {
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
    return selectedProducts.size > 1 ? total * 0.95 : total;
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
      description: `${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} added`,
    });
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  const bundleDiscount = calculateTotal() - calculateBundlePrice();

  return (
    <div className="space-y-6">
      <h2 className="text-[1.125rem] font-normal text-carbon">Frequently bought together</h2>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {displayProducts.map((product, index) => {
          const firstVariant = product.node.variants.edges[0]?.node;
          const image = product.node.images.edges[0]?.node;
          const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
          
          return (
            <div key={product.node.id} className="flex items-start gap-3 w-full md:w-auto">
              {index > 0 && (
                <div className="hidden md:flex items-center justify-center pt-12">
                  <Plus className="h-4 w-4 text-stone" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="relative group">
                  <Checkbox
                    checked={selectedProducts.has(product.node.id)}
                    onCheckedChange={() => toggleProduct(product.node.id)}
                    disabled={product.node.id === currentProduct.id}
                    className="absolute top-2 left-2 z-10"
                  />
                  
                  <div className="overflow-hidden bg-ivory border border-transparent hover:border-mist transition-all">
                    <div className="aspect-square bg-ivory p-6">
                      {image && (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="p-4 border-t border-mist">
                      <h4 className="text-[0.875rem] font-normal text-carbon line-clamp-2 mb-2">{product.node.title}</h4>
                      <p className="text-[0.875rem] text-carbon">£{price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-6 border-t border-mist space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[0.875rem] text-stone">
              Total for {selectedProducts.size} item{selectedProducts.size > 1 ? 's' : ''}
            </div>
            {bundleDiscount > 0 && (
              <div className="text-[0.75rem] text-carbon">
                Save £{bundleDiscount.toFixed(2)} with bundle
              </div>
            )}
          </div>
          <div className="text-right">
            {bundleDiscount > 0 && (
              <div className="text-[0.875rem] text-stone line-through">
                £{calculateTotal().toFixed(2)}
              </div>
            )}
            <div className="text-[1.125rem] font-normal text-carbon">
              £{calculateBundlePrice().toFixed(2)}
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleAddBundle}
          className="w-full"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add bundle to cart
        </Button>
      </div>
    </div>
  );
};
