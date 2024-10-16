import { cn } from '@/shared/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse bg-gray-200', className)} {...props} />
  );
}

export { Skeleton };
