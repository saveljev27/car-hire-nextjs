import { Skeleton } from '../UI/Skeleton';

export function OrderSkeleton() {
  return (
    <div className="h-full w-full">
      <div className="min-w-[200px] w-[320px] m-auto min-h-[35px] mt-3 h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]">
        <Skeleton className="min-w-[250px] min-h-[35px] mt-5 h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
      </div>
      <Skeleton className="min-w-[350px] min-h-[35px] mt-5 h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
      <Skeleton className="min-w-[350px] min-h-[35px] mt-5 h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
      <Skeleton className="min-w-[350px] min-h-[35px] mt-5  h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
      <Skeleton className="min-w-[350px] min-h-[35px] mt-5 h-full rounded-3xl max-sm:min-w-[220px] max-sm:min-h-[350px]" />
    </div>
  );
}
