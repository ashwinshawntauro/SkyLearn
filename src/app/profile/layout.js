"use client"
import { AuthContext } from "@/providers/AuthProvider";

export default function Layout({student,teacher}) {
    const { role } = AuthContext();
  
    return (
      <>{role === 'teacher' ? teacher : student}</>
    );
  }
  