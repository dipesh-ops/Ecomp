// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCeApYR1WrlobN5g8bMSGblhWmGiFX49E",
  authDomain: "ecom-93fb5.firebaseapp.com",
  projectId: "ecom-93fb5",
  storageBucket: "ecom-93fb5.firebasestorage.app",
  messagingSenderId: "656757486273",
  appId: "1:656757486273:web:290c0eb855e6e6ee5dda40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}