import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);

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
      <div className="group">
        <div className="aspect-square overflow-hidden bg-secondary rounded-lg mb-4">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {node.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {node.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">
              ${price.toFixed(2)}
            </p>
            <Button 
              onClick={handleAddToCart}
              size="sm"
              disabled={!firstVariant?.availableForSale}
              className="bg-primary hover:bg-primary/90"
            >
              {firstVariant?.availableForSale ? "Add" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
