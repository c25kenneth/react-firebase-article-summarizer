import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXQR4e45zfaSvNcMaDHecZJKbZMwymiQQ",
  authDomain: "react-firebase-facda.firebaseapp.com",
  projectId: "react-firebase-facda",
  storageBucket: "react-firebase-facda.appspot.com",
  messagingSenderId: "711217278528",
  appId: "1:711217278528:web:078964d313af5d5518b9a5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(); 

export const db = getFirestore(app)