import { db } from "./firebase.js";
import { ref, set, get } from "firebase/database";

export async function saveUserProfile(uid, data) {
  await set(ref(db, `users/${uid}`), data);
}

export async function loadUserProfile(uid) {
  const snapshot = await get(ref(db, `users/${uid}`));
  return snapshot.exists() ? snapshot.val() : null;
}
