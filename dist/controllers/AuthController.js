"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.userLogin = void 0;
var express_validator_1 = require("express-validator");
var jsonwebtoken = require("jsonwebtoken");
var apiResponse_1 = require("../helpers/apiResponse");
var UserModel_1 = require("../models/UserModel");
var sign = jsonwebtoken.sign;
var refreshTokens = [];
exports.userLogin = [
    express_validator_1.body("mobileNumber")
        .isLength({ min: 1 })
        .trim()
        .withMessage("userName must be specified."),
    express_validator_1.body("password")
        .isLength({ min: 1 })
        .trim()
        .withMessage("Password must be specified."),
    express_validator_1.sanitizeBody("email").escape(),
    express_validator_1.sanitizeBody("password").escape(),
    function (req, res) {
        try {
            var errors = express_validator_1.validationResult(req);
            var _a = req.body, mobileNumber = _a.mobileNumber, password_1 = _a.password;
            if (!errors.isEmpty()) {
                return apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            UserModel_1.default.findOne({ mobileNumber: mobileNumber })
                .then(function (user) {
                if (user) {
                    if (user.password == password_1) {
                        var userData = {
                            _id: user._id,
                            userName: user.userName,
                            mobileNumber: user.mobileNumber,
                        };
                        var jwtPayload = userData;
                        var jwtData = {
                            expiresIn: 86400,
                        };
                        userData.token = sign(jwtPayload, "7032300186", jwtData);
                        return apiResponse_1.successResponseWithData(res, "Login Success.", userData);
                    }
                    else {
                        return apiResponse_1.unauthorizedResponse(res, "MobileNumber or Password wrong.");
                    }
                }
                else {
                    return apiResponse_1.unauthorizedResponse(res, "MobileNumber or Password wrong.");
                }
            })
                .catch(function (err) {
                return apiResponse_1.ErrorResponse(res, err);
            });
        }
        catch (err) {
            return apiResponse_1.ErrorResponse(res, err);
        }
    },
];
function userLogout(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, accessToken_1;
        return __generator(this, function (_a) {
            try {
                errors = express_validator_1.validationResult(req);
                accessToken_1 = req.body.accessToken;
                if (!errors.isEmpty()) {
                    return [2 /*return*/, apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array())];
                }
                refreshTokens = __spreadArray([], refreshTokens.filter(function (token) { return accessToken_1 !== token; }));
                apiResponse_1.successResponse(res, "User Logged Out");
            }
            catch (err) {
                return [2 /*return*/, apiResponse_1.ErrorResponse(res, err)];
            }
            return [2 /*return*/];
        });
    });
}
exports.userLogout = userLogout;
//# sourceMappingURL=AuthController.js.map