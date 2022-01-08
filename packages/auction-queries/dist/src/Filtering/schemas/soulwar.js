"use strict";
exports.__esModule = true;
var SOULWAR_MINIMUM_LEVEL = 250;
var SOULWAR_OUTFIT_NAME = 'Revenant';
var filterSkip = function (_a) {
    var soulwarAvailable = _a.soulwarAvailable;
    return !soulwarAvailable;
};
var filterTest = function () {
    return function (_a) {
        var level = _a.level, outfits = _a.outfits;
        return level >= SOULWAR_MINIMUM_LEVEL &&
            !outfits.some(function (_a) {
                var name = _a.name;
                return name === SOULWAR_OUTFIT_NAME;
            });
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=soulwar.js.map