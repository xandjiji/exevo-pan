const setupItemData = (ItemsData) => {
    const relevantItemsData = {}

    for (const item in ItemsData) {
        if (ItemsData[item].length > 0) {
            relevantItemsData[item] = ItemsData[item];
        }
    }

    return relevantItemsData;
}

export default setupItemData;