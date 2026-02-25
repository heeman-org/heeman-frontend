import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/Button";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
    const shipping = subtotal > 5000 ? 0 : 150;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    return (
        <div className="pt-32 pb-24 min-h-[80vh]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block"
                    >
                        Your Selections
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display mb-4"
                    >
                        Curation <span className="italic serif">Cart.</span>
                    </motion.h1>
                    <p className="text-foreground/40 font-medium">Items in your private collection ({totalItems})</p>
                </div>

                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-24 text-center bg-secondary/20 border border-dashed border-foreground/10"
                    >
                        <ShoppingBag size={48} className="mx-auto mb-6 text-foreground/10" />
                        <h2 className="text-3xl font-display mb-4">Your collection is empty.</h2>
                        <p className="text-foreground/40 mb-12 max-w-sm mx-auto">
                            Explore our curated editions and find the perfect pieces for your sanctuary.
                        </p>
                        <Link to="/shop">
                            <Button size="lg" className="rounded-none px-12 uppercase tracking-widest text-[11px] font-bold h-14">
                                Explore The Shop
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Items List */}
                        <div className="lg:col-span-8 space-y-8">
                            <AnimatePresence mode="popLayout">
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="flex flex-col sm:flex-row gap-8 p-6 bg-secondary/20 border border-foreground/5 relative group"
                                    >
                                        <Link to={`/shop/${item.id}`} className="shrink-0 aspect-[4/5] w-full sm:w-40 overflow-hidden bg-secondary">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </Link>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-[9px] uppercase tracking-widest font-bold text-foreground/30 mb-2 block">
                                                        {item.category}
                                                    </span>
                                                    <Link to={`/shop/${item.id}`} className="hover:text-accent transition-colors">
                                                        <h3 className="text-2xl font-display mb-1">{item.name}</h3>
                                                    </Link>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-foreground/20 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap justify-between items-end gap-6">
                                                <div className="flex items-center border border-foreground/10 h-10 bg-white shadow-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-4 h-full hover:text-accent transition-colors border-r border-foreground/5"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-4 h-full hover:text-accent transition-colors border-l border-foreground/5"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-1">Total</p>
                                                    <span className="text-xl font-display italic text-accent">
                                                        {formatPrice(parseFloat(item.price.replace(/[$,]/g, "")) * item.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32">
                            <div className="bg-primary text-white p-8 md:p-12 shadow-2xl relative overflow-hidden">
                                <h3 className="text-3xl font-display mb-10 relative z-10">Summary</h3>

                                <div className="space-y-6 mb-10 relative z-10">
                                    <div className="flex justify-between text-sm">
                                        <span className="opacity-50">Subtotal</span>
                                        <span className="font-bold">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="opacity-50">White Glove Delivery</span>
                                        <span className="font-bold">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm pb-6 border-b border-white/10">
                                        <span className="opacity-50">Est. Luxury Tax (18%)</span>
                                        <span className="font-bold">{formatPrice(tax)}</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-display pt-2">
                                        <span>Total</span>
                                        <span className="text-accent">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10 relative z-10">
                                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest opacity-60">
                                        <ShieldCheck size={14} className="text-accent" /> Secure Bespoke Checkout
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest opacity-60">
                                        <Truck size={14} className="text-accent" /> Premium Handling Included
                                    </div>
                                </div>

                                <Button size="lg" className="w-full h-16 rounded-none bg-accent hover:bg-white hover:text-primary transition-all group border-none relative z-10">
                                    Proceed to Payment <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                                </Button>

                                {/* Decorative */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-[60px] -ml-16 -mb-16"></div>
                            </div>

                            <div className="mt-8 text-center">
                                <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest border-b border-foreground/10 pb-1 hover:text-accent hover:border-accent transition-all">
                                    Continue Curating
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
