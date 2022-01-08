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
exports.coloredProgress = void 0;
var coloredText_1 = require("./coloredText");
var coloredProgress = function (_a, color) {
    var _b = __read(_a, 2), current = _b[0], last = _b[1];
    if (color === void 0) { color = 'system'; }
    return "" + coloredText_1.coloredText('[', color) + current + coloredText_1.coloredText('/', color) + last + coloredText_1.coloredText(']', color);
};
exports.coloredProgress = coloredProgress;
//# sourceMappingURL=coloredProgress.js.map