import { body } from "express-validator";

export const checkEmail = body("email")
  .exists()
  .withMessage("Email is required")
  .trim()
  .escape()
  .isEmail()
  .withMessage("Invalid email");

export const checkPassword = body("password")
  .exists()
  .withMessage("Password is required")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters");

export const checkTeamName = body("name")
  .exists()
  .withMessage("Team name is required")
  .trim()
  .escape()
  .isLength({ min: 5 })
  .withMessage("Team name must be at least 5 characters");
