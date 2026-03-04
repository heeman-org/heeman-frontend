import { Skeleton } from "./ui/Skeleton";

export function ShopGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 w-full">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="aspect-[4/5] w-full rounded-none bg-gray-200" />
                    <div className="flex justify-between items-center px-1">
                        <Skeleton className="h-3 w-1/4 rounded-sm bg-gray-200" />
                        <Skeleton className="h-3 w-8 rounded-sm bg-gray-200" />
                    </div>
                    <Skeleton className="h-8 w-3/4 rounded-sm bg-gray-300 px-1" />
                    <div className="flex justify-between items-end mt-2 px-1">
                        <Skeleton className="h-6 w-1/3 rounded-sm bg-gray-200" />
                        <Skeleton className="h-3 w-24 rounded-sm bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function FeaturedProductSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="aspect-[4/5] w-full rounded-none bg-gray-200 mb-4" />
                    <Skeleton className="h-3 w-20 bg-gray-200 rounded-sm" />
                    <Skeleton className="h-6 w-3/4 bg-gray-300 rounded-sm mt-1" />
                    <Skeleton className="h-5 w-1/3 bg-gray-200 rounded-sm mt-1" />
                </div>
            ))}
        </div>
    );
}
