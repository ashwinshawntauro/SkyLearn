"use client";
import { AuthContext } from "@/providers/AuthProvider";
import Loading from "../loading";

export default function Layout({ student, teacher }) {
  const { role} = AuthContext();
  return role === "teacher" ? teacher : role === "student" ? student : <Loading/>;
}
