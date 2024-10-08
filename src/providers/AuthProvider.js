"use client";

import {useContext,createContext,useEffect, useState} from "react";
import { auth, onAuthStateChanged} from "@/lib/firebase/auth";

const Context = createContext({});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=>{
        const userStatus = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLogged(true);
        });
        return () => userStatus();
    },[])
    return(
        <Context.Provider value={{user,isLogged}}>
            {children}
        </Context.Provider>
    )
}

export const AuthContext = () => useContext(Context);
export default AuthProvider;