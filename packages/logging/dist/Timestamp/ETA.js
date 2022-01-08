"use strict";
exports.__esModule = true;
exports.ETA = void 0;
var utils_1 = require("../utils");
var types_1 = require("../types");
var checkHours = function (timestamp) { return timestamp > types_1.MILLISECONDS_IN_AN_HOUR; };
var checkMinutes = function (timestamp) { return timestamp > types_1.MILLISECONDS_IN_A_MINUTE; };
var checkSeconds = function (timestamp) { return timestamp > types_1.MILLISECONDS_IN_A_SECOND; };
var ETA = function (timestamp, color) {
    if (color === void 0) { color = 'neutral'; }
    var _a = utils_1.calcTimeObject(timestamp), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
    var hoursString = checkHours(timestamp)
        ? utils_1.coloredText(hours, color) + "h "
        : '';
    var minutesString = checkMinutes(timestamp)
        ? utils_1.coloredText(minutes, color) + "m  "
        : '';
    var secondsString = checkSeconds(timestamp)
        ? utils_1.coloredText(seconds, color) + "s"
        : '';
    var leftString = secondsString ? ' left' : '';
    return "" + hoursString + minutesString + secondsString + leftString;
};
exports.ETA = ETA;
//# sourceMappingURL=ETA.js.map