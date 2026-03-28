import { motion } from "framer-motion";
import { ArrowRight, Palette, Ruler, Sparkles, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";

const features = [
    {
        icon: Palette,
        title: "Your Design",
        desc: "Share reference images or describe the style you have in mind.",
    },
    {
        icon: Ruler,
        title: "Custom Sizing",
        desc: "We craft every piece to your exact measurements and specifications.",
    },
    {
        icon: Sparkles,
        title: "Premium Materials",
        desc: "Choose from our curated selection of high-quality fabrics and finishes.",
    },
    {
        icon: Upload,
        title: "Upload Inspiration",
        desc: "Attach images of products you love and we'll bring them to life.",
    },
];

export const CustomProducts = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-secondary/40 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Text */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-6 block"
                        >
                            Custom Orders
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-display mb-6 leading-tight"
                        >
                            Can't find what <br />
                            <span className="font-medium">you're looking for?</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-foreground/60 text-lg leading-relaxed mb-10 max-w-md"
                        >
                            We take custom orders. Share your inspiration images and we'll
                            handcraft your dream product — exactly the way you envision it.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                size="lg"
                                className="h-14 px-10 rounded-none bg-primary text-white hover:bg-accent transition-all group"
                                onClick={() => navigate("/contact?enquiry=true")}
                            >
                                Enquiry Now
                                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right — Feature grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-background border border-foreground/5 p-6 group hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <f.icon size={20} className="text-accent" />
                                </div>
                                <h3 className="font-display text-lg mb-2">{f.title}</h3>
                                <p className="text-foreground/50 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
