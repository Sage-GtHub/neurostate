import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="h-full flex flex-col">
      <Skeleton className="aspect-[4/5] w-full bg-ivory mb-6" />
      <div className="space-y-3 flex-1 flex flex-col">
        <Skeleton className="h-5 w-3/4 bg-mist" />
        <Skeleton className="h-4 w-20 bg-mist" />
        <Skeleton className="h-10 w-full mt-4 bg-mist" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
      {[...Array(6)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};
