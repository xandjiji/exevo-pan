"use strict";
exports.__esModule = true;
exports.humanReadable = void 0;
var utils_1 = require("../utils");
var humanReadable = function (timestamp, color) {
    if (color === void 0) { color = 'neutral'; }
    var _a = utils_1.calcTimeObject(timestamp), hours = _a.hours, seconds = _a.seconds, minutes = _a.minutes;
    var hoursString = hours
        ? utils_1.coloredText(hours, color) + " hour" + utils_1.plural(hours) + ", "
        : '';
    var minutesString = minutes
        ? utils_1.coloredText(minutes, color) + " minute" + utils_1.plural(minutes) + " and "
        : '';
    var secondsString = seconds
        ? utils_1.coloredText(seconds, color) + " second" + utils_1.plural(seconds)
        : '';
    return "" + hoursString + minutesString + secondsString;
};
exports.humanReadable = humanReadable;
//# sourceMappingURL=humanReadable.js.map