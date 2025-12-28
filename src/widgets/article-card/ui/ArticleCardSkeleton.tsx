import { Skeleton } from "@/shared/ui";

export function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--muted)]">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48" />

      {/* Content skeleton */}
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between pt-3 mt-2 border-t border-[var(--muted)]">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}