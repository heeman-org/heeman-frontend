import { useState } from "react";
import { ShoppingBag, Search, Menu, X, User, Heart } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useRibbon } from "../context/RibbonContext";
import logo from "../assets/logo.png";

import { authClient } from "../lib/auth-client";

const RIBBON_HEIGHT = 36; // approximate height of the TopRibbon in px

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const { scrollY } = useScroll();
    const { totalItems } = useCart();
    const { wishlist } = useWishlist();
    const location = useLocation();

    const { data: session } = authClient.useSession();
    const isAuthenticated = !!session;
    const { isVisible: isRibbonVisible } = useRibbon();

    const isHomePage = location.pathname === "/";
    const isDarkTheme = isScrolled || !isHomePage;

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "Our Story", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const handleLogout = async () => {
        await authClient.signOut();
        window.location.reload();
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{
                    y: 0,
                    paddingTop: isScrolled ? "12px" : "24px",
                    paddingBottom: isScrolled ? "12px" : "24px",
                    top: isRibbonVisible && !isScrolled ? RIBBON_HEIGHT : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    "fixed left-0 right-0 z-50 transition-colors duration-500 w-full",
                    isDarkTheme ? "glass border-b" : "bg-transparent"
                )}
            >
                <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
                    {/* ... (Logo and Center Links unchanged) ... */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="block">
                            <img
                                src={logo}
                                alt="HEEMAN"
                                className={cn(
                                    "h-14 md:h-18 w-auto transition-all duration-300",
                                    !isDarkTheme && "brightness-0 invert"
                                )}
                            />
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={cn(
                                    "relative text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 group overflow-hidden",
                                    isDarkTheme ? "text-primary/70 hover:text-primary" : "text-white/70 hover:text-white"
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
                            isDarkTheme ? "border-primary/10 bg-black/5" : "border-white/10 bg-white/5"
                        )}>
                            <Button variant="ghost" size="icon" className={cn("size-8 rounded-full", isDarkTheme ? "text-primary" : "text-white")}>
                                <Search size={16} />
                            </Button>
                            <div className={cn("w-[1px] h-4 bg-current opacity-10")} />

                            {/* User Profile / Login Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsUserDropdownOpen(true)}
                                onMouseLeave={() => setIsUserDropdownOpen(false)}
                            >
                                <Button variant="ghost" size="icon" className={cn("size-8 rounded-full", isDarkTheme ? "text-primary" : "text-white")}>
                                    <User size={16} />
                                </Button>

                                <AnimatePresence>
                                    {isUserDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 top-full pt-4 w-48"
                                        >
                                            <div className="bg-white border shadow-xl p-2 flex flex-col gap-1">
                                                {!isAuthenticated ? (
                                                    <>
                                                        <Link to="/login" className="px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-zinc-50 transition-colors">Login</Link>
                                                        <Link to="/signup" className="px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-zinc-50 transition-colors">Sign Up</Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="px-4 py-2 border-b mb-1">
                                                            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Profile</p>
                                                            <p className="text-xs text-primary/60 truncate font-medium">{session.user.email}</p>
                                                        </div>
                                                        <Link to="/orders" className="px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-zinc-50 transition-colors">My Orders</Link>
                                                        <button
                                                            onClick={handleLogout}
                                                            className="text-left px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-500 hover:bg-zinc-50 transition-colors"
                                                        >
                                                            Logout
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className={cn("w-[1px] h-4 bg-current opacity-10")} />
                            <Link to="/wishlist">
                                <Button variant="ghost" size="icon" className={cn("size-8 rounded-full relative", isDarkTheme ? "text-primary" : "text-white")}>
                                    <Heart size={16} />
                                    {wishlist.length > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-1 right-1 w-3.5 h-3.5 bg-accent rounded-full border border-white text-[9px] flex items-center justify-center font-bold text-white shadow-sm"
                                        >
                                            {wishlist.length}
                                        </motion.span>
                                    )}
                                </Button>
                            </Link>

                            <div className={cn("w-[1px] h-4 bg-current opacity-10")} />
                            <Link to="/cart">
                                <Button variant="ghost" size="icon" className={cn("size-8 rounded-full relative", isDarkTheme ? "text-primary" : "text-white")}>
                                    <ShoppingBag size={16} />
                                    {totalItems > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-1 right-1 w-3.5 h-3.5 bg-accent rounded-full border border-white text-[9px] flex items-center justify-center font-bold text-white shadow-sm"
                                        >
                                            {totalItems}
                                        </motion.span>
                                    )}
                                </Button>
                            </Link>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("lg:hidden rounded-full", isDarkTheme ? "text-primary" : "text-white")}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>

                        <a href="/catalog.pdf" target="_blank" rel="noopener noreferrer">
                            <Button
                                className={cn(
                                    "hidden md:flex ml-2 rounded-none px-6 font-semibold tracking-widest text-xs uppercase transition-all duration-300",
                                    isDarkTheme
                                        ? "bg-primary text-white hover:bg-accent"
                                        : "bg-white text-primary hover:bg-accent hover:text-white"
                                )}
                            >
                                Catalogue
                            </Button>
                        </a>
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
                            <Link to="/catalog.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full h-16 rounded-none text-lg">Download Catalog</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
