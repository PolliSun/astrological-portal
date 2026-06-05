const STORAGE_USER_NAME = "userName";

export const getUserName = () => {
    return localStorage.getItem(STORAGE_USER_NAME || "");
}

export const saveUserName = (name) => {
    return localStorage.setItem(STORAGE_USER_NAME, name)
}