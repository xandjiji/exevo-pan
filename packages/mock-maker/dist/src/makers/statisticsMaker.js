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
exports.__esModule = true;
exports.randomStatisticsData = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
var faker = __importStar(require("faker"));
var constants_1 = require("../constants");
var CharacterMaker_1 = require("./CharacterMaker");
var randomMonthlySummary = function () { return ({
    current: faker.datatype.number({
        min: constants_1.statistics.month.current.MIN,
        max: constants_1.statistics.month.current.MAX
    }),
    lastMonth: Array.from({ length: constants_1.statistics.month.lastMonth.SIZE }, function () {
        return faker.datatype.number({
            min: constants_1.statistics.month.lastMonth.MIN,
            max: constants_1.statistics.month.lastMonth.MAX
        });
    })
}); };
var randomCharacterInfo = function (key) {
    var _a;
    var character = CharacterMaker_1.randomCharacter();
    var skillKeys = Object.keys(character.skills);
    var value = skillKeys.includes(key)
        ? character.skills[key]
        : character[key];
    return _a = {
            id: character.id,
            nickname: character.nickname
        },
        _a[key] = value,
        _a;
};
var randomDistributionData = function () {
    var _a = __read(Array.from({ length: 4 }, function () {
        return faker.datatype.float({
            min: 0,
            max: 25,
            precision: 0.01
        });
    }), 4), knight = _a[0], paladin = _a[1], sorcerer = _a[2], druid = _a[3];
    var rooker = 100 - (knight + paladin + sorcerer + druid);
    var data = {
        rooker: rooker,
        knight: knight,
        paladin: paladin,
        sorcerer: sorcerer,
        druid: druid
    };
    return data;
};
var randomStatisticsData = function () { return ({
    totalRevenue: randomMonthlySummary(),
    totalTibiaCoins: randomMonthlySummary(),
    successRate: faker.datatype.float({
        min: 40,
        max: 50,
        precision: 0.01
    }),
    top10Bid: Array.from({ length: constants_1.statistics.top.SIZE }, function () {
        return randomCharacterInfo('currentBid');
    }),
    top10Level: Array.from({ length: constants_1.statistics.top.SIZE }, function () {
        return randomCharacterInfo('level');
    }),
    top10Magic: Array.from({ length: constants_1.statistics.top.SIZE }, function () {
        return randomCharacterInfo('magic');
    }),
    top10Club: Array.from({ length: constants_1.statistics.top.SIZE }, function () {
        return randomCharacterInfo('club');
    }),
    top10Fist: Array.from({ length: constants_1.statistics.top.SIZE }, function () {
        return randomCharacterInfo('fist');
    }),
    top10Sword: Array.from({ length: constants_1.statistics.top.SIZE }, function () {
        return randomCharacterInfo('sword');
    }),
    top10Fishing: Array.from({ length: constants_1.statistics.top.SIZE }, function () {
        return randomCharacterInfo('fishing');
    }),
    top10Axe: Array.from({ length: constants_1.statistics.top.SIZE }, function () {
        return randomCharacterInfo('axe');
    }),
    top10Distance: Array.from({ length: constants_1.statistics.top.SIZE }, function () {
        return randomCharacterInfo('distance');
    }),
    top10Shielding: Array.from({ length: constants_1.statistics.top.SIZE }, function () {
        return randomCharacterInfo('shielding');
    }),
    vocationPercentage: randomDistributionData()
}); };
exports.randomStatisticsData = randomStatisticsData;
//# sourceMappingURL=statisticsMaker.js.map