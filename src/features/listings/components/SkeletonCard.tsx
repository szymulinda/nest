import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCard() {
  return (
    <div className="bg-card rounded-lg shadow-soft overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-1/3 rounded-md" />
        <Skeleton className="h-5 w-2/3 rounded-md" />
        <Skeleton className="h-3 w-1/2 rounded-md" />
      </div>
    </div>
  );
}
