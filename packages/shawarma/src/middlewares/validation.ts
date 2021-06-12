import { body } from "express-validator";
import { MinMaxOptions } from "express-validator/src/options";

export const checkEmail = body("email")
  .exists()
  .withMessage("Email is required")
  .trim()
  .escape()
  .isEmail()
  .withMessage("Invalid email");

interface Options {
  escape?: boolean;
  length?: MinMaxOptions & { message?: string };
  trim?: boolean;
  field_name?: string;
}

export const checkString = (
  field: string,
  { escape = true, length, trim = true, field_name }: Options
) => {
  let base = body(field)
    .exists()
    .withMessage(`${field_name || field} is required`)
    .isString()
    .withMessage("Invalid data type")
    .not()
    .isEmpty()
    .withMessage(`${field_name || field} is required`);

  if (escape) {
    base = base.escape();
  }

  if (length) {
    const options: MinMaxOptions = {};
    let message: string;

    if (length.min) {
      options.min = length.min;
    }
    if (length.max) {
      options.max = length.max;
    }

    if (options.min && options.max) {
      message = `${field_name || field} must be between ${options.min} and ${
        options.max
      } characters`;
    } else if (options.min && !options.max) {
      message = `${field_name || field} must be at least ${
        options.min
      } characters`;
    } else {
      message = `${field_name || field} must not exceed ${
        options.max
      } characters`;
    }

    base = base.isLength(options).withMessage(length.message || message);
  }

  if (trim) {
    base = base.trim();
  }

  return base;
};

export const checkPermissions = body("permissions")
  .exists()
  .withMessage("Permissions is required")
  .isArray()
  .withMessage("Permissions must be an array");
