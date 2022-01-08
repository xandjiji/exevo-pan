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
exports.__esModule = true;
exports.randomDataset = void 0;
var buildCharacterData_1 = require("shared-utils/dist/buildCharacterData");
var serverMaker_1 = require("./makers/serverMaker");
var CharacterMaker_1 = require("./makers/CharacterMaker");
var rareItemMaker_1 = require("./makers/rareItemMaker");
var statisticsMaker_1 = require("./makers/statisticsMaker");
var warStatisticsMaker_1 = require("./makers/warStatisticsMaker");
var membersWarDataMaker_1 = require("./makers/membersWarDataMaker");
var randomDataset = function (charAmount) {
    if (charAmount === void 0) { charAmount = 10000; }
    var _a = serverMaker_1.randomServerData(100), rawServerData = _a.rawServerData, serverList = _a.serverList;
    var characterList = Array.from({ length: charAmount }, CharacterMaker_1.randomCharacter);
    var buildedCharacterData = buildCharacterData_1.buildCharacterData(characterList, serverList);
    var itemData = rareItemMaker_1.randomItemData(buildedCharacterData);
    var guildWarData = membersWarDataMaker_1.randomGuildWarData();
    return __assign({ rawServerData: rawServerData, serverData: serverList, partialCharacterData: characterList, characterData: buildedCharacterData, itemData: itemData, statisticsData: statisticsMaker_1.randomStatisticsData(), warStatistics: warStatisticsMaker_1.randomWarStatisticsData() }, guildWarData);
};
exports.randomDataset = randomDataset;
//# sourceMappingURL=index.js.map