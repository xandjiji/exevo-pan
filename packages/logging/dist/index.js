"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.setFooterText = exports.tabBroadcast = exports.broadcast = exports.log = exports.coloredDiff = exports.coloredProgress = exports.coloredText = void 0;
var Logger_1 = require("./Logger");
__exportStar(require("./TrackETA"), exports);
__exportStar(require("./Timer"), exports);
var utils_1 = require("./utils");
__createBinding(exports, utils_1, "coloredText");
__createBinding(exports, utils_1, "coloredProgress");
__createBinding(exports, utils_1, "coloredDiff");
exports.log = Logger_1.logger.log, exports.broadcast = Logger_1.logger.broadcast, exports.tabBroadcast = Logger_1.logger.tabBroadcast, exports.setFooterText = Logger_1.logger.setFooterText;
//# sourceMappingURL=index.js.map