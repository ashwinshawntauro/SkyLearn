import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider,signInWithPopup,getIdToken} from "firebase/auth";
import {getFirestore,doc,setDoc,getDoc} from "firebase/firestore";
import app from "./config";

const auth = getAuth(app); 
const db = getFirestore(app)
export {auth,createUserWithEmailAndPassword,onAuthStateChanged,getFirestore,doc,db,setDoc,getDoc,GoogleAuthProvider,signInWithPopup,getIdToken};