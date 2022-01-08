"use strict";
exports.__esModule = true;
exports.dictionary = exports.tokens = exports.scrapingTokens = exports.constTokens = void 0;
var utils_1 = require("../utils");
exports.constTokens = {
    'Powerful Strike': 'Critical Hit',
    'Powerful Vampirism': 'Life Leech',
    'Powerful Void': 'Mana Leech',
    'Powerful Bash': 'Club Skill',
    'Powerful Blockade': 'Shield Skill',
    'Powerful Chop': 'Axe Skill',
    'Powerful Epiphany': 'Magic Level',
    'Powerful Precision': 'Distance Skill',
    'Powerful Slash': 'Sword Skill',
    'Powerful Featherweight': 'Capacity',
    'Powerful Swiftness': 'Speed',
    'Powerful Vibrancy': 'Paralize Removal',
    'Powerful Electrify': 'Energy Damage',
    'Powerful Frost': 'Ice Damage',
    'Powerful Reap': 'Death Damage',
    'Powerful Scorch': 'Fire Damage',
    'Powerful Venom': 'Earth Damage',
    'Powerful Cloud Fabric': 'Energy Protection',
    'Powerful Demon Presence': 'Holy Protection',
    'Powerful Dragon Hide': 'Fire Protection',
    'Powerful Lich Shroud': 'Death Protection',
    'Powerful Quara Scale': 'Ice Protection',
    'Powerful Snake Skin': 'Earth Protection'
};
exports.scrapingTokens = utils_1.lowerCaseKeys(exports.constTokens);
exports.tokens = Object.values(exports.scrapingTokens);
exports.dictionary = utils_1.dictionaryFactory(exports.tokens);
//# sourceMappingURL=imbuement.js.map