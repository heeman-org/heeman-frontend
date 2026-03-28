import { X, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRibbon } from "../context/RibbonContext";

export function TopRibbon() {
    const { coupon, isVisible, dismiss } = useRibbon();

    return (
        <AnimatePresence>
            {isVisible && coupon && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-accent text-accent-foreground relative overflow-hidden flex items-center justify-center p-2 text-xs md:text-sm font-medium border-b border-accent-foreground/10 z-50 tracking-wide"
                >
                    <div className="flex items-center gap-2 max-w-[90%] text-center px-4">
                        <Tag size={14} className="flex-shrink-0" />
                        <span>
                            Apply code{" "}
                            <span className="font-bold underline decoration-accent-foreground/30 underline-offset-4">
                                {coupon.code}
                            </span>{" "}
                            at checkout to get{" "}
                            {coupon.discountType === "PERCENTAGE"
                                ? `${coupon.discountValue}%`
                                : `$${coupon.discountValue}`}{" "}
                            off your entire order for free!
                        </span>
                    </div>

                    <button
                        onClick={dismiss}
                        className="absolute right-4 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Dismiss message"
                    >
                        <X size={14} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
