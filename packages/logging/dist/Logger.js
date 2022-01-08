"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.logger = void 0;
var TerminalStream_1 = require("./TerminalStream");
var Timestamp_1 = require("./Timestamp");
var TAB = '  └> ';
var Logger = /** @class */ (function () {
    function Logger() {
        var _this = this;
        this.stream = new TerminalStream_1.TerminalStream();
        this.log = function (message) {
            _this.stream.log(message);
        };
        this.broadcast = function (text, color) {
            var message = Timestamp_1.Timestamp.now(color) + " " + text;
            _this.log(message);
        };
        this.tabBroadcast = function (text) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _this.broadcast.apply(_this, __spreadArray([TAB + " " + text], __read(args)));
        };
        this.setFooterText = this.stream.setFooterText;
    }
    return Logger;
}());
exports.logger = new Logger();
//# sourceMappingURL=Logger.js.map