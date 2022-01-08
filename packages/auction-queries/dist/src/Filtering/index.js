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
exports.filterCharacters = void 0;
var schema = __importStar(require("./schemas"));
var filterSchema = Object.values(schema).filter(function (item) { return typeof item !== 'boolean'; });
var buildFilters = function (filters) {
    var filterTests = filterSchema
        .filter(function (_a) {
        var filterSkip = _a.filterSkip;
        return !filterSkip(filters);
    })
        .map(function (_a) {
        var filterTest = _a.filterTest;
        return filterTest(filters);
    });
    return function (auction) {
        return filterTests.every(function (test) { return test(auction); });
    };
};
var filterCharacters = function (_a) {
    var auctions = _a.auctions, filters = _a.filters;
    try {
        var builtFilters = buildFilters(filters);
        return auctions.filter(builtFilters);
    }
    catch (_b) {
        return [];
    }
};
exports.filterCharacters = filterCharacters;
//# sourceMappingURL=index.js.map