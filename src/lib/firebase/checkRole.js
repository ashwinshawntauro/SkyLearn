"use client"
import { useState, useEffect, useContext } from 'react';
import { db, getDoc, doc } from '@/lib/firebase/auth';
import { AuthContext } from '@/providers/AuthProvider';

export default unction checkRole() {
  const { user } = AuthContext();
  useEffect(() => {
    async function fetchRole() {
      if (user) { 
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role); 
        } else {
          console.log("No such document!");
        }
      }
    }

    fetchRole();
  }, [user]); 

  return role; 
}
