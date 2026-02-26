import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";

interface ShopFilterBarProps {
    categories: string[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onOpenFilters: () => void;
    isFilterActive: boolean;
}

export const ShopFilterBar = ({
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    onOpenFilters,
    isFilterActive
}: ShopFilterBarProps) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 pb-8 border-b border-foreground/5">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300 border",
                            activeCategory === cat
                                ? "bg-primary text-white border-primary"
                                : "bg-transparent text-foreground/40 border-foreground/10 hover:border-foreground/30"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative group w-full sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 size-4 group-focus-within:text-accent transition-colors" />
                    <input
                        type="text"
                        placeholder="Search collection..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-secondary/50 border border-transparent focus:border-accent/30 py-4 pl-12 pr-6 outline-none text-sm transition-all"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={onOpenFilters}
                    className="h-full py-4 border-foreground/10 flex gap-3 transition-colors hover:bg-secondary"
                >
                    <SlidersHorizontal size={16} />
                    <span>Refine</span>
                    {isFilterActive && (
                        <span className="size-2 bg-accent rounded-full animate-pulse" />
                    )}
                </Button>
            </div>
        </div>
    );
};
