import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider,signInWithPopup,getIdToken} from "firebase/auth";
import {getFirestore,doc,setDoc} from "firebase/firestore";
import app from "./config";

const auth = getAuth(app); 
export {auth,createUserWithEmailAndPassword,onAuthStateChanged,getFirestore,doc,setDoc,GoogleAuthProvider,signInWithPopup,getIdToken};