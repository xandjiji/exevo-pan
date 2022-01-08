"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var filterSkip = function (_a) {
    var storeOutfitSet = _a.storeOutfitSet;
    return storeOutfitSet.size === 0;
};
var filterTest = function (_a) {
    var storeOutfitSet = _a.storeOutfitSet, sex = _a.sex;
    var filterSize = storeOutfitSet.size;
    return function (_a) {
        var e_1, _b;
        var storeOutfits = _a.storeOutfits, characterSex = _a.sex;
        if (sex !== characterSex)
            return false;
        var foundCount = 0;
        try {
            // eslint-disable-next-line no-restricted-syntax
            for (var storeOutfits_1 = __values(storeOutfits), storeOutfits_1_1 = storeOutfits_1.next(); !storeOutfits_1_1.done; storeOutfits_1_1 = storeOutfits_1.next()) {
                var name_1 = storeOutfits_1_1.value.name;
                if (storeOutfitSet.has(name_1))
                    foundCount += 1;
                if (foundCount === filterSize)
                    return true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (storeOutfits_1_1 && !storeOutfits_1_1.done && (_b = storeOutfits_1["return"])) _b.call(storeOutfits_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
};
var schema = {
    filterSkip: filterSkip,
    filterTest: filterTest
};
exports["default"] = schema;
//# sourceMappingURL=storeOutfits.js.map