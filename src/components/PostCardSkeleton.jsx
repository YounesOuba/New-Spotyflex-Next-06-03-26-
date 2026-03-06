import { Skeleton } from '@/components/ui/skeleton';
import { memo } from 'react';

const PostCardSkeleton = memo(() => {
  return (
    <div className="rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-4 space-y-4 animate-pulse">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48 bg-white/10 rounded-lg" />
      
      {/* Title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4 bg-white/10" />
        <Skeleton className="h-4 w-full bg-white/10" />
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full bg-white/10" />
        <Skeleton className="h-3 w-5/6 bg-white/10" />
      </div>
      
      {/* Footer skeleton */}
      <div className="flex justify-between pt-2">
        <Skeleton className="h-3 w-20 bg-white/10" />
        <Skeleton className="h-3 w-16 bg-white/10" />
      </div>
    </div>
  );
});

PostCardSkeleton.displayName = 'PostCardSkeleton';

export default PostCardSkeleton;
