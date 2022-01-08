"use strict";
exports.__esModule = true;
exports.TrackETA = void 0;
var _1 = require(".");
var utils_1 = require("./utils");
var Timestamp_1 = require("./Timestamp");
var TrackETA = /** @class */ (function () {
    function TrackETA(totalTasks, taskName) {
        var _this = this;
        if (taskName === void 0) { taskName = 'Task'; }
        this.taskName = 'Task';
        this.startTimestamp = 0;
        this.currentTask = 0;
        this.totalTasks = 1;
        this.percentageCompleted = 0;
        this.getReadablePercentage = function () {
            return utils_1.coloredText((_this.percentageCompleted * 100).toFixed(2) + "%", 'system');
        };
        this.setText = function (text) {
            return _1.setFooterText(utils_1.progressBar(_this.percentageCompleted) + " " + text);
        };
        this.updateETA = function () {
            var elapsedTime = +new Date() - _this.startTimestamp;
            var tasksLeft = _this.totalTasks - _this.currentTask;
            var estimatedTimeLeft = (elapsedTime * tasksLeft) / _this.currentTask;
            if (tasksLeft) {
                _this.setText(utils_1.coloredText(_this.taskName + " is " + _this.getReadablePercentage() + " completed. " + Timestamp_1.Timestamp.ETA(estimatedTimeLeft), 'reset'));
            }
        };
        this.setCurrentTask = function (newTask) {
            _this.currentTask = newTask;
            _this.percentageCompleted = _this.currentTask / _this.totalTasks;
            _this.updateETA();
        };
        this.incTask = function () {
            _this.currentTask += 1;
            _this.setCurrentTask(_this.currentTask);
        };
        this.getProgress = function (color) {
            if (color === void 0) { color = 'system'; }
            return utils_1.coloredProgress([_this.currentTask, _this.totalTasks], color);
        };
        this.finish = function () {
            _1.log(utils_1.progressBar(_this.percentageCompleted, 'success') + " " + _this.taskName + " was " + _this.getReadablePercentage() + " completed in " + Timestamp_1.Timestamp.humanReadable(+new Date() - _this.startTimestamp) + "\n");
            _1.setFooterText('');
        };
        this.taskName = taskName;
        this.startTimestamp = +new Date();
        this.totalTasks = totalTasks;
        this.setText(utils_1.coloredText(this.taskName + " is " + this.getReadablePercentage() + " completed", 'reset'));
    }
    return TrackETA;
}());
exports.TrackETA = TrackETA;
//# sourceMappingURL=TrackETA.js.map