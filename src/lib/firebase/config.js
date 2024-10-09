// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrzFNmxdmIfVN2bqi9mp2g6vaz71AfEFE",
  authDomain: "axial-radius-436608-q6.firebaseapp.com",
  databaseURL: "https://axial-radius-436608-q6-default-rtdb.firebaseio.com",
  projectId: "axial-radius-436608-q6",
  storageBucket: "axial-radius-436608-q6.appspot.com",
  messagingSenderId: "128899871237",
  appId: "1:128899871237:web:30ded11d2a1dd26627226c",
  measurementId: "G-8W9YR4NBKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;