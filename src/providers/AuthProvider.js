"use client";

import { useContext, createContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged,signOut} from "@/lib/firebase/auth";

// Create the context
const Context = createContext({
  userName: null,
  isLogged: false,
  loading: true,
  role: null,
  email: null,
});

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const getUser = async (userEmail) => {
    try {
      const resp = await fetch(`/api/getUser?userEmail=${encodeURIComponent(userEmail)}`, {
        method: "GET",
      });
      if (resp.ok) {
        const data = await resp.json();
        setRole(data.role);
        setEmail(data.email);
        setUserName(data.name);
      } else {
        console.error("Error fetching role:", resp.statusText);
      }
    } catch (error) {
      console.error("Error in getUser:", error.message);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setIsLogged(false); // Update isLogged state to false
      setUserName(null);  // Clear user-specific data
      setEmail(null);
      setRole(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        getUser(user.email);
      } else {
        setIsLogged(false);
      }
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={{ userName, email, isLogged, loading, role,logout}}>
      {children}
    </Context.Provider>
  );
};

export const AuthContext = () => useContext(Context);

export default AuthProvider;
