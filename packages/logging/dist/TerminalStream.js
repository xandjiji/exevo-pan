"use strict";
exports.__esModule = true;
exports.TerminalStream = void 0;
var CLEAR_REST_OF_LINE = '\x1b[K';
var NEWLINE = '\n';
var MOVE_CURSOR_TO_PREVIOUS_LINE = '\x1b[A';
var newline = function () { return "" + CLEAR_REST_OF_LINE + NEWLINE; };
var TerminalStream = /** @class */ (function () {
    function TerminalStream() {
        var _this = this;
        this.footerText = '';
        this.print = function (text) {
            process.stdout.write("" + MOVE_CURSOR_TO_PREVIOUS_LINE + text);
        };
        this.log = function (message) {
            _this.print("" + message + newline() + _this.footerText + newline());
        };
        this.setFooterText = function (value) {
            _this.footerText = value;
            _this.print("" + value + newline());
        };
        process.stdout.write("" + this.footerText + newline());
    }
    return TerminalStream;
}());
exports.TerminalStream = TerminalStream;
//# sourceMappingURL=TerminalStream.js.map