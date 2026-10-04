import { db } from "./firebase.js";
import { ref, get } from "firebase/database";

export async function getZodiacSigns() {
  const snapshot = await get(ref(db, "zodiacSigns"));
  return snapshot.exists() ? snapshot.val() : {};
}

export async function getZodiacSignById(id) {
  const snapshot = await get(ref(db, `zodiacSigns/${id}`));
  return snapshot.exists() ? snapshot.val() : null;
}
