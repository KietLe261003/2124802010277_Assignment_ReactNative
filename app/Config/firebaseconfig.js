// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIXEWBLQ-3SW5ZfVyklPqqNLyAaCWdzZA",
  authDomain: "reactnative-50610.firebaseapp.com",
  projectId: "reactnative-50610",
  storageBucket: "reactnative-50610.firebasestorage.app",
  messagingSenderId: "748796251784",
  appId: "1:748796251784:web:52c674faf140685053993d",
  measurementId: "G-VYWFSH2EHD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);