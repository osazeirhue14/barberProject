// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiuuuGoPLL40SB70ZCOKTiRduLrm8YvQk",
  authDomain: "barberpage-ef081.firebaseapp.com",
  databaseURL: "https://barberpage-ef081-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "barberpage-ef081",
  storageBucket: "barberpage-ef081.firebasestorage.app", // 👈 small fix here, see below
  messagingSenderId: "947021264930",
  appId: "1:947021264930:web:6c60126491266a86dbf27b",
  measurementId: "G-D8QYTLR1JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore reference
export const db = getFirestore(app);
