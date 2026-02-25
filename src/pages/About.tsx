import { motion } from "framer-motion";
import { Star, Award, ShieldCheck, Leaf } from "lucide-react";
import { Button } from "../components/ui/Button";

const stats = [
    { label: "Years of Design", value: "28" },
    { label: "Artisans Worldwide", value: "250+" },
    { label: "Sustainable Pieces", value: "15k" },
    { label: "Design Awards", value: "42" },
];

export default function About() {
    return (
        <div className="pt-32 pb-24">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-32">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-8 block"
                    >
                        The Heeman Story
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display mb-12 leading-tight"
                    >
                        We believe that space <br /> <span className="italic">shapes the spirit.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto"
                    >
                        Since 1995, our mission has been to bridge the gap between soulful artisanal craftsmanship and modern functional design.
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
                            src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200"
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
                                src="https://images.unsplash.com/photo-1565418187622-446755498877?auto=format&fit=crop&q=80&w=1200"
                                alt="Wood texture"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>
                        <div className="bg-primary p-12 flex flex-col justify-center text-white">
                            <h3 className="text-3xl font-display mb-6">Honest Materials.</h3>
                            <p className="text-white/60 leading-relaxed">
                                Every grain of wood and thread of fabric is selected for its longevity and ethical provenance. We don't just build furniture; we preserve ecology.
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
                            <h2 className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-6">Our Philosophy</h2>
                            <h3 className="text-4xl font-display leading-tight">Design with Consciousness.</h3>
                        </div>
                        <div className="lg:col-span-2 grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <Leaf className="text-accent" size={32} />
                                <h4 className="text-xl font-bold">Sustainability First</h4>
                                <p className="text-foreground/60 text-sm leading-relaxed">
                                    We use FSC-certified woods and low-impact dyes. Our manufacturing process aims for zero-waste, repurposing offcuts into artistic home accessories.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <Award className="text-accent" size={32} />
                                <h4 className="text-xl font-bold">Artisanal Justice</h4>
                                <p className="text-foreground/60 text-sm leading-relaxed">
                                    We partner directly with traditional weaving and woodworking communities, ensuring fair wages and preserving heritage skills for future generations.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <ShieldCheck className="text-accent" size={32} />
                                <h4 className="text-xl font-bold">Lifetime Build</h4>
                                <p className="text-foreground/60 text-sm leading-relaxed">
                                    Avoid the "disposable furniture" trap. Our pieces use traditional joinery—no cheap glues or veneers—designed to be handed down through families.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <Star className="text-accent" size={32} />
                                <h4 className="text-xl font-bold">Human Centric</h4>
                                <p className="text-foreground/60 text-sm leading-relaxed">
                                    Comfort isn't an afterthought. We ergonomically test every silhouette to ensure your home remains a sanctuary of physical ease.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="container mx-auto px-6 mb-32">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-y py-20 border-foreground/10">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <h4 className="text-5xl font-display mb-2">{stat.value}</h4>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="container mx-auto px-6">
                <div className="bg-primary text-white p-16 md:p-32 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-display mb-8">Bring Heeman Into Your Home.</h2>
                        <p className="text-white/60 mb-12 max-w-xl mx-auto">
                            Ready to redefine your living space? Explore our latest curated editions or contact our design consultants for a personalized session.
                        </p>
                        <div className="flex justify-center gap-6">
                            <Button size="lg" className="bg-accent hover:bg-white hover:text-primary transition-all rounded-none px-12">
                                Browse Shop
                            </Button>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
                </div>
            </section>
        </div>
    );
}
