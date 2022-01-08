"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.randomStoreOutfits = exports.randomOutfits = exports.randomOutfitId = void 0;
var faker = __importStar(require("faker"));
var outfit = __importStar(require("data-dictionary/dist/dictionaries/outfit"));
var storeOutfit = __importStar(require("data-dictionary/dist/dictionaries/storeOutfit"));
var constants_1 = require("../../constants");
var utils_1 = require("../../utils");
var allOutfits = __spreadArray(__spreadArray([], __read(outfit.outfits)), __read(storeOutfit.outfits));
var randomOutfitId = function (sex) {
    return utils_1.singleSampleFrom(allOutfits).id[sex ? 'female' : 'male'] + "_" + faker.datatype.number({
        min: constants_1.auctions.outfit.addon.MIN,
        max: constants_1.auctions.outfit.addon.MAX
    });
};
exports.randomOutfitId = randomOutfitId;
var randomOutfits = function () {
    return utils_1.samplesFrom(outfit.outfits, faker.datatype.number({
        min: constants_1.auctions.outfit.regular.MIN,
        max: constants_1.auctions.outfit.regular.MAX
    })).map(function (_a) {
        var name = _a.name;
        return ({
            name: name,
            type: faker.datatype.number({
                min: constants_1.auctions.outfit.addon.MIN,
                max: constants_1.auctions.outfit.addon.MAX
            })
        });
    });
};
exports.randomOutfits = randomOutfits;
var randomStoreOutfits = function () {
    return utils_1.samplesFrom(storeOutfit.outfits, faker.datatype.number({
        min: constants_1.auctions.outfit.store.MIN,
        max: constants_1.auctions.outfit.store.MAX
    })).map(function (_a) {
        var name = _a.name;
        return ({ name: name, type: constants_1.auctions.outfit.addon.MAX });
    });
};
exports.randomStoreOutfits = randomStoreOutfits;
//# sourceMappingURL=randomOutfit.js.map