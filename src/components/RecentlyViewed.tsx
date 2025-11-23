import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProductCard } from "./ProductCard";

export const RecentlyViewed = () => {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 px-6 sm:px-8 lg:px-20 xl:px-32">
      <div className="w-full max-w-7xl mx-auto">
        <p className="ghost-number mb-6">CONTINUE EXPLORING</p>
        <h2 className="mb-16">Recently viewed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {recentlyViewed.slice(0, 3).map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
