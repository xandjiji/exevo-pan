"use strict";
exports.__esModule = true;
var filterSkip = function (_a) {
    var vocation = _a.vocation;
    return vocation.size === 0;
};
var filterTest = function (_a) {
    var vocation = _a.vocation;
    return function (_a) {
        var vocationId = _a.vocationId;
        return vocation.has(vocationId);
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=vocation.js.map