import { db } from "./firebase.js";
import { ref, get } from "firebase/database";

export async function getNames() {
  const snapshot = await get(ref(db, "names"));
  return snapshot.exists() ? snapshot.val() : {};
}

export async function getNamesById(id) {
  const snapshot = await get(ref(db, `names/${id}`));
  return snapshot.exists() ? snapshot.val() : null;
}
