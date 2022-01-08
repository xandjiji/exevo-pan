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
    var outfitSet = _a.outfitSet;
    return outfitSet.size === 0;
};
var filterTest = function (_a) {
    var outfitSet = _a.outfitSet, sex = _a.sex, addon = _a.addon;
    var filterSize = outfitSet.size;
    var addonRequired = addon !== 0;
    return function (_a) {
        var e_1, _b;
        var outfits = _a.outfits, characterSex = _a.sex;
        if (sex !== characterSex)
            return false;
        var foundCount = 0;
        try {
            // eslint-disable-next-line no-restricted-syntax
            for (var outfits_1 = __values(outfits), outfits_1_1 = outfits_1.next(); !outfits_1_1.done; outfits_1_1 = outfits_1.next()) {
                var _c = outfits_1_1.value, name_1 = _c.name, type = _c.type;
                if (outfitSet.has(name_1)) {
                    foundCount += 1;
                    var hasAllAddons = type === 3;
                    if (addonRequired && !hasAllAddons) {
                        if (addon !== type)
                            return false;
                    }
                }
                if (foundCount === filterSize)
                    return true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (outfits_1_1 && !outfits_1_1.done && (_b = outfits_1["return"])) _b.call(outfits_1);
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
//# sourceMappingURL=outfits.js.map