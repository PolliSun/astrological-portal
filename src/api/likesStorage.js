const STORAGE_LIKED_MESSAGES = "likedMessages";

export const loadLikedMessages = () => {
  const stored = localStorage.getItem(STORAGE_LIKED_MESSAGES);
  return stored ? JSON.parse(stored) : [];
};

export const saveLikedMessages = (arrey) => {
  return localStorage.setItem(STORAGE_LIKED_MESSAGES, JSON.stringify(arrey));
};

export const addLikedMessage = (arrey, id) => {
  if (!arrey.includes(id)) {
    arrey.push(id);
    saveLikedMessages(arrey);
  }
  return arrey;
};

export const removeLikedMessage = (arrey, id) => {
  const index = arrey.indexOf(id);
  if (index !== -1) {
    arrey.splice(index, 1);
    saveLikedMessages(arrey);
  }
  return arrey;
};
