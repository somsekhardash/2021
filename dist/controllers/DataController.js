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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMatch = exports.getTournaments = exports.updateTournamentUser = exports.updateMatch = exports.voteMatch = exports.createMatch = exports.tournamentDelete = exports.tournamentRegister = exports.test = void 0;
var TournamentModel_1 = require("../models/TournamentModel");
var UserModel_1 = require("../models/UserModel");
// import Match from "./../models/MatchModel";
var express_validator_1 = require("express-validator");
// import mongoose from "mongoose";
// const { sanitizeBody } = expValid;
var apiResponse_1 = require("../helpers/apiResponse");
exports.test = [
    function (_req, res) { return apiResponse_1.successResponseWithData(res, "Ho Ho Ho !!", null); },
];
exports.tournamentRegister = [
    express_validator_1.body("title")
        .isLength({ min: 1 })
        .trim()
        .withMessage("Tournament name must be specified.")
        .custom(function (value) {
        return TournamentModel_1.default.findOne({ title: value }).then(function (tournament) {
            if (tournament) {
                return Promise.reject("Tournament already in use");
            }
        });
    }),
    express_validator_1.sanitizeBody("title").escape(),
    function (req, res) {
        try {
            var errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                var tournament = new TournamentModel_1.default({
                    title: req.body.title,
                });
                tournament
                    .save()
                    .then(function (resp) {
                    console.log("=====>> Success", resp);
                    return apiResponse_1.successResponseWithData(res, "Tournament Created", resp);
                })
                    .catch(function (err) {
                    console.log(err);
                    return apiResponse_1.ErrorResponse(res, err);
                });
            }
        }
        catch (err) {
            return apiResponse_1.ErrorResponse(res, err);
        }
    },
];
exports.tournamentDelete = [
    express_validator_1.body("tournamentId")
        .isLength({ min: 1 })
        .trim()
        .withMessage("tournament Id name must be specified."),
    express_validator_1.sanitizeBody("tournamentId").escape(),
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, tournament, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    errors = express_validator_1.validationResult(req);
                    if (!!errors.isEmpty()) return [3 /*break*/, 1];
                    return [2 /*return*/, apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array())];
                case 1: return [4 /*yield*/, TournamentModel_1.default.findByIdAndDelete(req.body.tournamentId)];
                case 2:
                    tournament = _a.sent();
                    if (tournament)
                        return [2 /*return*/, apiResponse_1.successResponse(res, "Match Deleted")];
                    else
                        return [2 /*return*/, apiResponse_1.ErrorResponse(res, tournament)];
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    return [2 /*return*/, apiResponse_1.ErrorResponse(res, err_1)];
                case 5: return [2 /*return*/];
            }
        });
    }); },
];
exports.createMatch = [
    express_validator_1.body("team1")
        .isLength({ min: 1 })
        .trim()
        .withMessage("team1 must be specified."),
    express_validator_1.body("team2")
        .isLength({ min: 1 })
        .trim()
        .withMessage("team1 must be specified."),
    express_validator_1.body("time")
        .isLength({ min: 1 })
        .trim()
        .withMessage("time must be specified."),
    express_validator_1.sanitizeBody("title").escape(),
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, match, createMatch_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    errors = express_validator_1.validationResult(req);
                    if (!!errors.isEmpty()) return [3 /*break*/, 1];
                    return [2 /*return*/, apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array())];
                case 1:
                    match = {
                        tournamentId: req.body.tournamentId,
                        team1: req.body.team1,
                        team2: req.body.team2,
                        time: req.body.time,
                        venue: req.body.venue,
                        winner: req.body.winner,
                        isStarted: req.body.isStarted,
                        team1Squard: req.body.team1Squard,
                        team2Squard: req.body.team2Squard,
                    };
                    return [4 /*yield*/, TournamentModel_1.default.findOneAndUpdate({ _id: req.body.tournamentId }, { $push: { matches: match } }, { upsert: true, new: true }).catch(function (err) {
                            return apiResponse_1.ErrorResponse(res, err);
                        })];
                case 2:
                    createMatch_1 = _a.sent();
                    return [2 /*return*/, apiResponse_1.successResponseWithData(res, "Operation success", createMatch_1)];
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    return [2 /*return*/, apiResponse_1.ErrorResponse(res, err_2)];
                case 5: return [2 /*return*/];
            }
        });
    }); },
];
exports.voteMatch = [
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                TournamentModel_1.default.findOne({
                    _id: req.body.tournamentId,
                    "matches._id": req.body._id,
                }, {}, {}, function (err, data) {
                    var team1 = data.matches.find(function (match) { return match._id == req.body._id; });
                    team1.team1Squard = team1.team1Squard.filter(function (team) { return team != req.body.player._id; });
                    team1.team2Squard = team1.team2Squard.filter(function (team) { return team != req.body.player._id; });
                    if (req.body.selectedTeam == "team1Squard") {
                        team1.team1Squard.push(req.body.player);
                    }
                    else if (req.body.selectedTeam == "team2Squard") {
                        team1.team2Squard.push(req.body.player);
                    }
                    data
                        .save()
                        .then(function (result) {
                        return apiResponse_1.successResponseWithData(res, "Match Updated successfuly", result);
                    })
                        .catch(function (err) {
                        return apiResponse_1.ErrorResponse(res, err);
                    });
                });
                // if (req.body.selectedTeam == "team1Squard") {
                //   console.log(2);
                //   Tournament.updateOne(
                //     {
                //       _id: req.body.tournamentId,
                //       "matches._id": req.body._id,
                //     },
                //     {
                //       $push: { "matches.$.team1Squard": req.body.player },
                //     },
                //     {},
                //     (err, result) => {
                //       return successResponseWithData(
                //         res,
                //         "Match Updated successfuly",
                //         result
                //       );
                //     }
                //   );
                // } else if (req.body.selectedTeam == "team2Squard") {
                //   console.log(3);
                //   console.log(req.body.player._id);
                //   Tournament.updateOne(
                //     {
                //       _id: req.body.tournamentId,
                //       "matches._id": req.body._id,
                //     },
                //     {
                //       $push: { "matches.$.team2Squard": req.body.player },
                //     },
                //     {},
                //     (err, result) => {
                //       return successResponseWithData(
                //         res,
                //         "Match Updated successfuly",
                //         result
                //       );
                //     }
                //   );
                // }
            }
            catch (err) {
                return [2 /*return*/, apiResponse_1.ErrorResponse(res, err)];
            }
            return [2 /*return*/];
        });
    }); },
];
exports.updateMatch = [
    express_validator_1.body("team1")
        .isLength({ min: 1 })
        .trim()
        .withMessage("team1 must be specified."),
    express_validator_1.body("team2")
        .isLength({ min: 1 })
        .trim()
        .withMessage("team1 must be specified."),
    express_validator_1.body("time")
        .isLength({ min: 1 })
        .trim()
        .withMessage("time must be specified."),
    express_validator_1.sanitizeBody("title").escape(),
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                TournamentModel_1.default.findOneAndUpdate({
                    _id: req.body.tournamentId,
                    "matches._id": req.body._id,
                }, {
                    $set: {
                        "matches.$.team2": req.body.team2,
                        "matches.$.team1": req.body.team1,
                        "matches.$.time": req.body.time,
                        "matches.$.venue": req.body.venue,
                        "matches.$.winner": req.body.winner,
                        "matches.$.isStarted": req.body.isStarted,
                        "matches.$.team1Squard": req.body.team1Squard,
                        "matches.$.team2Squard": req.body.team2Squard,
                    },
                }, null, function (err, result) {
                    if (err) {
                        console.log("Error:", err);
                    }
                    else {
                        return apiResponse_1.successResponseWithData(res, "Match Updated successfuly", result);
                    }
                    process.exit(0);
                });
            }
            catch (err) {
                return [2 /*return*/, apiResponse_1.ErrorResponse(res, err)];
            }
            return [2 /*return*/];
        });
    }); },
];
exports.updateTournamentUser = [
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, getUsers, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    errors = express_validator_1.validationResult(req);
                    if (!!errors.isEmpty()) return [3 /*break*/, 1];
                    return [2 /*return*/, apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array())];
                case 1: return [4 /*yield*/, UserModel_1.default.find({
                        _id: {
                            $in: req.body.users,
                        },
                    }, function (err, docs) {
                        console.log(docs);
                    })];
                case 2:
                    getUsers = _a.sent();
                    TournamentModel_1.default.findOneAndUpdate({ _id: req.body.tournamentId }, { users: getUsers })
                        .then(function (res) {
                        return apiResponse_1.successResponse(res, "User Updated");
                    })
                        .catch(function (err) {
                        return apiResponse_1.ErrorResponse(res, err);
                    });
                    return [2 /*return*/, apiResponse_1.successResponse(res, "User Updated")];
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    return [2 /*return*/, apiResponse_1.ErrorResponse(res, err_3)];
                case 5: return [2 /*return*/];
            }
        });
    }); },
];
exports.getTournaments = [
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, mobileNumber, query, user, tournaments, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    errors = express_validator_1.validationResult(req);
                    mobileNumber = req.query.mobileNumber;
                    if (!!errors.isEmpty()) return [3 /*break*/, 1];
                    return [2 /*return*/, apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array())];
                case 1:
                    if (!mobileNumber) return [3 /*break*/, 4];
                    query = { mobileNumber: mobileNumber };
                    return [4 /*yield*/, UserModel_1.default.findOne(query)];
                case 2:
                    user = _a.sent();
                    if (!user)
                        return [2 /*return*/, apiResponse_1.ErrorResponse(res, "User not found !!")];
                    return [4 /*yield*/, TournamentModel_1.default.find({
                            users: user._id,
                        })
                            .populate("users", "userName")
                            .populate("matches.team1Squard", "userName")
                            .populate("matches.team2Squard", "userName")
                            .catch(function (err) {
                            return apiResponse_1.ErrorResponse(res, err);
                        })];
                case 3:
                    tournaments = _a.sent();
                    if (tournaments) {
                        return [2 /*return*/, apiResponse_1.successResponseWithData(res, "Operation success", tournaments)];
                    }
                    else {
                        return [2 /*return*/, apiResponse_1.successResponseWithData(res, "Operation success", [])];
                    }
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, TournamentModel_1.default.find({})
                        .populate("users", "userName")
                        .populate("matches.team1Squard")
                        .populate("matches.team2Squard")
                        .then(function (tournaments) {
                        return apiResponse_1.successResponseWithData(res, "Tournament Get Success", tournaments);
                    })
                        .catch(function (err) {
                        return apiResponse_1.ErrorResponse(res, err);
                    })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_4 = _a.sent();
                    return [2 /*return*/, apiResponse_1.ErrorResponse(res, err_4)];
                case 8: return [2 /*return*/];
            }
        });
    }); },
];
exports.deleteMatch = [
    // body("match_id")
    //   .isLength({ min: 1 })
    //   .trim()
    //   .withMessage("match_id must be specified."),
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors;
        return __generator(this, function (_a) {
            try {
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, apiResponse_1.validationErrorWithData(res, "Validation Error.", errors.array())];
                }
                else {
                    console.log(req.body.tournamentId);
                    TournamentModel_1.default.findById(req.body.tournamentId, function (err, foundTournament) { return __awaiter(void 0, void 0, void 0, function () {
                        var query;
                        return __generator(this, function (_a) {
                            if (foundTournament === null) {
                                return [2 /*return*/, apiResponse_1.notFoundResponse(res, "Tournament not exists with this id")];
                            }
                            else {
                                query = { matches: { _id: req.body._id } };
                                TournamentModel_1.default.findByIdAndUpdate(req.body.tournamentId, { $pull: query }, function (err, node) {
                                    if (err) {
                                        return apiResponse_1.notFoundResponse(res, "Errorrr");
                                    }
                                    return apiResponse_1.successResponseWithData(res, "ho ho ho ", node);
                                });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
            }
            catch (err) {
                return [2 /*return*/, apiResponse_1.ErrorResponse(res, err)];
            }
            return [2 /*return*/];
        });
    }); },
];
//# sourceMappingURL=DataController.js.map