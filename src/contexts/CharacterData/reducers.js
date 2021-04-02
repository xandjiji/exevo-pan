import { getFavArray } from '../../utils/localStorage';

const applyFilters = (filterState, initialData) => {

    const { initialCharacterData, itemData, indexedServerData } = initialData;

    if (!isDataLoaded(initialCharacterData)) return [];
    if (!isDataLoaded(itemData)) return [];
    if (!isDataLoaded(indexedServerData)) return [];

    const {
        nicknameFilter,
        vocation,
        pvp,
        battleye,
        location,
        serverSet,
        minLevel,
        minSkill,
        skillKey,
        itemSet,
        fav,
        rareNick,
        soulwarFilter
    } = filterState;

    const nicknameRegex = new RegExp(nicknameFilter, 'i');

    let charPool = initialCharacterData;
    if (fav) charPool = getFavArray();

    const auctionsItemsSet = getAuctionIdSetFromItemNameSet(itemSet, itemData);

    let filteredData = [];
    for (const character of charPool) {

        const {
            id,
            vocationId,
            serverId,
            level,
            skills,
            nickname,
            hasSoulwar
        } = character;

        if(nicknameFilter && !nicknameRegex.test(nickname)) continue;

        if(!indexedServerData[serverId]) continue;

        if (setDoesntHasValue(vocation, vocationId)) continue;

        if (setDoesntHasValue(pvp, indexedServerData[serverId].pvpType.type)) continue;

        if (setDoesntHasValue(battleye, indexedServerData[serverId].battleye)) continue;

        if (setDoesntHasValue(location, indexedServerData[serverId].serverLocation.type)) continue;

        if (setDoesntHasValue(serverSet, indexedServerData[serverId].serverName)) continue;

        if (setDoesntHasValue(auctionsItemsSet, id)) continue;

        if(rareNick && !isRareNickname(nickname)) continue;

        if(soulwarFilter && hasSoulwar) continue;

        if (skillKey.size) {
            let hasMinimumSkill = false;
            const skillArray = Array.from(skillKey);

            for (const skillItem of skillArray) {
                if (skills[skillItem] >= minSkill) {
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

const specialCharacters = /[äëïöüÿ'-.,]/i;
const twoConsecutiveUppercase = /[A-Z][A-Z]/;
const isRareNickname = (nickname) => {
    if (nickname.length <= 3) return true;
    if (specialCharacters.test(nickname)) return true;
    if(twoConsecutiveUppercase.test(nickname)) return true;

    return false;
}

const isDataLoaded = (dataObject) => {
    if (Object.keys(dataObject).length === 0) {
        return false;
    } else {
        return true;
    }
}

export const characterDataReducer = (state, action) => {
    switch (action.type) {
        case 'APPLY_FILTERS':
            return applyFilters(action.filterState, action.initialData);

        default:
            return state;
    }
}