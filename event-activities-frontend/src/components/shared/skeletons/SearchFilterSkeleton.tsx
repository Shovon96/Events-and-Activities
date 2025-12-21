import { Skeleton } from "@/components/ui/skeleton";

export function SearchFilterSkeleton() {
  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative flex items-center gap-2">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-32 rounded-lg" />
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 w-44 rounded-lg" />
        <Skeleton className="h-10 w-44 rounded-lg" />
        <Skeleton className="h-10 w-44 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Results Count */}
      <Skeleton className="h-4 w-48" />
    </div>
  );
}
