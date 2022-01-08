"use strict";
exports.__esModule = true;
exports.vocation = void 0;
var VOCATION_IDS = {
    NONE: 0,
    KNIGHT: 1,
    PALADIN: 2,
    SORCERER: 3,
    DRUID: 4
};
var VOCATION_NAMES = {
    0: 'None',
    1: 'Knight',
    2: 'Paladin',
    3: 'Sorcerer',
    4: 'Druid'
};
var PROMOTED_VOCATION_TITLE = {
    0: '',
    1: 'Elite',
    2: 'Royal',
    3: 'Master',
    4: 'Elder'
};
var getName = function (vocationId) {
    var key = vocationId;
    return VOCATION_NAMES[key];
};
var getFullName = function (vocationId, level) {
    var key = vocationId;
    var baseName = VOCATION_NAMES[key];
    if (level < 20 || vocationId === 0) {
        return baseName;
    }
    return PROMOTED_VOCATION_TITLE[key] + " " + baseName;
};
var getId = function (name) {
    var key = name;
    return VOCATION_IDS[key];
};
var getIdByRegex = function (name) {
    if (/knight/gi.test(name))
        return VOCATION_IDS.KNIGHT;
    if (/paladin/gi.test(name))
        return VOCATION_IDS.PALADIN;
    if (/sorcerer/gi.test(name))
        return VOCATION_IDS.SORCERER;
    if (/druid/gi.test(name))
        return VOCATION_IDS.DRUID;
    return VOCATION_IDS.NONE;
};
exports.vocation = {
    getName: getName,
    getFullName: getFullName,
    getId: getId,
    getIdByRegex: getIdByRegex
};
//# sourceMappingURL=vocations.js.map