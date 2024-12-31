"use client";

import { useContext, createContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged,signOut} from "@/lib/firebase/auth";

// Create the context
const Context = createContext({
  userName: null,
  isLogged: false,
  loading: true,
  role: null,
  userId:null,
  email: null,
  accessToken:null,
  address:null,
});

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [userId,setId] = useState(null)
  const [accessToken,setAccess] = useState(null)

  const getUser = async (userEmail) => {
    try {
      const resp = await fetch(`/api/getUser?userEmail=${userEmail}`, {
        method: "GET",
      });
      if (resp.ok) {
        const data = await resp.json();
        setId(data.id)
        setRole(data.role);
        setEmail(data.email);
        setUserName(data.name);
        setAddress(data.address);

      } else {
        console.error("Error fetching role:", resp.statusText);
      }
    } catch (error) {
      console.error("Error in getUser:", error.message);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth); 
      setIsLogged(false);
      setUserName(null);  
      setEmail(null);
      setRole(null);
      setId(null)
      setAddress(null)
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAccess(user.getIdToken())
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
    <Context.Provider value={{ userName, email, isLogged,address, loading, role,logout,userId,accessToken}}>
      {children}
    </Context.Provider>
  );
};

export const AuthContext = () => useContext(Context);

export default AuthProvider;
