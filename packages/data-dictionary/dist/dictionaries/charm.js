"use strict";
exports.__esModule = true;
exports.dictionary = exports.tokens = exports.scrapingTokens = exports.constTokens = void 0;
var utils_1 = require("../utils");
exports.constTokens = {
    Dodge: 'Dodge',
    Wound: 'Wound',
    Curse: 'Curse',
    Zap: 'Zap',
    Enflame: 'Enflame',
    Freeze: 'Freeze',
    'Low Blow': 'Low Blow',
    Parry: 'Parry',
    Poison: 'Poison',
    'Divine Wrath': 'Divine Wrath',
    Cripple: 'Cripple',
    Cleanse: 'Cleanse',
    'Adrenaline Burst': 'Adrenaline Burst',
    'Vampiric Embrace': 'Vampiric Embrace',
    Numb: 'Numb',
    "Void's Call": "Void's Call",
    Scavenge: 'Scavenge',
    Gut: 'Gut',
    Bless: 'Bless'
};
exports.scrapingTokens = utils_1.lowerCaseKeys(exports.constTokens);
exports.tokens = Object.values(exports.scrapingTokens);
exports.dictionary = utils_1.dictionaryFactory(exports.tokens);
//# sourceMappingURL=charm.js.map