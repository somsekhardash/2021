"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorizedResponse = exports.validationErrorWithData = exports.notFoundResponse = exports.ErrorResponse = exports.successResponseWithData = exports.successResponse = void 0;
var successResponse = function (res, msg) {
    var data = {
        status: 1,
        message: msg,
    };
    return res.status(200).json(data);
};
exports.successResponse = successResponse;
var successResponseWithData = function (res, msg, data) {
    var resData = {
        status: 1,
        message: msg,
        data: data,
    };
    return res.status(200).json(resData);
};
exports.successResponseWithData = successResponseWithData;
var ErrorResponse = function (res, msg) {
    var data = {
        status: 0,
        message: msg,
    };
    return res.status(500).json(data);
};
exports.ErrorResponse = ErrorResponse;
var notFoundResponse = function (res, msg) {
    var data = {
        status: 0,
        message: msg,
    };
    return res.status(404).json(data);
};
exports.notFoundResponse = notFoundResponse;
var validationErrorWithData = function (res, msg, data) {
    var resData = {
        status: 0,
        message: msg,
        data: data,
    };
    return res.status(400).json(resData);
};
exports.validationErrorWithData = validationErrorWithData;
var unauthorizedResponse = function (res, msg) {
    var data = {
        status: 0,
        message: msg,
    };
    return res.status(200).json(data);
};
exports.unauthorizedResponse = unauthorizedResponse;
//# sourceMappingURL=apiResponse.js.map