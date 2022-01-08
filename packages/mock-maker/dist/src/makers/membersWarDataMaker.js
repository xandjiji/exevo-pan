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
exports.randomGuildWarData = exports.randomGuildMembersWarData = void 0;
var faker = __importStar(require("faker"));
var unminifyGuildData_1 = require("shared-utils/dist/unminifyGuildData");
var randomMiniMemberWarData = function () { return [
    faker.name.firstName(),
    faker.datatype.number({ min: 1, max: 4 }),
    faker.datatype.number({ min: 45, max: 2000 }),
    faker.datatype.number({ min: 0, max: 10000 }),
    faker.datatype.number({ min: 0, max: 2000 }),
]; };
var randomGuildMembersWarData = function () {
    return Array.from({ length: faker.datatype.number({ min: 2000, max: 6000 }) }, function () {
        return randomMiniMemberWarData();
    });
};
exports.randomGuildMembersWarData = randomGuildMembersWarData;
var randomGuildWarData = function () {
    var miniPuneMembersData = exports.randomGuildMembersWarData();
    var miniBonesMembersData = exports.randomGuildMembersWarData();
    var puneMembersData = unminifyGuildData_1.unminifyGuildData(miniPuneMembersData, 'Libertabra Pune', 0);
    var bonesMembersData = unminifyGuildData_1.unminifyGuildData(miniBonesMembersData, 'Bones Alliance', 1);
    var allGuildMembers = __spreadArray(__spreadArray([], __read(puneMembersData)), __read(bonesMembersData)).sort(function (a, b) { return b.level - a.level; });
    return {
        miniPuneMembersData: miniPuneMembersData,
        miniBonesMembersData: miniBonesMembersData,
        puneMembersData: puneMembersData,
        bonesMembersData: bonesMembersData,
        allGuildMembers: allGuildMembers
    };
};
exports.randomGuildWarData = randomGuildWarData;
//# sourceMappingURL=membersWarDataMaker.js.map