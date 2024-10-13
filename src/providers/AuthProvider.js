"use client";

import { useContext, createContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "@/lib/firebase/auth";

// Create the context
const Context = createContext({
    user: null,
    isLogged: false,
    loading: true
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUser(user);
        setIsLogged(true);
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={{ user, isLogged,loading}}>
      {children}
    </Context.Provider>
  );
};

// Hook to use auth context in components
export const AuthContext = () => useContext(Context);

export default AuthProvider;
