import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (product: typeof items[0]) => {
    const firstVariant = product.node.variants.edges[0]?.node;
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
      description: `${product.node.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">My Wishlist</h1>
            {items.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="rounded-full"
              >
                Clear All
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-6">
                Your wishlist is empty
              </p>
              <Link to="/">
                <Button className="rounded-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const image = item.node.images.edges[0]?.node;
                const price = parseFloat(item.node.priceRange.minVariantPrice.amount);
                const firstVariant = item.node.variants.edges[0]?.node;

                return (
                  <div 
                    key={item.node.id} 
                    className="flex gap-6 p-6 bg-card border rounded-lg"
                  >
                    <Link 
                      to={`/product/${item.node.handle}`}
                      className="w-32 h-32 bg-secondary/20 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      {image && (
                        <img
                          src={image.url}
                          alt={image.altText || item.node.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.node.handle}`}>
                        <h3 className="font-semibold text-lg mb-2 hover:text-accent transition-colors">
                          {item.node.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {item.node.description}
                      </p>
                      <p className="text-xl font-bold mb-4">
                        £{price.toFixed(2)}
                      </p>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleAddToCart(item)}
                          disabled={!firstVariant?.availableForSale}
                          className="rounded-full"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => removeItem(item.node.id)}
                          className="rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
