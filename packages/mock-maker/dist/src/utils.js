"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.samplesFrom = exports.singleSampleFrom = void 0;
var faker = __importStar(require("faker"));
function singleSampleFrom(array) {
    return array[faker.datatype.number({ min: 0, max: array.length - 1 })];
}
exports.singleSampleFrom = singleSampleFrom;
var samplesFrom = function (array, fixedAmount) {
    var randomAmount = faker.datatype.number({
        min: 1,
        max: fixedAmount !== null && fixedAmount !== void 0 ? fixedAmount : array.length
    });
    var shuffledArray = faker.helpers.shuffle(array);
    return shuffledArray.slice(0, randomAmount);
};
exports.samplesFrom = samplesFrom;
//# sourceMappingURL=utils.js.map