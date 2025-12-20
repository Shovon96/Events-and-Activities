interface SkeletonListProps {
  children: React.ReactNode;
  gap?: 2 | 3 | 4 | 6;
  className?: string;
}

export function SkeletonList({ children, gap = 4, className = "" }: SkeletonListProps) {
  const listGap = {
    2: "space-y-2",
    3: "space-y-3",
    4: "space-y-4",
    6: "space-y-6",
  };

  return <div className={`${listGap[gap]} ${className}`}>{children}</div>;
}
