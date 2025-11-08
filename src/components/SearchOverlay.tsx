import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchOverlay = ({ open, onOpenChange }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(50),
  });

  const filteredProducts = products?.filter(product => {
    const query = searchQuery.toLowerCase();
    const { node } = product;
    
    return (
      node.title.toLowerCase().includes(query) ||
      node.description.toLowerCase().includes(query) ||
      node.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }) || [];

  useEffect(() => {
    if (!open) {
      setSearchQuery("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for supplements, goals, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery("")}
                className="h-8 w-8 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="overflow-y-auto px-6 py-4">
          {!searchQuery ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <p className="text-muted-foreground">
                Start typing to search for products
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found for "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
              {filteredProducts.map((product) => {
                const { node } = product;
                const image = node.images.edges[0]?.node;
                const price = parseFloat(node.priceRange.minVariantPrice.amount);

                return (
                  <Link
                    key={node.id}
                    to={`/product/${node.handle}`}
                    onClick={() => onOpenChange(false)}
                    className="flex gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="w-20 h-20 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || node.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                        {node.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {node.description}
                      </p>
                      <p className="text-base font-bold">
                        £{price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
