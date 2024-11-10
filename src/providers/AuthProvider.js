"use client";

import { useContext, createContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged} from "@/lib/firebase/auth";

// Create the context
const Context = createContext({
  userName: null,
  isLogged: false,
  loading: true,
  role:null,
  email:null
});

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role,setRole] = useState(null)

  const getUser= async (user) =>{
    try {
      const resp = await fetch(`/api/getUser?userEmail=${encodeURIComponent(user)}`,{
        method:'GET'
      })
      if (resp.ok) {
        const data = await resp.json();
        setRole(data.role);
        setEmail(data.email);
        setUserName(data.name)
      } else {
        console.error('Error fetching role:', response.statusText);
        return null;
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.email)
        setLoading(false);
        setIsLogged(true);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={{ userName, email ,isLogged, loading, role}}>
      {children}
    </Context.Provider>
  );
};

export const AuthContext = () => useContext(Context);

export default AuthProvider;
