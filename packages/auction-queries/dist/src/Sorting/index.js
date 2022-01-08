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
exports.applySort = void 0;
var DEFAULT_SORT_MODE = 0;
var DEFAULT_DESCENDING_ORDER = false;
var defaultOptions = {
    sortingMode: DEFAULT_SORT_MODE,
    descendingOrder: DEFAULT_DESCENDING_ORDER
};
var applySort = function (oldData, _a) {
    var _b = _a === void 0 ? defaultOptions : _a, sortingMode = _b.sortingMode, descendingOrder = _b.descendingOrder;
    var data = __spreadArray([], __read(oldData));
    /* the data is already sorted by this default */
    if (sortingMode === DEFAULT_SORT_MODE &&
        descendingOrder === DEFAULT_DESCENDING_ORDER) {
        return data;
    }
    var byAuctionEnd = function (a, b) {
        if (!descendingOrder)
            return a.auctionEnd - b.auctionEnd;
        return b.auctionEnd - a.auctionEnd;
    };
    var byLevel = function (a, b) {
        if (!descendingOrder)
            return a.level - b.level;
        return b.level - a.level;
    };
    var byPrice = function (a, b) {
        if (!descendingOrder)
            return a.currentBid - b.currentBid;
        return b.currentBid - a.currentBid;
    };
    switch (sortingMode) {
        case 0:
            return data.sort(byAuctionEnd);
        case 1:
            return data.sort(byLevel);
        case 2:
            return data.sort(byPrice);
        case 3:
            return data.filter(function (item) { return item.hasBeenBidded; }).sort(byPrice);
        default:
            return data;
    }
};
exports.applySort = applySort;
//# sourceMappingURL=index.js.map