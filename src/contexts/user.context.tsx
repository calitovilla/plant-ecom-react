import type { User } from "firebase/auth";
import { useState, createContext } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";

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

    return <UserContext.Provider value={value}> {children} </UserContext.Provider>
};

