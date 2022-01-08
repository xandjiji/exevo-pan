"use strict";
exports.__esModule = true;
var defaults_1 = require("shared-utils/dist/contracts/Filters/defaults");
var filterSkip = function (_a) {
    var minLevel = _a.minLevel, maxLevel = _a.maxLevel;
    return minLevel === defaults_1.DEFAULT_FILTER_OPTIONS.minLevel &&
        maxLevel === defaults_1.DEFAULT_FILTER_OPTIONS.maxLevel;
};
var filterTest = function (_a) {
    var minLevel = _a.minLevel, maxLevel = _a.maxLevel;
    return function (_a) {
        var level = _a.level;
        return level >= minLevel && level <= maxLevel;
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=level.js.map