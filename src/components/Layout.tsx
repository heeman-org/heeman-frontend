import { Suspense, lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";

const Footer = lazy(() => import("../components/Footer").then(m => ({ default: m.Footer })));

export default function Layout() {
    const { pathname } = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen selection:bg-accent/30 selection:text-white relative">
            <div className="grain" />
            <Navbar />

            <div className="pt-0"> {/* Padding managed in pages if needed */}
                <Outlet />
            </div>

            <Suspense fallback={<div className="h-64 bg-primary" />}>
                <Footer />
            </Suspense>

            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden opacity-10">
                <div className="absolute top-[15%] left-[5%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[0%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
}
