import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import app from "./config"; // Ensure this points to your config file

const auth = getAuth(app); 
export {auth, createUserWithEmailAndPassword, onAuthStateChanged};