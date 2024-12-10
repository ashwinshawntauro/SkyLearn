import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider,signInWithPopup,getIdToken,signOut,signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";
import {getFirestore,doc,setDoc,getDoc,collection,addDoc, query, orderBy, onSnapshot} from "firebase/firestore";
import app from "./config";

const auth = getAuth(app); 
const db = getFirestore(app)
export {auth,createUserWithEmailAndPassword,collection,addDoc, query, orderBy, onSnapshot,onAuthStateChanged,getFirestore,doc,db,setDoc,getDoc,GoogleAuthProvider,signOut,signInWithPopup,signInWithEmailAndPassword,getIdToken,sendPasswordResetEmail};