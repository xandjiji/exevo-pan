import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

const applyFilters = (filterState, initialData) => {

    const { initialCharacterData, itemData, indexedServerData, favCharacters } = initialData;

    if (!isDataLoaded(initialCharacterData)) return [];
    if (!isDataLoaded(itemData)) return [];
    if (!isDataLoaded(indexedServerData)) return [];

    const {
        vocation,
        pvp,
        battleye,
        location,
        serverSet,
        minLevel,
        minSkill,
        skillKey,
        itemSet,
        fav
    } = filterState;

    let charPool = initialCharacterData;
    if(fav) charPool = favCharacters;

    const auctionsItemsSet = getAuctionIdSetFromItemNameSet(itemSet, itemData);

    let filteredData = [];
    for (const character of charPool) {

        const {
            id,
            vocationId,
            serverId,
            level,
            skills
        } = character;

        if (setDoesntHasValue(vocation, vocationId)) continue;

        if (setDoesntHasValue(pvp, indexedServerData[serverId].pvpType.type)) continue;

        if (setDoesntHasValue(battleye, indexedServerData[serverId].battleye)) continue;

        if (setDoesntHasValue(location, indexedServerData[serverId].serverLocation.type)) continue;

        if (setDoesntHasValue(serverSet, indexedServerData[serverId].serverName)) continue;

        if (setDoesntHasValue(auctionsItemsSet, id)) continue;

        if (skillKey.size) {
            let hasMinimumSkill = false;
            const skillArray = Array.from(skillKey);

            for (const skillItem of skillArray) {
                if (skills[skillItem].level >= minSkill) {
                    hasMinimumSkill = true;
                    break;
                }
            }
            if (!hasMinimumSkill) continue;
        }

        if (level < minLevel) continue;

        filteredData.push(character);
    }

    return filteredData;
}

const setDoesntHasValue = (set, value) => {
    if (set.size && !set.has(value)) {
        return true;
    } else {
        return false;
    }
}

const getAuctionIdSetFromItemNameSet = (nameSet, itemData) => {

    const auctionIdSet = new Set([])
    for (const itemName of [...nameSet]) {
        for (const setItem of [...itemData[itemName]]) {
            auctionIdSet.add(setItem);
        }
    }

    return auctionIdSet;
}

const isDataLoaded = (dataObject) => {
    if (Object.keys(dataObject).length === 0) {
        return false;
    } else {
        return true;
    }
}

const applySort = (sortingMode, descendingOrder) => {

    const initialCharacterData = getFromLocalStorage('initialCharacterData', []);

    const newData = [...initialCharacterData];

    const byAuctionEnd = (a, b) => {
        if (!descendingOrder) return a.auctionEnd - b.auctionEnd;
        return b.auctionEnd - a.auctionEnd;
    }

    const byLevel = (a, b) => {
        if (!descendingOrder) return a.level - b.level;
        return b.level - a.level;
    }

    const byPrice = (a, b) => {
        if (!descendingOrder) return a.currentBid - b.currentBid;
        return b.currentBid - a.currentBid;
    }

    switch (sortingMode) {
        case 'Auction End':
            return newData.sort(byAuctionEnd);

        case 'Level':
            return newData.sort(byLevel);

        case 'Price':
            return newData.sort(byPrice);

        case 'Price (bidded only)':
            return newData.filter(item => item.hasBeenBidded).sort(byPrice);

        default:
            return newData;
    }
}

const toggleFav = (charData, favArray) => {

    const findCharIndexById = (id) => {
        for (let i = 0; i < favArray.length; i++) {
            if (favArray[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    const charIndex = findCharIndexById(charData.id);
    if (charIndex >= 0) {
        favArray.splice(charIndex, 1);
    } else {
        favArray.push(charData);
    }

    saveToLocalStorage('initialFavCharacterData', favArray);

    return favArray;
}

export const characterDataReducer = (state, action) => {
    switch (action.type) {
        case 'APPLY_FILTERS':
            return applyFilters(action.filterState, action.initialData);

        case 'APPLY_SORT':
            return applySort(action.sortingMode, action.descendingOrder);

        case 'TOGGLE_FAV':
            return toggleFav(action.charData, state);

        default:
            return state;
    }
}