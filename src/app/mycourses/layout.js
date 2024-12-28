"use client";
import { AuthContext } from "@/providers/AuthProvider";
import Loading from "../loading";
import { useRouter } from "next/navigation";

export default function Layout({ student, teacher }) {
  const {isLogged, role,loading} = AuthContext();
  const router = useRouter()
  if (!loading){
    if(isLogged){
      return role === "teacher" ? teacher : role === "student" ? student : <span/>;
    }
    else{
      return router.push('/signin')
    }
  }
  return <Loading/>
}
