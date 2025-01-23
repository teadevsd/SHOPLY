
import React, { createContext, useContext, useState } from "react";

const AppContext  = createContext();

export const AppProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [isVerified, setIsVerified] = useState(false); // Add this

    return (
        <AppContext.Provider value={{ email, setEmail, isVerified, setIsVerified }}>
            {children}
        </AppContext.Provider>
    );
};



export const useAppContext = () => useContext(AppContext);