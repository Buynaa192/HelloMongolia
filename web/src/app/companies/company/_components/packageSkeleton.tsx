import { Skeleton } from "./ui/skeleton";

export const PackageCardSkeleton = () => {
    return (
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-48 w-full">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="p-4 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-5 w-1/3" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>
      </div>
    );
  };
  