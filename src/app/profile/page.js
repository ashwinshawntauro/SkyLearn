"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Loading from "./loading";

export default function Page() {
  const {userName,isLogged,loading} = AuthContext(); 
  if (loading){
    return <Loading/>
  }
  if (isLogged) {
    return <h1>Welcome to Profile! {userName}</h1> ;
  }
  else{
    return <h1>Please Login!</h1> 
  }
}