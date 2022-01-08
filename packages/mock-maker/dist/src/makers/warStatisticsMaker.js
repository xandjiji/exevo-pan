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
exports.randomWarStatisticsData = void 0;
var faker = __importStar(require("faker"));
var utils_1 = require("../utils");
var randomTimeStamp = function () {
    return faker.datatype.number({
        min: 1500000000000,
        max: 1700000000000
    });
};
var randomOnlineSnapshots = function () {
    return Array.from({ length: 24 }, function () { return ({
        count: faker.datatype.number({ min: 20, max: 600 }),
        timeStamp: randomTimeStamp()
    }); });
};
var randomXPSnapshots = function (canBeNegative) {
    if (canBeNegative === void 0) { canBeNegative = false; }
    return Array.from({ length: 24 }, function () { return ({
        xp: faker.datatype.number({ min: 1000000000000, max: 4000000000000 }) *
            (canBeNegative ? +faker.datatype.boolean() * 2 - 1 : 1),
        timeStamp: randomTimeStamp()
    }); });
};
var coinflipNumberSign = function (value) {
    return value * (+faker.datatype.boolean() * 2 - 1);
};
var randomVocationString = function () {
    return utils_1.singleSampleFrom([
        'Elite Knight',
        'Royal Paladin',
        'Master Sorcerer',
        'ElderDruid',
    ]);
};
var randomGuildMember = function () { return ({
    nickname: faker.name.firstName(),
    level: faker.datatype.number({ min: 45, max: 2000 }),
    vocation: randomVocationString()
}); };
var randomKillDeathCount = function () { return ({
    kills: faker.datatype.number({ min: 0, max: 10000 }),
    deathCount: faker.datatype.number({ min: 0, max: 1000 })
}); };
var randomWarStatisticsData = function () { return ({
    onlineCount: {
        guildA: randomOnlineSnapshots(),
        guildB: randomOnlineSnapshots()
    },
    score: {
        guildA: faker.datatype.number({ min: 1000, max: 100000 }),
        diffGuildA: faker.datatype.number({ min: -100, max: 400 }),
        guildB: faker.datatype.number({ min: 1000, max: 100000 }),
        diffGuildB: faker.datatype.number({ min: -100, max: 400 })
    },
    xpStats: {
        dailyXP: { guildA: randomXPSnapshots(), guildB: randomXPSnapshots() },
        dailyXPDiff: {
            guildA: randomXPSnapshots(true),
            guildB: randomXPSnapshots(true)
        },
        currentXP: {
            guildA: faker.datatype.number({
                min: 1000000000000,
                max: 4000000000000
            }),
            guildB: faker.datatype.number({
                min: 1000000000000,
                max: 4000000000000
            })
        },
        todayDiff: {
            guildA: coinflipNumberSign(faker.datatype.number({
                min: 1000000000,
                max: 4000000000
            })),
            guildB: coinflipNumberSign(faker.datatype.number({
                min: 1000000000,
                max: 4000000000
            }))
        },
        lastDiff: {
            guildA: coinflipNumberSign(faker.datatype.number({
                min: 1000000000,
                max: 4000000000
            })),
            guildB: coinflipNumberSign(faker.datatype.number({
                min: 1000000000,
                max: 4000000000
            }))
        }
    },
    top10Kills: {
        guildA: Array.from({ length: 10 }, function () { return (__assign(__assign({}, randomGuildMember()), randomKillDeathCount())); }),
        guildB: Array.from({ length: 10 }, function () { return (__assign(__assign({}, randomGuildMember()), randomKillDeathCount())); })
    },
    top10Deaths: {
        guildA: Array.from({ length: 10 }, function () { return (__assign(__assign({}, randomGuildMember()), randomKillDeathCount())); }),
        guildB: Array.from({ length: 10 }, function () { return (__assign(__assign({}, randomGuildMember()), randomKillDeathCount())); })
    },
    lastDeaths: {
        guildA: Array.from({ length: 50 }, function () { return (__assign(__assign({}, randomGuildMember()), { timeStamp: randomTimeStamp() })); }),
        guildB: Array.from({ length: 50 }, function () { return (__assign(__assign({}, randomGuildMember()), { timeStamp: randomTimeStamp() })); })
    }
}); };
exports.randomWarStatisticsData = randomWarStatisticsData;
//# sourceMappingURL=warStatisticsMaker.js.map