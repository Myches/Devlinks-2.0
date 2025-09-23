// firebase/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBclM-TBstH6-9bOGsUXneUid5Z1dG750",
  authDomain: "devlinks-f4861.firebaseapp.com",
  projectId: "devlinks-f4861",
  storageBucket: "devlinks-f4861.appspot.com",
  messagingSenderId: "552880349038",
  appId: "1:552880349038:web:27b333d0e5f0578690eb7f",
  measurementId: "G-HC377W9D6L"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };