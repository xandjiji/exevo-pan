"use strict";
exports.__esModule = true;
exports.progressBar = void 0;
var coloredText_1 = require("./coloredText");
var MAX_WIDTH = 8;
var BLOCKS = [' ', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];
var TOTAL_STEPS = MAX_WIDTH * BLOCKS.length;
var progressBar = function (percentage, color) {
    if (color === void 0) { color = 'highlight'; }
    var progressCount = Math.floor(TOTAL_STEPS * percentage);
    var bars = [];
    var progressLeft = progressCount;
    while (bars.length < MAX_WIDTH) {
        for (var i = BLOCKS.length - 1; i >= 0; i -= 1) {
            var character = BLOCKS[i];
            if (progressLeft - i >= 0) {
                progressLeft -= i;
                bars.push(character);
                break;
            }
        }
    }
    return "[" + coloredText_1.coloredText(bars.join(''), color) + "]";
};
exports.progressBar = progressBar;
//# sourceMappingURL=progressBar.js.map