import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { supabase } from "@/integrations/supabase/client";
import { createOrder } from "@/lib/orders";
import { toast } from "sonner";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    createCheckout 
  } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  const handleCheckout = async () => {
    try {
      setIsOpen(false);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      
      if (checkoutUrl) {
        if (session?.user) {
          const result = await createOrder({
            userId: session.user.id,
            items,
            totalAmount: totalPrice,
            currency: items[0]?.price.currencyCode || 'GBP',
            shopifyCheckoutUrl: checkoutUrl
          });

          if (result.success) {
            toast.success("Order created", {
              description: "Redirecting to checkout..."
            });
          }
        }
        
        window.open(checkoutUrl, '_blank');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error("Checkout failed", {
        description: "Please try again or contact support."
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative border-mist hover:bg-transparent hover:opacity-60">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[0.625rem]">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full border-l border-mist">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-[1.125rem] font-normal">Cart</SheetTitle>
          <SheetDescription className="text-stone">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-stone mx-auto mb-4" />
                <p className="text-ash">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-6">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 pb-6 border-b border-mist last:border-0">
                    <div className="w-20 h-20 bg-ivory overflow-hidden flex-shrink-0">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-contain p-2"
                        />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[0.875rem] font-normal text-carbon mb-1">{item.product.node.title}</h4>
                      <p className="text-[0.75rem] text-stone mb-2">
                        {item.selectedOptions.map(option => option.value).join(' • ')}
                      </p>
                      {item.isSubscription && (
                        <p className="text-[0.6875rem] text-stone mb-2">
                          Subscribe & Save 15%
                        </p>
                      )}
                      <p className="text-[0.875rem] text-carbon">
                        £{parseFloat(item.price.amount).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-transparent hover:opacity-60"
                        onClick={() => removeItem(item.variantId)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 border border-mist hover:bg-transparent hover:opacity-60"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-[0.75rem]">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 border border-mist hover:bg-transparent hover:opacity-60"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex-shrink-0 space-y-6 pt-6 border-t border-mist">
                <div className="flex justify-between items-center">
                  <span className="text-[0.875rem] font-normal text-carbon">Total</span>
                  <span className="text-[1.125rem] font-normal text-carbon">
                    £{totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  variant="default"
                  className="w-full" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Checkout
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Checkout
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
