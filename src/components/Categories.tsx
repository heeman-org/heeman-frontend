import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useConstants } from "../context/ConstantsContext";
import { Skeleton } from "./ui/Skeleton";
import { useCategories } from "../hooks/useCategories";

export const Categories = () => {
    const { landingConstants, loading: constantsLoading } = useConstants();
    const { categories, loading: categoriesLoading } = useCategories();

    if (constantsLoading || categoriesLoading || !landingConstants) return (
        <section className="py-24 container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-xl w-full">
                    <Skeleton className="h-4 w-32 mb-6 bg-gray-200 rounded-sm" />
                    <Skeleton className="h-12 w-3/4 mb-4 bg-gray-300 rounded-sm" />
                    <Skeleton className="h-12 w-1/2 bg-gray-300 rounded-sm" />
                </div>
                <Skeleton className="h-6 w-32 bg-gray-200 rounded-sm" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-[3/4] w-full rounded-none bg-gray-200" />
                ))}
            </div>
        </section>
    );

    return (
        <section className="py-24 container mx-auto px-6" id="collections">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-xl">
                    <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-6 block">{landingConstants.categories.subtitle}</h2>
                    <h2 className="text-4xl md:text-5xl font-display leading-tight">{landingConstants.categories.titleLine1} <br /><span className="font-medium">{landingConstants.categories.titleLine2}</span></h2>
                </div>
                <a href="#" className="flex items-center gap-4 group font-medium pb-2 border-b border-foreground/10 hover:border-accent transition-colors">
                    {landingConstants.categories.browseText} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat: any, i: number) => (
                    <motion.div
                        key={cat.id || i}
                        onClick={() => window.location.href = `/shop?category=${encodeURIComponent(cat.name)}`}
                        whileHover={{ scale: 0.98 }}
                        className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-secondary"
                    >
                        <img
                            src={cat.image || landingConstants.categories.items[i % landingConstants.categories.items.length].img}
                            alt={cat.name}
                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-white/70 text-xs uppercase tracking-[0.2em] mb-2">{cat._count?.products || 0} Pieces</span>
                            <h3 className="text-2xl font-display text-white mb-6 underline underline-offset-8 decoration-white/0 group-hover:decoration-accent transition-all animate-in fade-in slide-in-from-bottom-2">{cat.name}</h3>
                            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent transition-all overflow-hidden">
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
