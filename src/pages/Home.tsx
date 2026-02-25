import { Suspense, lazy } from "react";
import { Hero } from "../components/Hero";

// Lazy loading components below the fold
const Categories = lazy(() => import("../components/Categories").then(m => ({ default: m.Categories })));
const FeaturedProducts = lazy(() => import("../components/FeaturedProducts").then(m => ({ default: m.FeaturedProducts })));
const AboutUs = lazy(() => import("../components/AboutUs").then(m => ({ default: m.AboutUs })));
const Process = lazy(() => import("../components/Process").then(m => ({ default: m.Process })));
const Testimonials = lazy(() => import("../components/Testimonials").then(m => ({ default: m.Testimonials })));

const SectionLoader = () => (
    <div className="py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
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
                <Testimonials />
            </Suspense>
        </main>
    );
}
