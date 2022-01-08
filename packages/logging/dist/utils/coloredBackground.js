"use strict";
exports.__esModule = true;
exports.coloredBackground = void 0;
var types_1 = require("../types");
var coloredBackground = function (text, color) { return "" + types_1.bgColors[color] + text + types_1.bgColors.reset; };
exports.coloredBackground = coloredBackground;
//# sourceMappingURL=coloredBackground.js.map