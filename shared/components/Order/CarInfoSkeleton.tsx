import { Skeleton } from '../UI/Skeleton';

export function CarInfoSkeleton() {
  return (
    <div className="h-full w-full">
      <Skeleton className="min-w-[350px] min-h-[270px] h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
    </div>
  );
}
