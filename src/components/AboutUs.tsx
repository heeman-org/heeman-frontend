import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";

export const AboutUs = () => {
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
                            <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=600" alt="Process" className="w-full aspect-[3/4] object-cover" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=600" alt="Detail" className="w-full aspect-[3/4] object-cover" />
                        </motion.div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent flex items-center justify-center rounded-full text-white font-display text-center p-4">
                        Established <br /> 1995
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-accent font-medium tracking-[0.3em] uppercase text-xs mb-6">Our Legacy</h2>
                    <h2 className="text-4xl md:text-5xl font-display mb-8 leading-tight">Crafting Environments <br /><span className="italic">That Inspire Comfort.</span></h2>
                    <div className="space-y-6 text-foreground/70 leading-relaxed mb-10">
                        <p>
                            Started in a small workshop in Bangalore, Heeman has grown into a beacon of modern design and artisanal quality. We believe your furniture should be an extension of your personality.
                        </p>
                        <p>
                            Our process is rooted in sustainability and traditional joinery techniques, ensuring that every piece is not just beautiful, but built to last generations.
                        </p>
                    </div>
                    <Button variant="outline" className="group">
                        Read Our Full Story <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};
