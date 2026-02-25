import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";

export const Hero = () => {
    return (
        <section className="relative h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2200"
                    alt="Modern Interior"
                    className="w-full h-full object-cover brightness-[0.75] scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl"
                >
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-accent font-bold tracking-[0.2em] uppercase text-[11px] mb-6 block font-sans"
                    >
                        Since 1995
                    </motion.span>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-semibold leading-[1.1] mb-8 text-balance">
                        Elevate Your Living <br />
                        With Timeless Design.
                    </h1>

                    <p className="text-base md:text-lg text-white/80 mb-12 max-w-lg leading-relaxed">
                        Curated artisanal furniture that blends modern aesthetics with traditional Indian craftsmanship.
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <Button size="lg" className="rounded-none px-12 bg-white text-primary hover:bg-accent hover:text-white border-none shadow-2xl">
                            Shop Collection <ChevronRight className="ml-2" size={18} />
                        </Button>
                        <Button variant="ghost" size="lg" className="rounded-none px-12 text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm">
                            Watch Our Story
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-4">
                <span className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Scroll to explore</span>
                <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-accent"
                    />
                </div>
            </div>

            {/* Social Links sidebar decoration */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-8 items-center text-white/30">
                <div className="w-px h-20 bg-white/10"></div>
                <span className="[writing-mode:vertical-lr] uppercase tracking-[0.5em] text-[9px] font-bold">Heeman Interiors</span>
                <div className="w-px h-20 bg-white/10"></div>
            </div>
        </section>
    );
};
