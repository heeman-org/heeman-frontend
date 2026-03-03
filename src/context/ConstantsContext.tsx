import React, { createContext, useContext, useEffect, useState } from "react";
import { ENV } from "../config/env.config";

interface ConstantsContextType {
    landingConstants: any;
    aboutConstants: any;
    contactConstants: any;
    loading: boolean;
}

const ConstantsContext = createContext<ConstantsContextType | undefined>(undefined);

export const ConstantsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [constants, setConstants] = useState({
        landingConstants: null,
        aboutConstants: null,
        contactConstants: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConstants = async () => {
            try {
                const response = await fetch(`${ENV.API_BASE_URL}/api/frontend-constants`);
                const result = await response.json();

                if (result.success && result.data) {
                    const parsed: any = {};
                    result.data.forEach((item: any) => {
                        parsed[item.key] = item.value;
                    });
                    setConstants(parsed);
                }
            } catch (error) {
                console.error("Failed to fetch constants from backend", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConstants();
    }, []);

    return (
        <ConstantsContext.Provider value={{ ...constants, loading }}>
            {children}
        </ConstantsContext.Provider>
    );
};

export const useConstants = () => {
    const context = useContext(ConstantsContext);
    if (context === undefined) {
        throw new Error("useConstants must be used within a ConstantsProvider");
    }
    return context;
};
