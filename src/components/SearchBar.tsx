import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, TrendingUp } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useQuery } from "@tanstack/react-query";

interface SearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
  className?: string;
}

export const SearchBar = ({ onClose, autoFocus = false, className = "" }: SearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    staleTime: 1000 * 60 * 5,
  });

  const products = (productsData as ShopifyProduct[] | undefined) || [];

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.node.title.toLowerCase().includes(query.toLowerCase()) ||
    product.node.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const popularSearches = [
    "Omega 3",
    "Collagen",
    "Sleep Support",
    "Red Light Therapy",
    "Cognitive Support",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
      setQuery("");
      if (onClose) onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ash" />
        <Input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          onFocus={() => setShowResults(query.length > 0)}
          className="pl-10 pr-10 rounded-lg border-mist"
          autoFocus={autoFocus}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-carbon"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute top-full mt-2 w-full bg-background border-mist shadow-elegant z-50 max-h-96 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <div className="p-2">
              <p className="text-[0.625rem] uppercase tracking-wider text-ash px-3 py-2">
                Products
              </p>
              {filteredProducts.map((product) => (
                <button
                  key={product.node.id}
                  onClick={() => {
                    navigate(`/product/${product.node.handle}`);
                    setShowResults(false);
                    setQuery("");
                    if (onClose) onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-pearl rounded-lg transition-colors text-left"
                >
                  {product.node.images?.edges?.[0] && (
                    <img
                      src={product.node.images.edges[0].node.url}
                      alt={product.node.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-caption text-carbon truncate">
                      {product.node.title}
                    </p>
                    <p className="text-[0.625rem] text-ash">
                      {product.node.priceRange.minVariantPrice.currencyCode}{" "}
                      {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-6 text-center">
              <p className="text-caption text-ash">No products found</p>
            </div>
          ) : null}

          {/* Popular Searches */}
          {!query && (
            <div className="p-2 border-t border-mist">
              <p className="text-[0.625rem] uppercase tracking-wider text-ash px-3 py-2 flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                Popular Searches
              </p>
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  className="w-full text-left px-3 py-2 hover:bg-pearl rounded-lg transition-colors"
                >
                  <p className="text-caption text-carbon">{search}</p>
                </button>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
