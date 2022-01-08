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
var defaults_1 = require("shared-utils/dist/contracts/Filters/defaults");
var filterSkip = function (_a) {
    var minSkill = _a.minSkill, maxSkill = _a.maxSkill, skillKey = _a.skillKey;
    return (minSkill === defaults_1.DEFAULT_FILTER_OPTIONS.minSkill &&
        maxSkill === defaults_1.DEFAULT_FILTER_OPTIONS.maxSkill) ||
        skillKey.size === 0;
};
var filterTest = function (_a) {
    var minSkill = _a.minSkill, maxSkill = _a.maxSkill, skillKey = _a.skillKey;
    var selectedSkills = __spreadArray([], __read(skillKey));
    return function (_a) {
        var skills = _a.skills;
        return selectedSkills.some(function (skill) { return skills[skill] >= minSkill && skills[skill] <= maxSkill; });
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=skills.js.map