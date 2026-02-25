import { Suspense, lazy } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

// Lazy loading components below the fold for better performance (vercel-react-best-practices)
const Categories = lazy(() => import("./components/Categories").then(m => ({ default: m.Categories })));
const FeaturedProducts = lazy(() => import("./components/FeaturedProducts").then(m => ({ default: m.FeaturedProducts })));
const AboutUs = lazy(() => import("./components/AboutUs").then(m => ({ default: m.AboutUs })));
const Process = lazy(() => import("./components/Process").then(m => ({ default: m.Process })));
const Testimonials = lazy(() => import("./components/Testimonials").then(m => ({ default: m.Testimonials })));
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })));

// Loading component
const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen selection:bg-accent/30 selection:text-white relative">
      <div className="grain" />
      <Navbar />

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

      <Suspense fallback={<div className="h-64 bg-primary" />}>
        <Footer />
      </Suspense>

      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden opacity-20">
        <div className="absolute top-[15%] left-[5%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[0%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}

export default App;