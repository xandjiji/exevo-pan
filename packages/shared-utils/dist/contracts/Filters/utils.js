"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
exports.deserializeBody = exports.serializeBody = void 0;
var defaults_1 = require("./defaults");
var serializeBody = function (_a) {
    var paginationOptions = _a.paginationOptions, sortOptions = _a.sortOptions, filterOptions = _a.filterOptions;
    var serializedFilterState = __assign(__assign({}, filterOptions), { vocation: __spreadArray([], __read(filterOptions.vocation)), pvp: __spreadArray([], __read(filterOptions.pvp)), battleye: __spreadArray([], __read(filterOptions.battleye)), location: __spreadArray([], __read(filterOptions.location)), serverSet: __spreadArray([], __read(filterOptions.serverSet)), skillKey: __spreadArray([], __read(filterOptions.skillKey)), imbuementsSet: __spreadArray([], __read(filterOptions.imbuementsSet)), charmsSet: __spreadArray([], __read(filterOptions.charmsSet)), itemSet: __spreadArray([], __read(filterOptions.itemSet)), questSet: __spreadArray([], __read(filterOptions.questSet)), outfitSet: __spreadArray([], __read(filterOptions.outfitSet)), mountSet: __spreadArray([], __read(filterOptions.mountSet)), storeOutfitSet: __spreadArray([], __read(filterOptions.storeOutfitSet)), storeMountSet: __spreadArray([], __read(filterOptions.storeMountSet)), achievementSet: __spreadArray([], __read(filterOptions.achievementSet)) });
    return JSON.stringify({
        paginationOptions: paginationOptions,
        sortOptions: sortOptions,
        filterOptions: serializedFilterState
    });
};
exports.serializeBody = serializeBody;
var deserializeFilterOptions = function (_a) {
    var vocation = _a.vocation, pvp = _a.pvp, battleye = _a.battleye, location = _a.location, serverSet = _a.serverSet, skillKey = _a.skillKey, imbuementsSet = _a.imbuementsSet, charmsSet = _a.charmsSet, itemSet = _a.itemSet, questSet = _a.questSet, outfitSet = _a.outfitSet, storeOutfitSet = _a.storeOutfitSet, mountSet = _a.mountSet, storeMountSet = _a.storeMountSet, achievementSet = _a.achievementSet, primitiveOptions = __rest(_a, ["vocation", "pvp", "battleye", "location", "serverSet", "skillKey", "imbuementsSet", "charmsSet", "itemSet", "questSet", "outfitSet", "storeOutfitSet", "mountSet", "storeMountSet", "achievementSet"]);
    return (__assign(__assign({}, primitiveOptions), { vocation: new Set(vocation), pvp: new Set(pvp), battleye: new Set(battleye), location: new Set(location), serverSet: new Set(serverSet), skillKey: new Set(skillKey), imbuementsSet: new Set(imbuementsSet), charmsSet: new Set(charmsSet), itemSet: new Set(itemSet), questSet: new Set(questSet), outfitSet: new Set(outfitSet), storeOutfitSet: new Set(storeOutfitSet), mountSet: new Set(mountSet), storeMountSet: new Set(storeMountSet), achievementSet: new Set(achievementSet) }));
};
var deserializeBody = function (_a) {
    var paginationOptions = _a.paginationOptions, sortOptions = _a.sortOptions, filterOptions = _a.filterOptions;
    return ({
        paginationOptions: paginationOptions,
        sortOptions: sortOptions,
        filterOptions: deserializeFilterOptions(filterOptions !== null && filterOptions !== void 0 ? filterOptions : defaults_1.DEFAULT_SERIALIZED_FILTER_OPTIONS)
    });
};
exports.deserializeBody = deserializeBody;
//# sourceMappingURL=utils.js.map