import React, { createContext, useContext } from "react";
import { landingConstants, aboutConstants, contactConstants } from "../constants";

interface ConstantsContextType {
    landingConstants: any;
    aboutConstants: any;
    contactConstants: any;
    loading: boolean;
}

const ConstantsContext = createContext<ConstantsContextType | undefined>(undefined);

export const ConstantsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Since we are using local files now, loading is always false and constants are immediately available
    const constants = {
        landingConstants,
        aboutConstants,
        contactConstants,
    };

    return (
        <ConstantsContext.Provider value={{ ...constants, loading: false }}>
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
