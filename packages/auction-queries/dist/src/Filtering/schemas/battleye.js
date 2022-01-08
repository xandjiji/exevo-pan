"use strict";
exports.__esModule = true;
var filterSkip = function (_a) {
    var battleye = _a.battleye;
    return battleye.size === 0;
};
var filterTest = function (_a) {
    var battleye = _a.battleye;
    return function (_a) {
        var serverData = _a.serverData;
        return battleye.has(serverData.battleye);
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=battleye.js.map