"use client";

import { useContext, createContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged, db, doc,getDoc} from "@/lib/firebase/auth";

// Create the context
const Context = createContext({
  user: null,
  isLogged: false,
  loading: true,
  role:null
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role,setRole] = useState(null)

  const getRole = async (user) =>{
    const docRef = doc(db,'users',user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setRole(docSnap.data().role); 
    } else {
      console.log("No such document!");  //@audit
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUser(user);
        setIsLogged(true);
        getRole(user)
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={{ user, isLogged, loading, role}}>
      {children}
    </Context.Provider>
  );
};

export const AuthContext = () => useContext(Context);

export default AuthProvider;
