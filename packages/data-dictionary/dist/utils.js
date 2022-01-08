"use strict";
exports.__esModule = true;
exports.dictionaryFactory = exports.nameableToScrapingTokens = exports.lowerCaseKeys = void 0;
var lowerCaseKeys = function (object) {
    var newObject = {};
    Object.keys(object).forEach(function (key) {
        newObject[key.toLowerCase()] = object[key];
    });
    return newObject;
};
exports.lowerCaseKeys = lowerCaseKeys;
var nameableToScrapingTokens = function (outfitArray) {
    var names = outfitArray.map(function (_a) {
        var name = _a.name;
        return name;
    });
    var scrapingTokens = {};
    names.forEach(function (name) {
        scrapingTokens[name] = name;
    });
    return scrapingTokens;
};
exports.nameableToScrapingTokens = nameableToScrapingTokens;
var dictionaryFactory = function (keyArray) {
    var dictionaryObject = {};
    keyArray.forEach(function (value, index) {
        dictionaryObject[index] = value;
        dictionaryObject[value] = index;
    });
    return dictionaryObject;
};
exports.dictionaryFactory = dictionaryFactory;
//# sourceMappingURL=utils.js.map