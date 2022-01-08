"use strict";
exports.__esModule = true;
exports.Timer = void 0;
var Timestamp_1 = require("./Timestamp");
var Timer = /** @class */ (function () {
    function Timer() {
        var _this = this;
        this.startTimestamp = 0;
        this.elapsedTime = function () {
            return Timestamp_1.Timestamp.humanReadable(+new Date() - _this.startTimestamp);
        };
        this.startTimestamp = +new Date();
    }
    return Timer;
}());
exports.Timer = Timer;
//# sourceMappingURL=Timer.js.map