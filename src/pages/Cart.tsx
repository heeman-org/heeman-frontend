import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ShieldCheck, Truck, Tag, X, Loader2, Gift, ChevronRight, Lock, CheckCircle2, DollarSign, Hash } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/Button";
import { authClient } from "../lib/auth-client";
import { useState, useRef, useEffect } from "react";
import { ENV } from "../config/env.config";

interface AppliedCoupon {
    code: string;
    discountType: "PERCENTAGE" | "FIXED";
    discountValue: number;
    productIds: string[];
}

interface AvailableCoupon {
    id: string;
    code: string;
    discountType: "PERCENTAGE" | "FIXED";
    discountValue: number;
    minOrderAmount: number | null;
    minItemCount: number | null;
    validUntil: string | null;
    usageLimit: number | null;
    usedCount: number;
}

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

    // Auth state for user specific validation
    const { data: session } = authClient.useSession();
    const currentUserId = session?.user?.id;

    // Coupon state
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const [couponError, setCouponError] = useState("");
    const [couponSuccess, setCouponSuccess] = useState(false);

    // Coupon picker state
    const [isCouponPickerOpen, setIsCouponPickerOpen] = useState(false);
    const [availableCoupons, setAvailableCoupons] = useState<AvailableCoupon[]>([]);
    const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
    const couponInputRef = useRef<HTMLInputElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);

    // Initial calculations
    const shipping = subtotal > 5000 ? 0 : 150;

    // Calculate eligible amount for discount
    const eligibleAmount = appliedCoupon
        ? appliedCoupon.productIds.length > 0
            ? cart.reduce((sum, item) => {
                if (appliedCoupon.productIds.includes(item.id)) {
                    const price = parseFloat(item.price.replace(/[$,]/g, ""));
                    return sum + (price * item.quantity);
                }
                return sum;
            }, 0)
            : subtotal
        : 0;

    // Calculate discount amount
    let discountAmount = 0;
    if (appliedCoupon) {
        if (eligibleAmount > 0) {
            if (appliedCoupon.discountType === "PERCENTAGE") {
                discountAmount = eligibleAmount * (appliedCoupon.discountValue / 100);
            } else {
                discountAmount = Math.min(appliedCoupon.discountValue, eligibleAmount);
            }
        }
    }

    const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
    const tax = subtotalAfterDiscount * 0.18;
    const total = subtotalAfterDiscount + shipping + tax;

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const handleApplyCoupon = async () => {
        setCouponError("");
        setCouponSuccess(false);

        if (!couponCode.trim()) {
            setCouponError("Please enter a coupon code");
            return;
        }

        setIsApplyingCoupon(true);
        try {
            const url = new URL(`${ENV.API_BASE_URL}/api/coupons/code/${couponCode.toUpperCase()}`);
            if (currentUserId) {
                url.searchParams.append("userId", currentUserId);
            }
            const response = await fetch(url.toString());

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error("This coupon is restricted to a different user account");
                }
                throw new Error("Invalid or expired coupon");
            }
            const data = await response.json();

            // Check if coupon is active
            if (!data.isActive) {
                throw new Error("This coupon is no longer active");
            }

            // Check valid dates
            const now = new Date();
            if (new Date(data.validFrom) > now) {
                throw new Error("This coupon is not valid yet");
            }
            if (data.validUntil && new Date(data.validUntil) < now) {
                throw new Error("This coupon has expired");
            }

            // Check usage limit
            if (data.usageLimit !== null && data.usedCount >= data.usageLimit) {
                throw new Error("This coupon usage limit has been reached");
            }

            // Save applied coupon with relevant details
            setAppliedCoupon({
                code: data.code,
                discountType: data.discountType,
                discountValue: data.discountValue,
                productIds: data.products.map((p: any) => p.id),
            });
            setCouponSuccess(true);
            setCouponCode("");

        } catch (err: any) {
            setCouponError(err.message || "Failed to apply coupon");
            setAppliedCoupon(null);
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode("");
        setCouponError("");
        setCouponSuccess(false);
    };

    // Coupon picker logic
    const fetchAvailableCoupons = async () => {
        setIsLoadingCoupons(true);
        try {
            const url = new URL(`${ENV.API_BASE_URL}/api/coupons/available`);
            if (currentUserId) url.searchParams.append("userId", currentUserId);
            const res = await fetch(url.toString());
            if (res.ok) setAvailableCoupons(await res.json());
        } catch {
            setAvailableCoupons([]);
        } finally {
            setIsLoadingCoupons(false);
        }
    };

    const openCouponPicker = () => {
        setIsCouponPickerOpen(true);
        fetchAvailableCoupons();
    };

    const getCouponEligibility = (coupon: AvailableCoupon) => {
        const meetsAmount = !coupon.minOrderAmount || subtotal >= coupon.minOrderAmount;
        const meetsItems = !coupon.minItemCount || totalItems >= coupon.minItemCount;
        const withinUsage = coupon.usageLimit === null || coupon.usedCount < coupon.usageLimit;
        return {
            isEligible: meetsAmount && meetsItems && withinUsage,
            amountShortfall: coupon.minOrderAmount ? Math.max(0, coupon.minOrderAmount - subtotal) : 0,
            itemsShortfall: coupon.minItemCount ? Math.max(0, coupon.minItemCount - totalItems) : 0,
        };
    };

    const applyFromPicker = async (code: string) => {
        setIsCouponPickerOpen(false);
        setCouponError("");
        setCouponSuccess(false);
        setIsApplyingCoupon(true);
        try {
            const url = new URL(`${ENV.API_BASE_URL}/api/coupons/code/${code}`);
            if (currentUserId) url.searchParams.append("userId", currentUserId);
            const response = await fetch(url.toString());
            if (!response.ok) {
                if (response.status === 403) throw new Error("This coupon is restricted to a different user account");
                throw new Error("Invalid or expired coupon");
            }
            const data = await response.json();
            if (!data.isActive) throw new Error("This coupon is no longer active");
            const now = new Date();
            if (new Date(data.validFrom) > now) throw new Error("This coupon is not valid yet");
            if (data.validUntil && new Date(data.validUntil) < now) throw new Error("This coupon has expired");
            if (data.usageLimit !== null && data.usedCount >= data.usageLimit) throw new Error("This coupon usage limit has been reached");
            setAppliedCoupon({
                code: data.code,
                discountType: data.discountType,
                discountValue: data.discountValue,
                productIds: data.products.map((p: any) => p.id),
            });
            setCouponSuccess(true);
        } catch (err: any) {
            setCouponError(err.message || "Failed to apply coupon");
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                pickerRef.current && !pickerRef.current.contains(e.target as Node) &&
                couponInputRef.current && !couponInputRef.current.contains(e.target as Node)
            ) {
                setIsCouponPickerOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="pt-32 pb-24 min-h-[80vh]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-accent font-semibold tracking-[0.2em] uppercase text-sm mb-6 block"
                    >
                        Your Selections
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display mb-4"
                    >
                        Curation <span className="font-medium">Cart.</span>
                    </motion.h1>
                    <p className="text-foreground/50 font-medium">Items in your private collection ({totalItems})</p>
                </div>

                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-24 text-center bg-secondary/20 border border-dashed border-foreground/10"
                    >
                        <ShoppingBag size={48} className="mx-auto mb-6 text-foreground/10" />
                        <h2 className="text-3xl font-display mb-4">Your collection is empty.</h2>
                        <p className="text-foreground/40 mb-12 max-w-sm mx-auto">
                            Explore our curated editions and find the perfect pieces for your sanctuary.
                        </p>
                        <Link to="/shop">
                            <Button size="lg" className="rounded-none px-12 uppercase tracking-widest text-xs font-semibold h-14">
                                Explore The Shop
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Items List */}
                        <div className="lg:col-span-8 space-y-8">
                            <AnimatePresence mode="popLayout">
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="flex flex-col sm:flex-row gap-8 p-6 bg-secondary/20 border border-foreground/5 relative group"
                                    >
                                        <Link to={`/shop/${item.id}`} className="shrink-0 aspect-[4/5] w-full sm:w-40 overflow-hidden bg-secondary">
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </Link>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-xs uppercase tracking-widest font-semibold text-foreground/40 mb-2 block">
                                                        {item.category}
                                                    </span>
                                                    <Link to={`/shop/${item.id}`} className="hover:text-accent transition-colors">
                                                        <h3 className="text-2xl font-display mb-1">{item.name}</h3>
                                                    </Link>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-foreground/20 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap justify-between items-end gap-6">
                                                <div className="flex items-center border border-foreground/10 h-10 bg-white shadow-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-4 h-full hover:text-accent transition-colors border-r border-foreground/5"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-4 h-full hover:text-accent transition-colors border-l border-foreground/5"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs uppercase tracking-widest font-semibold opacity-40 mb-1">Total</p>
                                                    <span className="text-xl font-display text-accent">
                                                        {formatPrice(parseFloat(item.price.replace(/[$,]/g, "")) * item.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Coupon Section */}
                            <motion.div
                                layout
                                className="bg-secondary/10 border border-foreground/5 p-8"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Tag className="text-accent" size={20} />
                                    <h3 className="text-xl font-display">Apply Discount Code</h3>
                                </div>

                                {appliedCoupon ? (
                                    <div className="flex items-center justify-between bg-green-50 text-green-800 p-4 border border-green-200">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold uppercase tracking-widest">
                                                Code Applied: {appliedCoupon.code}
                                            </span>
                                            <span className="text-xs mt-1">
                                                {appliedCoupon.discountType === "PERCENTAGE"
                                                    ? `${appliedCoupon.discountValue}% off`
                                                    : formatPrice(appliedCoupon.discountValue) + ` off`}
                                                {appliedCoupon.productIds.length > 0 ? " on selected items" : " on your order"}
                                                {discountAmount === 0 && " (Requirements not met)"}
                                            </span>
                                        </div>
                                        <button
                                            onClick={removeCoupon}
                                            className="p-2 hover:bg-green-100 transition-colors"
                                            aria-label="Remove coupon"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="flex gap-4">
                                            <input
                                                ref={couponInputRef}
                                                type="text"
                                                placeholder="Enter code or browse available offers"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                onFocus={openCouponPicker}
                                                className="flex-1 h-12 px-4 bg-white border border-foreground/10 focus:border-accent outline-none uppercase font-mono tracking-widest text-sm"
                                            />
                                            <Button
                                                onClick={handleApplyCoupon}
                                                disabled={isApplyingCoupon || !couponCode.trim()}
                                                className="h-12 px-8 uppercase tracking-widest text-xs font-semibold rounded-none whitespace-nowrap"
                                            >
                                                {isApplyingCoupon ? <Loader2 className="animate-spin" size={16} /> : "Apply"}
                                            </Button>
                                        </div>

                                        {couponError && (
                                            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-4">
                                                {couponError}
                                            </p>
                                        )}
                                        {couponSuccess && (
                                            <p className="text-green-600 text-xs font-bold uppercase tracking-widest mt-4">
                                                Coupon applied successfully!
                                            </p>
                                        )}

                                        {/* Coupon Picker Popup */}
                                        <AnimatePresence>
                                            {isCouponPickerOpen && (
                                                <motion.div
                                                    ref={pickerRef}
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.18 }}
                                                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-foreground/10 shadow-2xl z-50 overflow-hidden"
                                                >
                                                    {/* Picker Header */}
                                                    <div className="flex items-center justify-between px-5 py-4 border-b border-foreground/5 bg-secondary/20">
                                                        <div className="flex items-center gap-2">
                                                            <Tag size={14} className="text-accent" />
                                                            <span className="text-xs font-bold uppercase tracking-widest">Available Offers</span>
                                                        </div>
                                                        <button
                                                            onClick={() => setIsCouponPickerOpen(false)}
                                                            className="p-1 hover:bg-foreground/5 rounded transition-colors"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>

                                                    <div className="max-h-[380px] overflow-y-auto">
                                                        {isLoadingCoupons ? (
                                                            <div className="py-12 flex flex-col items-center gap-3">
                                                                <Loader2 size={20} className="animate-spin text-foreground/30" />
                                                                <span className="text-xs font-bold uppercase tracking-widest text-foreground/30">
                                                                    Loading offers...
                                                                </span>
                                                            </div>
                                                        ) : availableCoupons.length === 0 ? (
                                                            <div className="py-14 flex flex-col items-center gap-4 px-6 text-center">
                                                                <div className="h-14 w-14 bg-secondary/40 flex items-center justify-center">
                                                                    <Gift size={24} className="text-foreground/20" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold mb-1">No offers available right now</p>
                                                                    <p className="text-xs text-foreground/40 leading-relaxed max-w-xs">
                                                                        Check back later — exclusive bulk discount codes will appear here when active.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ) : (() => {
                                                            const eligible = availableCoupons.filter(c => getCouponEligibility(c).isEligible);
                                                            const locked = availableCoupons.filter(c => !getCouponEligibility(c).isEligible);
                                                            return (
                                                                <div>
                                                                    {/* Eligible coupons */}
                                                                    {eligible.length > 0 && (
                                                                        <div>
                                                                            <div className="px-5 py-2.5 bg-green-50 border-b border-green-100 flex items-center gap-2">
                                                                                <CheckCircle2 size={12} className="text-green-600" />
                                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-green-700">
                                                                                    Applicable to your order ({eligible.length})
                                                                                </span>
                                                                            </div>
                                                                            {eligible.map((coupon) => (
                                                                                <div
                                                                                    key={coupon.id}
                                                                                    className="flex items-center justify-between px-5 py-4 border-b border-foreground/5 hover:bg-green-50/50 transition-colors group cursor-pointer"
                                                                                    onClick={() => applyFromPicker(coupon.code)}
                                                                                >
                                                                                    <div className="flex-1 min-w-0">
                                                                                        <div className="flex items-center gap-3 mb-1">
                                                                                            <span className="font-mono font-bold text-sm tracking-wider">{coupon.code}</span>
                                                                                            <span className="text-accent font-bold text-xs">
                                                                                                {coupon.discountType === "PERCENTAGE"
                                                                                                    ? `${coupon.discountValue}% off`
                                                                                                    : formatPrice(coupon.discountValue) + " off"}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-3 text-[10px] text-foreground/40 font-medium">
                                                                                            {coupon.minOrderAmount ? (
                                                                                                <span className="flex items-center gap-1 text-green-600">
                                                                                                    <CheckCircle2 size={9} />
                                                                                                    Min. {formatPrice(coupon.minOrderAmount)}
                                                                                                </span>
                                                                                            ) : (
                                                                                                <span className="flex items-center gap-1 text-green-600">
                                                                                                    <CheckCircle2 size={9} />
                                                                                                    Any order value
                                                                                                </span>
                                                                                            )}
                                                                                            {coupon.minItemCount ? (
                                                                                                <span className="flex items-center gap-1 text-green-600">
                                                                                                    <CheckCircle2 size={9} />
                                                                                                    {coupon.minItemCount}+ items
                                                                                                </span>
                                                                                            ) : (
                                                                                                <span className="flex items-center gap-1 text-green-600">
                                                                                                    <CheckCircle2 size={9} />
                                                                                                    Any quantity
                                                                                                </span>
                                                                                            )}
                                                                                            {coupon.validUntil && (
                                                                                                <span>Expires {new Date(coupon.validUntil).toLocaleDateString()}</span>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-1 text-accent text-[10px] font-bold uppercase tracking-widest ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                        Apply <ChevronRight size={12} />
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}

                                                                    {/* Locked coupons */}
                                                                    {locked.length > 0 && (
                                                                        <div>
                                                                            <div className="px-5 py-2.5 bg-secondary/30 border-b border-foreground/5 flex items-center gap-2">
                                                                                <Lock size={11} className="text-foreground/40" />
                                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                                                                                    Add more to unlock ({locked.length})
                                                                                </span>
                                                                            </div>
                                                                            {locked.map((coupon) => {
                                                                                const { amountShortfall, itemsShortfall } = getCouponEligibility(coupon);
                                                                                return (
                                                                                    <div
                                                                                        key={coupon.id}
                                                                                        className="flex items-center justify-between px-5 py-4 border-b border-foreground/5 opacity-60"
                                                                                    >
                                                                                        <div className="flex-1 min-w-0">
                                                                                            <div className="flex items-center gap-3 mb-1">
                                                                                                <span className="font-mono font-bold text-sm tracking-wider text-foreground/50">{coupon.code}</span>
                                                                                                <span className="font-bold text-xs text-foreground/40">
                                                                                                    {coupon.discountType === "PERCENTAGE"
                                                                                                        ? `${coupon.discountValue}% off`
                                                                                                        : formatPrice(coupon.discountValue) + " off"}
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className="flex items-center gap-3 text-[10px] font-medium text-foreground/40">
                                                                                                {amountShortfall > 0 && (
                                                                                                    <span className="flex items-center gap-1 text-amber-600">
                                                                                                        <DollarSign size={9} />
                                                                                                        Add {formatPrice(amountShortfall)} more
                                                                                                    </span>
                                                                                                )}
                                                                                                {itemsShortfall > 0 && (
                                                                                                    <span className="flex items-center gap-1 text-amber-600">
                                                                                                        <Hash size={9} />
                                                                                                        Add {itemsShortfall} more item{itemsShortfall > 1 ? "s" : ""}
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                        <Lock size={14} className="text-foreground/20 ml-4 flex-shrink-0" />
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    )}

                                                                    {eligible.length === 0 && locked.length > 0 && (
                                                                        <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
                                                                            <p className="text-[10px] font-medium text-amber-700">
                                                                                Keep adding items to unlock exclusive bulk discounts.
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })()}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32">
                            <div className="bg-primary text-white p-8 md:p-12 shadow-2xl relative overflow-hidden">
                                <h3 className="text-3xl font-display mb-10 relative z-10">Summary</h3>

                                <div className="space-y-6 mb-10 relative z-10">
                                    <div className="flex justify-between text-sm">
                                        <span className="opacity-50">Subtotal</span>
                                        <span className="font-bold">{formatPrice(subtotal)}</span>
                                    </div>

                                    {appliedCoupon && discountAmount > 0 && (
                                        <div className="flex justify-between text-sm text-accent">
                                            <span className="font-medium">Discount ({appliedCoupon.code})</span>
                                            <span className="font-bold">-{formatPrice(discountAmount)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-sm">
                                        <span className="opacity-50">White Glove Delivery</span>
                                        <span className="font-bold">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm pb-6 border-b border-white/10">
                                        <span className="opacity-50">Est. Luxury Tax (18%)</span>
                                        <span className="font-bold">{formatPrice(tax)}</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-display pt-2">
                                        <span>Total</span>
                                        <span className="text-accent">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10 relative z-10">
                                    <div className="flex items-center gap-4 text-xs uppercase tracking-widest opacity-70">
                                        <ShieldCheck size={14} className="text-accent" /> Secure Bespoke Checkout
                                    </div>
                                    <div className="flex items-center gap-4 text-xs uppercase tracking-widest opacity-70">
                                        <Truck size={14} className="text-accent" /> Premium Handling Included
                                    </div>
                                </div>

                                <Button size="lg" className="w-full h-16 rounded-none bg-accent hover:bg-white hover:text-primary transition-all group border-none relative z-10">
                                    Proceed to Payment <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                                </Button>

                                {/* Decorative */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-[60px] -ml-16 -mb-16"></div>
                            </div>

                            <div className="mt-8 text-center">
                                <Link to="/shop" className="text-xs font-semibold uppercase tracking-widest border-b border-foreground/10 pb-1 hover:text-accent hover:border-accent transition-all">
                                    Continue Curating
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
