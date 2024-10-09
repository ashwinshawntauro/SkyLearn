"use client";

import { AuthContext } from "@/providers/AuthProvider";

export default function Page() {
  const {user,isLogged } = AuthContext(); 
  if (isLogged) {
    return <h1>Welcome to Profile! {user.uid}</h1> ;
  }
  else{
    return <h1>Please Login!</h1> 
  }
}