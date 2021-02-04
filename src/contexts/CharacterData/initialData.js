import data from '../../LatestCharacterData.json';
import { translateCharObject } from '../../utils/dataDictionary';

let initialData = [...data];
for (let i = 0; i < initialData.length; i++) {
    initialData[i] = translateCharObject(initialData[i]);
}

const currentDate = new Date();
for (let i = 0; i < data.length; i++) {
    let itemDate = new Date(initialData[i].auctionEnd * 1000);

    if (currentDate > itemDate) {
        initialData.shift();
        i -= 1;
    } else {
        break;
    }
}

export default initialData;