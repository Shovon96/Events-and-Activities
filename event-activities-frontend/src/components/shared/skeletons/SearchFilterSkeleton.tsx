import { Skeleton } from "@/components/ui/skeleton";

export function SearchFilterSkeleton() {
  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-12 flex-1 rounded-lg" />
        <Skeleton className="h-12 flex-1 rounded-lg" />
        <Skeleton className="h-12 flex-1 rounded-lg" />
      </div>

      {/* Results Count */}
      <Skeleton className="h-4 w-48" />
    </div>
  );
}
