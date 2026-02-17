import { Skeleton } from "@/shared/ui";

export const ArticleCardSkeleton = () => {
  return (
    <div className="grid grid-rows-[240px_1fr] overflow-hidden rounded-[5px] bg-white">
      {/* Image */}
      <Skeleton className="h-full w-full" />

      {/* Content */}
      <div className="mx-[20px] mt-[20px] mb-[25px] grid grid-rows-[auto_1fr_auto] gap-[15px]">
        {/* Date */}
        <Skeleton className="h-3 w-20" />

        {/* Title + Description */}
        <div className="grid gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Author */}
        <div className="grid gap-0.5 border-t border-gray-100 pt-6">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
};
