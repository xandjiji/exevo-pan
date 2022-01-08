"use strict";
exports.__esModule = true;
var filterSkip = function (_a) {
    var pvp = _a.pvp;
    return pvp.size === 0;
};
var filterTest = function (_a) {
    var pvp = _a.pvp;
    return function (_a) {
        var serverData = _a.serverData;
        return pvp.has(serverData.pvpType.type);
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=pvp.js.map