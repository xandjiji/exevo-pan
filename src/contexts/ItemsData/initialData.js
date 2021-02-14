import ItemsData from '../../ItemsData.json';

const relevantItemsData = {}

for(const item in ItemsData) {
    if(ItemsData[item].length > 0) {
        relevantItemsData[item] = ItemsData[item];
    }
}

export default relevantItemsData;