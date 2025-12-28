import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { supabase } from "@/integrations/supabase/client";
import { createOrder } from "@/lib/orders";
import { toast } from "sonner";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, updateQuantity, removeItem, createCheckout } = useCartStore();
  
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
          if (result.success) toast.success("Order created", { description: "Redirecting to checkout..." });
        }
        window.open(checkoutUrl, '_blank');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error("Checkout failed", { description: "Please try again." });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-foreground/5">
          <ShoppingCart className="h-4 w-4 text-foreground/70" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] text-background flex items-center justify-center font-medium">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full border-l border-foreground/5 p-0 bg-background">
        <SheetHeader className="flex-shrink-0 p-6 border-b border-foreground/5">
          <SheetTitle className="text-base font-light">Cart</SheetTitle>
          <SheetDescription className="text-xs text-foreground/40">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-3xl bg-foreground/[0.02] flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-6 w-6 text-foreground/20" />
                </div>
                <p className="text-xs text-foreground/40">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 pb-4 border-b border-foreground/5 last:border-0">
                    <div className="w-16 h-16 bg-foreground/[0.02] overflow-hidden flex-shrink-0 rounded-2xl">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-contain p-2"
                        />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-foreground mb-1 line-clamp-2">{item.product.node.title}</h4>
                      <p className="text-[10px] text-foreground/40 mb-2">
                        {item.selectedOptions.map(option => option.value).join(' • ')}
                      </p>
                      <p className="text-xs text-foreground">£{parseFloat(item.price.amount).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-foreground/5" onClick={() => removeItem(item.variantId)}>
                        <Trash2 className="h-3 w-3 text-foreground/40" />
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-foreground/[0.02] hover:bg-foreground/[0.05]" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-xs">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-foreground/[0.02] hover:bg-foreground/[0.05]" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex-shrink-0 space-y-4 p-6 border-t border-foreground/5 bg-background safe-area-bottom">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground/60">Total</span>
                  <span className="text-base font-medium text-foreground">£{totalPrice.toFixed(2)}</span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full h-11 rounded-full text-xs bg-foreground text-background hover:bg-foreground/90" 
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />Processing</>
                  ) : (
                    <>Checkout<ArrowRight className="w-3.5 h-3.5 ml-2" /></>
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
