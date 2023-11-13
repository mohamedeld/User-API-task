// userRoutes.js

const { param, body } = require("express-validator");
const User = require("../../Model/userModel");

exports.createUserValidator = [
  body("firstName")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be more than 3 characters"),
  body("lastName")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be more than 3 characters"),
  body("email")
    .notEmpty()
    .withMessage("please enter your email")
    .isEmail()
    .withMessage("some problem with email"),
  body("marketingConsent")
    .optional()
    .isBoolean()
    .withMessage("please enter true or false"),
];

exports.getUserValidator = [
  param("id")
    .notEmpty()
    .trim()
    .custom(async (value) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error("User not found");
      }
    }),
];
