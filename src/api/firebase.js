import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAaL6MVbnfiuHsedrsWSMI3RuOsRsrrc8o",
  authDomain: "astrological-portal.firebaseapp.com",
  databaseURL:
    "https://astrological-portal-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "astrological-portal",
  storageBucket: "astrological-portal.firebasestorage.app",
  messagingSenderId: "841007057484",
  appId: "1:841007057484:web:5b31f1261406cb2bf1c2e9",
  measurementId: "G-D2MW3CKBFK",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
