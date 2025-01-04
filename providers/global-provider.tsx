import React, {createContext, useContext} from "react";
import {useAppwrite} from "@/hooks/useAppwrite";
import {getCurrentUser} from "@/lib/appwrite";

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({children}: { children: React.ReactNode }) => {
    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({
        fn: getCurrentUser,
    });

    const isLoggedIn = !!user;

    return (
        // @ts-ignore
        <GlobalContext.Provider value={{isLoggedIn, user: user ?? null, loading, refetch}}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }

    return context;
}

export default GlobalProvider;