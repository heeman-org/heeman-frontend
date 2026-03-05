import { motion } from "framer-motion";
import { useConstants } from "../context/ConstantsContext";
import { Skeleton } from "./ui/Skeleton";

export const Process = () => {
    const { landingConstants, loading } = useConstants();

    if (loading || !landingConstants) return (
        <section className="py-24 bg-primary text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl w-full">
                        <Skeleton className="h-4 w-32 mb-6 bg-gray-500 rounded-sm" />
                        <Skeleton className="h-12 w-3/4 bg-gray-600 rounded-sm" />
                    </div>
                    <Skeleton className="h-20 w-full max-w-xs bg-gray-500 rounded-sm" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col">
                            <Skeleton className="h-16 w-12 mb-6 bg-gray-500 rounded-sm" />
                            <Skeleton className="h-6 w-3/4 mb-4 bg-gray-500 rounded-sm" />
                            <Skeleton className="h-24 w-full bg-gray-600 rounded-sm" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <section className="py-24 bg-primary text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-6">{landingConstants.process.subtitle}</h2>
                        <h2 className="text-4xl md:text-5xl font-display leading-tight">{landingConstants.process.title}</h2>
                    </div>
                    <p className="max-w-xs text-white/60 text-base leading-relaxed mb-2">
                        {landingConstants.process.description}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {landingConstants.process.steps.map((step: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group"
                        >
                            <div className="text-5xl font-display text-accent/20 group-hover:text-accent/100 transition-colors duration-500 mb-6">
                                {step.num}
                            </div>
                            <h3 className="text-xl font-display mb-4">{step.title}</h3>
                            <p className="text-white/50 text-base leading-relaxed group-hover:text-white/70 transition-colors">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
