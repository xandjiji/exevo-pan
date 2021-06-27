import { verifyCharacterObjectShape } from './verifyCharacterObjectShape';

export const saveToLocalStorage = (key, data) => {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
}

export const getFromLocalStorage = (key, empty) => {
    const serializedData = localStorage.getItem(key);

    if (!serializedData) return empty;

    return JSON.parse(serializedData);
}

export const getFavArray = () => {
    const favArray = getFromLocalStorage('initialFavCharacterData', []);

    if (favArray.length === 0) return [];

    if (!verifyCharacterObjectShape(favArray[0])) {
        saveToLocalStorage('initialFavCharacterData', []);
        return [];
    } else {
        return favArray;
    }
}