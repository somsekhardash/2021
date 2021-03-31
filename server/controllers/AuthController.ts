import {
  validationErrorWithData,
  successResponseWithData,
  unauthorizedResponse,
  ErrorResponse,
  successResponse,
} from "../helpers/apiResponse";
import { body, validationResult, sanitizeBody } from "express-validator";
import User from "../models/UserModel";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
let refreshTokens = [];

export const userLogin = [
  body("mobileNumber")
    .isLength({ min: 1 })
    .trim()
    .withMessage("userName must be specified."),
  body("password")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Password must be specified."),
  sanitizeBody("email").escape(),
  sanitizeBody("password").escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      const { mobileNumber, password } = req.body;

      if (!errors.isEmpty()) {
        return validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      }
      User.findOne({ mobileNumber: mobileNumber })
        .then((user: any) => {
          if (user) {
            if (user.password == password) {
              const userData: any = {
                _id: user._id,
                userName: user.userName,
                mobileNumber: user.mobileNumber,
              };
              const jwtPayload = userData;
              const jwtData = {
                expiresIn: 86400,
              };
              userData.token = sign(jwtPayload, "7032300186", jwtData);
              return successResponseWithData(res, "Login Success.", userData);
            }
          } else {
            return unauthorizedResponse(res, "MobileNumber or Password wrong.");
          }
        })
        .catch((err) => {
          return ErrorResponse(res, err);
        });
    } catch (err) {
      return ErrorResponse(res, err);
    }
  },
];

export async function userLogout(req, res) {
  try {
    const errors = validationResult(req);
    const { accessToken } = req.body;
    if (!errors.isEmpty()) {
      return validationErrorWithData(res, "Validation Error.", errors.array());
    }
    refreshTokens = [...refreshTokens.filter((token) => accessToken !== token)];
    successResponse(res, "User Logged Out");
  } catch (err) {
    return ErrorResponse(res, err);
  }
}
