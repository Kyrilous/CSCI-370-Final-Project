// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGflh0Ok-517Q4gcCTlzVqvFX1G5G6V9Q",
  authDomain: "roomradar-qc.firebaseapp.com",
  projectId: "roomradar-qc",
  storageBucket: "roomradar-qc.firebasestorage.app",
  messagingSenderId: "17296348256",
  appId: "1:17296348256:web:63a2fbd7c29264ea21df05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);