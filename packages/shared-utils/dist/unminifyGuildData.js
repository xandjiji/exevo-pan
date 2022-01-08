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
exports.__esModule = true;
exports.unminifyGuildData = void 0;
var vocations_1 = require("./vocations");
var MINIMUM_MEMBER_LEVEL = 45;
var unminifyGuildData = function (guildData, guildName, guildId) {
    return guildData.map(function (member) {
        var _a = __read(member, 5), nickname = _a[0], vocationId = _a[1], level = _a[2], deathCount = _a[3], kills = _a[4];
        return {
            nickname: nickname,
            vocation: vocations_1.vocation.getFullName(vocationId, MINIMUM_MEMBER_LEVEL),
            vocationId: vocationId,
            level: level,
            deathCount: deathCount,
            kills: kills,
            guild: guildName,
            guildId: guildId
        };
    });
};
exports.unminifyGuildData = unminifyGuildData;
//# sourceMappingURL=unminifyGuildData.js.map