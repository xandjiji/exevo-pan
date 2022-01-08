"use strict";
exports.__esModule = true;
exports.buildSchema = void 0;
var buildSchema = function (orderByDefault, descendingDefault) { return [
    {
        key: 'currentPage',
        defaultValue: 1,
        decode: function (value) { return Number(decodeURIComponent(value)); }
    },
    {
        key: 'orderBy',
        defaultValue: orderByDefault,
        decode: function (value) { return Number(decodeURIComponent(value)); }
    },
    {
        key: 'descending',
        defaultValue: descendingDefault,
        decode: function (value) { return decodeURIComponent(value) === 'true'; }
    },
]; };
exports.buildSchema = buildSchema;
//# sourceMappingURL=sortUrl.js.map