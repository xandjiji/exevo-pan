export const saveToLocalStorage = (key, data) => {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
}

export const getFromLocalStorage = (key) => {
    const serializedData = localStorage.getItem(key);

    if (!serializedData) return {};

    return JSON.parse(serializedData);
}