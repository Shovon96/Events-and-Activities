import {
  EventCardSkeleton,
  SkeletonGrid,
  PageHeaderSkeleton,
} from "@/components/shared/skeletons";

export default function LoadingJoinedEventsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Page Header Skeleton */}
      <PageHeaderSkeleton />

      {/* Events Grid Skeleton */}
      <SkeletonGrid columns={3} gap={6}>
        {Array.from({ length: 9 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </SkeletonGrid>
    </section>
  );
}