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
exports.DEFAULT_SERIALIZED_FILTER_OPTIONS = exports.DEFAULT_FILTER_OPTIONS = exports.DEFAULT_SORT_OPTIONS = exports.DEFAULT_PAGINATION_OPTIONS = void 0;
exports.DEFAULT_PAGINATION_OPTIONS = {
    pageIndex: 0,
    pageSize: 10
};
exports.DEFAULT_SORT_OPTIONS = {
    sortingMode: 0,
    descendingOrder: false
};
exports.DEFAULT_FILTER_OPTIONS = {
    nicknameFilter: '',
    vocation: new Set([]),
    pvp: new Set([]),
    battleye: new Set([]),
    location: new Set([]),
    serverSet: new Set([]),
    minLevel: 8,
    maxLevel: 2000,
    minSkill: 10,
    maxSkill: 150,
    skillKey: new Set([]),
    imbuementsSet: new Set([]),
    charmsSet: new Set([]),
    itemSet: new Set([]),
    rareNick: false,
    addon: 3,
    sex: false,
    questSet: new Set([]),
    outfitSet: new Set([]),
    mountSet: new Set([]),
    achievementSet: new Set([]),
    storeOutfitSet: new Set([]),
    storeMountSet: new Set([]),
    soulwarAvailable: false
};
exports.DEFAULT_SERIALIZED_FILTER_OPTIONS = __assign(__assign({}, exports.DEFAULT_FILTER_OPTIONS), { vocation: [], pvp: [], battleye: [], location: [], serverSet: [], skillKey: [], imbuementsSet: [], charmsSet: [], itemSet: [], questSet: [], outfitSet: [], mountSet: [], achievementSet: [], storeOutfitSet: [], storeMountSet: [] });
//# sourceMappingURL=defaults.js.map