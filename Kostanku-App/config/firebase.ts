// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Firestore, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-U_aftHcDJmcWX_EsJ1L3KkjGCVUFnTg",
  authDomain: "kostanku-768d0.firebaseapp.com",
  projectId: "kostanku-768d0",
  storageBucket: "kostanku-768d0.firebasestorage.app",
  messagingSenderId: "549544880396",
  appId: "1:549544880396:web:b32979dbbb107fb9044129"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Database
export const firestore = getFirestore(app);