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

        // onAuthStateChangedListener tell us wich type of callback function we need to pass to it
        // on this case we can pass a function with a user parameter,
        // but we can also pass a function with no parameters like () => {...}
        const unsubscribe = onAuthStateChangedListener((user) => { 
            console.log("User state changed:", user);
            setCurrentUser(user);
        });
        // Important: when the app is launched for the first time, console.log will show "User state changed: null"
        // because by default Firebase needs to check if the user is logged in or not.
        // Its not an error, its just how Firebase works.

        // Cleanup subscription on unmount
        return () => unsubscribe();

        // return unsubscribe; // This works too because unsubscribe is a function with no arguments
        // () => unsubscribe(); is also a function with no arguments that calls unsubscribe fu

    }, []);

    return <UserContext.Provider value={value}> {children} </UserContext.Provider>
};

