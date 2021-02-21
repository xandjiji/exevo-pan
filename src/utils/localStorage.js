export const saveToLocalStorage = (key, data) => {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
}

export const getFromLocalStorage = (key, empty) => {
    const serializedData = localStorage.getItem(key);

    if (!serializedData) return empty;

    return JSON.parse(serializedData);
}