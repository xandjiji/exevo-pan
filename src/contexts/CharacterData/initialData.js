import { translateCharObject } from '../../utils/dataDictionary';

let characterData = localStorage.getItem('characterData');
console.log(characterData);
characterData = JSON.parse(characterData);

const initialData = [];
for (let i = 0; i < characterData.length; i++) {
    initialData.push(translateCharObject(characterData[i]));
}

const currentDate = new Date();
for (let i = 0; i < characterData.length; i++) {
    let itemDate = new Date(initialData[i].auctionEnd * 1000);

    if (currentDate > itemDate) {
        initialData.shift();
        i -= 1;
    } else {
        break;
    }
}

export default initialData;