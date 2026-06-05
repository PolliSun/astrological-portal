import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

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
const auth = getAuth(app);
const db = getDatabase(app);

export function onUserStateChanged(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Ошибка входа через Google:", error);
    return null;
  }
}

export async function saveUserProfile(uid, data) {
  await set(ref(db, `users/${uid}`), data);
}

export async function loadUserProfile(uid) {
  const snapshot = await get(ref(db, `users/${uid}`));
  return snapshot.exists() ? snapshot.val() : null;
}
