import type { User } from "firebase/auth";
import { useState, useEffect, createContext } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

type UserContextType = {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    setCurrentUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return <UserContext.Provider value={value}> {children} </UserContext.Provider>
};

