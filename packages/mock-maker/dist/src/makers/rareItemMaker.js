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
exports.__esModule = true;
exports.randomItemData = void 0;
var faker = __importStar(require("faker"));
var rareItem = __importStar(require("data-dictionary/dist/dictionaries/rareItems"));
var CharacterMaker_1 = require("./CharacterMaker");
var constants_1 = require("../constants");
var utils_1 = require("../utils");
var getIdsFromAuctions = function (auctions) {
    return utils_1.samplesFrom(auctions)
        .slice(faker.datatype.number({
        min: constants_1.rareItems.auctions.MIN,
        max: constants_1.rareItems.auctions.MAX
    }))
        .map(function (_a) {
        var id = _a.id;
        return id;
    });
};
var randomItemData = function (auctions) {
    var itemData = {};
    rareItem.tokens.forEach(function (item) {
        if (faker.datatype.boolean()) {
            itemData[item] = [];
        }
        else {
            var auctionIds = auctions
                ? (itemData[item] = getIdsFromAuctions(auctions))
                : Array.from({
                    length: faker.datatype.number({
                        min: constants_1.rareItems.auctions.MIN,
                        max: constants_1.rareItems.auctions.MAX
                    })
                }, CharacterMaker_1.randomAuctionId);
            itemData[item] = auctionIds;
        }
    });
    return itemData;
};
exports.randomItemData = randomItemData;
//# sourceMappingURL=rareItemMaker.js.map