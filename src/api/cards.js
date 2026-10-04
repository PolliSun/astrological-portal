import { db } from "./firebase.js";
import { ref, get } from "firebase/database";

export async function getCards() {
  const snapshot = await get(ref(db, "cards"));
  return snapshot.exists() ? snapshot.val() : {};
}
