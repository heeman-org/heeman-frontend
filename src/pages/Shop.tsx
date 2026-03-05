import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowRight, Star,
    ShoppingBag, CheckCircle2, X, Filter, Check
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { type Product } from "../data/products";
import { useProducts } from "../hooks/useProducts";
import { cn } from "../lib/utils";
import { useCart } from "../context/CartContext";
import { ShopFilterSidebar, type SortOption } from "../components/ShopFilterSidebar";
import { ShopFilterBar } from "../components/ShopFilterBar";
import { ShopGridSkeleton } from "../components/ProductGridSkeleton";

export default function Shop() {
    const { products, loading } = useProducts();
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeMaterial, setActiveMaterial] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [lastAdded, setLastAdded] = useState<string | null>(null);
    const { addToCart } = useCart();

    // Reset filters
    const resetFilters = () => {
        setActiveCategory("All");
        setActiveMaterial("All");
        setSearchQuery("");
        setPriceRange([0, 10000]);
        setSortBy("newest");
    };

    const categories = useMemo(() => ["All", ...new Set(products.map(p => p.category))], [products]);
    const materials = useMemo(() => ["All", ...new Set(products.map(p => p.details.material))], [products]);

    // Parse price string to number for comparison
    const parsePrice = (priceStr: string | number) => {
        if (typeof priceStr === "number") return priceStr;
        return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    };

    const filteredAndSortedProducts = useMemo(() => {
        let result = products.filter(p => {
            const price = parsePrice(p.price);
            const matchesCategory = activeCategory === "All" || p.category === activeCategory;
            const matchesMaterial = activeMaterial === "All" || p.details.material === activeMaterial;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

            return matchesCategory && matchesMaterial && matchesSearch && matchesPrice;
        });

        // Sorting logic
        result.sort((a, b) => {
            const priceA = parsePrice(a.price);
            const priceB = parsePrice(b.price);

            if (sortBy === "price-low") return priceA - priceB;
            if (sortBy === "price-high") return priceB - priceA;
            if (sortBy === "rating") return b.rating - a.rating;
            return 0;
        });

        return result;
    }, [products, activeCategory, activeMaterial, searchQuery, priceRange, sortBy]);

    const handleQuickAdd = (p: Product, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(p, 1);
        setLastAdded(p.name);
        setTimeout(() => setLastAdded(null), 3000);
    };

    if (loading) {
        return (
            <div className="pt-32 pb-24 min-h-screen relative container mx-auto px-6">
                <ShopGridSkeleton count={8} />
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 min-h-screen relative">
            <ShopFilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                activeMaterial={activeMaterial}
                setActiveMaterial={setActiveMaterial}
                materials={materials}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onReset={resetFilters}
            />

            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="max-w-2xl mb-20">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-accent font-semibold tracking-[0.2em] uppercase text-sm mb-6 block"
                    >
                        Heeman Collections
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display mb-8"
                    >
                        Every Piece Tells <br />
                        <span className="font-medium">A Unique Story.</span>
                    </motion.h1>
                </div>

                {/* Search & Filter Bar */}
                <ShopFilterBar
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onOpenFilters={() => setIsFilterOpen(true)}
                    isFilterActive={priceRange[0] > 0 || priceRange[1] < 10000 || sortBy !== "newest" || activeMaterial !== "All"}
                />

                {/* Sub-Actions & Result Count */}
                <div className="flex justify-between items-center mb-12">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/40">
                        Exhibiting <span className="text-primary">{filteredAndSortedProducts.length}</span> Rare Pieces
                    </p>
                    {(activeCategory !== "All" || activeMaterial !== "All" || searchQuery || priceRange[0] > 0 || priceRange[1] < 10000) && (
                        <button
                            onClick={resetFilters}
                            className="text-xs font-semibold uppercase tracking-[0.15em] text-accent hover:underline flex items-center gap-2"
                        >
                            <X size={12} /> Dissolve Filters
                        </button>
                    )}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredAndSortedProducts.map((p, i) => (
                            <motion.div
                                key={p.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-6 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700">
                                    <Link to={`/shop/${p.id}`} className="block h-full w-full">
                                        <img
                                            src={p.img}
                                            alt={p.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </Link>

                                    {/* Badge */}
                                    <div className="absolute top-6 left-6 pointer-events-none">
                                        <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary shadow-sm border border-black/5">
                                            {p.tag}
                                        </span>
                                    </div>

                                    {/* Actions Overlay */}
                                    <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => handleQuickAdd(p, e)}
                                            className={cn(
                                                "bg-white/95 backdrop-blur-md rounded-full size-10 shadow-sm border border-black/5 transition-all ring-0 focus:ring-0",
                                                lastAdded === p.name ? "bg-accent text-white" : "hover:bg-accent hover:text-white"
                                            )}
                                        >
                                            <AnimatePresence mode="wait">
                                                {lastAdded === p.name ? (
                                                    <motion.div
                                                        key="check"
                                                        initial={{ scale: 0, rotate: -90 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        exit={{ scale: 0, rotate: 90 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                    >
                                                        <Check size={16} />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="bag"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0 }}
                                                    >
                                                        <ShoppingBag size={16} />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Button>
                                    </div>

                                    <Link to={`/shop/${p.id}`} className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </div>

                                <div className="flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs uppercase tracking-[0.15em] text-foreground/40 font-semibold">{p.category}</span>
                                        <div className="flex items-center gap-1">
                                            <Star size={10} className="fill-accent text-accent" />
                                            <span className="text-xs font-semibold">{p.rating}</span>
                                        </div>
                                    </div>

                                    <Link to={`/shop/${p.id}`}>
                                        <h3 className="text-2xl font-display mb-3 group-hover:text-accent transition-colors">{p.name}</h3>
                                    </Link>

                                    <div className="flex justify-between items-end">
                                        <span className="text-xl font-display text-accent">{p.price}</span>
                                        <Link to={`/shop/${p.id}`} className="group/link flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground/50 hover:text-primary transition-colors">
                                            Explore Details <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredAndSortedProducts.length === 0 && (
                    <div className="py-32 flex flex-col items-center justify-center border-y border-foreground/5 bg-secondary/10">
                        <Filter className="size-12 text-foreground/10 mb-6" />
                        <h3 className="text-3xl font-display mb-4">No echoes found.</h3>
                        <p className="text-foreground/50 mb-12 max-w-xs text-center text-base leading-relaxed">
                            Your refinements were too specific for our current collection. Try relaxing your parameters.
                        </p>
                        <Button onClick={resetFilters} variant="outline" className="px-12">
                            Reset All Refinements
                        </Button>
                    </div>
                )}
            </div>

            {/* Notification */}
            <AnimatePresence>
                {lastAdded && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="fixed bottom-12 left-1/2 z-[150] bg-primary text-white px-8 py-4 shadow-2xl flex items-center gap-4 border border-accent/20"
                    >
                        <CheckCircle2 className="text-accent" size={18} />
                        <p className="text-sm font-semibold uppercase tracking-widest">Added <span className="text-accent">{lastAdded}</span> to collection</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
