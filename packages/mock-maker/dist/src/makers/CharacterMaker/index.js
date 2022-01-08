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
exports.randomCharacter = exports.randomSkillValue = exports.randomAuctionId = void 0;
var faker = __importStar(require("faker"));
var dictionaries_1 = require("data-dictionary/dist/dictionaries");
var constants_1 = require("../../constants");
var utils_1 = require("../../utils");
var serverMaker_1 = require("../serverMaker");
var randomOutfit_1 = require("./randomOutfit");
var randomAuctionId = function () {
    return faker.datatype.number({ min: constants_1.auctions.id.MIN, max: constants_1.auctions.id.MAX });
};
exports.randomAuctionId = randomAuctionId;
var randomSkillValue = function () {
    return faker.datatype.float({
        min: constants_1.auctions.skills.MIN,
        max: constants_1.auctions.skills.MAX,
        precision: constants_1.auctions.skills.PRECISION
    });
};
exports.randomSkillValue = randomSkillValue;
var randomCharacter = function () {
    var sex = faker.datatype.boolean();
    return {
        id: exports.randomAuctionId(),
        nickname: faker.name.firstName() + " " + faker.name.lastName(),
        auctionEnd: Math.trunc(+faker.date.future() / 1000),
        currentBid: faker.datatype.number({
            min: constants_1.auctions.currentBid.MIN,
            max: constants_1.auctions.currentBid.MAX
        }),
        hasBeenBidded: faker.datatype.boolean(),
        transfer: faker.datatype.boolean(),
        sex: sex,
        outfitId: randomOutfit_1.randomOutfitId(sex),
        serverId: serverMaker_1.randomServerId(),
        vocationId: faker.datatype.number({
            min: constants_1.auctions.vocationId.MIN,
            max: constants_1.auctions.vocationId.MAX
        }),
        level: faker.datatype.number({
            min: constants_1.auctions.level.MIN,
            max: constants_1.auctions.level.MAX
        }),
        skills: {
            magic: exports.randomSkillValue(),
            club: exports.randomSkillValue(),
            fist: exports.randomSkillValue(),
            sword: exports.randomSkillValue(),
            fishing: exports.randomSkillValue(),
            axe: exports.randomSkillValue(),
            distance: exports.randomSkillValue(),
            shielding: exports.randomSkillValue()
        },
        items: Array.from({ length: constants_1.auctions.items.size.MAX }, function () {
            return faker.datatype.number({
                min: constants_1.auctions.items.id.MIN,
                max: constants_1.auctions.items.id.MAX
            });
        }).slice(faker.datatype.number({
            min: constants_1.auctions.items.size.MIN,
            max: constants_1.auctions.items.size.MAX
        })),
        charms: utils_1.samplesFrom(dictionaries_1.charm.tokens),
        imbuements: utils_1.samplesFrom(dictionaries_1.imbuement.tokens),
        quests: utils_1.samplesFrom(dictionaries_1.quest.tokens),
        rareAchievements: utils_1.samplesFrom(dictionaries_1.rareAchievement.tokens),
        mounts: utils_1.samplesFrom(dictionaries_1.mount.tokens),
        storeMounts: utils_1.samplesFrom(dictionaries_1.storeMount.tokens),
        outfits: randomOutfit_1.randomOutfits(),
        storeOutfits: randomOutfit_1.randomStoreOutfits()
    };
};
exports.randomCharacter = randomCharacter;
//# sourceMappingURL=index.js.map