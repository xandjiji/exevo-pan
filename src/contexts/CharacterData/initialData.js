import data from '../../LatestCharacterData.json';
import { translateCharObject } from '../../utils/dataDictionary';

let initialData = [];
for (let i = 0; i < data.length; i++) {
    initialData.push(translateCharObject(data[i]));
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