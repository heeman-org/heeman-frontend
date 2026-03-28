import { Suspense, lazy } from "react";
import { Hero } from "../components/Hero";
import { Skeleton } from "../components/ui/Skeleton";

// Lazy loading components below the fold
const Categories = lazy(() => import("../components/Categories").then(m => ({ default: m.Categories })));
const FeaturedProducts = lazy(() => import("../components/FeaturedProducts").then(m => ({ default: m.FeaturedProducts })));
const AboutUs = lazy(() => import("../components/AboutUs").then(m => ({ default: m.AboutUs })));
const Process = lazy(() => import("../components/Process").then(m => ({ default: m.Process })));
const Testimonials = lazy(() => import("../components/Testimonials").then(m => ({ default: m.Testimonials })));
const CustomProducts = lazy(() => import("../components/CustomProducts").then(m => ({ default: m.CustomProducts })));

const SectionLoader = () => (
    <div className="py-24 container mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-4 mb-16">
            <Skeleton className="h-4 w-24 bg-gray-200 rounded-sm" />
            <Skeleton className="h-10 w-64 bg-gray-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="aspect-square w-full rounded-none bg-gray-200" />
                    <Skeleton className="h-4 w-3/4 bg-gray-300 rounded-sm" />
                    <Skeleton className="h-4 w-1/2 bg-gray-200 rounded-sm" />
                </div>
            ))}
        </div>
    </div>
);

export default function Home() {
    return (
        <main>
            <Hero />

            <Suspense fallback={<SectionLoader />}>
                <Categories />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <AboutUs />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Process />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <FeaturedProducts />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <CustomProducts />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Testimonials />
            </Suspense>
        </main>
    );
}
