import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useConstants } from "../context/ConstantsContext";
import { Skeleton } from "./ui/Skeleton";

export const Testimonials = () => {
    const { landingConstants, loading } = useConstants();

    if (loading || !landingConstants) return (
        <section className="py-32 bg-secondary/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 flex flex-col items-center">
                    <Skeleton className="size-10 mb-6 bg-gray-300 rounded-sm" />
                    <Skeleton className="h-12 w-3/4 max-w-lg bg-gray-300 rounded-sm" />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white p-10 shadow-sm border border-secondary/50">
                            <Skeleton className="h-4 w-24 mb-6 bg-gray-200 rounded-sm" />
                            <div className="space-y-3 mb-8">
                                <Skeleton className="h-4 w-full bg-gray-200 rounded-sm" />
                                <Skeleton className="h-4 w-full bg-gray-200 rounded-sm" />
                                <Skeleton className="h-4 w-3/4 bg-gray-200 rounded-sm" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Skeleton className="w-12 h-12 rounded-full bg-gray-300" />
                                <div>
                                    <Skeleton className="h-4 w-24 mb-2 bg-gray-200 rounded-sm" />
                                    <Skeleton className="h-3 w-16 bg-gray-200 rounded-sm" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

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
