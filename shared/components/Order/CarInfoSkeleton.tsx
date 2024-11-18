import { Skeleton } from '../UI/Skeleton';

export function CarInfoSkeleton() {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <Skeleton className="min-w-[300px] w-[320px] min-h-[50px] h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
      <Skeleton className="mt-5 min-w-[400px] min-h-[240px] h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
      <Skeleton className="mt-5 min-w-[400px] min-h-[400px] h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
    </div>
  );
}
