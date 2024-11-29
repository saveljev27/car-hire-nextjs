import { Skeleton } from '../UI/Skeleton';

export function BookingListSkeleton() {
  return (
    <div className="h-full w-full m-5">
      <Skeleton className="min-w-[350px] min-h-[35px] mt-5 h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
      <Skeleton className="min-w-[350px] min-h-[35px] mt-5 h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
      <Skeleton className="min-w-[350px] min-h-[35px] mt-5 h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
      <Skeleton className="min-w-[350px] min-h-[35px] mt-5 h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
      <Skeleton className="min-w-[350px] min-h-[35px] mt-5 h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
    </div>
  );
}
