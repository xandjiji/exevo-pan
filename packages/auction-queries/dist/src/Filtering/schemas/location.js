"use strict";
exports.__esModule = true;
var filterSkip = function (_a) {
    var location = _a.location;
    return location.size === 0;
};
var filterTest = function (_a) {
    var location = _a.location;
    return function (_a) {
        var serverData = _a.serverData;
        return location.has(serverData.serverLocation.type);
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=location.js.map