import { minifiedToObject } from './dataDictionary';

const setupCharacterData = (initialCharacterData) => {
    const setupedData = [];
    for (let i = 0; i < initialCharacterData.length; i++) {
        setupedData.push(minifiedToObject(initialCharacterData[i]));
    }

    const currentDate = new Date();
    for (let i = 0; i < initialCharacterData.length; i++) {
        let itemDate = new Date(setupedData[i].auctionEnd * 1000);

        if (currentDate > itemDate) {
            setupedData.shift();
            i -= 1;
        } else {
            break;
        }
    }

    return setupedData;
}

export default setupCharacterData;