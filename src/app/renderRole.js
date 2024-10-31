"use client";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";

const RenderRole = ({ children }) => {
  const { role } = AuthContext();

  useEffect(() => {
    console.log("User Role:", role);
  }, [role]); 

  return <>{role==='student'?student:teacher}</>;
};

export default RenderRole;
