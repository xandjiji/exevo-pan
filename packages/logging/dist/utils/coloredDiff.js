"use strict";
exports.__esModule = true;
exports.coloredDiff = void 0;
var coloredText_1 = require("./coloredText");
var coloredDiff = function (diff) {
    if (diff > 0) {
        return coloredText_1.coloredText("+" + diff, 'success');
    }
    if (diff < 0) {
        return coloredText_1.coloredText(diff, 'fail');
    }
    return coloredText_1.coloredText(diff, 'control');
};
exports.coloredDiff = coloredDiff;
//# sourceMappingURL=coloredDiff.js.map