"use strict";
exports.__esModule = true;
exports.now = void 0;
var utils_1 = require("../utils");
var now = function (color) {
    if (color === void 0) { color = 'reset'; }
    var timestamp = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
    return utils_1.coloredText("[" + timestamp + "]", color);
};
exports.now = now;
//# sourceMappingURL=now.js.map