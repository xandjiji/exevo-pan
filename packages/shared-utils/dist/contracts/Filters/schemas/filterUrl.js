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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.filterSchema = void 0;
var defaults_1 = require("../defaults");
var encodeSet = function (set) {
    return __spreadArray([], __read(set)).join(',');
};
var decodeSet = function (encodedValue, valueType) {
    return new Set(decodeURIComponent(encodedValue)
        .split(',')
        .map(function (stringValue) {
        if (valueType === 'number')
            return Number(stringValue);
        if (valueType === 'boolean')
            return stringValue === 'true';
        return stringValue;
    }));
};
var decodeBooleanSet = function (encodedValue) {
    return decodeSet(encodedValue, 'boolean');
};
var decodeNumberSet = function (encodedValue) {
    return decodeSet(encodedValue, 'number');
};
var decodeStringSet = function (encodedValue) {
    return decodeSet(encodedValue, 'string');
};
var decodeNumber = function (encodedValue) { return Number(encodedValue); };
var decodeBoolean = function (encodedValue) { return encodedValue === 'true'; };
exports.filterSchema = [
    {
        key: 'nicknameFilter',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.nicknameFilter
    },
    {
        key: 'vocation',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.vocation,
        encode: encodeSet,
        decode: decodeNumberSet
    },
    {
        key: 'pvp',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.pvp,
        encode: encodeSet,
        decode: decodeNumberSet
    },
    {
        key: 'battleye',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.battleye,
        encode: encodeSet,
        decode: decodeBooleanSet
    },
    {
        key: 'location',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.location,
        encode: encodeSet,
        decode: decodeNumberSet
    },
    {
        key: 'serverSet',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.serverSet,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'minLevel',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.minLevel,
        decode: decodeNumber
    },
    {
        key: 'maxLevel',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.maxLevel,
        decode: decodeNumber
    },
    {
        key: 'minSkill',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.minSkill,
        decode: decodeNumber
    },
    {
        key: 'maxSkill',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.maxSkill,
        decode: decodeNumber
    },
    {
        key: 'addon',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.addon,
        decode: decodeNumber
    },
    {
        key: 'sex',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.sex,
        decode: decodeBoolean
    },
    {
        key: 'skillKey',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.skillKey,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'imbuementsSet',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.imbuementsSet,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'charmsSet',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.charmsSet,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'itemSet',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.charmsSet,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'rareNick',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.rareNick,
        decode: decodeBoolean
    },
    {
        key: 'questSet',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.questSet,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'outfitSet',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.outfitSet,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'storeOutfitSet',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.storeOutfitSet,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'mountSet',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.mountSet,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'storeMountSet',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.storeMountSet,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'achievementSet',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.achievementSet,
        encode: encodeSet,
        decode: decodeStringSet
    },
    {
        key: 'soulwarAvailable',
        defaultValue: defaults_1.DEFAULT_FILTER_OPTIONS.soulwarAvailable,
        decode: decodeBoolean
    },
];
//# sourceMappingURL=filterUrl.js.map