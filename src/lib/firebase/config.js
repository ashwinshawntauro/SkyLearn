import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
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

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;