import Tournament from "../models/TournamentModel";
import User from "../models/UserModel";
// import Match from "./../models/MatchModel";

import { body, validationResult, sanitizeBody } from "express-validator";
// import mongoose from "mongoose";
// const { sanitizeBody } = expValid;

import {
  successResponseWithData,
  validationErrorWithData,
  ErrorResponse,
  successResponse,
  notFoundResponse,
} from "../helpers/apiResponse";
import { Users } from "Src/users/users";

export const test = [
  (_req, res) => successResponseWithData(res, "Ho Ho Ho !!", null),
];

export const tournamentRegister = [
  body("title")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Tournament name must be specified.")
    .custom((value) => {
      return Tournament.findOne({ title: value }).then((tournament) => {
        if (tournament) {
          return Promise.reject("Tournament already in use");
        }
      });
    }),
  sanitizeBody("title").escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        const tournament = new Tournament({
          title: req.body.title,
        });
        tournament
          .save()
          .then((resp) => {
            console.log("=====>> Success", resp);
            return successResponseWithData(res, "Tournament Created", resp);
          })
          .catch((err) => {
            console.log(err);
            return ErrorResponse(res, err);
          });
      }
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];

export const tournamentDelete = [
  body("tournamentId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("tournament Id name must be specified."),
  sanitizeBody("tournamentId").escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        const tournament = await Tournament.findByIdAndDelete(
          req.body.tournamentId
        );
        if (tournament) return successResponse(res, "Match Deleted");
        else return ErrorResponse(res, tournament);
      }
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];

export const createMatch = [
  body("team1")
    .isLength({ min: 1 })
    .trim()
    .withMessage("team1 must be specified."),
  body("team2")
    .isLength({ min: 1 })
    .trim()
    .withMessage("team1 must be specified."),
  body("time")
    .isLength({ min: 1 })
    .trim()
    .withMessage("time must be specified."),
  sanitizeBody("title").escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        let match = {
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

        const createMatch = await Tournament.findOneAndUpdate(
          { _id: req.body.tournamentId },
          { $push: { matches: match } },
          { upsert: true, new: true }
        ).catch((err) => {
          return ErrorResponse(res, err);
        });
        return successResponseWithData(res, "Operation success", createMatch);
      }
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];

export const voteMatch = [
  async (req, res) => {
    try {
      // Tournament.findOneAndUpdate(
      //   {
      //     _id: req.body.tournamentId,
      //     "matches._id": req.body._id,
      //   },
      //   {
      //     $pull: {
      //       team1Squard: { _id: req.body.player._id },
      //       team2Squard: { _id: req.body.player._id },
      //     } as any,
      //   },
      //   {},
      //   function (err, test) {
      //     console.log("==============");
      //     console.log(err, test);
      //   }
      // );
      ///////////////////////////
      Tournament.findOne(
        {
          _id: req.body.tournamentId,
          "matches._id": req.body._id,
        },
        {},
        {},
        function (err: any, data: any) {
          var team1 = data.matches.find((match) => match._id == req.body._id);
          console.log("********************");
          console.log(req.body.player);
          team1.team1Squard = team1.team1Squard.filter(
            (team) => team != req.body.player._id
          );
          team1.team2Squard = team1.team2Squard.filter(
            (team) => team != req.body.player._id
          );
          if (req.body.selectedTeam == "team1Squard") {
            team1.team1Squard.push(req.body.player);
          } else if (req.body.selectedTeam == "team2Squard") {
            team1.team2Squard.push(req.body.player);
          }
          data
            .save()
            .then((result) => {
              return successResponseWithData(
                res,
                "Match Updated successfuly",
                result
              );
            })
            .catch((err) => {
              return ErrorResponse(res, err);
            });
        }
      );

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
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];

export const updateMatch = [
  body("team1")
    .isLength({ min: 1 })
    .trim()
    .withMessage("team1 must be specified."),
  body("team2")
    .isLength({ min: 1 })
    .trim()
    .withMessage("team1 must be specified."),
  body("time")
    .isLength({ min: 1 })
    .trim()
    .withMessage("time must be specified."),
  sanitizeBody("title").escape(),
  async (req, res) => {
    try {
      Tournament.findOneAndUpdate(
        {
          _id: req.body.tournamentId,
          "matches._id": req.body._id,
        },
        {
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
        },
        null,
        (err, result) => {
          if (err) {
            console.log("Error:", err);
          } else {
            return successResponseWithData(
              res,
              "Match Updated successfuly",
              result
            );
          }
          process.exit(0);
        }
      );
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];

export const updateTournamentUser = [
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        const getUsers = await User.find(
          {
            _id: {
              $in: req.body.users,
            },
          },
          function (err, docs) {
            console.log(docs);
          }
        );

        Tournament.findOneAndUpdate(
          { _id: req.body.tournamentId },
          { users: getUsers }
        )
          .then((res) => {
            return successResponse(res, "User Updated");
          })
          .catch((err) => {
            return ErrorResponse(res, err);
          });
        return successResponse(res, "User Updated");
      }
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];

export const getTournaments = [
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { mobileNumber } = req.query;
      if (!errors.isEmpty()) {
        return validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        if (mobileNumber) {
          const query = { mobileNumber: mobileNumber };
          const user = await User.findOne(query);
          if (!user) return ErrorResponse(res, "User not found !!");
          const tournaments = await Tournament.find({
            users: user._id,
          })
            .populate("users", "userName")
            .populate("matches.team1Squard", "userName")
            .populate("matches.team2Squard", "userName")
            .catch((err) => {
              return ErrorResponse(res, err);
            });
          if (tournaments) {
            return successResponseWithData(
              res,
              "Operation success",
              tournaments
            );
          } else {
            return successResponseWithData(res, "Operation success", []);
          }
        } else {
          await Tournament.find({})
            .populate("users", "userName")
            .populate("matches.team1Squard")
            .populate("matches.team2Squard")
            .then((tournaments) => {
              return successResponseWithData(
                res,
                "Tournament Get Success",
                tournaments
              );
            })
            .catch((err) => {
              return ErrorResponse(res, err);
            });
        }
      }
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];

export const deleteMatch = [
  // body("match_id")
  //   .isLength({ min: 1 })
  //   .trim()
  //   .withMessage("match_id must be specified."),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        console.log(req.body.tournamentId);
        Tournament.findById(
          req.body.tournamentId,
          async (err, foundTournament) => {
            if (foundTournament === null) {
              return notFoundResponse(
                res,
                "Tournament not exists with this id"
              );
            } else {
              const query: any = { matches: { _id: req.body._id } };
              Tournament.findByIdAndUpdate(
                req.body.tournamentId,
                { $pull: query },
                function (err, node) {
                  if (err) {
                    return notFoundResponse(res, "Errorrr");
                  }
                  return successResponseWithData(res, "ho ho ho ", node);
                }
              );
            }
          }
        );
      }
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];
