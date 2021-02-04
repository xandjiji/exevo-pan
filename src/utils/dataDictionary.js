const dictionaryFactory = (keyArray) => {
    const dictionaryObject = {
        ...keyArray
    };

    for (const [keyValue, keyItem] of keyArray.entries()) {
        dictionaryObject[keyItem] = keyValue;
    }

    return dictionaryObject;
}

const translateObjectOrArray = (variable) => {
    if (Array.isArray(variable)) {
        const newArray = [];
        for (const key of variable) {
            newArray.push(dictionary[key]);
        }
        return newArray;

    } else {
        const newObject = {};

        for (const key in variable) {
            newObject[dictionary[key]] = variable[key];
        }
        return newObject;
    }
}

const translateCharObject = (charObject) => {
    const newCharObject = translateObjectOrArray(charObject);

    newCharObject.charms = translateObjectOrArray(newCharObject.charms);
    newCharObject.skills = translateObjectOrArray(newCharObject.skills);
    for(const key of Object.keys(newCharObject.skills)) {
        newCharObject.skills[key] = translateObjectOrArray(newCharObject.skills[key]);
    }

    return newCharObject;
}

const dictionary = dictionaryFactory([
    'level',
    'percentage',
    'Dodge',
    'Wound',
    'Curse',
    'Zap',
    'Enflame',
    'Freeze',
    'Low Blow',
    'Parry',
    'Poison',
    'Divine Wrath',
    'Cripple',
    'Cleanse',
    'Adrenaline Burst',
    'Vampiric Embrace',
    'Numb',
    "Void's Call",
    'Scavenge',
    'Gut',
    'Bless',
    'src',
    'id',
    'nickname',
    'auctionEnd',
    'currentBid',
    'hasBeenBidded',
    'outfitId',
    'serverId',
    'vocationId',
    'skills',
    'magic',
    'club',
    'fist',
    'sword',
    'fishing',
    'axe',
    'distance',
    'shielding',
    'items',
    'charms'
]);

module.exports = { translateCharObject, dictionary };