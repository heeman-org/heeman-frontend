import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useConstants } from "../context/ConstantsContext";

export const Testimonials = () => {
    const { landingConstants, loading } = useConstants();

    if (loading || !landingConstants) return null;

    return (
        <section className="py-32 bg-secondary/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <Quote className="mx-auto mb-6 text-accent" size={40} />
                    <h2 className="text-4xl md:text-5xl font-display">{landingConstants.testimonials.title}</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {landingConstants.testimonials.reviews.map((rev: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 shadow-sm hover:shadow-xl transition-shadow"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={14} className="fill-accent text-accent" />
                                ))}
                            </div>
                            <p className="text-foreground/70 leading-relaxed mb-8 italic">
                                "{rev.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <img src={rev.image} alt={rev.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <h4 className="font-bold text-sm tracking-tight">{rev.name}</h4>
                                    <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-medium">{rev.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
