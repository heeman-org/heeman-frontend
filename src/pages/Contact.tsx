import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function Contact() {
    return (
        <div className="pt-32 pb-24">
            {/* Header */}
            <section className="container mx-auto px-6 mb-24">
                <div className="max-w-2xl">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display mb-8"
                    >
                        We're here to help <br /> <span className="italic serif">curate your dream.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-foreground/50 max-w-lg leading-relaxed"
                    >
                        Whether you have a question about our bespoke services, material sourcing, or an existing order, our team is ready to assist you.
                    </motion.p>
                </div>
            </section>

            {/* Main Grid */}
            <section className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-secondary/30 p-12 lg:p-16 border border-foreground/5"
                    >
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Subject</label>
                                <select className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors appearance-none cursor-pointer">
                                    <option>General Inquiry</option>
                                    <option>Interior Consultation</option>
                                    <option>Bespoke Commission</option>
                                    <option>Order Support</option>
                                    <option>Press & Media</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Your Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="How can we help?"
                                    className="w-full bg-transparent border-b border-foreground/10 py-3 outline-none focus:border-accent transition-colors resize-none"
                                />
                            </div>

                            <Button size="lg" className="w-full h-16 rounded-none bg-primary text-white hover:bg-accent transition-all group">
                                Send Message <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-16"
                    >
                        <div>
                            <h3 className="text-xl font-display mb-8">Our Studios</h3>
                            <div className="space-y-10">
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-white flex items-center justify-center border border-foreground/5 shadow-sm shrink-0">
                                        <MapPin size={20} className="text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-2">Bangalore Flagship</h4>
                                        <p className="text-sm text-foreground/50 leading-loose">
                                            123 Indiranagar, 12th Main <br />
                                            Bangalore, KA 560038
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-white flex items-center justify-center border border-foreground/5 shadow-sm shrink-0">
                                        <MapPin size={20} className="text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-2">Mumbai Atelier</h4>
                                        <p className="text-sm text-foreground/50 leading-loose">
                                            Artisans' Quarter, 45 Worli <br />
                                            Mumbai, MH 400018
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-display mb-8">Direct Communication</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <a href="mailto:hello@heeman.com" className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        <Mail size={16} />
                                    </div>
                                    <span className="text-sm font-medium">hello@heeman.com</span>
                                </a>
                                <a href="tel:+918045678900" className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        <Phone size={16} />
                                    </div>
                                    <span className="text-sm font-medium">+91 80 4567 8900</span>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-display mb-8">Connect Digitally</h3>
                            <div className="flex gap-4">
                                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                    <a key={i} href="#" className="w-12 h-12 border border-foreground/10 flex items-center justify-center rounded-full hover:border-accent hover:text-accent hover:bg-accent/5 transition-all">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="container mx-auto px-6 mt-32">
                <div className="w-full h-96 relative grayscale hover:grayscale-0 transition-all duration-700">
                    <img
                        src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=2000"
                        alt="Map detail"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
                </div>
            </section>
        </div>
    );
}
