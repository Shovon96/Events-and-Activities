import { Skeleton } from "@/components/ui/skeleton";

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4 mb-8">
      {/* Title */}
      <Skeleton className="h-10 w-64 mx-auto" />
      {/* Description */}
      <Skeleton className="h-4 w-96 mx-auto" />
    </div>
  );
}
