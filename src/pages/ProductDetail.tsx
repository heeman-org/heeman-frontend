import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star, ShoppingBag, Heart, Share2,
    ChevronRight, ShieldCheck, Truck, RotateCcw,
    Plus, Minus, Check, CheckCircle2
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { type Product } from "../data/products";
import { useProduct } from "../hooks/useProduct";
import { useProducts } from "../hooks/useProducts";
import { cn } from "../lib/utils";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ProductDetailSkeleton } from "../components/ProductDetailSkeleton";

export default function ProductDetail() {
    const { id } = useParams();
    const { product, loading } = useProduct(id);
    const { products: allProducts } = useProducts(); // For recommendations
    const [activeImage, setActiveImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        if (product) {
            setActiveImage(product.gallery[0] || product.img);
        }
    }, [product]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    if (loading) return <ProductDetailSkeleton />;

    if (!product) return (
        <div className="h-screen flex items-center justify-center text-center">
            <div>
                <h2 className="text-3xl font-display mb-4">Piece not found.</h2>
                <Link to="/shop">
                    <Button variant="outline">Return to Collection</Button>
                </Link>
            </div>
        </div>
    );

    const recommendations = allProducts
        .filter((p: Product) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-3 mb-12 text-xs font-semibold uppercase tracking-[0.15em] text-foreground/40">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <ChevronRight size={12} />
                    <span className="text-accent">{product.name}</span>
                </div>

                {/* Product Info Grid */}
                <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 mb-32">
                    {/* Gallery */}
                    <div className="space-y-6">
                        <motion.div
                            layoutId={`img-${product.id}`}
                            className="aspect-square bg-secondary relative overflow-hidden group cursor-zoom-in"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    src={activeImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-black/5" />
                        </motion.div>

                        <div className="grid grid-cols-4 gap-4">
                            {product.gallery.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(img)}
                                    className={cn(
                                        "aspect-square overflow-hidden bg-secondary relative transition-all duration-300",
                                        activeImage === img ? "ring-2 ring-accent ring-offset-4" : "opacity-60 hover:opacity-100"
                                    )}
                                >
                                    <img src={img} alt={`${product.name} view ${i}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <div className="mb-10">
                            <div className="flex justify-between items-start mb-6">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-accent/10 text-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] rounded-full"
                                >
                                    {product.tag}
                                </motion.span>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-full shadow-sm border border-foreground/5 bg-white">
                                        <Share2 size={16} />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => toggleWishlist(product)}
                                        className={cn(
                                            "rounded-full shadow-sm border border-foreground/5 bg-white transition-colors",
                                            isInWishlist(product.id) ? "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100" : ""
                                        )}
                                    >
                                        <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                                    </Button>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-display mb-6">{product.name}</h1>

                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-foreground/5">
                                <div className="flex items-center gap-1.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-gray-200"}
                                        />
                                    ))}
                                    <span className="text-xs font-bold ml-2">{product.rating}</span>
                                </div>
                                <div className="w-[1px] h-4 bg-foreground/10" />
                                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                                    {product.reviewCount} Artisanal Reviews
                                </span>
                            </div>

                            <div className="flex items-baseline gap-4 mb-10">
                                <span className="text-4xl font-display text-accent">{product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-xl text-foreground/30 line-through font-display">{product.originalPrice}</span>
                                )}
                            </div>

                            <p className="text-foreground/60 leading-relaxed mb-10 text-lg">
                                {product.description}
                            </p>

                            {/* Functional Actions */}
                            <div className="flex flex-col sm:flex-row gap-6 mb-12">
                                <div className="flex items-center border border-foreground/10 h-14 bg-secondary/30">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-6 h-full hover:text-accent transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center font-bold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-6 h-full hover:text-accent transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <Button
                                    size="lg"
                                    onClick={handleAddToCart}
                                    className={cn(
                                        "h-14 flex-1 rounded-none transition-all text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3",
                                        addedToCart ? "bg-green-600 text-white" : "bg-primary text-white hover:bg-accent"
                                    )}
                                >
                                    {addedToCart ? (
                                        <>
                                            <CheckCircle2 size={18} /> Added to Collection
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag size={18} /> Add To Private Collection
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* High-level Trust Points */}
                            <div className="grid grid-cols-3 gap-4 py-8 border-y border-foreground/5 text-center">
                                <div className="flex flex-col items-center gap-3">
                                    <ShieldCheck size={20} className="text-accent" />
                                    <span className="text-xs uppercase tracking-[0.15em] font-semibold opacity-60">LIFETIME WARRANTY</span>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Truck size={20} className="text-accent" />
                                    <span className="text-xs uppercase tracking-[0.15em] font-semibold opacity-60">PREMIUM DELIVERY</span>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <RotateCcw size={20} className="text-accent" />
                                    <span className="text-xs uppercase tracking-[0.15em] font-semibold opacity-60">30-DAY RETURNS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabbed Content */}
                <div className="mb-32">
                    <div className="flex gap-12 border-b border-foreground/5 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                        {["Description", "Dimensions & Material", "Reviews"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase().split(" ")[0])}
                                className={cn(
                                    "text-xs font-semibold uppercase tracking-[0.2em] pb-4 transition-all whitespace-nowrap relative",
                                    activeTab === tab.toLowerCase().split(" ")[0]
                                        ? "text-primary"
                                        : "text-foreground/30 hover:text-foreground/60"
                                )}
                            >
                                {tab}
                                {activeTab === tab.toLowerCase().split(" ")[0] && (
                                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-accent" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="bg-secondary/20 p-8 md:p-16">
                        <AnimatePresence mode="wait">
                            {activeTab === "description" && (
                                <motion.div
                                    key="desc"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="grid md:grid-cols-2 gap-16 items-center"
                                >
                                    <div className="space-y-6">
                                        <h3 className="text-3xl font-display mb-8">Craftsmanship and Soul</h3>
                                        <p className="text-foreground/60 leading-relaxed border-l-4 border-accent pl-8 py-4 mb-8">
                                            "Every piece we create is a balance between the structure of modern geometry and the warmth of organic life."
                                        </p>
                                        <ul className="grid grid-cols-1 gap-4">
                                            {product.features.map((f, i) => (
                                                <li key={i} className="flex gap-4 text-base text-foreground/70">
                                                    <Check size={16} className="text-accent mt-0.5 shrink-0" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200"
                                            alt="Process"
                                            className="w-full h-full object-cover grayscale opacity-50"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "dimensions" && (
                                <motion.div
                                    key="dims"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="max-w-3xl"
                                >
                                    <h3 className="text-3xl font-display mb-12">Technical Specifications</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-24 gap-y-12">
                                        <div className="space-y-4">
                                            <span className="text-xs uppercase tracking-widest font-semibold opacity-40">Material Composition</span>
                                            <p className="text-lg font-display">{product.details.material}</p>
                                        </div>
                                        <div className="space-y-4">
                                            <span className="text-xs uppercase tracking-widest font-semibold opacity-40">Overall Dimensions</span>
                                            <p className="text-lg font-display">{product.details.dimensions}</p>
                                        </div>
                                        <div className="space-y-4">
                                            <span className="text-xs uppercase tracking-widest font-semibold opacity-40">Artisan Finish</span>
                                            <p className="text-lg font-display">{product.details.finish}</p>
                                        </div>
                                        <div className="space-y-4">
                                            <span className="text-xs uppercase tracking-widest font-semibold opacity-40">Gross Weight</span>
                                            <p className="text-lg font-display">{product.details.weight}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <section>
                        <div className="flex justify-between items-end mb-16">
                            <div>
                                <span className="text-accent font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">Complete the look</span>
                                <h2 className="text-4xl md:text-5xl font-display">You May Also Admire</h2>
                            </div>
                            <Link to="/shop" className="text-xs font-semibold uppercase tracking-widest pb-2 border-b border-foreground/10 hover:border-accent transition-colors flex gap-3 items-center">
                                Explore All <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {recommendations.map((p: Product) => (
                                <Link key={p.id} to={`/shop/${p.id}`} className="group">
                                    <div className="aspect-[4/5] overflow-hidden bg-secondary mb-6 group-hover:shadow-2xl transition-all duration-700">
                                        <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    </div>
                                    <h4 className="text-2xl font-display mb-2">{p.name}</h4>
                                    <p className="text-accent font-display">{p.price}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Success Notification Portal-like animation */}
            <AnimatePresence>
                {addedToCart && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="fixed bottom-12 left-1/2 z-[100] bg-primary text-white px-8 py-4 shadow-2xl flex items-center gap-4 border border-accent/20"
                    >
                        <div className="size-8 bg-accent rounded-full flex items-center justify-center">
                            <CheckCircle2 size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest">Added to collection</p>
                            <Link to="/cart" className="text-xs text-accent font-semibold uppercase tracking-widest hover:underline">View Private Cart</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
