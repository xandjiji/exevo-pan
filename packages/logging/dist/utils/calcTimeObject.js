"use strict";
exports.__esModule = true;
exports.calcTimeObject = void 0;
var types_1 = require("../types");
var calcTimeObject = function (timestamp) {
    var millisecondsLeft = timestamp;
    var hours = Math.floor(millisecondsLeft / types_1.MILLISECONDS_IN_AN_HOUR);
    millisecondsLeft -= hours * types_1.MILLISECONDS_IN_AN_HOUR;
    var minutes = Math.floor(millisecondsLeft / types_1.MILLISECONDS_IN_A_MINUTE);
    millisecondsLeft -= minutes * types_1.MILLISECONDS_IN_A_MINUTE;
    var seconds = Math.floor(millisecondsLeft / types_1.MILLISECONDS_IN_A_SECOND);
    return { hours: hours, minutes: minutes, seconds: seconds };
};
exports.calcTimeObject = calcTimeObject;
//# sourceMappingURL=calcTimeObject.js.map