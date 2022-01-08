"use strict";
exports.__esModule = true;
var filterSkip = function (_a) {
    var serverSet = _a.serverSet;
    return serverSet.size === 0;
};
var filterTest = function (_a) {
    var serverSet = _a.serverSet;
    return function (_a) {
        var serverData = _a.serverData;
        return serverSet.has(serverData.serverName);
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=server.js.map