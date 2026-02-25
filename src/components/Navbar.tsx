import { useState } from "react";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "Our Story", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{
                    y: 0,
                    paddingTop: isScrolled ? "12px" : "24px",
                    paddingBottom: isScrolled ? "12px" : "24px",
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-colors duration-500 w-full",
                    isScrolled ? "glass border-b" : "bg-transparent"
                )}
            >
                <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0"
                    >
                        <Link to="/" className={cn(
                            "text-2xl font-display font-bold tracking-[-0.04em] transition-colors duration-300",
                            isScrolled ? "text-primary" : "text-white"
                        )}>
                            HEEMAN<span className="text-accent">.</span>
                        </Link>
                    </motion.div>

                    {/* Center Links - Desktop */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={cn(
                                    "relative text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 group overflow-hidden",
                                    isScrolled ? "text-primary/70 hover:text-primary" : "text-white/70 hover:text-white"
                                )}
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "flex items-center gap-1 px-2 py-1 rounded-full border transition-all duration-300",
                            isScrolled ? "border-primary/10 bg-black/5" : "border-white/10 bg-white/5"
                        )}>
                            <Button variant="ghost" size="icon" className={cn("size-8 rounded-full", isScrolled ? "text-primary" : "text-white")}>
                                <Search size={16} />
                            </Button>
                            <div className={cn("w-[1px] h-4 bg-current opacity-10")} />
                            <Button variant="ghost" size="icon" className={cn("size-8 rounded-full", isScrolled ? "text-primary" : "text-white")}>
                                <User size={16} />
                            </Button>
                            <div className={cn("w-[1px] h-4 bg-current opacity-10")} />
                            <Button variant="ghost" size="icon" className={cn("size-8 rounded-full relative", isScrolled ? "text-primary" : "text-white")}>
                                <ShoppingBag size={16} />
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border border-white text-[6px] flex items-center justify-center font-bold text-white"
                                >
                                    2
                                </motion.span>
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("lg:hidden rounded-full", isScrolled ? "text-primary" : "text-white")}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>

                        <Link to="/contact">
                            <Button
                                className={cn(
                                    "hidden md:flex ml-2 rounded-none px-6 font-bold tracking-widest text-[10px] uppercase transition-all duration-300",
                                    isScrolled
                                        ? "bg-primary text-white hover:bg-accent"
                                        : "bg-white text-primary hover:bg-accent hover:text-white"
                                )}
                            >
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-white lg:hidden flex flex-col"
                    >
                        <div className="p-6 flex justify-between items-center border-b">
                            <span className="text-xl font-display font-bold">HEEMAN.</span>
                            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                <X size={24} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-12 flex flex-col gap-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={link.name}
                                >
                                    <Link
                                        to={link.href}
                                        className="text-4xl font-display group flex items-baseline gap-4"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="text-accent text-sm font-sans font-bold">{`0${i + 1}`}</span>
                                        <span className="group-hover:translate-x-4 transition-transform duration-500">{link.name}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-12 border-t">
                            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full h-16 rounded-none text-lg">Inquire Now</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
