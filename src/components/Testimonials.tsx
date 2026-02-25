import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        name: "Eleanor Fant",
        role: "Interior Stylist",
        content: "The textural quality of the velvet upholstery is unmatched. It's rare to find this level of craftsmanship in an online-first brand.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Julian Wan",
        role: "Home Owner",
        content: "Heeman's walnut table is the centerpiece of our home. It's sturdy, beautifully finished, and arrived ahead of schedule.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Aria Thorne",
        role: "Architect",
        content: "As an architect, I appreciate the clean lines and geometric precision. Their pieces fit perfectly into modern minimalist spaces.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    }
];

export const Testimonials = () => {
    return (
        <section className="py-32 bg-secondary/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <Quote className="mx-auto mb-6 text-accent" size={40} />
                    <h2 className="text-4xl md:text-5xl font-display">Voices Of Satisfaction</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((rev, i) => (
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
