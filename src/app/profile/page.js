"use client"

import { AuthContext } from "@/providers/AuthProvider";

export default function Page() {
  const {user}= AuthContext();
  console.log(user)
  return (
  <h1>Welcome to Profile! {user.uid}</h1>
  );
}