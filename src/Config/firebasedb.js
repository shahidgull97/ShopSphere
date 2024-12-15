import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE4OkrgI8nI5v-sRQ-7d1s20hqnmXl2D4",
  authDomain: "busy-buy-13253.firebaseapp.com",
  projectId: "busy-buy-13253",
  storageBucket: "busy-buy-13253.firebasestorage.app",
  messagingSenderId: "252779303152",
  appId: "1:252779303152:web:70f9cd817c0c84e897b235",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
