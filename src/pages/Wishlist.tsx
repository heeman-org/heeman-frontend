import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { type Product } from "../data/products";
import { Button } from "../components/ui/Button";

export default function Wishlist() {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddAllToCart = () => {
        wishlist.forEach((item) => {
            addToCart({ ...item }, 1);
        });
        clearWishlist();
        navigate("/cart");
    };

    const handleAddToCart = (item: Product) => {
        addToCart({ ...item }, 1);
        removeFromWishlist(item.id);
    };

    return (
        <div className="pt-32 pb-24 min-h-[80vh]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="max-w-2xl mb-16 flex flex-col items-start">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-accent font-semibold tracking-[0.2em] uppercase text-sm mb-6 block"
                    >
                        Your Curated Favorites
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display mb-4"
                    >
                        Wishlist<span className="font-medium text-accent">.</span>
                    </motion.h1>
                    <p className="text-foreground/50 font-medium tracking-wide">
                        {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
                    </p>
                </div>

                {wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-24 text-center bg-secondary/10 border border-dashed border-foreground/10 flex flex-col items-center"
                    >
                        <Heart size={48} strokeWidth={1} className="text-foreground/20 mb-6" />
                        <h2 className="text-3xl font-display mb-4 tracking-tight">Your wishlist is empty</h2>
                        <p className="text-foreground/40 mb-10 max-w-md text-sm leading-relaxed">
                            Save products you love to your wishlist to easily find them later or add them to your cart.
                        </p>
                        <Link to="/shop">
                            <Button size="lg" className="rounded-none px-12 uppercase tracking-widest text-xs font-semibold h-14 bg-primary text-primary-foreground hover:bg-accent transition-colors">
                                Discover Products
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="flex flex-col gap-12">
                        {/* Action Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap justify-between items-center bg-secondary/20 p-6 border border-foreground/5 gap-4"
                        >
                            <span className="text-sm font-medium tracking-wide opacity-70">
                                Ready to make them yours?
                            </span>
                            <div className="flex gap-4">
                                <Button
                                    onClick={clearWishlist}
                                    variant="outline"
                                    className="rounded-none border-foreground/10 uppercase tracking-widest text-xs"
                                >
                                    Clear List
                                </Button>
                                <Button
                                    onClick={handleAddAllToCart}
                                    className="rounded-none bg-accent hover:bg-accent/90 text-white uppercase tracking-widest text-xs gap-2"
                                >
                                    Add All to Cart & Checkout <ShoppingBag size={14} />
                                </Button>
                            </div>
                        </motion.div>

                        {/* Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            <AnimatePresence mode="popLayout">
                                {wishlist.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                        className="group flex flex-col bg-card relative"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden bg-secondary w-full mb-4">
                                            <Link to={`/shop/${item.id}`}>
                                                <img
                                                    src={item.img}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            </Link>
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500 shadow-sm"
                                                title="Remove from wishlist"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="flex flex-col flex-1 px-2">
                                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 mb-2">
                                                {item.category}
                                            </span>
                                            <Link to={`/shop/${item.id}`} className="hover:text-accent transition-colors">
                                                <h3 className="font-display text-lg mb-2 leading-tight">{item.name}</h3>
                                            </Link>
                                            
                                            <div className="flex items-center justify-between mt-auto pt-4 pb-2 border-t border-foreground/5">
                                                <span className="font-display text-lg">
                                                    {item.price}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleAddToCart(item)}
                                                    variant="ghost"
                                                    className="uppercase tracking-widest text-[10px] font-bold hover:bg-accent/10 hover:text-accent rounded-none h-8 px-3"
                                                >
                                                    Move to Cart <ArrowRight size={12} className="ml-1" />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
