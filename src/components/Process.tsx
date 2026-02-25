import { motion } from "framer-motion";

const steps = [
    {
        num: "01",
        title: "Conceptualization",
        desc: "Our designers sketch visions that balance current trends with timeless silhouettes."
    },
    {
        num: "02",
        title: "Material Sourcing",
        desc: "We select only the finest FSC-certified woods and premium sustainable fabrics."
    },
    {
        num: "03",
        title: "Hand-Craftsmanship",
        desc: "Master artisans bring the designs to life with obsessive attention to every joint and finish."
    },
    {
        num: "04",
        title: "Quality Curation",
        desc: "Every item undergoes a rigorous 48-point check before it's ready for your home."
    }
];

export const Process = () => {
    return (
        <section className="py-24 bg-primary text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-accent font-medium tracking-[0.3em] uppercase text-xs mb-6">How It's Made</h2>
                        <h2 className="text-4xl md:text-5xl font-display leading-tight italic">The Heeman Standard Of Excellence</h2>
                    </div>
                    <p className="max-w-xs text-white/50 text-sm leading-relaxed mb-2">
                        Transparency is key to our philosophy. Discover the journey of your furniture from forest to living room.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {steps.map((step, i) => (
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
                            <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
