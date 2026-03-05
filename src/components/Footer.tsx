import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";

export const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-32 pb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>

            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 mb-32 items-center">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-display mb-8">Ready To Elevate <br /><span className="font-medium">Your Living?</span></h2>
                        <div className="flex gap-4">
                            <Button size="lg" className="bg-white text-primary hover:bg-accent hover:text-white rounded-none border-none h-16 px-12 text-lg">
                                Join The Circle
                            </Button>
                        </div>
                    </div>

                    <div className="max-w-md ml-auto">
                        <h4 className="text-xl font-display mb-6">Stay informed of new releases and artisanal stories.</h4>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-accent transition-colors pb-6 pr-12"
                            />
                            <button className="absolute right-0 bottom-6 group">
                                <ArrowRight className="group-hover:translate-x-2 transition-transform text-accent" />
                            </button>
                        </form>
                        <p className="mt-8 text-white/50 text-xs uppercase tracking-widest leading-loose">
                            By subscribing you agree to our privacy policy and consent to receive updates about our products and services.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 border-t border-white/10 pt-20 mb-20">
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="text-2xl font-display font-bold mb-8">HEEMAN</h3>
                        <p className="text-white/40 text-sm leading-relaxed mb-8">
                            Crafting premium furniture with a focus on artisanal quality and sustainable materials since 1995.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:border-accent hover:text-accent transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-xs uppercase tracking-[0.2em] text-accent mb-8">Discovery</h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            <li><a href="#" className="hover:text-white transition-colors">Our Editions</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">New Drops</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Materials</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-xs uppercase tracking-[0.2em] text-accent mb-8">Journal</h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            <li><a href="#" className="hover:text-white transition-colors">Craftsmanship</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Designer Interviews</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Home Tours</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-xs uppercase tracking-[0.2em] text-accent mb-8">Support</h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-xs uppercase tracking-[0.2em] text-accent mb-8">Flagship</h4>
                        <p className="text-sm text-white/50 leading-loose">
                            123 Indiranagar, <br />
                            Bangalore, KA 560038 <br />
                            +91 80 4567 8900
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
                    <p className="text-xs uppercase tracking-widest text-white/40">© 2026 Heeman Furniture. All rights reserved.</p>
                    <div className="flex gap-12">
                        <a href="#" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Terms</a>
                        <a href="#" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
