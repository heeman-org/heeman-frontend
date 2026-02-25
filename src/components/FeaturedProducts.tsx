import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "./ui/Button";
import { landingConstants } from "../constants";

export const FeaturedProducts = () => {
    return (
        <section className="py-24" id="new-arrivals">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <h2 className="text-accent font-medium tracking-[0.3em] uppercase text-xs mb-6">{landingConstants.featuredProducts.subtitle}</h2>
                    <h2 className="text-4xl md:text-5xl font-display mb-6">{landingConstants.featuredProducts.title}</h2>
                    <p className="text-foreground/50 text-sm leading-relaxed">
                        {landingConstants.featuredProducts.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {landingConstants.featuredProducts.products.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-6 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
                                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                                        {p.tag}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                        <Heart size={16} />
                                    </Button>
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button variant="accent" className="translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <ShoppingBag size={18} className="mr-2" /> Add to Cart
                                    </Button>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="flex items-center gap-1 mb-1">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star key={idx} size={10} className={idx < Math.floor(p.rating) ? "fill-accent text-accent" : "text-gray-300"} />
                                        ))}
                                    </div>
                                    <h3 className="font-display text-xl mb-2">{p.name}</h3>
                                    <p className="text-accent font-medium text-lg font-serif italic">{p.price}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Button variant="outline" size="lg" className="px-16 border-foreground/10 hover:border-accent">
                        {landingConstants.featuredProducts.viewAllButton}
                    </Button>
                </div>
            </div>
        </section>
    );
};
