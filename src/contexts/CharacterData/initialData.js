import { createContext } from 'react';
import data from '../../../AllCharacterData.json';

const currentDate = new Date();
let initialData = [...data];

for (let i = 0; i < data.length; i++) {
    let itemDate = new Date(initialData[i].auctionEnd * 1000);

    if (currentDate > itemDate) {
        initialData.shift();
        i -= 1;
    } else {
        break;
    }
}

export default createContext(initialData);