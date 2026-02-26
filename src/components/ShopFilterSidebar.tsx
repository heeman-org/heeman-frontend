import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";

export type SortOption = "newest" | "price-low" | "price-high" | "rating";

interface ShopFilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    activeMaterial: string;
    setActiveMaterial: (material: string) => void;
    materials: string[];
    sortBy: SortOption;
    setSortBy: (option: SortOption) => void;
    onReset: () => void;
}

export const ShopFilterSidebar = ({
    isOpen,
    onClose,
    priceRange,
    setPriceRange,
    activeMaterial,
    setActiveMaterial,
    materials,
    sortBy,
    setSortBy,
    onReset
}: ShopFilterSidebarProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[120] shadow-2xl p-8 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-2xl font-display uppercase tracking-widest text-primary">Refine Collection</h2>
                            <button
                                onClick={onClose}
                                className="size-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-12">
                            {/* Price Range Selector */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 pb-4 border-b border-foreground/5">Price Horizon</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase font-bold text-foreground/30">From ($)</label>
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                            className="w-full h-12 bg-secondary/30 border border-transparent focus:border-accent/30 px-4 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase font-bold text-foreground/30">To ($)</label>
                                        <input
                                            type="number"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                                            className="w-full h-12 bg-secondary/30 border border-transparent focus:border-accent/30 px-4 text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {[500, 1000, 2500, 5000].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPriceRange([0, p])}
                                            className="px-3 py-1.5 text-[9px] font-bold border border-foreground/10 hover:border-accent hover:text-accent transition-colors"
                                        >
                                            Under ${p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Material Selector */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 pb-4 border-b border-foreground/5">Material Source</h3>
                                <div className="flex flex-wrap gap-2">
                                    {materials.map((mat) => (
                                        <button
                                            key={mat}
                                            onClick={() => setActiveMaterial(mat)}
                                            className={cn(
                                                "px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all",
                                                activeMaterial === mat
                                                    ? "bg-primary text-white border-primary"
                                                    : "border-foreground/10 hover:border-foreground/30"
                                            )}
                                        >
                                            {mat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sorting */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 pb-4 border-b border-foreground/5">Display Hierarchy</h3>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { id: "newest", label: "Newly Acquired" },
                                        { id: "price-low", label: "Value: Ascending" },
                                        { id: "price-high", label: "Value: Descending" },
                                        { id: "rating", label: "Highest Adoration" }
                                    ].map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setSortBy(opt.id as SortOption)}
                                            className={cn(
                                                "text-left py-3 px-4 text-xs font-bold uppercase tracking-widest transition-all",
                                                sortBy === opt.id ? "bg-primary text-white" : "hover:bg-secondary"
                                            )}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-8 flex flex-col gap-4">
                                <Button
                                    variant="accent"
                                    className="h-14 font-bold tracking-widest uppercase"
                                    onClick={onClose}
                                >
                                    Apply Refinements
                                </Button>
                                <button
                                    onClick={onReset}
                                    className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/30 hover:text-primary transition-colors py-4"
                                >
                                    <RotateCcw size={14} /> Revert to Default
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
