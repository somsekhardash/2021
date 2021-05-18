"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = exports.updateUser = exports.UserDelete = void 0;
var UserModel_1 = require("../models/UserModel");
var TournamentModel_1 = require("../models/TournamentModel");
// import expValidator from "express-validator";
// const { sanitizeBody, body, validationResult } = expValidator;
var express_validator_1 = require("express-validator");
var apiResponse_1 = require("../helpers/apiResponse");
exports.UserDelete = [
    express_validator_1.body("userId")
        .isLength({ min: 1 })
        .trim()
        .withMessage("User Id name must be specified."),
    express_validator_1.sanitizeBody("userId").escape(),
    function (req, res) {
        try {
            var errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                UserModel_1.default.findByIdAndDelete(req.body.userId)
                    .then(function (res) {
                    return apiResponse_1.successResponse(res, "User Deleted");
                })
                    .catch(function (err) {
                    return apiResponse_1.ErrorResponse(res, err);
                });
                return apiResponse_1.successResponse(res, "User Deleted");
            }
        }
        catch (err) {
            return apiResponse_1.ErrorResponse(res, err);
        }
    },
];
exports.updateUser = [
    express_validator_1.body("mobileNumber")
        .isLength({ min: 1 })
        .trim()
        .withMessage("mobileNumber name must be specified."),
    express_validator_1.sanitizeBody("mobileNumber").escape(),
    express_validator_1.body("userName")
        .isLength({ min: 1 })
        .trim()
        .withMessage("userName name must be specified."),
    express_validator_1.sanitizeBody("userName").escape(),
    express_validator_1.body("password")
        .isLength({ min: 1 })
        .trim()
        .withMessage("password name must be specified."),
    express_validator_1.sanitizeBody("password").escape(),
    function (req, res) {
        try {
            var errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                var book = new UserModel_1.default({
                    mobileNumber: req.body.mobileNumber,
                    userName: req.body.userName,
                    password: req.body.password,
                    _id: req.body.userId,
                });
                UserModel_1.default.findByIdAndUpdate(req.body.userId, book)
                    .then(function (user) {
                    return apiResponse_1.successResponseWithData(res, "User updated", user);
                })
                    .catch(function (err) {
                    return apiResponse_1.ErrorResponse(res, err);
                });
            }
        }
        catch (err) {
            return apiResponse_1.ErrorResponse(res, err);
        }
    },
];
exports.getUsers = [
    function (req, res) {
        try {
            var errors = express_validator_1.validationResult(req);
            var tournamentId = req.query.tournamentId;
            if (!errors.isEmpty()) {
                return apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                var query = tournamentId ? { _id: tournamentId } : {};
                if (tournamentId) {
                    TournamentModel_1.default.find(query)
                        .populate("users")
                        .then(function (users) {
                        if (users.length) {
                            return apiResponse_1.successResponseWithData(res, "Operation success", users);
                        }
                        else {
                            return apiResponse_1.successResponseWithData(res, "Operation success", []);
                        }
                    })
                        .catch(function (err) {
                        return apiResponse_1.ErrorResponse(res, err);
                    });
                }
                else {
                    UserModel_1.default.find(query)
                        .then(function (users) {
                        if (users.length) {
                            return apiResponse_1.successResponseWithData(res, "Operation success", users);
                        }
                        else {
                            return apiResponse_1.successResponseWithData(res, "Operation success", []);
                        }
                    })
                        .catch(function (err) {
                        return apiResponse_1.ErrorResponse(res, err);
                    });
                }
            }
        }
        catch (err) {
            return apiResponse_1.ErrorResponse(res, err);
        }
    },
];
exports.createUser = [
    express_validator_1.body("userName")
        .isLength({ min: 1 })
        .trim()
        .withMessage("User Name must be specified.")
        .isAlphanumeric()
        .withMessage("User Name has non-alphanumeric characters."),
    express_validator_1.body("mobileNumber")
        .isLength({ min: 1 })
        .trim()
        .withMessage("Mobile Number must be specified.")
        .isMobilePhone("en-IN")
        .withMessage("Mobile Number must be a valid mobile number")
        .custom(function (value) {
        return UserModel_1.default.findOne({ mobileNumber: value }).then(function (user) {
            if (user) {
                return Promise.reject("Mobile Number already in use");
            }
        });
    }),
    express_validator_1.body("password")
        .isLength({ min: 6 })
        .trim()
        .withMessage("Password must be 6 characters or greater."),
    express_validator_1.sanitizeBody("userName").escape(),
    express_validator_1.sanitizeBody("mobileNumber").escape(),
    express_validator_1.sanitizeBody("password").escape(),
    function (req, res) {
        try {
            var errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                var user = new UserModel_1.default({
                    mobileNumber: req.body.mobileNumber,
                    userName: req.body.userName,
                    password: req.body.password,
                });
                user
                    .save()
                    .then(function (newuser) {
                    return apiResponse_1.successResponseWithData(res, "User Created", newuser);
                })
                    .catch(function (err) {
                    return apiResponse_1.ErrorResponse(res, err);
                });
            }
        }
        catch (err) {
            return apiResponse_1.ErrorResponse(res, err);
        }
    },
];
//# sourceMappingURL=UserController.js.map