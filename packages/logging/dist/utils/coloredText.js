"use strict";
exports.__esModule = true;
exports.coloredText = void 0;
var types_1 = require("../types");
var coloredText = function (text, color) {
    return "" + types_1.colors[color] + text + types_1.colors.reset;
};
exports.coloredText = coloredText;
//# sourceMappingURL=coloredText.js.map