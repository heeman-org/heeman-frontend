import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";
import { useConstants } from "../context/ConstantsContext";
import { Skeleton } from "./ui/Skeleton";

export const AboutUs = () => {
    const { landingConstants, loading } = useConstants();

    if (loading || !landingConstants) return (
        <section className="py-32 container mx-auto px-6 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="relative grid grid-cols-2 gap-4">
                    <Skeleton className="w-full aspect-[3/4] mt-12 bg-gray-200 rounded-none" />
                    <Skeleton className="w-full aspect-[3/4] bg-gray-200 rounded-none" />
                </div>
                <div>
                    <Skeleton className="h-4 w-32 mb-6 bg-gray-200 rounded-sm" />
                    <Skeleton className="h-12 w-3/4 mb-4 bg-gray-300 rounded-sm" />
                    <Skeleton className="h-12 w-1/2 mb-8 bg-gray-300 rounded-sm" />
                    <div className="space-y-4 mb-10">
                        <Skeleton className="h-32 w-full bg-gray-200 rounded-sm" />
                        <Skeleton className="h-32 w-full bg-gray-200 rounded-sm" />
                    </div>
                    <Skeleton className="h-12 w-48 bg-gray-300 rounded-sm" />
                </div>
            </div>
        </section>
    );

    return (
        <section className="py-32 container mx-auto px-6 overflow-hidden" id="our-story">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12"
                        >
                            <img src={landingConstants.aboutUs.images.process} alt="Process" className="w-full aspect-[3/4] object-cover" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <img src={landingConstants.aboutUs.images.detail} alt="Detail" className="w-full aspect-[3/4] object-cover" />
                        </motion.div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent flex items-center justify-center rounded-full text-white font-display text-center p-4">
                        {landingConstants.aboutUs.badgeLines[0]} <br /> {landingConstants.aboutUs.badgeLines[1]}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-6">{landingConstants.aboutUs.subtitle}</h2>
                    <h2 className="text-4xl md:text-5xl font-display mb-8 leading-tight">{landingConstants.aboutUs.titleLine1} <br /><span className="font-medium">{landingConstants.aboutUs.titleLine2}</span></h2>
                    <div className="space-y-6 text-foreground/70 leading-relaxed mb-10">
                        {landingConstants.aboutUs.paragraphs.map((p: string, i: number) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                    <Button variant="outline" className="group">
                        {landingConstants.aboutUs.buttonText} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};
