import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cats = [
    { title: "Living Room", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800", count: 124 },
    { title: "Bedroom", img: "https://images.unsplash.com/photo-1505693419163-d7bb94ae58c2?auto=format&fit=crop&q=80&w=800", count: 86 },
    { title: "Workplace", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800", count: 42 },
    { title: "Dining", img: "https://images.unsplash.com/photo-1577146313131-408992b23a7c?auto=format&fit=crop&q=80&w=800", count: 65 }
];

export const Categories = () => {
    return (
        <section className="py-24 container mx-auto px-6" id="collections">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-xl">
                    <h2 className="text-accent font-medium tracking-[0.3em] uppercase text-xs mb-6 block">Categories</h2>
                    <h2 className="text-4xl md:text-5xl font-display leading-tight">Tailored For Every <br /><span className="italic serif">Atmosphere.</span></h2>
                </div>
                <a href="#" className="flex items-center gap-4 group font-medium pb-2 border-b border-foreground/10 hover:border-accent transition-colors">
                    Browse All <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cats.map((cat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 0.98 }}
                        className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-secondary"
                    >
                        <img
                            src={cat.img}
                            alt={cat.title}
                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-2">{cat.count} Pieces</span>
                            <h3 className="text-2xl font-display text-white mb-6 underline underline-offset-8 decoration-white/0 group-hover:decoration-accent transition-all animate-in fade-in slide-in-from-bottom-2">{cat.title}</h3>
                            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent transition-all overflow-hidden">
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
