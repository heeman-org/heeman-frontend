import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { ENV } from "../config/env.config";

interface GlobalCoupon {
    id: string;
    code: string;
    discountType: "PERCENTAGE" | "FIXED";
    discountValue: number;
}

interface RibbonContextType {
    coupon: GlobalCoupon | null;
    isVisible: boolean;
    dismiss: () => void;
}

const RibbonContext = createContext<RibbonContextType>({
    coupon: null,
    isVisible: false,
    dismiss: () => {},
});

export function RibbonProvider({ children }: { children: ReactNode }) {
    const [coupon, setCoupon] = useState<GlobalCoupon | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("ribbonDismissed") === "true") return;

        fetch(`${ENV.API_BASE_URL}/api/coupons/global`)
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (data?.code) {
                    setCoupon(data);
                    setIsVisible(true);
                }
            })
            .catch(() => {});
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem("ribbonDismissed", "true");
    };

    return (
        <RibbonContext.Provider value={{ coupon, isVisible, dismiss }}>
            {children}
        </RibbonContext.Provider>
    );
}

export const useRibbon = () => useContext(RibbonContext);
