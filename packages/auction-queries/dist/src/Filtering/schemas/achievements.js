"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var filterSkip = function (_a) {
    var achievementSet = _a.achievementSet;
    return achievementSet.size === 0;
};
var filterTest = function (_a) {
    var achievementSet = _a.achievementSet;
    return function (_a) {
        var rareAchievements = _a.rareAchievements;
        var characterAchievementsSet = new Set(rareAchievements);
        return __spreadArray([], __read(achievementSet)).every(function (achievement) {
            return characterAchievementsSet.has(achievement);
        });
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=achievements.js.map