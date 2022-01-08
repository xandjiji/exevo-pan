"use strict";
exports.__esModule = true;
var filterSkip = function (_a) {
    var rareNick = _a.rareNick;
    return !rareNick;
};
var MINIMUM_RARE_CHARACTER_COUNT = 3;
var specialCharacters = /[äëïöüÿ'-.,]/i;
var twoConsecutiveUppercase = /[A-Z][A-Z]/;
var isRareNickname = function (nickname) {
    if (nickname.length <= MINIMUM_RARE_CHARACTER_COUNT)
        return true;
    if (specialCharacters.test(nickname))
        return true;
    if (twoConsecutiveUppercase.test(nickname))
        return true;
    return false;
};
var filterTest = function () {
    return function (_a) {
        var nickname = _a.nickname;
        return isRareNickname(nickname);
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=rareNickname.js.map