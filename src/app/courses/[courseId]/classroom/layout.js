"use client"
import { AuthContext } from "@/providers/AuthProvider";
import Error from "./error";
import Loading from "../loading";

export default function Layout({ teacher }) {
    const { role} = AuthContext();

    return (
        <>{role === 'teacher' ? teacher : role === null ? <Loading /> : <Error />}</>
    );

}
