"use strict";
exports.__esModule = true;
exports.paginateData = void 0;
var DEFAULT_INDEX = 0;
var DEFAULT_PAGE_SIZE = 10;
var defaultOptions = {
    pageIndex: DEFAULT_INDEX,
    pageSize: DEFAULT_PAGE_SIZE
};
var paginateData = function (array, _a) {
    var _b = _a === void 0 ? defaultOptions : _a, pageIndex = _b.pageIndex, pageSize = _b.pageSize;
    var totalItems = array.length;
    if (pageSize < 1) {
        return {
            page: array,
            pageIndex: 0,
            totalItems: totalItems,
            startOffset: 1,
            endOffset: totalItems,
            hasPrev: false,
            hasNext: false
        };
    }
    var page = array.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    var pageCount = Math.ceil(totalItems / pageSize);
    var hasPrev = pageIndex > 0;
    var hasNext = pageIndex + 1 < pageCount;
    var startOffset = pageIndex * pageSize + 1;
    var endOffset = hasNext ? (pageIndex + 1) * pageSize : totalItems;
    return {
        page: page,
        pageIndex: pageIndex,
        totalItems: totalItems,
        startOffset: startOffset,
        endOffset: endOffset,
        hasPrev: hasPrev,
        hasNext: hasNext
    };
};
exports.paginateData = paginateData;
//# sourceMappingURL=index.js.map