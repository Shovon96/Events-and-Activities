import {
    EventCardSkeleton,
    PageHeaderSkeleton,
    SkeletonGrid,
} from "@/components/shared/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeEventsSkeleton() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            {/* Page Header Skeleton */}
            <div className="space-y-4 mb-8 flex justify-between items-center">
                <div>
                    {/* Title */}
                    <Skeleton className="h-8 w-56 rounded-2xl mb-4" />
                    <Skeleton className="h-14 w-[400px]" />
                </div>
                {/* button */}
                <Skeleton className="h-4 w-36" />
            </div>
            {/* Events Grid Skeleton */}
            <SkeletonGrid columns={3} gap={6}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <EventCardSkeleton key={index} />
                ))}
            </SkeletonGrid>

        </section>
    );
}

