import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowRight, Star, ShoppingBag, Heart, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { type Product } from "../data/products";
import { useProducts } from "../hooks/useProducts";
import { cn } from "../lib/utils";
import { useCart } from "../context/CartContext";

export default function Shop() {
    const { products, loading } = useProducts();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [lastAdded, setLastAdded] = useState<string | null>(null);
    const { addToCart } = useCart();

    const categories = useMemo(() => ["All", ...new Set(products.map(p => p.category))], [products]);

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleQuickAdd = (p: Product, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(p, 1);
        setLastAdded(p.name);
        setTimeout(() => setLastAdded(null), 3000);
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="max-w-2xl mb-20">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block"
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
                        <span className="italic serif">A Unique Story.</span>
                    </motion.h1>
                </div>

                {/* Search & Filter Bar */}
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
                        <Button variant="outline" className="h-full py-4 border-foreground/10 flex gap-3">
                            <SlidersHorizontal size={16} /> Filters
                        </Button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {filteredProducts.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (i % 3) * 0.1 }}
                            className="group"
                        >
                            <Link to={`/shop/${p.id}`} className="block">
                                <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-6 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-700">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />

                                    {/* Badge */}
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-primary shadow-sm border border-black/5">
                                            {p.tag}
                                        </span>
                                    </div>

                                    {/* Actions Overlay */}
                                    <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="bg-white/95 backdrop-blur-md rounded-full size-10 shadow-sm border border-black/5 hover:bg-accent hover:text-white transition-all"
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                        >
                                            <Heart size={16} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => handleQuickAdd(p, e)}
                                            className="bg-white/95 backdrop-blur-md rounded-full size-10 shadow-sm border border-black/5 hover:bg-accent hover:text-white transition-all"
                                        >
                                            <ShoppingBag size={16} />
                                        </Button>
                                    </div>

                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>
                            </Link>

                            <div className="flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 font-bold">{p.category}</span>
                                    <div className="flex items-center gap-1">
                                        <Star size={10} className="fill-accent text-accent" />
                                        <span className="text-[10px] font-bold">{p.rating}</span>
                                    </div>
                                </div>

                                <Link to={`/shop/${p.id}`}>
                                    <h3 className="text-2xl font-display mb-3 group-hover:text-accent transition-colors">{p.name}</h3>
                                </Link>

                                <div className="flex justify-between items-end">
                                    <span className="text-xl font-display italic text-accent">{p.price}</span>
                                    <Link to={`/shop/${p.id}`} className="group/link flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors">
                                        Explore Details <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-24 text-center">
                        <h3 className="text-3xl font-display mb-4">No pieces found.</h3>
                        <p className="text-foreground/40 mb-8">Try adjusting your filters or search query.</p>
                        <Button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} variant="outline">
                            Clear All Filters
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
                        className="fixed bottom-12 left-1/2 z-[100] bg-primary text-white px-8 py-4 shadow-2xl flex items-center gap-4 border border-accent/20"
                    >
                        <CheckCircle2 className="text-accent" size={18} />
                        <p className="text-xs font-bold uppercase tracking-widest">Added <span className="text-accent italic">{lastAdded}</span> to collection</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
