import { Skeleton } from './Skeleton';

export function SkeletonCard() {
  return (
    <div className="h-full w-full">
      <Skeleton className="min-h-[304px] h-full rounded-3xl" />
    </div>
  );
}
