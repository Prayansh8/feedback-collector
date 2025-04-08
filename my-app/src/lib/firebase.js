// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3bs4ck1Ltvr76HEZNfjNeVYP13Imh-6g",
  authDomain: "tasks-85327.firebaseapp.com",
  databaseURL: "https://tasks-85327-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tasks-85327",
  storageBucket: "tasks-85327.firebasestorage.app",
  messagingSenderId: "1040223234013",
  appId: "1:1040223234013:web:81562d0ab75298e6fef834",
  measurementId: "G-JGLB71C5DC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);

export { app, database, db };