// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABWBkv_AyXHgd4c1KSgxkOSpjQumiGqP0",
    authDomain: "taskify-badeb.firebaseapp.com",
    projectId: "taskify-badeb",
    storageBucket: "taskify-badeb.appspot.com",
    messagingSenderId: "846954311206",
    appId: "1:846954311206:web:371662db9f9fd12e7e00e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore with the `app` instance
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
