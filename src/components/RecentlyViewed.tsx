import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProductCard } from "./ProductCard";

export const RecentlyViewed = () => {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-6 sm:px-8 lg:px-20 xl:px-32 bg-secondary/20">
      <div className="w-full">
        <h2 className="text-[1.875rem] font-semibold mb-8" style={{ lineHeight: '1.3' }}>Recently Viewed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentlyViewed.slice(0, 4).map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
