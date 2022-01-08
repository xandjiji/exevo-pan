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
exports.randomServerData = exports.randomServerList = exports.randomServer = exports.randomServerId = void 0;
var faker = __importStar(require("faker"));
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var randomServerId = function () {
    return faker.datatype.number({ min: constants_1.servers.id.MIN, max: constants_1.servers.id.MAX });
};
exports.randomServerId = randomServerId;
var randomServerLocation = function () {
    return utils_1.singleSampleFrom(constants_1.servers.locations);
};
var randomPvpType = function () { return utils_1.singleSampleFrom(constants_1.servers.pvpTypes); };
var randomServer = function () { return ({
    battleye: faker.datatype.boolean(),
    experimental: faker.datatype.boolean(),
    serverId: exports.randomServerId(),
    serverName: faker.address.cityName(),
    serverLocation: randomServerLocation(),
    pvpType: randomPvpType()
}); };
exports.randomServer = randomServer;
var randomServerList = function (amount) {
    var serverArray = [];
    var _loop_1 = function () {
        var newServer = exports.randomServer();
        if (!serverArray.some(function (server) { return server.serverName === newServer.serverName; }))
            serverArray.push(newServer);
    };
    while (serverArray.length < amount) {
        _loop_1();
    }
    return serverArray
        .sort(function (a, b) { return a.serverName.localeCompare(b.serverName); })
        .map(function (server, index) { return (__assign(__assign({}, server), { serverId: index })); });
};
exports.randomServerList = randomServerList;
var randomServerData = function (amount) {
    var serverList = exports.randomServerList(amount);
    var rawServerData = {};
    serverList.forEach(function (server) {
        rawServerData[server.serverName] = server;
    });
    return { rawServerData: rawServerData, serverList: serverList };
};
exports.randomServerData = randomServerData;
//# sourceMappingURL=serverMaker.js.map