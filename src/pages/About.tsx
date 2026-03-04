import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Button } from "../components/ui/Button";
import { useConstants } from "../context/ConstantsContext";
import { Skeleton } from "../components/ui/Skeleton";

export default function About() {
    const { aboutConstants, loading } = useConstants();

    if (loading || !aboutConstants) {
        return (
            <div className="pt-32 pb-24 container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-32 space-y-8 flex flex-col items-center">
                    <Skeleton className="h-4 w-32 bg-gray-200 rounded-sm" />
                    <Skeleton className="h-16 w-3/4 bg-gray-300 rounded-sm" />
                    <Skeleton className="h-24 w-full max-w-2xl bg-gray-200 rounded-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[60vh] md:h-[80vh] mb-32">
                    <Skeleton className="w-full h-full bg-gray-300 rounded-none" />
                    <div className="grid grid-rows-2 gap-8 h-full">
                        <Skeleton className="w-full h-full bg-gray-300 rounded-none" />
                        <Skeleton className="w-full h-full bg-gray-200 rounded-none" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-32">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-md mb-8 block"
                    >
                        {aboutConstants.hero.subtitle}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display mb-12 leading-tight"
                    >
                        {aboutConstants.hero.titleLine1} <br /> <span className="italic">{aboutConstants.hero.titleLine2}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto"
                    >
                        {aboutConstants.hero.description}
                    </motion.p>
                </div>
            </section>

            {/* Image Spread */}
            <section className="container mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[60vh] md:h-[80vh]">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden group"
                    >
                        <img
                            src={aboutConstants.imageSpread.image1}
                            alt="Artisan at work"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-rows-2 gap-8"
                    >
                        <div className="relative overflow-hidden group">
                            <img
                                src={aboutConstants.imageSpread.image2}
                                alt="Wood texture"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>
                        <div className="bg-primary p-12 flex flex-col justify-center text-white">
                            <h3 className="text-3xl font-display mb-6">{aboutConstants.imageSpread.title}</h3>
                            <p className="text-white/60 leading-relaxed">
                                {aboutConstants.imageSpread.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="bg-secondary/50 py-32 mb-32">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-16">
                        <div>
                            <h2 className="text-accent font-bold tracking-[0.2em] uppercase text-md mb-6">{aboutConstants.philosophy.subtitle}</h2>
                            <h3 className="text-4xl font-display leading-tight">{aboutConstants.philosophy.title}</h3>
                        </div>
                        <div className="lg:col-span-2 grid md:grid-cols-2 gap-12">
                            {aboutConstants.philosophy.items.map((item: any, i: number) => {
                                const Icon = (LucideIcons as any)[item.icon];
                                return (
                                    <div key={i} className="space-y-4">
                                        <Icon className="text-accent" size={32} />
                                        <h4 className="text-xl font-bold">{item.title}</h4>
                                        <p className="text-foreground/80 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="container mx-auto px-6 mb-32">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-y py-20 border-foreground/10">
                    {aboutConstants.stats.map((stat: any, i: number) => (
                        <div key={i} className="text-center">
                            <h4 className="text-5xl font-display mb-2">{stat.value}</h4>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/60">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="container mx-auto px-6">
                <div className="bg-primary text-white p-16 md:p-32 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-display mb-8">{aboutConstants.cta.title}</h2>
                        <p className="text-white/80 mb-12 max-w-xl mx-auto">
                            {aboutConstants.cta.description}
                        </p>
                        <div className="flex justify-center gap-6">
                            <Button size="lg" className="bg-accent hover:bg-white hover:text-primary transition-all rounded-none px-12">
                                {aboutConstants.cta.buttonText}
                            </Button>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className={`absolute top-0 right-0 w-96 h-96 ${aboutConstants.cta.images.blur1} rounded-full blur-[100px] -mr-48 -mt-48`}></div>
                    <div className={`absolute bottom-0 left-0 w-64 h-64 ${aboutConstants.cta.images.blur2} rounded-full blur-[80px] -ml-32 -mb-32`}></div>
                </div>
            </section>
        </div>
    );
}
