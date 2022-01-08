"use strict";
exports.__esModule = true;
exports.dictionary = exports.tokens = exports.scrapingTokens = exports.constTokens = void 0;
var utils_1 = require("../utils");
exports.constTokens = {
    Biodegradable: 'Biodegradable',
    Fearless: 'Fearless',
    Goldhunter: 'Goldhunter',
    'His True Face': 'His True Face',
    'Razing!': 'Razing!',
    'The More the Merrier': 'The More the Merrier'
};
exports.scrapingTokens = utils_1.lowerCaseKeys(exports.constTokens);
exports.tokens = Object.values(exports.scrapingTokens);
exports.dictionary = utils_1.dictionaryFactory(exports.tokens);
//# sourceMappingURL=rareAchievement.js.map