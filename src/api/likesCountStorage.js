const STORAGE_LIKES_COUNT = "likesCount";

export const loadLikesCount = () => {
  const stored = localStorage.getItem(STORAGE_LIKES_COUNT);
  return stored ? JSON.parse(stored) : {};
};

export const saveLikesCount = (obj) => {
  return localStorage.setItem(STORAGE_LIKES_COUNT, JSON.stringify(obj));
};

export const updateLikesCount = (countsObj, id, delta) => {
  const corrent = countsObj[id] || 0;
  const count = corrent + delta;
  countsObj[id] = count >= 0 ? count : 0;
  saveLikesCount(countsObj);
  return countsObj[id];
};

export const getLikesCount = (countsObj, id, defaultValue = 0) => {
  return countsObj[id] ?? defaultValue;
};
