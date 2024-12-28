"use client"
import { AuthContext } from "@/providers/AuthProvider";
import Error from "./error";
import Loading from "../loading";
import { useRouter } from "next/navigation";

export default function Layout({ teacher }) {
    const {isLogged, role,loading} = AuthContext();
    const router = useRouter()
    if (!loading){
      if(isLogged){
        return role === "teacher" ? teacher : <span/>;
      }
      else{
        return <Error/>
      }
    }
    return <Loading/>

}
