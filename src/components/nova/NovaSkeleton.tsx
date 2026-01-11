import { cn } from "@/lib/utils";

interface NovaSkeletonProps {
  variant?: "card" | "metric" | "chart" | "list" | "insight" | "protocol" | "goal";
  className?: string;
}

export function NovaSkeleton({ variant = "card", className }: NovaSkeletonProps) {
  if (variant === "metric") {
    return (
      <div className={cn(
        "p-6 bg-card rounded-3xl border border-foreground/5",
        className
      )}>
        <div className="flex items-center justify-between mb-5">
          <div className="w-9 h-9 rounded-full bg-foreground/5 skeleton-shimmer" />
          <div className="w-12 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
        </div>
        <div className="w-16 h-7 rounded-lg bg-foreground/5 skeleton-shimmer mb-2" />
        <div className="w-10 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
      </div>
    );
  }

  if (variant === "chart") {
    return (
      <div className={cn(
        "p-6 bg-card rounded-3xl border border-foreground/5",
        className
      )}>
        <div className="w-24 h-4 rounded-lg bg-foreground/5 skeleton-shimmer mb-6" />
        <div className="h-64 rounded-2xl bg-foreground/[0.02] skeleton-shimmer flex items-end justify-around gap-2 p-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-8 bg-foreground/5 rounded-t-lg skeleton-shimmer"
              style={{ height: `${30 + Math.random() * 50}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "insight") {
    return (
      <div className={cn(
        "p-6 bg-card rounded-3xl border border-foreground/5",
        className
      )}>
        <div className="w-9 h-9 rounded-full bg-foreground/5 skeleton-shimmer mb-5" />
        <div className="w-3/4 h-4 rounded-lg bg-foreground/5 skeleton-shimmer mb-3" />
        <div className="space-y-2 mb-5">
          <div className="w-full h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
          <div className="w-2/3 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
        </div>
        <div className="w-20 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-5 rounded-3xl bg-foreground/[0.02]"
          >
            <div className="w-10 h-10 rounded-2xl bg-foreground/5 skeleton-shimmer flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="w-24 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
              <div className="w-32 h-2 rounded-full bg-foreground/5 skeleton-shimmer" />
            </div>
            <div className="w-9 h-9 rounded-full bg-foreground/5 skeleton-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "protocol") {
    return (
      <div className={cn(
        "p-5 rounded-2xl border border-foreground/5 bg-foreground/[0.02]",
        className
      )}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-foreground/5 skeleton-shimmer flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="w-32 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
            <div className="w-full h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
            <div className="w-2/3 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
          </div>
          <div className="w-16 h-6 rounded-full bg-foreground/5 skeleton-shimmer" />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-foreground/5 skeleton-shimmer" />
          <div className="w-8 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
        </div>
      </div>
    );
  }

  if (variant === "goal") {
    return (
      <div className={cn(
        "p-6 bg-card rounded-xl border border-foreground/5",
        className
      )}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-foreground/5 skeleton-shimmer" />
            <div className="space-y-2">
              <div className="w-20 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
              <div className="w-24 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center my-6">
          <div className="w-[100px] h-[100px] rounded-full bg-foreground/5 skeleton-shimmer" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="w-16 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
            <div className="w-12 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  // Default card skeleton
  return (
    <div className={cn(
      "p-6 bg-card rounded-3xl border border-foreground/5",
      className
    )}>
      <div className="w-10 h-10 rounded-full bg-foreground/5 skeleton-shimmer mb-4" />
      <div className="w-3/4 h-5 rounded-lg bg-foreground/5 skeleton-shimmer mb-3" />
      <div className="space-y-2">
        <div className="w-full h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
        <div className="w-2/3 h-3 rounded-full bg-foreground/5 skeleton-shimmer" />
      </div>
    </div>
  );
}

// Grid skeleton for loading states
export function NovaSkeletonGrid({ count = 4, variant = "metric" as const }: { count?: number; variant?: "card" | "metric" | "insight" | "protocol" | "goal" }) {
  const gridCols = variant === "metric" 
    ? "grid-cols-2 lg:grid-cols-4" 
    : variant === "insight" 
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
      : variant === "protocol"
        ? "grid-cols-1 md:grid-cols-2"
        : variant === "goal"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2";
  
  return (
    <div className={cn("grid gap-4", gridCols)}>
      {Array.from({ length: count }).map((_, i) => (
        <NovaSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
}
