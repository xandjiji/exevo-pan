"use strict";
exports.__esModule = true;
var filterSkip = function (_a) {
    var nicknameFilter = _a.nicknameFilter;
    return nicknameFilter.length === 0;
};
var filterTest = function (_a) {
    var nicknameFilter = _a.nicknameFilter;
    var lowerCaseNicknameFilter = nicknameFilter.toLowerCase();
    return function (_a) {
        var nickname = _a.nickname;
        return nickname.toLowerCase().includes(lowerCaseNicknameFilter);
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=nickname.js.map