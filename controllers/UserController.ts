import User from "../models/UserModel";
import Tournament from "../models/TournamentModel";
// import expValidator from "express-validator";
// const { sanitizeBody, body, validationResult } = expValidator;
import { body, validationResult, sanitizeBody } from "express-validator";

import {
  validationErrorWithData,
  ErrorResponse,
  successResponse,
  successResponseWithData,
} from "../helpers/apiResponse";

export const UserDelete = [
  body("userId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("User Id name must be specified."),
  sanitizeBody("userId").escape(),
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
        User.findByIdAndDelete(req.body.userId)
          .then((res) => {
            return successResponse(res, "User Deleted");
          })
          .catch((err) => {
            return ErrorResponse(res, err);
          });
        return successResponse(res, "User Deleted");
      }
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];

export const updateUser = [
  body("mobileNumber")
    .isLength({ min: 1 })
    .trim()
    .withMessage("mobileNumber name must be specified."),
  sanitizeBody("mobileNumber").escape(),
  body("userName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("userName name must be specified."),
  sanitizeBody("userName").escape(),
  body("password")
    .isLength({ min: 1 })
    .trim()
    .withMessage("password name must be specified."),
  sanitizeBody("password").escape(),
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
        var book = new User({
          mobileNumber: req.body.mobileNumber,
          userName: req.body.userName,
          password: req.body.password,
          _id: req.body.userId,
        });
        User.findByIdAndUpdate(req.body.userId, book)
          .then((user) => {
            return successResponseWithData(res, "User updated", user);
          })
          .catch((err) => {
            return ErrorResponse(res, err);
          });
      }
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];

export const getUsers = [
  (req, res) => {
    try {
      const errors = validationResult(req);
      const { tournamentId } = req.query;
      if (!errors.isEmpty()) {
        return validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        const query = tournamentId ? { _id: tournamentId } : {};

        if (tournamentId) {
          Tournament.find(query)
            .populate("users")
            .then((users) => {
              if (users.length) {
                return successResponseWithData(res, "Operation success", users);
              } else {
                return successResponseWithData(res, "Operation success", []);
              }
            })
            .catch((err) => {
              return ErrorResponse(res, err);
            });
        } else {
          User.find(query)
            .then((users) => {
              if (users.length) {
                return successResponseWithData(res, "Operation success", users);
              } else {
                return successResponseWithData(res, "Operation success", []);
              }
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

export const createUser = [
  body("userName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("User Name must be specified.")
    .isAlphanumeric()
    .withMessage("User Name has non-alphanumeric characters."),
  body("mobileNumber")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Mobile Number must be specified.")
    .isMobilePhone("en-IN")
    .withMessage("Mobile Number must be a valid mobile number")
    .custom((value) => {
      return User.findOne({ mobileNumber: value }).then((user) => {
        if (user) {
          return Promise.reject("Mobile Number already in use");
        }
      });
    }),
  body("password")
    .isLength({ min: 6 })
    .trim()
    .withMessage("Password must be 6 characters or greater."),
  sanitizeBody("userName").escape(),
  sanitizeBody("mobileNumber").escape(),
  sanitizeBody("password").escape(),
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
        const user = new User({
          mobileNumber: req.body.mobileNumber,
          userName: req.body.userName,
          password: req.body.password,
        });
        user
          .save()
          .then((newuser) => {
            return successResponseWithData(res, "User Created", newuser);
          })
          .catch((err) => {
            return ErrorResponse(res, err);
          });
      }
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];
