import { Skeleton } from "./ui/Skeleton";

export function ProductDetailSkeleton() {
    return (
        <div className="pt-32 pb-24 w-full">
            <div className="container mx-auto px-6">
                {/* Breadcrumbs */}
                <Skeleton className="h-4 w-1/4 mb-12 bg-gray-200 rounded-sm" />

                {/* Product Info Grid */}
                <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 mb-32">
                    {/* Gallery */}
                    <div className="space-y-6">
                        <Skeleton className="aspect-square w-full rounded-none bg-gray-200" />
                        <div className="grid grid-cols-4 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="aspect-square w-full rounded-none bg-gray-200" />
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <div className="mb-10 space-y-6">
                            <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
                            <Skeleton className="h-16 w-3/4 rounded-sm bg-gray-300" />

                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-foreground/5">
                                <Skeleton className="h-4 w-40 bg-gray-200 rounded-sm" />
                            </div>

                            <div className="flex items-baseline gap-4 mb-10">
                                <Skeleton className="h-10 w-32 bg-gray-300 rounded-sm" />
                            </div>

                            <div className="space-y-4">
                                <Skeleton className="h-5 w-full bg-gray-200 rounded-sm" />
                                <Skeleton className="h-5 w-full bg-gray-200 rounded-sm" />
                                <Skeleton className="h-5 w-2/3 bg-gray-200 rounded-sm" />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 mb-12 mt-12">
                                <Skeleton className="h-14 w-32 rounded-none bg-gray-300" />
                                <Skeleton className="h-14 flex-1 rounded-none bg-gray-300" />
                            </div>

                            <div className="grid grid-cols-3 gap-4 py-8 border-y border-foreground/5">
                                <Skeleton className="h-16 w-full rounded-none bg-gray-200" />
                                <Skeleton className="h-16 w-full rounded-none bg-gray-200" />
                                <Skeleton className="h-16 w-full rounded-none bg-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
